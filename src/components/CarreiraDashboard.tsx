import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import FadeIn from "@/components/FadeIn";
import SectionTitle from "@/components/SectionTitle";

// Dados snapshot fevereiro/2026 — 185 APPGGs ativos
const orgaos = [
  { sigla: "SEGES", n: 68 },
  { sigla: "SEPLAN", n: 17 },
  { sigla: "SME", n: 10 },
  { sigla: "SVMA", n: 10 },
  { sigla: "SGM", n: 9 },
  { sigla: "SMS", n: 8 },
  { sigla: "SEHAB", n: 7 },
  { sigla: "SMUL", n: 6 },
  { sigla: "SMDET", n: 6 },
  { sigla: "SMADS", n: 6 },
  { sigla: "SMT", n: 5 },
  { sigla: "PGM", n: 5 },
  { sigla: "CGM", n: 5 },
  { sigla: "SMDHC", n: 4 },
  { sigla: "SMC", n: 4 },
  { sigla: "SEME", n: 4 },
  { sigla: "SF", n: 3 },
  { sigla: "SIURB", n: 2 },
  { sigla: "SMSU", n: 2 },
  { sigla: "SMPED", n: 1 },
  { sigla: "SMSUB", n: 1 },
  { sigla: "CASA CIVIL", n: 1 },
  { sigla: "GAB. PREFEITO", n: 1 },
];

const sexo = [
  { name: "Masculino", value: 113 },
  { name: "Feminino", value: 72 },
];

const raca = [
  { name: "Branca", value: 124 },
  { name: "Parda", value: 29 },
  { name: "Preta", value: 29 },
  { name: "Amarela", value: 3 },
];

const referencias = [
  { ref: "APPGG1", n: 69 },
  { ref: "APPGG2", n: 60 },
  { ref: "APPGG3", n: 2 },
  { ref: "APPGG4", n: 1 },
  { ref: "APPGG5", n: 16 },
  { ref: "APPGG6", n: 37 },
];

const ingresso = [
  { ano: "2016", n: 45 },
  { ano: "2017", n: 10 },
  { ano: "2018", n: 1 },
  { ano: "2021", n: 34 },
  { ano: "2022", n: 31 },
  { ano: "2024", n: 47 },
  { ano: "2026", n: 17 },
];

// Faixas etárias por marcos geracionais (com base no ano de nascimento)
// Boomers: até 1964 · Geração X: 1965–1980 · Millennials (Y): 1981–1996 · Geração Z: 1997+
const geracao = [
  { faixa: "Boomers", sub: "até 1964", n: 3 },
  { faixa: "Geração X", sub: "1965–1980", n: 20 },
  { faixa: "Millennials", sub: "1981–1996", n: 153 },
  { faixa: "Geração Z", sub: "1997+", n: 9 },
];

// Cargos em comissão: 57 APPGGs (30,8% do total) ocupam funções de liderança
// Recorte por gênero e raça — permite avaliar equidade no acesso a postos de decisão
const comissaoGenero = [
  { grupo: "Feminino", comBase: 72, comComissao: 25 },
  { grupo: "Masculino", comBase: 113, comComissao: 32 },
];

const comissaoRaca = [
  { grupo: "Branca", comBase: 124, comComissao: 35 },
  { grupo: "Parda", comBase: 29, comComissao: 12 },
  { grupo: "Preta", comBase: 29, comComissao: 9 },
  { grupo: "Amarela", comBase: 3, comComissao: 1 },
];

// Taxa de ocupação de cargos comissionados por grupo (%)
const taxaGenero = comissaoGenero.map((d) => ({
  grupo: d.grupo,
  taxa: Number(((d.comComissao / d.comBase) * 100).toFixed(1)),
  total: d.comBase,
  comissao: d.comComissao,
}));

const taxaRaca = comissaoRaca.map((d) => ({
  grupo: d.grupo,
  taxa: Number(((d.comComissao / d.comBase) * 100).toFixed(1)),
  total: d.comBase,
  comissao: d.comComissao,
}));

