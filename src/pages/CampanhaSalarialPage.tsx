import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, TrendingDown, Scale, AlertTriangle, Users } from "lucide-react";

const tabelaComparativa = [
  { ref: "1", appgg: "13.208,14", eppgg: "20.000,00", niteroi: "18.230,97" },
  { ref: "2", appgg: "14.528,96", eppgg: "20.565,95", niteroi: "19.377,87" },
  { ref: "3", appgg: "14.892,18", eppgg: "21.147,92", niteroi: "20.524,74" },
  { ref: "4", appgg: "15.264,48", eppgg: "21.746,35", niteroi: "21.671,64" },
  { ref: "5", appgg: "15.646,09", eppgg: "22.361,72", niteroi: "22.818,56" },
  { ref: "6", appgg: "16.037,24", eppgg: "23.645,19", niteroi: "23.965,43" },
  { ref: "7", appgg: "17.961,73", eppgg: "24.314,29", niteroi: "25.112,33" },
  { ref: "8", appgg: "18.410,77", eppgg: "25.002,32", niteroi: "26.259,23" },
  { ref: "9", appgg: "18.871,04", eppgg: "25.709,82", niteroi: "27.472,41" },
  { ref: "10", appgg: "19.342,80", eppgg: "26.437,35", niteroi: "28.553,01" },
  { ref: "11", appgg: "19.826,39", eppgg: "27.759,21", niteroi: "—" },
  { ref: "12", appgg: "21.869,74", eppgg: "28.544,73", niteroi: "—" },
  { ref: "13", appgg: "22.416,47", eppgg: "29.352,48", niteroi: "—" },
  { ref: "14", appgg: "22.976,89", eppgg: "30.183,08", niteroi: "—" },
  { ref: "15", appgg: "23.551,31", eppgg: "31.037,19", niteroi: "—" },
  { ref: "16", appgg: "—", eppgg: "32.818,59", niteroi: "—" },
  { ref: "17", appgg: "—", eppgg: "33.747,27", niteroi: "—" },
  { ref: "18", appgg: "—", eppgg: "34.702,24", niteroi: "—" },
  { ref: "19", appgg: "—", eppgg: "35.684,22", niteroi: "—" },
  { ref: "20", appgg: "—", eppgg: "36.694,00", niteroi: "—" },
];

const argumentos = [
  {
    icon: TrendingDown,
    titulo: "Defasagem Frente ao Governo Federal",
    desc: "O APPGG paulistano inicia a carreira com R$ 13.208 — 34% abaixo do piso do EPPGG federal em 2026 (R$ 20.000). No topo, a diferença chega a R$ 13.143, uma distância de 56%.",
  },
  {
    icon: Users,
    titulo: "Defasagem Dentro do Próprio Quadro",
    desc: "Em Niterói, o AMCI — cargo do mesmo Quadro de Políticas Públicas e Gestão Governamental — pode alcançar R$ 28.553 no topo com gratificação. O APPGG de São Paulo, maior cidade do país, fica R$ 5.000 abaixo.",
  },
  {
    icon: Scale,
    titulo: "Mesma Missão, Remuneração Desigual",
    desc: "APPGGs, EPPGGs e AMCIs exercem funções análogas: formulação, implementação e avaliação de políticas públicas. A diferença não está na complexidade do trabalho, mas no ente que remunera.",
  },
  {
    icon: AlertTriangle,
    titulo: "Risco de Evasão",
    desc: "Sem recomposição, a carreira perde competitividade frente ao governo federal, a outros municípios e ao setor privado. Cada analista que sai leva consigo anos de conhecimento institucional irrecuperável.",
  },
];

