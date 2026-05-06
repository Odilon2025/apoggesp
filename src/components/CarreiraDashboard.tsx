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
import { snapshot } from "@/data/snapshot";

const {
  total: TOTAL,
  orgaos,
  sexo,
  raca,
  referencias,
  ingresso,
  geracao,
  comissaoGenero,
  comissaoRaca,
  piramideCda,
  lideranca,
  mesReferencia,
} = snapshot;

const taxaGenero = comissaoGenero.map((d) => ({
  grupo: d.grupo,
  taxa: d.comBase === 0 ? 0 : Number(((d.comComissao / d.comBase) * 100).toFixed(1)),
  total: d.comBase,
  comissao: d.comComissao,
}));

const taxaRaca = comissaoRaca.map((d) => ({
  grupo: d.grupo,
  taxa: d.comBase === 0 ? 0 : Number(((d.comComissao / d.comBase) * 100).toFixed(1)),
  total: d.comBase,
  comissao: d.comComissao,
}));

const piramideGenero = piramideCda.map((d) => ({
  ref: d.ref,
  Feminino: d.total === 0 ? 0 : Number(((d.fem / d.total) * 100).toFixed(1)),
  Masculino: d.total === 0 ? 0 : Number(((d.masc / d.total) * 100).toFixed(1)),
  total: d.total,
}));

const piramideRaca = piramideCda.map((d) => {
  const negras = d.parda + d.preta;
  return {
    ref: d.ref,
    Branca: d.total === 0 ? 0 : Number(((d.branca / d.total) * 100).toFixed(1)),
    Negra: d.total === 0 ? 0 : Number(((negras / d.total) * 100).toFixed(1)),
    Amarela: d.total === 0 ? 0 : Number(((d.amarela / d.total) * 100).toFixed(1)),
    total: d.total,
  };
});

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

type Tab = "orgaos" | "ingresso" | "sexo" | "raca" | "ref" | "geracao" | "comissao";

const tabs: { id: Tab; label: string }[] = [
  { id: "orgaos", label: "Órgãos" },
  { id: "ingresso", label: "Ingresso" },
  { id: "ref", label: "Referência" },
  { id: "sexo", label: "Gênero" },
  { id: "raca", label: "Raça/Cor" },
  { id: "geracao", label: "Geração" },
  { id: "comissao", label: "Liderança" },
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
      case "comissao":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { title: "Por Gênero", data: taxaGenero },
              { title: "Por Raça/Cor", data: taxaRaca },
            ].map((block) => (
              <div key={block.title}>
                <h4 className="text-[11px] font-light text-text-caption tracking-[0.15em] uppercase mb-4">
                  {block.title}
                </h4>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={block.data}
                    layout="vertical"
                    margin={{ left: 20, right: 48, top: 8, bottom: 8 }}
                  >
                    <CartesianGrid horizontal={false} stroke={BORDER} strokeDasharray="2 4" />
                    <XAxis
                      type="number"
                      stroke={MUTED}
                      tick={{ fontSize: 11 }}
                      domain={[0, 50]}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="grupo"
                      stroke={MUTED}
                      tick={{ fontSize: 11 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                      formatter={(v: number, _n, p) => [
                        `${v}% — ${p.payload.comissao} de ${p.payload.total}`,
                        "Em cargo comissionado",
                      ]}
                    />
                    <Bar dataKey="taxa" fill={GOLD} name="% em comissão" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 space-y-1">
                  {block.data.map((d) => (
                    <div
                      key={d.grupo}
                      className="flex justify-between text-[11px] font-light text-text-body border-b border-luxury-border py-1"
                    >
                      <span>{d.grupo}</span>
                      <span className="text-text-caption">
                        {d.comissao}/{d.total} · <span className="text-gold">{d.taxa}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="lg:col-span-2 mt-6">
              <h4 className="text-[11px] font-light text-text-caption tracking-[0.15em] uppercase mb-2">
                Pirâmide dos cargos comissionados — por referência (CDA)
              </h4>
              <p className="text-[11px] font-light text-text-body leading-relaxed mb-5">
                CDA-1 (base) a CDA-6 (topo). Cada barra mostra a composição interna de cada nível hierárquico.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { title: "Composição por gênero (%)", data: piramideGenero, keys: ["Feminino", "Masculino"] },
                  { title: "Composição por raça/cor (%)", data: piramideRaca, keys: ["Branca", "Negra", "Amarela"] },
                ].map((block, idx) => (
                  <div key={block.title}>
                    <h5 className="text-[10px] font-light text-text-caption tracking-wide uppercase mb-3">
                      {block.title}
                    </h5>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={block.data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                        <CartesianGrid stroke={BORDER} strokeDasharray="2 4" />
                        <XAxis dataKey="ref" stroke={MUTED} tick={{ fontSize: 11 }} />
                        <YAxis stroke={MUTED} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                          formatter={(v: number, n) => [`${v}%`, n]}
                          labelFormatter={(l, p) => `${l} · ${p?.[0]?.payload?.total ?? 0} cargos`}
                        />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        {block.keys.map((k, i) => (
                          <Bar
                            key={k}
                            dataKey={k}
                            stackId="a"
                            fill={idx === 0 ? [GOLD, "hsl(var(--foreground))"][i] : [GOLD, "hsl(var(--foreground))", "hsl(var(--muted-foreground))"][i]}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 mt-4 p-5 border border-luxury-border bg-section-alt">
              <p className="text-[11px] font-light text-text-body leading-relaxed">
                <span className="text-gold">Leitura.</span> Dos 185 APPGGs em exercício, 57 (30,8%) ocupam cargos em comissão. A taxa agregada é semelhante entre homens (28,3%) e mulheres (34,7%), e entre pessoas brancas (28,2%) e negras — pretas e pardas somadas (36,2%). <span className="text-foreground">No entanto, o recorte por referência revela um padrão distinto no topo da pirâmide:</span> o CDA-6, cargo comissionado de maior nível ocupado por APPGGs, é composto <span className="text-foreground">100% por servidores de raça/cor branca</span> (0 negros, 0 amarelos). A proporção de mulheres no CDA-6 (41,7%) é próxima à média da carreira (38,9%), mas a presença de servidores negros — que representam 31,4% da carreira — é nula nos dois níveis mais altos (CDA-5 tem 60% brancos, CDA-6 tem 100%). A equidade observada no agregado não se reproduz quando se olha para os postos de decisão mais elevados.
              </p>
            </div>
          </div>
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