const GOLD = "hsl(var(--gold))";
const MUTED = "hsl(var(--muted-foreground))";
const BORDER = "hsl(var(--luxury-border))";
const PALETTE = [
  "hsl(var(--gold))",
  "hsl(var(--primary))",
  "hsl(var(--foreground))",
  "hsl(var(--muted-foreground))",
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: `1px solid ${BORDER}`,
  fontSize: "12px",
  fontWeight: 300,
};

type Tab = "orgaos" | "ingresso" | "sexo" | "raca" | "ref" | "geracao";

const tabs: { id: Tab; label: string }[] = [
  { id: "orgaos", label: "Órgãos" },
  { id: "ingresso", label: "Ingresso" },
  { id: "ref", label: "Referência" },
  { id: "sexo", label: "Gênero" },
  { id: "raca", label: "Raça/Cor" },
  { id: "geracao", label: "Geração" },
];

const CarreiraDashboard = () => {
  const [tab, setTab] = useState<Tab>("orgaos");

  const chart = useMemo(() => {
    switch (tab) {
      case "orgaos":
        return (
          <ResponsiveContainer width="100%" height={480}>
            <BarChart data={orgaos} layout="vertical" margin={{ left: 40, right: 24 }}>
              <CartesianGrid horizontal={false} stroke={BORDER} strokeDasharray="2 4" />
              <XAxis type="number" stroke={MUTED} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="sigla"
                stroke={MUTED}
                tick={{ fontSize: 10 }}
                width={100}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
              <Bar dataKey="n" fill={GOLD} name="APPGGs" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "ingresso":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={ingresso} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={BORDER} strokeDasharray="2 4" />
              <XAxis dataKey="ano" stroke={MUTED} tick={{ fontSize: 11 }} />
              <YAxis stroke={MUTED} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="n"
                stroke={GOLD}
                strokeWidth={2}
                dot={{ fill: GOLD, r: 4 }}
                activeDot={{ r: 6 }}
                name="Ingressos"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "ref":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={referencias} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={BORDER} strokeDasharray="2 4" />
              <XAxis dataKey="ref" stroke={MUTED} tick={{ fontSize: 11 }} />
              <YAxis stroke={MUTED} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
              <Bar dataKey="n" fill={GOLD} name="APPGGs" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "sexo":
      case "raca": {
        const data = tab === "sexo" ? sexo : raca;
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                innerRadius={70}
                paddingAngle={2}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
                style={{ fontSize: 11 }}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        );
      }
      case "geracao":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={geracao} margin={{ top: 20, right: 24, left: 0, bottom: 40 }}>
              <CartesianGrid stroke={BORDER} strokeDasharray="2 4" />
              <XAxis
                dataKey="faixa"
                stroke={MUTED}
                tick={({ x, y, payload }) => {
                  const item = geracao.find((g) => g.faixa === payload.value);
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text dy={14} textAnchor="middle" fill={MUTED} fontSize={11}>
                        {payload.value}
                      </text>
                      <text dy={30} textAnchor="middle" fill={MUTED} fontSize={9} opacity={0.7}>
                        {item?.sub}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis stroke={MUTED} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                formatter={(v: number, _n, p) => [`${v} APPGGs`, p.payload.sub]}
              />
              <Bar dataKey="n" fill={GOLD} name="APPGGs" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  }, [tab]);

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Painel Interativo" title="Retrato da Carreira" />
        <FadeIn>
          <p className="text-sm font-light text-text-body leading-[1.8] max-w-2xl mt-6">
            Dados de servidores ativos em fevereiro de 2026. Selecione uma dimensão para explorar a
            composição da carreira.
          </p>
        </FadeIn>

        <div className="mt-10 flex flex-wrap gap-px bg-luxury-border border border-luxury-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-[11px] tracking-wide font-light transition-colors ${
                tab === t.id
                  ? "bg-gold text-background"
                  : "bg-section-alt text-text-body hover:text-foreground"
              }`}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        <FadeIn key={tab}>
          <div className="mt-10 bg-section-alt border border-luxury-border p-6 md:p-10">{chart}</div>
        </FadeIn>

        <p className="text-[10px] font-light text-text-caption mt-6 tracking-wide">
          Fonte: Base de dados de pessoal da Prefeitura de São Paulo — snapshot fev/2026. 185 APPGGs em exercício.
        </p>
      </div>
    </section>
  );
};

export default CarreiraDashboard;
