/**
 * Gera src/data/snapshot.json a partir da planilha mensal da Prefeitura.
 *
 * Uso: bun run snapshot <caminho-da-planilha.xlsx> [--mes "fev/2026"]
 *
 * A planilha deve ter as colunas:
 *  REGISTRO, VINCULO, GRUPO, REF_CARGO_BAS, CARGO_COMISSAO, REF_CARGO_COM,
 *  DATA_INICIO_EXERC, SECRET_SUBPREF, SIGLA, SEXO, ANO_NASCIMENTO, RACA_COR, PCD
 *
 * Filtra GRUPO = "QPGG" (carreira APPGG) e deduplica por REGISTRO.
 */

import * as XLSX from "xlsx";
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type Row = Record<string, string | number | undefined | null>;

const args = process.argv.slice(2);
const xlsxPath = args.find((a) => !a.startsWith("--"));
const mesFlag = args.find((a) => a.startsWith("--mes="));
const mesReferencia = mesFlag ? mesFlag.split("=")[1] : "fev/2026";

if (!xlsxPath) {
  console.error("Uso: bun run snapshot <planilha.xlsx> [--mes=\"mar/2026\"]");
  process.exit(1);
}

const buf = readFileSync(resolve(xlsxPath));
const wb = XLSX.read(buf, { type: "buffer" });
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json<Row>(sheet, { defval: null, raw: true });

// Filtra carreira APPGG
const qpgg = rows.filter((r) => String(r.GRUPO ?? "").trim() === "QPGG");

// Deduplica por REGISTRO mantendo o vínculo com cargo em comissão (se houver)
const porRegistro = new Map<string, Row>();
for (const r of qpgg) {
  const key = String(r.REGISTRO);
  const existing = porRegistro.get(key);
  if (!existing) {
    porRegistro.set(key, r);
  } else {
    const existingHasCom = existing.CARGO_COMISSAO != null;
    const newHasCom = r.CARGO_COMISSAO != null;
    if (newHasCom && !existingHasCom) porRegistro.set(key, r);
  }
}
const pessoas = Array.from(porRegistro.values());
const total = pessoas.length;

// Helpers
const norm = (v: unknown) => String(v ?? "").trim().toUpperCase();
const isNegro = (raca: string) => raca === "PRETA" || raca === "PARDA";
const round1 = (n: number) => Number(n.toFixed(1));
const pct = (num: number, den: number) => (den === 0 ? 0 : round1((num * 100) / den));

const countBy = <T,>(arr: T[], key: (x: T) => string): Record<string, number> => {
  const o: Record<string, number> = {};
  for (const x of arr) {
    const k = key(x);
    o[k] = (o[k] ?? 0) + 1;
  }
  return o;
};

// Excel serial → ano
const serialToYear = (serial: number) => {
  const ms = (serial - 25569) * 86400 * 1000;
  return new Date(ms).getUTCFullYear();
};

// === Agregados ===

// Por órgão (SIGLA)
const porSigla = countBy(pessoas, (p) => norm(p.SIGLA));
const orgaos = Object.entries(porSigla)
  .map(([sigla, n]) => ({
    sigla: sigla.replace("GABINETE DO PREFEITO", "GAB. PREFEITO"),
    n,
  }))
  .sort((a, b) => b.n - a.n);

// Sexo
const sexoCount = countBy(pessoas, (p) => norm(p.SEXO));
const sexo = [
  { name: "Masculino", value: sexoCount["MASCULINO"] ?? 0 },
  { name: "Feminino", value: sexoCount["FEMININO"] ?? 0 },
];

// Raça
const racaCount = countBy(pessoas, (p) => norm(p.RACA_COR));
const raca = [
  { name: "Branca", value: racaCount["BRANCA"] ?? 0 },
  { name: "Parda", value: racaCount["PARDA"] ?? 0 },
  { name: "Preta", value: racaCount["PRETA"] ?? 0 },
  { name: "Amarela", value: racaCount["AMARELA"] ?? 0 },
];

// PCD
const pcdSim = pessoas.filter((p) => norm(p.PCD) === "SIM").length;

