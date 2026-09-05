import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Shield,
  Eye,
  FileSearch,
  Scale,
  ArrowRight,
  TrendingUp,
  Building2,
  Landmark,
} from "lucide-react";

interface Pilar {
  icon: React.ElementType;
  titulo: string;
  descricao: string;
}

interface Caso {
  orgao: string;
  titulo: string;
  resumo: string;
  destaque?: string;
}

const pilares: Pilar[] = [
  {
    icon: Shield,
    titulo: "Prevenção e integridade",
    descricao:
      "APPGGs colaboram na estruturação de programas de integridade, mapeamento de riscos e rotinas que reduzem vulnerabilidades antes que se tornem prejuízos.",
  },
  {
    icon: Eye,
    titulo: "Transparência ativa",
    descricao:
      "Dados abertos, painéis de monitoramento e ferramentas de consulta pública são desenvolvidos para tornar a gestão auditável e inteligível para a sociedade.",
  },
  {
    icon: FileSearch,
    titulo: "Controle e auditoria",
    descricao:
      "Participação na padronização de processos, fluxos de fiscalização e instrumentos que fortalecem o controle interno e externo da administração.",
  },
  {
    icon: Scale,
    titulo: "Recuperação de recursos",
    descricao:
      "Ações orientadas por dados para reduzir inadimplência, evitar desperdício e proteger o erário, sem criar burocracia desnecessária.",
  },
];

const casos: Caso[] = [
  {
    orgao: "Controladoria Geral do Município",
    titulo: "Programa de Integridade e Boas Práticas",
    resumo:
      "APPGGs colaboraram com a CGM na consolidação do PIBP nos órgãos da Prefeitura, fortalecendo mecanismos preventivos de integridade, proteção de dados pessoais e governança em privacidade.",
    destaque: "Cultura de integridade institucional",
  },
  {
    orgao: "Prefeitura de São Paulo · Compras",
    titulo: "Implantação do Contratos.gov.br",
    resumo:
      "Em cooperação técnica com o Ministério de Gestão, APPGGs contribuíram para adaptar e implementar o Contratos.gov.br na Prefeitura, integrando-o aos sistemas federais e à rotina de mais de 60 órgãos e entidades.",
    destaque: "+11 mil contratações registradas",
  },
  {
    orgao: "Secretaria da Fazenda",
    titulo: "CADIN IPTU — Recuperação de inadimplentes",
    resumo:
      "APPGGs colaboraram com o Lab11 no redesenho do comunicado de cobrança do CADIN, testando seis versões de cartas em experimento randomizado com mais de 15 mil contribuintes.",
    destaque: "+ R$ 60 milhões em arrecadação",
  },
  {
    orgao: "Secretaria Municipal de Educação",
    titulo: "Prato Aberto — Transparência na alimentação escolar",
    resumo:
      "APPGGs contribuíram com a criação de site responsivo para consulta a cardápios e do primeiro chatbot da Prefeitura, tornando auditáveis 2,2 milhões de refeições diárias servidas a 995 mil estudantes.",
    destaque: "Prêmio Internacional Gobernarte (BID)",
  },
  {
    orgao: "SEPLAN · FGV",
    titulo: "SMAE — Monitoramento do Programa de Metas e obras",
    resumo:
      "APPGGs contribuíram com o desenvolvimento do SMAE, sistema que consolidou o acompanhamento do Programa de Metas e de mais de mil obras, reduzindo etapas manuais e gerando rastreabilidade para a gestão e o controle.",
    destaque: "500+ usuários ativos",
  },
];

const marcoLegal = [
  {
    titulo: "Lei nº 12.846/2013",
    desc: "Lei Anticorrupção: responsabilização objetiva de pessoas jurídicas por atos contra a administração pública.",
  },
  {
    titulo: "Lei nº 13.709/2018",
    desc: "LGPD: proteção de dados pessoais como instrumento de governança e confiança institucional.",
  },
  {
    titulo: "Lei nº 14.133/2021",
    desc: "Nova Lei de Licitações e Contratos: transparência, controle social e rastreabilidade nas contratações públicas.",
  },
  {
    titulo: "Lei de Acesso à Informação",
    desc: "Garantia de publicidade como regra e controle social como ferramenta de gestão.",
  },
];

