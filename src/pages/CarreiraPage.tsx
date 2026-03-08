import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";

const timelineItems = [
  { year: "2007", text: "Criação da carreira pela Lei Municipal nº 14.591, inserida na administração direta da Prefeitura de São Paulo." },
  { year: "2008", text: "Realização do primeiro concurso público. Aprovados distribuídos em diversas secretarias." },
  { year: "2010", text: "Primeiras contribuições estruturadas em programas de governo e monitoramento de políticas." },
  { year: "2012", text: "Fundação da APOGESP para representar e articular os interesses da carreira." },
  { year: "2014", text: "Participação ativa na formulação do Programa de Metas da gestão municipal." },
  { year: "2016", text: "Segundo concurso público amplia o contingente de APPGGs." },
  { year: "2019", text: "Publicação do primeiro relatório institucional com mapeamento da atuação." },
  { year: "2021", text: "Atuação na resposta à pandemia de COVID-19 em diversas secretarias." },
  { year: "2023", text: "Protagonismo em inovação, governo digital e gestão baseada em evidências." },
];

const areasAtuacao = [
  "Formulação e avaliação de políticas públicas",
  "Planejamento estratégico e governança",
  "Monitoramento de programas e indicadores",
  "Gestão orçamentária e financeira",
  "Inovação e transformação digital",
  "Análise de dados para tomada de decisão",
  "Articulação intersetorial e coordenação",
  "Relações institucionais e intergovernamentais",
];

const CarreiraPage = () => (
  <PageLayout>
    <PageHero
      label="A Carreira"
      title="Analistas de Políticas Públicas e Gestão Governamental"
      subtitle="Uma carreira estratégica para a administração municipal de São Paulo."
    />

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Sobre" title="O que é a carreira" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  A carreira de Analista de Políticas Públicas e Gestão Governamental (APPGG) é uma carreira de nível superior da administração direta da Prefeitura de São Paulo, criada pela Lei Municipal nº 14.591 de 2007.
                </p>
                <p>
                  Os APPGGs desempenham funções de planejamento, formulação, monitoramento e avaliação de políticas públicas, além de atividades de gestão governamental em diversas secretarias e órgãos.
                </p>
                <p>
                  A carreira foi concebida para fortalecer a capacidade técnica e institucional do governo municipal, inspirando-se em experiências semelhantes no governo federal e em outros entes da federação.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Perfil" title="Profissionais" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  Os integrantes da carreira possuem formação diversificada em áreas como administração pública, ciências sociais, economia, direito, engenharia e outras disciplinas. O ingresso ocorre por concurso público de provas e títulos.
                </p>
                <p>
                  Atuam em posições técnicas e de assessoramento em secretarias municipais, subprefeituras, autarquias e órgãos da administração direta.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Competências" title="Áreas de Atuação" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-luxury-border mt-8">
          {areasAtuacao.map((area, i) => (
            <FadeIn key={area} delay={i * 0.05}>
              <div className="bg-card p-6 flex items-start gap-4">
                <span className="text-[10px] font-medium text-gold mt-0.5">0{i + 1}</span>
                <span className="text-sm font-light text-foreground">{area}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Cronologia" title="Evolução Histórica" />
          </div>
          <div className="lg:col-span-8">
            <div className="border-l border-luxury-border pl-8 space-y-0">
              {timelineItems.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.05}>
                  <div className="relative pb-8">
                    <div className="absolute -left-[calc(2rem+0.5px)] top-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-xs font-display text-gold">{item.year}</span>
                    <p className="text-sm font-light text-text-body mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Dados" title="APPGGs em Números" center />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxury-border mt-8 max-w-3xl mx-auto">
          {[
            { num: "~200", label: "Profissionais ativos" },
            { num: "20+", label: "Órgãos de atuação" },
            { num: "2", label: "Concursos realizados" },
            { num: "16", label: "Anos de carreira" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="bg-card p-8 text-center">
                <span className="text-3xl font-display font-normal text-gold">{stat.num}</span>
                <span className="block text-[11px] font-light text-text-caption mt-2 tracking-wide">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CarreiraPage;
