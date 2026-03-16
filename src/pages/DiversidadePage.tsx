import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, Building2, Award } from "lucide-react";

const indicadores = [
  { numero: "67", label: "Mulheres na carreira", detalhe: "39,6% do total", icon: Users },
  { numero: "58", label: "Negros e afrodescendentes", detalhe: "34,3% do total", icon: Users },
  { numero: "11", label: "Pessoas com deficiência", detalhe: "6,5% do total", icon: Users },
  { numero: "57", label: "Em cargos de liderança", detalhe: "33,7% do efetivo", icon: Award },
];

const geracoes = [
  { periodo: "2016–2017", total: 52, negros: 27, mulheres: 44, label: "Geração pioneira" },
  { periodo: "2021–2022", total: 74, negros: 36, mulheres: 42, label: "Expansão e diversificação" },
  { periodo: "2024", total: 43, negros: 40, mulheres: 30, label: "Avanço na representatividade racial" },
];

const secretarias = [
  { sigla: "SEGES", total: 53, mulheres: 41, negros: 32 },
  { sigla: "SEPLAN", total: 18, mulheres: 33, negros: 28 },
  { sigla: "SME", total: 12, mulheres: 50, negros: 25 },
  { sigla: "SGM", total: 10, mulheres: 50, negros: 30 },
  { sigla: "SVMA", total: 9, mulheres: 22, negros: 55 },
];

const ProgressBar = ({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
};

const DiversidadePage = () => (
  <PageLayout>
    <PageHero
      label="Diversidade"
      title="Uma carreira que se abre ao Brasil real"
      subtitle="A trajetória dos APPGGs reflete um compromisso crescente com a representatividade. Mesmo diante das barreiras estruturais da sociedade brasileira, a diversidade avança — concurso após concurso, geração após geração."
    />

    {/* Indicadores Gerais */}
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionTitle
          label="Panorama"
          title="Quem são os APPGGs"
          subtitle="169 gestores públicos municipais. Um mosaico cada vez mais diverso de trajetórias, origens e perspectivas a serviço de São Paulo."
          center
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {indicadores.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <div className="text-center p-6 md:p-8 border border-luxury-border rounded-sm bg-card hover:bg-card-hover transition-colors duration-300">
                <item.icon size={20} strokeWidth={1.2} className="mx-auto mb-4 text-gold" />
                <span className="block text-3xl md:text-4xl font-display text-text-display mb-1">
                  {item.numero}
                </span>
                <span className="block text-sm font-light text-text-body mb-1">
                  {item.label}
                </span>
                <span className="block text-xs text-text-caption font-light">
                  {item.detalhe}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Liderança */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container">
        <SectionTitle
          label="Liderança"
          title="Diversidade onde as decisões acontecem"
          subtitle="A presença de mulheres e pessoas negras em cargos de liderança é um indicador crucial. Os números mostram avanço — e também onde ainda é preciso avançar."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          <FadeIn delay={0.05}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Mulheres em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">36,8%</span>
                <span className="text-sm text-text-caption font-light">21 de 57</span>
              </div>
              <ProgressBar value={36.8} color="bg-gold" delay={0.3} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                Participação próxima à proporção na carreira (39,6%), sinalizando equidade crescente no acesso a posições decisórias.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Negros em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">29,8%</span>
                <span className="text-sm text-text-caption font-light">17 de 57</span>
              </div>
              <ProgressBar value={29.8} color="bg-accent" delay={0.4} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                A representatividade negra nas lideranças acompanha a tendência de crescimento observada nas últimas gerações da carreira.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Evolução por Geração */}
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionTitle
          label="Evolução"
          title="Cada concurso, um passo adiante"
          subtitle="A diversidade racial cresce de forma consistente a cada nova geração de APPGGs — um sinal de que as políticas de inclusão nos concursos públicos produzem resultados concretos."
        />
        <div className="space-y-6 max-w-3xl">
          {geracoes.map((g, i) => (
            <FadeIn key={g.periodo} delay={i * 0.1}>
              <div className="p-6 md:p-8 border border-luxury-border rounded-sm bg-card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-medium tracking-luxury uppercase text-gold block mb-1">
                      Coorte {g.periodo}
                    </span>
                    <span className="text-lg font-display text-text-display">
                      {g.label}
                    </span>
                    <span className="block text-xs text-text-caption font-light mt-1">
                      {g.total} servidores
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} strokeWidth={1.5} className="text-gold" />
                    <span className="text-sm font-light text-text-body">
                      {g.negros}% negros
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-text-caption font-light">Negros e afrodescendentes</span>
                      <span className="text-xs text-text-body font-medium">{g.negros}%</span>
                    </div>
                    <ProgressBar value={g.negros} color="bg-accent" delay={0.2 + i * 0.1} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-text-caption font-light">Mulheres</span>
                      <span className="text-xs text-text-body font-medium">{g.mulheres}%</span>
                    </div>
                    <ProgressBar value={g.mulheres} color="bg-gold" delay={0.3 + i * 0.1} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-3xl p-6 border-l-2 border-gold bg-card rounded-sm">
            <p className="text-sm text-text-body font-light leading-relaxed italic">
              "De 27% de pessoas negras na primeira geração para 40% na mais recente — a carreira de APPGG demonstra que é possível construir um serviço público mais representativo, mesmo dentro das limitações estruturais que o Brasil ainda enfrenta."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Diversidade Institucional */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container">
        <SectionTitle
          label="Presença Institucional"
          title="Diversidade que se espalha pela cidade"
          subtitle="Presentes em mais de 22 órgãos municipais, os APPGGs levam perspectivas diversas a diferentes áreas da gestão pública paulistana."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {secretarias.map((s, i) => (
            <FadeIn key={s.sigla} delay={i * 0.06}>
              <div className="p-6 border border-luxury-border rounded-sm bg-card hover:bg-card-hover transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={14} strokeWidth={1.2} className="text-gold" />
                  <span className="text-sm font-medium text-text-display tracking-wide">
                    {s.sigla}
                  </span>
                </div>
                <span className="text-xs text-text-caption block mb-3">{s.total} APPGGs</span>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[11px] text-text-caption font-light">Mulheres</span>
                      <span className="text-[11px] text-text-body">{s.mulheres}%</span>
                    </div>
                    <ProgressBar value={s.mulheres} color="bg-gold" delay={0.1 + i * 0.05} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[11px] text-text-caption font-light">Negros</span>
                      <span className="text-[11px] text-text-body">{s.negros}%</span>
                    </div>
                    <ProgressBar value={s.negros} color="bg-accent" delay={0.15 + i * 0.05} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Fechamento */}
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption block mb-6">
              Compromisso
            </span>
            <h2 className="text-2xl md:text-3xl font-display text-text-display leading-tight text-balance mb-6">
              A diversidade não é um destino — é uma construção diária
            </h2>
            <p className="text-sm text-text-body font-light leading-relaxed mb-4">
              Os dados mostram que a carreira de APPGG caminha na direção certa. Cada concurso traz novas vozes, cada geração amplia o repertório de experiências. Mas os números também revelam onde é preciso ir além: na equidade de gênero em posições de liderança, na representatividade em determinados órgãos, na inclusão de pessoas com deficiência.
            </p>
            <p className="text-sm text-text-body font-light leading-relaxed">
              A APOGESP acompanha essa evolução com dados, transparência e o compromisso de que a gestão pública de São Paulo reflita, cada vez mais, a cidade que serve.
            </p>
            <div className="mt-8 luxury-divider" />
          </FadeIn>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default DiversidadePage;