const CampanhaSalarialPage = () => {
  return (
    <PageLayout>
      <PageHero
        label="Campanha 2026"
        title="Remuneração Justa para Quem Constrói a Cidade"
        subtitle="Uma carreira estratégica não sobrevive com remuneração defasada. Conheça os números, compare com o governo federal e com outros municípios — e entenda por que a recomposição salarial dos APPGGs é urgente."
      />

      {/* Contexto narrativo */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <SectionTitle
                label="O Problema"
                title="Uma Década Sem Equiparação"
                subtitle="Em 2015, a carreira de APPGG foi criada como espelho municipal do EPPGG federal. Dez anos depois, a remuneração não acompanhou — nem o governo federal, nem municípios como Niterói."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {argumentos.map((arg, i) => (
                  <FadeIn key={arg.titulo} delay={i * 0.1}>
                    <div className="p-8 bg-section-alt border-b border-luxury-border">
                      <div className="flex items-start gap-4">
                        <arg.icon size={20} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-base font-display font-normal text-foreground mb-2">{arg.titulo}</h3>
                          <p className="text-sm font-light text-text-body leading-relaxed">{arg.desc}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela APPGG */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label="Tabela Municipal"
            title="Remuneração do APPGG — São Paulo"
            subtitle="Valores vigentes conforme Lei nº 18.235/2025. Jornada de 40 horas semanais."
          />
          <FadeIn>
            <div className="overflow-x-auto mt-2">
              <table className="w-full max-w-2xl">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="text-left text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Referência</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Remuneração (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaAPPGG.map((row, i) => (
                    <tr key={row.ref} className={`border-b border-luxury-border ${i === 0 || i === tabelaAPPGG.length - 1 ? "bg-gold/5" : ""}`}>
                      <td className="py-3 text-sm font-light text-foreground">{row.ref}</td>
                      <td className="py-3 text-sm font-light text-text-body text-right">{row.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tabela EPPGG - apenas 2026 */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle
            label="Tabela Federal"
            title="Remuneração do EPPGG — Governo Federal (2026)"
            subtitle="Valores a partir de abril de 2026, conforme Medida Provisória nº 1.286/2024."
          />
          <FadeIn>
            <div className="overflow-x-auto mt-2">
              <table className="w-full max-w-2xl">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="text-left text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Classe/Padrão</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Subsídio 2026 (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaEPPGG.map((row) => (
                    <tr key={row.classe} className={`border-b border-luxury-border ${row.classe.startsWith("S") ? "bg-gold/5" : ""}`}>
                      <td className="py-3 text-sm font-light text-foreground">{row.classe}</td>
                      <td className="py-3 text-sm font-light text-foreground text-right">{row.v2026}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tabela Niterói AMCI/APPGG */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label="Niterói — AMCI / APPGG"
            title="Quadro de Políticas Públicas e Gestão Governamental"
            subtitle="Subsídio + gratificação de desempenho de até 50%. Os valores máximos mostram o teto alcançável na carreira-irmã do APPGG paulistano."
          />
          <FadeIn>
            <div className="overflow-x-auto mt-2">
              <table className="w-full max-w-3xl">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="text-left text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Nível</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Vencimento Base (R$)</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3">Base + 50% (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaNiteroi.map((row, i) => (
                    <tr key={row.nivel} className={`border-b border-luxury-border ${i === tabelaNiteroi.length - 1 ? "bg-gold/5" : ""}`}>
                      <td className="py-3 text-sm font-light text-foreground">{row.nivel}</td>
                      <td className="py-3 text-sm font-light text-text-body text-right">{row.vencimento}</td>
                      <td className="py-3 text-sm font-light text-foreground text-right font-normal">{row.maximo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xs font-light text-text-caption mt-6 max-w-3xl">
              Fonte: Diário Oficial de Niterói, 28/11/2025. A gratificação de desempenho varia de 25% a 50% sobre o vencimento básico.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparativo direto — agora com 3 colunas */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle
            label="Comparativo"
            title="O Mesmo Trabalho, Três Realidades"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxury-border max-w-4xl mx-auto mt-2">
            <FadeIn>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">APPGG · SP — Início</span>
                <span className="text-3xl md:text-4xl font-display text-foreground">R$ 13.208</span>
                <span className="block text-xs font-light text-text-caption mt-2">Municipal — São Paulo</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">AMCI · Niterói — Início</span>
                <span className="text-3xl md:text-4xl font-display text-gold-muted">R$ 18.231</span>
                <span className="block text-xs font-light text-text-caption mt-2">Municipal — Niterói (c/ 50%)</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">EPPGG · Federal — Início</span>
                <span className="text-3xl md:text-4xl font-display text-gold">R$ 20.000</span>
                <span className="block text-xs font-light text-text-caption mt-2">Federal — 2026</span>
              </div>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxury-border max-w-4xl mx-auto">
            <FadeIn delay={0.25}>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">APPGG · SP — Topo</span>
                <span className="text-3xl md:text-4xl font-display text-foreground">R$ 23.551</span>
                <span className="block text-xs font-light text-text-caption mt-2">Municipal — São Paulo</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">AMCI · Niterói — Topo</span>
                <span className="text-3xl md:text-4xl font-display text-gold-muted">R$ 28.553</span>
                <span className="block text-xs font-light text-text-caption mt-2">Municipal — Niterói (c/ 50%)</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <div className="bg-section-alt p-10 text-center h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">EPPGG · Federal — Topo</span>
                <span className="text-3xl md:text-4xl font-display text-gold">R$ 36.694</span>
                <span className="block text-xs font-light text-text-caption mt-2">Federal — 2026</span>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-center text-sm font-light text-text-body mt-10 max-w-2xl mx-auto leading-relaxed">
              O APPGG de São Paulo — maior metrópole da América Latina — recebe <strong className="text-foreground">27% menos</strong> que o cargo equivalente em Niterói e <strong className="text-foreground">34% menos</strong> que o EPPGG federal no início da carreira. 
              No topo, a defasagem frente ao governo federal chega a <strong className="text-foreground">56%</strong>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "Não se trata de privilégio. Trata-se de reter os profissionais que a cidade precisa para funcionar."
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">APOGESP — Campanha Salarial 2026</p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>Apoie a campanha</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CampanhaSalarialPage;
