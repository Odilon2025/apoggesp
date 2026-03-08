import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

const timelineItems = [
  { year: "2007", text: "Criação da carreira pela Lei Municipal nº 14.591, inserida na estrutura da administração direta da Prefeitura de São Paulo." },
  { year: "2008", text: "Realização do primeiro concurso público. Aprovados são distribuídos em diversas secretarias." },
  { year: "2010", text: "Primeiras contribuições estruturadas em programas de governo e monitoramento de políticas." },
  { year: "2012", text: "Fundação da APOGESP para representar e articular os interesses da carreira." },
  { year: "2014", text: "Participação ativa na formulação do Programa de Metas da gestão municipal." },
  { year: "2016", text: "Segundo concurso público amplia o contingente de APPGGs." },
  { year: "2019", text: "Publicação do primeiro relatório institucional com mapeamento da atuação dos APPGGs." },
  { year: "2021", text: "Atuação significativa na resposta à pandemia de COVID-19 em diversas secretarias." },
  { year: "2023", text: "Ampliação do protagonismo em inovação, governo digital e gestão baseada em evidências." },
];

const areasAtuacao = [
  "Formulação e avaliação de políticas públicas",
  "Planejamento estratégico e governança",
  "Monitoramento de programas e indicadores",
  "Gestão orçamentária e financeira",
  "Inovação e transformação digital",
  "Análise de dados para tomada de decisão",
  "Articulação intersetorial e coordenação de projetos",
  "Relações institucionais e intergovernamentais",
];

const CarreiraPage = () => (
  <PageLayout>
    <PageHero
      title="A Carreira de APPGG"
      subtitle="Analistas de Políticas Públicas e Gestão Governamental: uma carreira estratégica para a administração municipal de São Paulo."
    />

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <SectionTitle title="O que é a carreira" />
        <div className="prose-institutional">
          <p className="text-muted-foreground leading-relaxed mb-4">
            A carreira de Analista de Políticas Públicas e Gestão Governamental (APPGG) é uma carreira de nível superior da administração direta da Prefeitura de São Paulo, criada pela Lei Municipal nº 14.591 de 2007.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Os APPGGs desempenham funções de planejamento, formulação, monitoramento e avaliação de políticas públicas, além de atividades de gestão governamental em diversas secretarias e órgãos da administração municipal.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A carreira foi concebida para fortalecer a capacidade técnica e institucional do governo municipal, inspirando-se em experiências semelhantes no governo federal (EPPGG) e em outros estados e municípios brasileiros.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container max-w-3xl">
        <SectionTitle title="Perfil Profissional" />
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os integrantes da carreira possuem formação diversificada em áreas como administração pública, ciências sociais, economia, direito, engenharia e outras disciplinas. O ingresso ocorre por concurso público de provas e títulos, exigindo nível superior completo.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Os APPGGs atuam em posições técnicas e de assessoramento em secretarias municipais, subprefeituras, autarquias e órgãos da administração direta, contribuindo para a qualificação da gestão pública.
        </p>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <SectionTitle title="Áreas de Atuação" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {areasAtuacao.map((area) => (
            <div key={area} className="flex items-start gap-2 p-3 border border-border rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-sm text-foreground">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container max-w-3xl">
        <SectionTitle title="Evolução Histórica" />
        <div className="space-y-0">
          {timelineItems.map((item, i) => (
            <div key={item.year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-accent shrink-0 mt-1.5" />
                {i < timelineItems.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-6">
                <span className="text-sm font-semibold text-accent">{item.year}</span>
                <p className="text-sm text-muted-foreground mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <SectionTitle title="APPGGs em Números" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "~200", label: "Profissionais ativos" },
            { num: "20+", label: "Órgãos de atuação" },
            { num: "2", label: "Concursos realizados" },
            { num: "16", label: "Anos de carreira" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 border border-border rounded text-center">
              <p className="text-2xl font-bold text-accent">{stat.num}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CarreiraPage;