// Referência APPGG (REF_CARGO_BAS começa com "APPGG")
const refCount = countBy(
  pessoas.filter((p) => String(p.REF_CARGO_BAS ?? "").startsWith("APPGG")),
  (p) => String(p.REF_CARGO_BAS),
);
const referencias = [1, 2, 3, 4, 5, 6].map((i) => ({
  ref: `APPGG${i}`,
  n: refCount[`APPGG${i}`] ?? 0,
}));

// Ingresso por ano
const anoIngresso = pessoas
  .map((p) => {
    const v = p.DATA_INICIO_EXERC;
    if (typeof v === "number") return serialToYear(v);
    if (typeof v === "string" && /^\d+$/.test(v)) return serialToYear(Number(v));
    return null;
  })
  .filter((y): y is number => y != null);
const ingressoCount = countBy(anoIngresso.map(String), (x) => x);
const ingresso = Object.entries(ingressoCount)
  .map(([ano, n]) => ({ ano, n }))
  .sort((a, b) => Number(a.ano) - Number(b.ano));

// Geração por ano de nascimento
const nascimentos = pessoas
  .map((p) => Number(p.ANO_NASCIMENTO))
  .filter((n) => Number.isFinite(n));
const faixa = (ano: number) => {
  if (ano <= 1964) return "Boomers";
  if (ano <= 1980) return "Geração X";
  if (ano <= 1996) return "Millennials";
  return "Geração Z";
};
const subFaixa: Record<string, string> = {
  Boomers: "até 1964",
  "Geração X": "1965–1980",
  Millennials: "1981–1996",
  "Geração Z": "1997+",
};
const geracaoCount = countBy(nascimentos.map(faixa), (x) => x);
const geracao = ["Boomers", "Geração X", "Millennials", "Geração Z"].map((f) => ({
  faixa: f,
  sub: subFaixa[f],
  n: geracaoCount[f] ?? 0,
}));

// Comissão (liderança) — qualquer vínculo com CARGO_COMISSAO preenchido
const registrosComComissao = new Set(
  qpgg.filter((r) => r.CARGO_COMISSAO != null).map((r) => String(r.REGISTRO)),
);
const pessoasComComissao = pessoas.filter((p) =>
  registrosComComissao.has(String(p.REGISTRO)),
);
const totalComissao = pessoasComComissao.length;

const comissaoPorSexo = (s: string) =>
  pessoasComComissao.filter((p) => norm(p.SEXO) === s).length;
const comissaoPorRaca = (r: string) =>
  pessoasComComissao.filter((p) => norm(p.RACA_COR) === r).length;

const comissaoGenero = [
  {
    grupo: "Feminino",
    comBase: sexoCount["FEMININO"] ?? 0,
    comComissao: comissaoPorSexo("FEMININO"),
  },
  {
    grupo: "Masculino",
    comBase: sexoCount["MASCULINO"] ?? 0,
    comComissao: comissaoPorSexo("MASCULINO"),
  },
];
const comissaoRaca = [
  { grupo: "Branca", comBase: racaCount["BRANCA"] ?? 0, comComissao: comissaoPorRaca("BRANCA") },
  { grupo: "Parda", comBase: racaCount["PARDA"] ?? 0, comComissao: comissaoPorRaca("PARDA") },
  { grupo: "Preta", comBase: racaCount["PRETA"] ?? 0, comComissao: comissaoPorRaca("PRETA") },
  { grupo: "Amarela", comBase: racaCount["AMARELA"] ?? 0, comComissao: comissaoPorRaca("AMARELA") },
];

// Pirâmide CDA — usa o vínculo em comissão de cada registro
const cdaRows = qpgg.filter((r) => {
  const ref = String(r.REF_CARGO_COM ?? "");
  return /^CDA-\d$/.test(ref);
});
const cdaByRef: Record<string, Row[]> = {};
for (const r of cdaRows) {
  const ref = String(r.REF_CARGO_COM);
  (cdaByRef[ref] ??= []).push(r);
}
const piramideCda = ["CDA-1", "CDA-2", "CDA-3", "CDA-4", "CDA-5", "CDA-6"].map((ref) => {
  const rs = cdaByRef[ref] ?? [];
  const c = (pred: (r: Row) => boolean) => rs.filter(pred).length;
  return {
    ref,
    fem: c((r) => norm(r.SEXO) === "FEMININO"),
    masc: c((r) => norm(r.SEXO) === "MASCULINO"),
    branca: c((r) => norm(r.RACA_COR) === "BRANCA"),
    parda: c((r) => norm(r.RACA_COR) === "PARDA"),
    preta: c((r) => norm(r.RACA_COR) === "PRETA"),
    amarela: c((r) => norm(r.RACA_COR) === "AMARELA"),
    total: rs.length,
  };
});

// Coortes para a página de Diversidade
const cohortBuckets: { id: string; periodo: string; anos: number[]; label: string }[] = [
  { id: "c1", periodo: "2016–2018", anos: [2016, 2017, 2018], label: "Geração pioneira" },
  { id: "c2", periodo: "2021–2022", anos: [2021, 2022], label: "Expansão da carreira" },
  { id: "c3", periodo: "2024", anos: [2024], label: "Consolidação técnica" },
  { id: "c4", periodo: "2026", anos: [2026], label: "Coorte mais recente" },
];
const coortes = cohortBuckets.map((b) => {
  const grupo = pessoas.filter((p) => {
    const v = p.DATA_INICIO_EXERC;
    const y = typeof v === "number" ? serialToYear(v) : null;
    return y != null && b.anos.includes(y);
  });
  const t = grupo.length;
  const negros = grupo.filter((p) => isNegro(norm(p.RACA_COR))).length;
  const mulheres = grupo.filter((p) => norm(p.SEXO) === "FEMININO").length;
  return {
    periodo: b.periodo,
    label: b.label,
    total: t,
    negros: pct(negros, t),
    mulheres: pct(mulheres, t),
  };
});

// Top órgãos com diversidade (para Diversidade page)
const secretariasDiv = orgaos.slice(0, 6).map((o) => {
  const grupo = pessoas.filter((p) => norm(p.SIGLA) === o.sigla.replace("GAB. PREFEITO", "GABINETE DO PREFEITO"));
  const t = grupo.length;
  const m = grupo.filter((p) => norm(p.SEXO) === "FEMININO").length;
  const n = grupo.filter((p) => isNegro(norm(p.RACA_COR))).length;
  return { sigla: o.sigla, total: t, mulheres: pct(m, t), negros: pct(n, t) };
});

// === Snapshot final ===
const snapshot = {
  geradoEm: new Date().toISOString(),
  mesReferencia,
  total,
  totalOrgaos: orgaos.length,
  // Indicadores agregados
  indicadores: {
    mulheres: sexoCount["FEMININO"] ?? 0,
    mulheresPct: pct(sexoCount["FEMININO"] ?? 0, total),
    negros: (racaCount["PRETA"] ?? 0) + (racaCount["PARDA"] ?? 0),
    negrosPct: pct((racaCount["PRETA"] ?? 0) + (racaCount["PARDA"] ?? 0), total),
    pcd: pcdSim,
    pcdPct: pct(pcdSim, total),
    lideranca: totalComissao,
    liderancaPct: pct(totalComissao, total),
  },
  lideranca: {
    total: totalComissao,
    mulheres: comissaoPorSexo("FEMININO"),
    mulheresPct: pct(comissaoPorSexo("FEMININO"), totalComissao),
    negros: comissaoPorRaca("PRETA") + comissaoPorRaca("PARDA"),
    negrosPct: pct(comissaoPorRaca("PRETA") + comissaoPorRaca("PARDA"), totalComissao),
  },
  // Para o dashboard
  orgaos,
  sexo,
  raca,
  referencias,
  ingresso,
  geracao,
  comissaoGenero,
  comissaoRaca,
  piramideCda,
  // Para a página Diversidade
  coortes,
  secretariasDiv,
};

const out = resolve("src/data/snapshot.json");
writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`✓ Snapshot gerado: ${out}`);
console.log(`  ${total} APPGGs · ${orgaos.length} órgãos · ${totalComissao} em comissão`);
console.log(`  Mês de referência: ${mesReferencia}`);
