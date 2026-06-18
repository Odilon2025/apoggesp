import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getObservatorioIndicadores, getObservatorioCategorias } from "@/lib/cms";
import { ArrowRight, LogOut, Clock, TrendingDown, Users, FileText, AlertTriangle, type LucideIcon } from "lucide-react";
import SEO from "@/components/SEO";

const ICON_MAP: Record<string, LucideIcon> = {
  LogOut,
  Clock,
  TrendingDown,
  Users,
  FileText,
  AlertTriangle,
};

const indicadoresFallback = [
  { num: "—", label: "exonerações a pedido desde 2016" },
  { num: "—", label: "licenças sem vencimento (LIP) ativas" },
  { num: "—", label: "cedências para outros entes" },
  { num: "—", label: "tempo médio de permanência na carreira" },
];

const categoriasFallback = [
  {
    icon: "LogOut",
    titulo: "Exonerações a Pedido",
    descricao:
      "Mapeamento dos APPGGs que solicitaram desligamento voluntário, com análise do tempo de carreira, órgão de lotação e trajetória posterior ao serviço público municipal.",
    foco: [
      "Perfil demográfico e funcional dos exonerados",
      "Tempo médio entre posse e pedido de exoneração",
      "Correlação com faixa salarial e posição na estrutura",
      "Destinos profissionais mais frequentes",
    ],
  },
  {
    icon: "Clock",
    titulo: "Licenças sem Vencimento (LIP)",
    descricao:
      "Acompanhamento das licenças para tratar de interesses particulares, um indicador sensível do vínculo entre a carreira e quem nela ingressou.",
    foco: [
      "Número de LIPs concedidas por ano",
      "Duração média das licenças",
      "Taxa de retorno efetivo à carreira",
      "Motivações declaradas quando disponíveis",
    ],
  },
  {
    icon: "Users",
    titulo: "Cedências e Requisições",
    descricao:
      "APPGGs cedidos a outros entes federativos ou a órgãos externos à administração direta municipal, com atenção às trajetórias de não retorno.",
    foco: [
      "Órgãos de destino mais frequentes",
      "Cedências com e sem ônus para o município",
      "Tempo de afastamento e taxa de efetivo retorno",
      "Concentração em determinadas áreas temáticas",
    ],
  },
  {
    icon: "TrendingDown",
    titulo: "Aposentadorias e Vacâncias",
    descricao:
      "Projeção da renovação da carreira a partir do perfil etário e do tempo de contribuição, subsidiando o planejamento de concursos e reposições.",
    foco: [
      "Pirâmide etária dos analistas em exercício",
      "Previsão de aposentadorias no horizonte de 5 e 10 anos",
      "Vacâncias por outras modalidades",
      "Impacto projetado sobre o quadro efetivo",
    ],
  },
];