const IntegridadePage = () => {
  const f = usePageFields("integridade");

  return (
    <PageLayout>
      <SEO
        title="Integridade e Combate à Corrupção | APOGESP"
        description="Como os Analistas de Políticas Públicas e Gestão Governamental colaboram com órgãos de controle e secretarias para prevenir perdas, fortalecer transparência e aprimorar a gestão de riscos na Prefeitura de São Paulo."
        path="/integridade"
      />

      <PageHero
        label={field(f, "integridade.hero.label", "Integridade")}
        title={field(
          f,
          "integridade.hero.titulo",
          "Combate à Corrupção e Gestão de Riscos"
        )}
        subtitle={field(
          f,
          "integridade.hero.subtitulo",
          "APPGGs colaboram com órgãos de controle, secretarias e equipes técnicas para fortalecer mecanismos de prevenção, transparência e fiscalização na administração municipal."
        )}
      />

      {/* Introdução */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption block mb-4">
                  {field(f, "integridade.intro.eyebrow", "Visão técnica")}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance">
                  {field(
                    f,
                    "integridade.intro.titulo",
                    "Corrupção é, antes de tudo, um problema de gestão"
                  )}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm md:text-base font-light text-text-body leading-relaxed">
                  {field(
                    f,
                    "integridade.intro.p1",
                    "Na experiência dos APPGGs, o combate à corrupção não se resume a punição: exige previsão de riscos, clareza de processos, dados confiáveis e canais de escuta. Quando a gestão pública sabe onde estão suas vulnerabilidades, ela gasta menos com retrabalho, perde menos com inadimplência e preserva a confiança do cidadão no Estado."
                  )}
                </p>
                <p className="mt-6 text-sm md:text-base font-light text-text-body leading-relaxed">
                  {field(
                    f,
                    "integridade.intro.p2",
                    "A carreira atua como suporte técnico a órgãos como a Controladoria Geral do Município, às secretarias e a equipes de compras, planejamento e finanças — sempre dentro das prioridades fixadas pela administração superior e em parceria com outras carreiras."
                  )}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 md:py-28 bg-section-alt border-y border-luxury-border">
        <div className="container">
          <SectionTitle
            label={field(f, "integridade.pilares.label", "Eixos de atuação")}
            title={field(
              f,
              "integridade.pilares.titulo",
              "Onde os APPGGs contribuem"
            )}
            subtitle={field(
              f,
              "integridade.pilares.subtitulo",
              "Quatro frentes que transformam integridade em prática administrativa cotidiana."
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-12">
            {pilares.map((p, i) => (
              <FadeIn key={p.titulo} delay={i * 0.05}>
                <div className="bg-card p-10 h-full group hover:bg-card-hover transition-colors duration-300">
                  <p.titulo
                    size={22}
                    strokeWidth={1.25}
                    className="text-gold mb-5"
                  />
                  <h3 className="text-lg font-display text-foreground mb-3">
                    {p.titulo}
                  </h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">
                    {p.descricao}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Números de impacto */}
      <section className="py-16 md:py-20 bg-card border-b border-luxury-border">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">
                  +11 mil
                </span>
                <p className="text-xs font-light text-text-caption mt-2 tracking-wide uppercase">
                  Contratações no Contratos.gov.br
                </p>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">
                  + R$ 60 mi
                </span>
                <p className="text-xs font-light text-text-caption mt-2 tracking-wide uppercase">
                  Impacto na arrecadação do CADIN
                </p>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">
                  2,2 mi
                </span>
                <p className="text-xs font-light text-text-caption mt-2 tracking-wide uppercase">
                  Refeições auditáveis por dia
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Casos */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container max-w-5xl">
          <SectionTitle
            label={field(f, "integridade.casos.label", "Casos documentados")}
            title={field(
              f,
              "integridade.casos.titulo",
              "Colaborações com resultados mensuráveis"
            )}
            subtitle={field(
              f,
              "integridade.casos.subtitulo",
              "Iniciativas conduzidas por órgãos e equipes da Prefeitura nas quais APPGGs deram suporte técnico."
            )}
          />

          <div className="mt-12 space-y-4">
            {casos.map((c, i) => (
              <FadeIn key={c.titulo} delay={i * 0.05}>
                <div className="border border-luxury-border p-8 md:p-10 bg-card hover:bg-card-hover transition-colors duration-300">
                  <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
                    <div>
                      <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-gold block mb-2">
                        {c.orgao}
                      </span>
                      <h3 className="text-lg md:text-xl font-display text-foreground">
                        {c.titulo}
                      </h3>
                    </div>
                    {c.destaque && (
                      <span className="text-[11px] px-3 py-1.5 border border-luxury-border text-text-caption tracking-wide">
                        {c.destaque}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-light text-text-body leading-relaxed">
                    {c.resumo}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Marco legal */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label={field(
                  f,
                  "integridade.marco.label",
                  "Base legal"
                )}
                title={field(
                  f,
                  "integridade.marco.titulo",
                  "Marco regulatório"
                )}
              />
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0 border-t border-luxury-border">
                {marcoLegal.map((m, i) => (
                  <FadeIn key={m.titulo} delay={i * 0.05}>
                    <div className="py-6 border-b border-luxury-border">
                      <div className="flex items-start gap-3">
                        <Landmark
                          size={16}
                          strokeWidth={1.5}
                          className="text-gold mt-1 flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-foreground">
                            {m.titulo}
                          </h4>
                          <p className="text-xs font-light text-text-body mt-1 leading-relaxed">
                            {m.desc}
                          </p>
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

      {/* CTA */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container max-w-3xl text-center">
          <FadeIn>
            <TrendingUp
              size={24}
              strokeWidth={1.25}
              className="text-gold mx-auto mb-6"
            />
            <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight mb-4">
              {field(
                f,
                "integridade.cta.titulo",
                "Integridade é investimento em governança"
              )}
            </h2>
            <p className="text-sm md:text-base font-light text-text-body leading-relaxed max-w-2xl mx-auto mb-10">
              {field(
                f,
                "integridade.cta.texto",
                "Conheça outros casos em que APPGGs colaboraram com secretarias, órgãos de controle e equipes técnicas para fortalecer a gestão pública municipal."
              )}
            </p>
            <Link
              to="/atuacao"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-luxury-border text-sm font-light text-foreground hover:border-gold hover:text-gold transition-colors duration-300"
            >
              <Building2 size={16} strokeWidth={1.5} />
              <span>Ver todos os casos de atuação</span>
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default IntegridadePage;
