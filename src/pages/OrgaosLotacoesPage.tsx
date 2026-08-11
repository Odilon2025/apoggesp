import { useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import SEO from "@/components/SEO";
import { orgaosData, type Orgao } from "@/data/orgaos";

const { orgaos, total, totalOrgaos, mesReferencia } = orgaosData;
const maior = orgaos[0]?.total ?? 1;
const totalComissao = orgaos.reduce((s, o) => s + o.comissao, 0);
const totalMulheres = orgaos.reduce((s, o) => s + o.mulheres, 0);

const fmt = (n: number) => n.toString().replace(".", ",");

/* ------------------------------------------------------------------ *
 * Constelação de lotações — cada órgão é um corpo em órbita.
 * O raio da órbita é inversamente proporcional ao contingente.
 * ------------------------------------------------------------------ */
const SIZE = 640;
const CX = SIZE / 2;
const CY = SIZE / 2;

type Nodo = Orgao & { x: number; y: number; r: number; ang: number; dist: number };

const nodos: Nodo[] = orgaos.map((o, i) => {
  const t = Math.sqrt(o.total / maior);
  const dist = 118 + (1 - t) * 172;
  // ângulo dourado para distribuição orgânica, não geométrica
  const ang = i * 2.399963 + 0.6;
  return {
    ...o,
    ang,
    dist,
    r: 4 + Math.sqrt(o.total) * 3.1,
    x: CX + Math.cos(ang) * dist,
    y: CY + Math.sin(ang) * dist,
  };
});

const Constelacao = ({
  ativo,
  onSelect,
}: {
  ativo: string;
  onSelect: (sigla: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative w-full">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto overflow-visible">
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.14" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={220} fill="url(#halo)" />

        {[100, 160, 220, 280].map((r) => (
          <motion.circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="hsl(var(--luxury-border))"
            strokeWidth={0.6}
            strokeDasharray="1 6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: r / 900, ease: "easeOut" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        ))}

        {nodos.map((n, i) => {
          const on = ativo === n.sigla;
          return (
            <motion.line
              key={`l-${n.sigla}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke={on ? "hsl(var(--gold))" : "hsl(var(--luxury-border))"}
              strokeWidth={on ? 1 : 0.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: on ? 0.9 : 0.5 } : {}}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.025, ease: "easeOut" }}
            />
          );
        })}

        {nodos.map((n, i) => {
          const on = ativo === n.sigla;
          return (
            <motion.g
              key={n.sigla}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.03, ease: "easeOut" }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
              onClick={() => onSelect(n.sigla)}
            >
              <circle cx={n.x} cy={n.y} r={n.r + 12} fill="transparent" />
              {on && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 8}
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth={0.7}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                className="transition-all duration-500"
                fill={on ? "hsl(var(--gold))" : "hsl(var(--primary))"}
                fillOpacity={on ? 0.95 : 0.72}
              />
              <text
                x={n.x}
                y={n.y + n.r + 13}
                textAnchor="middle"
                className="font-sans"
                fontSize={n.total >= 6 ? 9.5 : 8.5}
                letterSpacing="0.08em"
                fill={on ? "hsl(var(--foreground))" : "hsl(var(--text-caption))"}
              >
                {n.sigla}
              </text>
            </motion.g>
          );
        })}

        <text
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          className="font-display"
          fontSize="30"
          fill="hsl(var(--foreground))"
        >
          {total}
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          className="font-sans"
          fontSize="8"
          letterSpacing="0.2em"
          fill="hsl(var(--text-caption))"
        >
          APPGGs
        </text>
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const Medida = ({ label, valor, pct }: { label: string; valor: string; pct: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">{label}</span>
        <span className="font-display text-lg text-foreground">{valor}</span>
      </div>
      <div className="h-px w-full bg-luxury-border relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(pct, 100)}%` } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 h-px bg-gold"
        />
      </div>
    </div>
  );
};

const PainelOrgao = ({ o }: { o: Orgao }) => {
  const maxRef = Math.max(...o.refs.map((r) => r.n), 1);
  return (
    <motion.div
      key={o.sigla}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border border-luxury-border bg-card p-8 md:p-10"
    >
      <span className="text-[10px] font-sans tracking-luxury uppercase text-gold">Lotação selecionada</span>
      <h3 className="mt-4 font-display text-3xl text-foreground">{o.sigla}</h3>
      <p className="mt-2 text-sm text-text-body font-light leading-relaxed capitalize">
        {o.nome.toLowerCase()}
      </p>

      <div className="mt-8 flex items-baseline gap-3">
        <span className="font-display text-5xl text-foreground">{o.total}</span>
        <span className="text-xs text-text-caption font-light">
          {o.total === 1 ? "APPGG lotado" : "APPGGs lotados"} · {fmt(Number(((o.total * 100) / total).toFixed(1)))}% da carreira
        </span>
      </div>

      <div className="mt-8 space-y-5">
        <Medida label="Mulheres" valor={`${o.mulheres} · ${fmt(o.mulheresPct)}%`} pct={o.mulheresPct} />
        <Medida label="Negros e pardos" valor={`${o.negros} · ${fmt(o.negrosPct)}%`} pct={o.negrosPct} />
        <Medida label="Em cargo de comissão" valor={`${o.comissao} · ${fmt(o.comissaoPct)}%`} pct={o.comissaoPct} />
      </div>

      <div className="mt-10">
        <span className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">
          Distribuição por referência
        </span>
        <div className="mt-4 flex items-end gap-2">
          {o.refs.map((r) => (
            <div key={r.ref} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] font-display text-foreground">{r.n}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: Math.max(2, (r.n / maxRef) * 80) }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full bg-gold/25 border-t border-gold"
              />
              <span className="text-[9px] text-text-caption font-sans">{r.ref.replace("APPGG", "")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-6 border-t border-luxury-border pt-6">
        <div>
          <div className="font-display text-xl text-foreground">{o.pcd}</div>
          <div className="text-[10px] tracking-luxury uppercase text-text-caption mt-1">PcD</div>
        </div>
        <div>
          <div className="font-display text-xl text-foreground">{o.idadeMedia ?? "—"}</div>
          <div className="text-[10px] tracking-luxury uppercase text-text-caption mt-1">Idade média</div>
        </div>
        <div>
          <div className="font-display text-xl text-foreground">{o.ingressoMin ?? "—"}</div>
          <div className="text-[10px] tracking-luxury uppercase text-text-caption mt-1">1º ingresso</div>
        </div>
      </div>
    </motion.div>
  );
};

const LinhaOrgao = ({
  o,
  ativo,
  onSelect,
  index,
}: {
  o: Orgao;
  ativo: boolean;
  onSelect: () => void;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={`w-full text-left py-3 border-b border-luxury-border/70 group transition-colors ${
        ativo ? "bg-secondary/60" : "hover:bg-secondary/40"
      }`}
    >
      <div className="flex items-baseline gap-4 px-3">
        <span className="text-[10px] text-text-caption font-sans w-5 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`font-sans text-sm tracking-wide w-28 shrink-0 ${
            ativo ? "text-foreground" : "text-text-body group-hover:text-foreground"
          }`}
        >
          {o.sigla}
        </span>
        <div className="flex-1 h-px bg-luxury-border relative">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${(o.total / maior) * 100}%` } : {}}
            transition={{ duration: 1, delay: index * 0.03, ease: "easeOut" }}
            className={`absolute inset-y-0 left-0 h-px ${ativo ? "bg-gold" : "bg-primary/40"}`}
          />
        </div>
        <span className="font-display text-base text-foreground w-8 text-right tabular-nums">{o.total}</span>
      </div>
    </button>
  );
};

const OrgaosLotacoesPage = () => {
  const [sel, setSel] = useState(orgaos[0]?.sigla ?? "");
  const atual = useMemo(() => orgaos.find((o) => o.sigla === sel) ?? orgaos[0], [sel]);

  const concentracao = Math.round(
    ((orgaos.slice(0, 3).reduce((s, o) => s + o.total, 0)) * 100) / total,
  );

  return (
    <PageLayout>
      <SEO
        title="Órgãos e lotações da carreira APPGG | APOGESP"
        description={`Onde estão os ${total} APPGGs da Prefeitura de São Paulo: distribuição por secretaria, liderança e composição, com dados de ${mesReferencia}.`}
        path="/orgaos-lotacoes"
      />

      <PageHero
        label="Conhecimento"
        title="Órgãos e lotações"
        subtitle={`Um retrato da presença da carreira na administração municipal: ${total} APPGGs distribuídos entre ${totalOrgaos} órgãos, em ${mesReferencia}.`}
      />

      {/* Indicadores */}
      <section className="py-16 md:py-20 border-b border-luxury-border bg-background">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { n: String(total), l: "APPGGs ativos", d: `Folha de ${mesReferencia}` },
            { n: String(totalOrgaos), l: "Órgãos com lotação", d: "Secretarias e equivalentes" },
            { n: `${concentracao}%`, l: "Nos três maiores", d: "Concentração institucional" },
            { n: String(totalComissao), l: "Em cargo de comissão", d: `${Math.round((totalComissao * 100) / total)}% do efetivo` },
          ].map((k, i) => (
            <motion.div
              key={k.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-4xl md:text-5xl text-foreground">{k.n}</div>
              <div className="luxury-divider-left my-4" />
              <div className="text-xs font-sans tracking-wide text-text-body">{k.l}</div>
              <div className="text-[11px] text-text-caption font-light mt-1">{k.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Constelação + painel */}
      <section className="py-20 md:py-28 bg-section-alt grain">
        <div className="container">
          <SectionTitle
            label="Cartografia"
            title="A constelação das lotações"
            subtitle="Cada corpo é um órgão. Quanto maior o contingente, mais próximo do centro e maior o círculo. Toque em um órgão para ver sua composição."
          />
          <div className="mt-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
            <Constelacao ativo={sel} onSelect={setSel} />
            {atual && <PainelOrgao o={atual} />}
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <SectionTitle
            label="Distribuição"
            title="Todos os órgãos, por contingente"
            subtitle="A carreira é transversal, mas não uniforme: a presença se adensa nos órgãos centrais de gestão e planejamento e se rarefaz nas pontas setoriais."
          />
          <div className="mt-12 grid md:grid-cols-2 gap-x-14">
            {orgaos.map((o, i) => (
              <LinhaOrgao
                key={o.sigla}
                o={o}
                index={i}
                ativo={sel === o.sigla}
                onSelect={() => setSel(o.sigla)}
              />
            ))}
          </div>
          <p className="mt-10 text-[11px] text-text-caption font-light">
            Fonte: folha de pagamento da Prefeitura de São Paulo, {mesReferencia}. Considera apenas
            servidores ativos do quadro QPGG. {totalMulheres} mulheres no conjunto da carreira.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default OrgaosLotacoesPage;
