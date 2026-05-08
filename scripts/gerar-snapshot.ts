/**
 * Gera src/data/snapshot.json a partir da planilha mensal da Prefeitura.
 *
 * Uso: bun run snapshot <caminho-da-planilha.xlsx> [--mes="mar/2026"]
 *
 * Colunas esperadas na planilha:
 *   REGISTRO, VINCULO, GRUPO, REF_CARGO_BAS, CARGO_COMISSAO, REF_CARGO_COM,
 *   DATA_INICIO_EXERC, SECRET_SUBPREF, SIGLA, SEXO, ANO_NASCIMENTO, RACA_COR, PCD
 *
 * Regras de negócio principais:
 *  - Considera apenas a carreira APPGG (GRUPO = "QPGG").
 *  - Deduplica por REGISTRO, preferindo o vínculo que tenha CARGO_COMISSAO
 *    (assim conseguimos mapear lideranças mesmo quando há mais de uma linha).
 */

import * as XLSX from "xlsx";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// =============================================================================
// Tipos
// =============================================================================

type RawRow = Record<string, string | number | null | undefined>;

interface Pessoa {
  registro: string;
  sigla: string;
  sexo: string;
  raca: string;
  pcd: string;
  refCargoBas: string;
  refCargoCom: string;
  cargoComissao: string | null;
  anoIngresso: number | null;
  anoNascimento: number | null;
}

interface CliArgs {
  xlsxPath: string;
  mesReferencia: string;
}

// =============================================================================
// Constantes de negócio
// =============================================================================

const GRUPO_APPGG = "QPGG";
const COLUNAS_OBRIGATORIAS = [
  "REGISTRO",
  "GRUPO",
  "SIGLA",
  "SEXO",
  "RACA_COR",
] as const;

const NIVEIS_APPGG = [1, 2, 3, 4, 5, 6] as const;
const NIVEIS_CDA = ["CDA-1", "CDA-2", "CDA-3", "CDA-4", "CDA-5", "CDA-6"] as const;

const COORTES = [
  { periodo: "2016–2018", anos: [2016, 2017, 2018], label: "Geração pioneira" },
  { periodo: "2021–2022", anos: [2021, 2022], label: "Expansão da carreira" },
  { periodo: "2024", anos: [2024], label: "Consolidação técnica" },
  { periodo: "2026", anos: [2026], label: "Coorte mais recente" },
] as const;

const FAIXAS_GERACIONAIS = [
  { faixa: "Boomers", sub: "até 1964", ate: 1964 },
  { faixa: "Geração X", sub: "1965–1980", ate: 1980 },
  { faixa: "Millennials", sub: "1981–1996", ate: 1996 },
  { faixa: "Geração Z", sub: "1997+", ate: Infinity },
] as const;

// =============================================================================
// Utilitários genéricos
// =============================================================================

const norm = (v: unknown): string => String(v ?? "").trim().toUpperCase();
const isNegro = (raca: string) => raca === "PRETA" || raca === "PARDA";
const round1 = (n: number) => Number(n.toFixed(1));
const pct = (num: number, den: number) => (den === 0 ? 0 : round1((num * 100) / den));

const countBy = <T,>(arr: T[], key: (x: T) => string): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const item of arr) {
    const k = key(item);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
};

/** Converte um serial de data do Excel em ano (UTC). */
const excelSerialParaAno = (serial: number): number => {
  const ms = (serial - 25569) * 86400 * 1000;
  return new Date(ms).getUTCFullYear();
};

const parseAnoDeData = (valor: unknown): number | null => {
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return excelSerialParaAno(valor);
  }
  if (typeof valor === "string" && /^\d+$/.test(valor)) {
    return excelSerialParaAno(Number(valor));
  }
  return null;
};

const classificarGeracao = (ano: number): string => {
  for (const f of FAIXAS_GERACIONAIS) {
    if (ano <= f.ate) return f.faixa;
  }
  return FAIXAS_GERACIONAIS[FAIXAS_GERACIONAIS.length - 1].faixa;
};

// =============================================================================
// Parsing de CLI e leitura da planilha
// =============================================================================