const ObservatorioEvasoesPage = () => {
  const f = usePageFields("observatorio-evasoes");
  const indicadores = useCMSList(getObservatorioIndicadores, indicadoresFallback);
  const categorias = useCMSList(getObservatorioCategorias, categoriasFallback);

  return (
    <PageLayout>
      <SEO title="Observat\u00f3rio de Evas\u00f5es da carreira APPGG | APOGESP" description="Monitoramento de afastamentos, licen\u00e7as e exonera\u00e7\u00f5es na carreira de Analistas de Pol\u00edticas P\u00fablicas e Gest\u00e3o Governamental de S\u00e3o Paulo." path="/observatorio-evasoes" />
      <PageHero
        label={field(f, "observatorio-evasoes.hero.label", "Observatório")}
        title={field(f, "observatorio-evasoes.hero.titulo", "Observatório das Evasões")}
        subtitle={field(f, "observatorio-evasoes.hero.subtitulo", "Um esforço de memória institucional para compreender quem deixa a carreira de APPGG, por quais caminhos e com quais implicações para a capacidade de entrega do município.")}
      />

      {/* Introdução */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                label={field(f, "observatorio-evasoes.intro.label", "Por que observar")}
                title={field(f, "observatorio-evasoes.intro.titulo", "Cada Saída Conta uma História")}
                subtitle={field(f, "observatorio-evasoes.intro.subtitulo", "Exonerações, licenças e cedências não são apenas números de RH — são sinais sobre as condições de trabalho, as perspectivas de carreira e a atratividade do serviço público municipal.")}
              />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <FadeIn>
                <CMSMarkdown
                  fields={f}
                  fieldKey="observatorio-evasoes.intro.texto"
                  fallback={`O Observatório das Evasões é uma iniciativa exclusiva da APOGESP, que se propõe a produzir dados públicos sobre a rotatividade na carreira de Analista de Políticas Públicas e Gestão Governamental.\n\nNão se trata de julgar escolhas individuais. Trata-se de reconhecer que, quando um APPGG deixa a carreira, a Prefeitura perde conhecimento acumulado sobre políticas públicas específicas — memória institucional que, uma vez dispersa, é difícil de reconstituir.`}
                  className="prose-cms text-base font-light text-text-body leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0"
                />
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-4 p-6 bg-section-alt border-l-2 border-gold">
                  <p className="text-sm font-light text-text-body leading-relaxed">
                    {field(f, "observatorio-evasoes.intro.destaque", "Compreender os padrões de evasão é o primeiro passo para desenhar políticas de retenção que dialoguem com a realidade da carreira e com as prioridades da administração municipal.")}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section className="py-20 md:py-24 bg-section-alt">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-4">
              {field(f, "observatorio-evasoes.indicadores.label", "Em construção")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground">
              {field(f, "observatorio-evasoes.indicadores.titulo", "Indicadores em Apuração")}
            </h2>
            <div className="luxury-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-luxury-border">
            {indicadores.map((ind, i) => (
              <FadeIn key={`${ind.label}-${i}`} delay={i * 0.08}>
                <div className="bg-card p-8 md:p-10 h-full text-center">
                  <span className="text-4xl md:text-5xl font-display font-normal text-gold block">
                    {ind.num}
                  </span>
                  <span className="block text-[11px] font-light text-text-caption mt-3 tracking-wide">
                    {ind.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-center text-[11px] font-light text-text-caption mt-8 max-w-xl mx-auto">
            {field(f, "observatorio-evasoes.indicadores.rodape", "Os dados estão sendo coletados junto às áreas de gestão de pessoas da Prefeitura e serão publicados conforme validação institucional.")}
          </p>
        </div>
      </section>

      {/* Categorias de análise */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle
            label={field(f, "observatorio-evasoes.categorias.label", "Eixos de análise")}
            title={field(f, "observatorio-evasoes.categorias.titulo", "Quatro Lentes para uma Mesma Questão")}
            subtitle={field(f, "observatorio-evasoes.categorias.subtitulo", "O Observatório organiza seus estudos em quatro dimensões complementares, que permitem compreender as diferentes formas pelas quais a carreira perde — ou suspende — efetivos.")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mt-12">
            {categorias.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon] ?? AlertTriangle;
              return (
                <FadeIn key={`${cat.titulo}-${i}`} delay={i * 0.1}>
                  <div className="bg-card p-10 md:p-12 h-full">
                    <Icon size={22} strokeWidth={1.5} className="text-gold mb-6" />
                    <h3 className="text-xl font-display font-normal text-foreground mb-4 leading-tight">
                      {cat.titulo}
                    </h3>
                    <p className="text-sm font-light text-text-body leading-relaxed mb-6">
                      {cat.descricao}
                    </p>
                    <ul className="space-y-2.5 border-t border-luxury-border pt-5">
                      {cat.foco.map((item) => (
                        <li key={item} className="text-[13px] font-light text-text-body leading-relaxed flex gap-3">
                          <span className="text-gold mt-1.5 shrink-0">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <SectionTitle
                label={field(f, "observatorio-evasoes.metodologia.label", "Metodologia")}
                title={field(f, "observatorio-evasoes.metodologia.titulo", "Dados, Escuta e Rigor")}
              />
            </div>
            <div className="lg:col-span-7 space-y-8">
              {[
                {
                  icon: FileText,
                  titulo: "Fontes oficiais",
                  texto: "Consulta sistemática a Diários Oficiais, sistemas corporativos de gestão de pessoas e boletins informativos da administração, sempre em colaboração com as áreas responsáveis.",
                },
                {
                  icon: Users,
                  titulo: "Escuta qualitativa",
                  texto: "Entrevistas voluntárias com APPGGs que exoneraram ou estão em LIP, preservando o anonimato e respeitando os limites éticos da pesquisa institucional.",
                },
                {
                  icon: AlertTriangle,
                  titulo: "Transparência sobre limites",
                  texto: "O Observatório reconhece lacunas nos dados públicos e trabalha para que os indicadores sejam publicados com as devidas ressalvas metodológicas.",
                },
              ].map((item, i) => (
                <FadeIn key={item.titulo} delay={i * 0.1}>
                  <div className="flex gap-5 pb-8 border-b border-luxury-border last:border-0">
                    <item.icon size={20} strokeWidth={1.5} className="text-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-display font-normal text-foreground mb-2">
                        {item.titulo}
                      </h3>
                      <p className="text-sm font-light text-text-body leading-relaxed">
                        {item.texto}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-6">
                {field(f, "observatorio-evasoes.cta.label", "Participe")}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance">
                {field(f, "observatorio-evasoes.cta.titulo", "Você exonerou, está em LIP ou foi cedido?")}
              </h2>
              <p className="mt-6 text-sm font-light text-text-body leading-relaxed">
                {field(f, "observatorio-evasoes.cta.texto", "Sua trajetória importa para compreendermos a carreira. A APOGESP mantém um canal confidencial para registrar experiências que subsidiarão o Observatório, com total preservação de identidade.")}
              </p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>{field(f, "observatorio-evasoes.cta.botao", "Entre em contato com a APOGESP")}</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ObservatorioEvasoesPage;
