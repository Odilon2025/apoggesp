import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Users, Clock, Building2, ShieldCheck } from "lucide-react";

const porQueNomear = [
  {
    icon: Users,
    titulo: "60 Profissionais Prontos",
    desc: "Dos 144 classificados no concurso, 80 já foram nomeados — 50 em julho de 2024 e 30 em janeiro de 2026. Restam cerca de 60 aprovados aguardando. A nomeação não é um favor — é o cumprimento de uma obrigação do Estado.",
  },
  {
    icon: Building2,
    titulo: "22 Órgãos com Demanda Real",
    desc: "Os APPGGs em exercício estão distribuídos em 22 órgãos e entidades. A demanda por analistas de gestão não diminuiu — cresceu. Cada secretaria que perde um APPGG sente o impacto imediatamente.",
  },
  {
    icon: Clock,
    titulo: "Prazo que se Esgota",
    desc: "A validade do concurso tem prazo. Cada mês sem nomeação é um mês a menos de possibilidade. Deixar expirar a lista significaria desperdiçar todo o investimento público no processo seletivo.",
  },
  {
    icon: ShieldCheck,
    titulo: "Capacidade Institucional",
    desc: "O Programa de Metas 2025–2028 demanda coordenação intersetorial, monitoramento de indicadores e entregas mensuráveis. São exatamente essas as competências que os novos APPGGs trarão.",
  },
];

const timelineConcurso = [
  { etapa: "Publicação do edital", status: "Concluído" },
  { etapa: "Provas objetivas e discursivas", status: "Concluído" },
  { etapa: "Avaliação de títulos", status: "Concluído" },
  { etapa: "Homologação do resultado final", status: "Concluído" },
  { etapa: "Nomeação dos 41 aprovados", status: "Pendente" },
  { etapa: "Posse e exercício", status: "Pendente" },
];

const CampanhaNomeacaoPage = () => {
  return (
    <PageLayout>
      <PageHero
        label="Nomeação Já"
        title="41 Analistas Aprovados. Zero Nomeações."
        subtitle="Um concurso público legítimo, candidatos aprovados dentro das vagas e uma cidade que precisa deles. Falta apenas a caneta."
      />

      {/* Narrativa */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed mb-6">
                Em 2015, a Lei Municipal nº 16.193 criou a carreira de Analista de Políticas Públicas e Gestão Governamental como uma aposta na profissionalização da gestão de São Paulo. Dez anos depois, essa aposta se provou acertada: APPGGs lideram o SMAE, coordenam o Programa de Metas e constroem pontes entre secretarias que nunca conversaram.
              </p>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed mb-6">
                Mas a máquina precisa de mais braços. O último concurso aprovou <strong className="text-foreground">41 novos analistas</strong> — profissionais que passaram por um dos processos seletivos mais rigorosos do serviço público municipal. Eles estão prontos. A cidade precisa deles. O que falta é a nomeação.
              </p>
              <p className="text-base md:text-lg font-light text-text-body leading-relaxed">
                Não nomear não é apenas uma decisão administrativa. É aceitar que projetos estratégicos operem com equipes subdimensionadas, que o conhecimento institucional se concentre em poucos e que a gestão pública municipal perca competitividade frente ao governo federal e ao setor privado.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Por que nomear */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle label="Argumentos" title="Por Que Nomear Agora" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-2">
            {porQueNomear.map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <div className="bg-card p-10 h-full">
                  <item.icon size={20} strokeWidth={1.5} className="text-gold mb-4" />
                  <h3 className="text-base font-display font-normal text-foreground mb-3">{item.titulo}</h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Em Números" title="O Impacto da Nomeação" center />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-luxury-border max-w-3xl mx-auto mt-2">
            {[
              { num: "41", label: "aprovados aguardando nomeação" },
              { num: "24%", label: "de ampliação do quadro atual" },
              { num: "210", label: "analistas após a nomeação" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="bg-card p-10 text-center">
                  <span className="text-3xl md:text-4xl font-display text-gold">{stat.num}</span>
                  <span className="block text-xs font-light text-text-caption mt-2">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline do concurso */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label="Processo"
                title="Etapas do Concurso"
                subtitle="Todas as fases foram cumpridas. Resta apenas o ato administrativo da nomeação."
              />
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0">
                {timelineConcurso.map((item, i) => (
                  <FadeIn key={item.etapa} delay={i * 0.08}>
                    <div className="flex items-center gap-6 py-5 border-b border-luxury-border">
                      <span className={`text-[10px] font-medium tracking-luxury uppercase px-3 py-1 rounded-sm ${
                        item.status === "Concluído"
                          ? "bg-gold/10 text-gold"
                          : "bg-destructive/10 text-destructive"
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-sm font-light text-foreground">{item.etapa}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citação CTA */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "Cada APPGG não nomeado é uma política pública que será coordenada com menos rigor, monitorada com menos precisão e avaliada com menos profundidade."
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">APOGESP — Campanha pela Nomeação</p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>Apoie a nomeação</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CampanhaNomeacaoPage;