function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2);
  const xlsxPath = args.find((a) => !a.startsWith("--"));
  const mesFlag = args.find((a) => a.startsWith("--mes="));

  if (!xlsxPath) {
    throw new Error('Uso: bun run snapshot <planilha.xlsx> [--mes="mar/2026"]');
  }
  if (!existsSync(resolve(xlsxPath))) {
    throw new Error(`Planilha não encontrada: ${xlsxPath}`);
  }

  return {
    xlsxPath: resolve(xlsxPath),
    mesReferencia: mesFlag?.split("=")[1] || "fev/2026",
  };
}

function lerLinhas(xlsxPath: string): RawRow[] {
  const buf = readFileSync(xlsxPath);
  const wb = XLSX.read(buf, { type: "buffer" });
  const primeiraAba = wb.SheetNames[0];
  if (!primeiraAba) throw new Error("A planilha não possui nenhuma aba.");

  const sheet = wb.Sheets[primeiraAba];
  const rows = XLSX.utils.sheet_to_json<RawRow>(sheet, { defval: null, raw: true });
  if (rows.length === 0) throw new Error(`A aba "${primeiraAba}" está vazia.`);

  validarColunas(rows[0]);
  return rows;
}

function validarColunas(amostra: RawRow): void {
  const ausentes = COLUNAS_OBRIGATORIAS.filter((c) => !(c in amostra));
  if (ausentes.length > 0) {
    throw new Error(
      `Colunas obrigatórias ausentes na planilha: ${ausentes.join(", ")}`,
    );
  }
}

// =============================================================================
// Filtro, deduplicação e normalização
// =============================================================================

function filtrarCarreira(rows: RawRow[]): RawRow[] {
  return rows.filter((r) => norm(r.GRUPO) === GRUPO_APPGG);
}

/**
 * Mantém uma linha por REGISTRO. Quando há múltiplas, prefere a que tem
 * CARGO_COMISSAO preenchido (necessário para mapear lideranças).
 */
function deduplicarPorRegistro(rows: RawRow[]): RawRow[] {
  const porRegistro = new Map<string, RawRow>();
  for (const r of rows) {
    const key = String(r.REGISTRO ?? "").trim();
    if (!key) continue;

    const atual = porRegistro.get(key);
    if (!atual) {
      porRegistro.set(key, r);
      continue;
    }
    const atualTemCom = atual.CARGO_COMISSAO != null;
    const novaTemCom = r.CARGO_COMISSAO != null;
    if (novaTemCom && !atualTemCom) porRegistro.set(key, r);
  }
  return Array.from(porRegistro.values());
}

function normalizarSiglaDeExibicao(sigla: string): string {
  return sigla.replace("GABINETE DO PREFEITO", "GAB. PREFEITO");
}

function toPessoa(r: RawRow): Pessoa {
  return {
    registro: String(r.REGISTRO ?? ""),
    sigla: norm(r.SIGLA),
    sexo: norm(r.SEXO),
    raca: norm(r.RACA_COR),
    pcd: norm(r.PCD),
    refCargoBas: String(r.REF_CARGO_BAS ?? ""),
    refCargoCom: String(r.REF_CARGO_COM ?? ""),
    cargoComissao: r.CARGO_COMISSAO == null ? null : String(r.CARGO_COMISSAO),
    anoIngresso: parseAnoDeData(r.DATA_INICIO_EXERC),
    anoNascimento: Number.isFinite(Number(r.ANO_NASCIMENTO))
      ? Number(r.ANO_NASCIMENTO)
      : null,
  };
}

// =============================================================================
// Agregadores (cada um responsável por uma seção do snapshot)
// =============================================================================

function agregarPorOrgao(pessoas: Pessoa[]) {
  const contagem = countBy(pessoas, (p) => p.sigla);
  return Object.entries(contagem)
    .map(([sigla, n]) => ({ sigla: normalizarSiglaDeExibicao(sigla), n }))
    .sort((a, b) => b.n - a.n);
}

function agregarSexo(pessoas: Pessoa[]) {
  const c = countBy(pessoas, (p) => p.sexo);
  return [
    { name: "Masculino", value: c["MASCULINO"] ?? 0 },
    { name: "Feminino", value: c["FEMININO"] ?? 0 },
  ];
}

function agregarRaca(pessoas: Pessoa[]) {
  const c = countBy(pessoas, (p) => p.raca);
  return [
    { name: "Branca", value: c["BRANCA"] ?? 0 },
    { name: "Parda", value: c["PARDA"] ?? 0 },
    { name: "Preta", value: c["PRETA"] ?? 0 },
    { name: "Amarela", value: c["AMARELA"] ?? 0 },
  ];
}

