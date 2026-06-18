import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { ArrowRight, Landmark, Building2, Users, HandshakeIcon, Heart, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";

const agradecimentos = [
  {
    icon: Landmark,
    titulo: "Ao Prefeito de São Paulo",
    desc: "Pela decisão de fortalecer a capacidade técnica da administração municipal e por reconhecer, com a nomeação, o papel estratégico dos Analistas de Planejamento e Políticas Públicas na entrega do Programa de Metas 2025–2028.",
  },
  {
    icon: Building2,
    titulo: "À Secretaria Municipal de Gestão",
    desc: "Pela condução cuidadosa do processo, pelo diálogo permanente com a carreira e pelo empenho em viabilizar a chamada dos aprovados dentro do prazo de validade do concurso.",
  },
  {
    icon: Users,
    titulo: "À Câmara Municipal e às Vereadoras e Vereadores",
    desc: "Pelo apoio institucional à recomposição do quadro de APPGGs e pela compreensão de que uma administração pública moderna depende de servidores concursados, qualificados e em número adequado.",
  },
  {
    icon: HandshakeIcon,
    titulo: "Às demais carreiras e equipes parceiras",
    desc: "Aos servidores das secretarias, subprefeituras e órgãos que receberão os novos colegas. A APOGESP reafirma seu compromisso de colaborar, dentro dos Planos de Atuação Institucional, com as prioridades definidas pela administração superior.",
  },
];

const compromissos = [
  "Integrar-se com humildade às equipes e colaborar com as carreiras técnicas e finalísticas já em exercício.",
  "Atuar dentro das prioridades fixadas pela administração superior e dos Planos de Atuação Institucional (PAI).",
  "Contribuir com rigor analítico, gestão baseada em evidências e foco em resultados para a população paulistana.",
  "Apoiar a continuidade e o monitoramento das 126 metas prioritárias do Programa de Metas 2025–2028.",
];

const CampanhaNomeacaoPage = () => {
  const f = usePageFields("campanha-nomeacao");
  return (
    <PageLayout>
      <SEO title="Reconhecimento Institucional pela Nomea\u00e7\u00e3o | APOGESP" description="A APOGESP registra reconhecimento ao Prefeito, \u00e0 Secretaria Municipal de Gest\u00e3o e \u00e0 C\u00e2mara Municipal pela nomea\u00e7\u00e3o dos 53 APPGGs aprovados." path="/campanha-nomeacao" />
      <PageHero
        label={field(f, "campanha-nomeacao.hero.label", "Reconhecimento Institucional")}
        title={field(f, "campanha-nomeacao.hero.titulo", "Agradecemos à administração pela nomeação dos 53 APPGGs")}
        subtitle={field(f, "campanha-nomeacao.hero.subtitulo", "A recomposição do quadro fortalece a capacidade técnica da Prefeitura. A APOGESP registra seu reconhecimento ao Prefeito, à Secretaria Municipal de Gestão e à Câmara Municipal.")}
      />

      {/* Narrativa */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-3xl">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="campanha-nomeacao.narrativa.texto"
                fallback={"Com a nomeação dos **53 aprovados remanescentes**, encerra-se um ciclo importante para a carreira de Analista de Planejamento e Políticas Públicas e para a administração municipal de São Paulo.\n\nA decisão fortalece a capacidade técnica das secretarias, valoriza o investimento público feito no concurso mais competitivo da história da carreira — **242 candidatos por vaga** — e sinaliza, de forma concreta, o compromisso da administração com uma gestão pública qualificada, baseada em evidências e orientada por resultados.\n\nA APOGESP registra publicamente seu agradecimento ao **Prefeito**, à **Secretaria Municipal de Gestão**, às **Vereadoras e Vereadores** que apoiaram a recomposição do quadro, e a todas as equipes técnicas que viabilizaram o processo. Que os novos colegas sejam bem-recebidos e que possam colaborar, com humildade e competência, com as prioridades da cidade."}
                className="space-y-6 text-base md:text-lg font-light text-text-body leading-relaxed"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Agradecimentos */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label={field(f, "campanha-nomeacao.agradecimentos.label", "Nosso Reconhecimento")}
            title={field(f, "campanha-nomeacao.agradecimentos.titulo", "A quem agradecemos")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-2">
            {agradecimentos.map((item, i) => (
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

      {/* Marco da nomeação */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle
            label={field(f, "campanha-nomeacao.marco.label", "Marco")}
            title={field(f, "campanha-nomeacao.marco.titulo", "Concurso concluído, quadro fortalecido")}
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-luxury-border max-w-4xl mx-auto mt-2">
            {[
              { num: "53", label: "aprovados agora nomeados" },
              { num: "133", label: "APPGGs do concurso em exercício" },
              { num: "242:1", label: "candidatos por vaga no certame" },
              { num: "100%", label: "lista de aprovados convocada" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="bg-card p-8 md:p-10 text-center">
                  <span className="text-2xl md:text-4xl font-display text-gold">{stat.num}</span>
                  <span className="block text-xs font-light text-text-caption mt-2">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Compromissos */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label={field(f, "campanha-nomeacao.compromissos.label", "Nosso Compromisso")}
                title={field(f, "campanha-nomeacao.compromissos.titulo", "O que a carreira devolve à cidade")}
                subtitle={field(f, "campanha-nomeacao.compromissos.subtitulo", "Recebemos a nomeação como reconhecimento e como responsabilidade. A APOGESP reafirma o tom colaborativo da carreira.")}
              />
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0">
                {compromissos.map((item, i) => (
                  <FadeIn key={item} delay={i * 0.08}>
                    <div className="flex items-start gap-5 py-6 border-b border-luxury-border">
                      <CheckCircle2 size={18} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-sm md:text-base font-light text-foreground leading-relaxed">{item}</span>
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
              <Heart size={20} strokeWidth={1.5} className="text-gold mx-auto mb-8" />
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "{field(f, "campanha-nomeacao.cta.frase", "Servir São Paulo é privilégio e responsabilidade. Agradecemos pela confiança e seguiremos colaborando, com técnica e humildade, para uma administração pública à altura da cidade.")}"
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">{field(f, "campanha-nomeacao.cta.assinatura", "Maria Camila Florêncio — Presidente da APOGESP")}</p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>{field(f, "campanha-nomeacao.cta.link", "Fale com a APOGESP")}</span>
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