function agregarReferencias(pessoas: Pessoa[]) {
  const apenasAppgg = pessoas.filter((p) => p.refCargoBas.startsWith("APPGG"));
  const c = countBy(apenasAppgg, (p) => p.refCargoBas);
  return NIVEIS_APPGG.map((i) => ({ ref: `APPGG${i}`, n: c[`APPGG${i}`] ?? 0 }));
}

function agregarIngresso(pessoas: Pessoa[]) {
  const anos = pessoas
    .map((p) => p.anoIngresso)
    .filter((y): y is number => y != null);
  const c = countBy(anos.map(String), (x) => x);
  return Object.entries(c)
    .map(([ano, n]) => ({ ano, n }))
    .sort((a, b) => Number(a.ano) - Number(b.ano));
}

function agregarGeracao(pessoas: Pessoa[]) {
  const anos = pessoas
    .map((p) => p.anoNascimento)
    .filter((n): n is number => n != null);
  const c = countBy(anos.map(classificarGeracao), (x) => x);
  return FAIXAS_GERACIONAIS.map(({ faixa, sub }) => ({
    faixa,
    sub,
    n: c[faixa] ?? 0,
  }));
}

function agregarPiramideCda(rowsCarreira: RawRow[]) {
  const cdaRows = rowsCarreira.filter((r) =>
    /^CDA-\d$/.test(String(r.REF_CARGO_COM ?? "")),
  );
  const porRef = new Map<string, RawRow[]>();
  for (const r of cdaRows) {
    const ref = String(r.REF_CARGO_COM);
    if (!porRef.has(ref)) porRef.set(ref, []);
    porRef.get(ref)!.push(r);
  }

  return NIVEIS_CDA.map((ref) => {
    const grupo = porRef.get(ref) ?? [];
    const conta = (pred: (r: RawRow) => boolean) => grupo.filter(pred).length;
    return {
      ref,
      fem: conta((r) => norm(r.SEXO) === "FEMININO"),
      masc: conta((r) => norm(r.SEXO) === "MASCULINO"),
      branca: conta((r) => norm(r.RACA_COR) === "BRANCA"),
      parda: conta((r) => norm(r.RACA_COR) === "PARDA"),
      preta: conta((r) => norm(r.RACA_COR) === "PRETA"),
      amarela: conta((r) => norm(r.RACA_COR) === "AMARELA"),
      total: grupo.length,
    };
  });
}

function agregarLideranca(pessoas: Pessoa[], rowsCarreira: RawRow[]) {
  // Considera liderança qualquer registro que tenha PELO MENOS UM vínculo
  // com CARGO_COMISSAO preenchido (mesmo que a linha deduplicada não seja a com comissão).
  const registrosComComissao = new Set(
    rowsCarreira
      .filter((r) => r.CARGO_COMISSAO != null)
      .map((r) => String(r.REGISTRO)),
  );
  const lideres = pessoas.filter((p) => registrosComComissao.has(p.registro));

  const totalSexo = (s: string) => pessoas.filter((p) => p.sexo === s).length;
  const totalRaca = (r: string) => pessoas.filter((p) => p.raca === r).length;
  const lidSexo = (s: string) => lideres.filter((p) => p.sexo === s).length;
  const lidRaca = (r: string) => lideres.filter((p) => p.raca === r).length;

  return {
    lideres,
    comissaoGenero: [
      { grupo: "Feminino", comBase: totalSexo("FEMININO"), comComissao: lidSexo("FEMININO") },
      { grupo: "Masculino", comBase: totalSexo("MASCULINO"), comComissao: lidSexo("MASCULINO") },
    ],
    comissaoRaca: [
      { grupo: "Branca", comBase: totalRaca("BRANCA"), comComissao: lidRaca("BRANCA") },
      { grupo: "Parda", comBase: totalRaca("PARDA"), comComissao: lidRaca("PARDA") },
      { grupo: "Preta", comBase: totalRaca("PRETA"), comComissao: lidRaca("PRETA") },
      { grupo: "Amarela", comBase: totalRaca("AMARELA"), comComissao: lidRaca("AMARELA") },
    ],
  };
}

function agregarCoortes(pessoas: Pessoa[]) {
  return COORTES.map(({ periodo, label, anos }) => {
    const grupo = pessoas.filter(
      (p) => p.anoIngresso != null && (anos as readonly number[]).includes(p.anoIngresso),
    );
    const total = grupo.length;
    return {
      periodo,
      label,
      total,
      negros: pct(grupo.filter((p) => isNegro(p.raca)).length, total),
      mulheres: pct(grupo.filter((p) => p.sexo === "FEMININO").length, total),
    };
  });
}

function agregarSecretariasDiv(
  pessoas: Pessoa[],
  orgaos: { sigla: string; n: number }[],
) {
  const top = orgaos.slice(0, 6);
  return top.map((o) => {
    // Reverte a normalização de exibição para casar com a sigla original
    const siglaOriginal = o.sigla.replace("GAB. PREFEITO", "GABINETE DO PREFEITO");
    const grupo = pessoas.filter((p) => p.sigla === siglaOriginal);
    const total = grupo.length;
    return {
      sigla: o.sigla,
      total,
      mulheres: pct(grupo.filter((p) => p.sexo === "FEMININO").length, total),
      negros: pct(grupo.filter((p) => isNegro(p.raca)).length, total),
    };
  });
}

// =============================================================================
// Construção do snapshot final
// =============================================================================

function construirSnapshot(rowsCarreira: RawRow[], mesReferencia: string) {
  const pessoas = deduplicarPorRegistro(rowsCarreira).map(toPessoa);
  const total = pessoas.length;

  const sexo = agregarSexo(pessoas);
  const raca = agregarRaca(pessoas);
  const orgaos = agregarPorOrgao(pessoas);
  const { lideres, comissaoGenero, comissaoRaca } = agregarLideranca(pessoas, rowsCarreira);
  const totalLideranca = lideres.length;

  const fem = sexo.find((s) => s.name === "Feminino")!.value;
  const negros = (raca.find((r) => r.name === "Preta")!.value)
    + (raca.find((r) => r.name === "Parda")!.value);
  const pcd = pessoas.filter((p) => p.pcd === "SIM").length;
  const lidFem = lideres.filter((p) => p.sexo === "FEMININO").length;
  const lidNegros = lideres.filter((p) => isNegro(p.raca)).length;

  return {
    geradoEm: new Date().toISOString(),
    mesReferencia,
    total,
    totalOrgaos: orgaos.length,
    indicadores: {
      mulheres: fem,
      mulheresPct: pct(fem, total),
      negros,
      negrosPct: pct(negros, total),
      pcd,
      pcdPct: pct(pcd, total),
      lideranca: totalLideranca,
      liderancaPct: pct(totalLideranca, total),
    },
    lideranca: {
      total: totalLideranca,
      mulheres: lidFem,
      mulheresPct: pct(lidFem, totalLideranca),
      negros: lidNegros,
      negrosPct: pct(lidNegros, totalLideranca),
    },
    orgaos,
    sexo,
    raca,
    referencias: agregarReferencias(pessoas),
    ingresso: agregarIngresso(pessoas),
    geracao: agregarGeracao(pessoas),
    comissaoGenero,
    comissaoRaca,
    piramideCda: agregarPiramideCda(rowsCarreira),
    coortes: agregarCoortes(pessoas),
    secretariasDiv: agregarSecretariasDiv(pessoas, orgaos),
  };
}

// =============================================================================
// Entry point
// =============================================================================

function main() {
  try {
    const { xlsxPath, mesReferencia } = parseArgs(process.argv);

    const todasAsLinhas = lerLinhas(xlsxPath);
    const rowsCarreira = filtrarCarreira(todasAsLinhas);
    if (rowsCarreira.length === 0) {
      throw new Error(`Nenhuma linha com GRUPO="${GRUPO_APPGG}" encontrada.`);
    }

    const snapshot = construirSnapshot(rowsCarreira, mesReferencia);

    const out = resolve("src/data/snapshot.json");
    writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");

    console.log(`✓ Snapshot gerado: ${out}`);
    console.log(
      `  ${snapshot.total} APPGGs · ${snapshot.totalOrgaos} órgãos · ${snapshot.lideranca.total} em comissão`,
    );
    console.log(`  Mês de referência: ${snapshot.mesReferencia}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Erro ao gerar snapshot: ${msg}`);
    process.exit(1);
  }
}

main();
