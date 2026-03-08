import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";

const timelineItems = [
  { year: "2015", text: "Criação da carreira pela Lei Municipal nº 16.193/2015, no âmbito da administração direta da Prefeitura de São Paulo." },
  { year: "2016–17", text: "Ingresso dos primeiros APPGGs por concurso público. Distribuição em diversas secretarias municipais." },
  { year: "2017", text: "Atuação estruturada no Programa de Metas 2017–2020. SEGES orienta priorização de APPGGs em planejamento e reestruturação institucional." },
  { year: "2018", text: "Criação do Lab11 — Laboratório de Inovação Pública. Início do Programa de Ciências Comportamentais na Prefeitura." },
  { year: "2021", text: "Portaria SEGES nº 13/2021 formaliza alocação prioritária em Programa de Metas, planejamento orçamentário e projetos estratégicos." },
  { year: "2022", text: "Início do desenvolvimento do SMAE em parceria com a FGV, com metodologia ágil e software livre (AGPL v3)." },
  { year: "2023", text: "Lançamento do SMAE com módulos de Programa de Metas e Gestão de Projetos. Expansão para Planos Setoriais e Obras." },
  { year: "2024", text: "Institucionalização do SMAE pelo Decreto nº 63.336/2024. Criação da Rede SMAE com 500+ usuários ativos." },
  { year: "2025", text: "Publicação do Caderno Gestão Pública em Rede — 1ª edição, celebrando 10 anos da carreira com 9 artigos técnicos." },
];

const areasAtuacao = [
  "Formulação, implementação e avaliação de políticas públicas",
  "Planejamento estratégico e monitoramento do Programa de Metas",
  "Gestão de projetos prioritários e entregas estratégicas",
  "Inovação em serviços públicos e ciências comportamentais",
  "Articulação intersetorial e coordenação de políticas transversais",
  "Governança orçamentária e transferências voluntárias",
  "Gestão da informação e transformação digital",
  "Desenvolvimento de capacidades estatais e formação de lideranças",
];

const CarreiraPage = () => (
  <PageLayout>
    <PageHero
      label="A Carreira"
      title="Analistas de Políticas Públicas e Gestão Governamental"
      subtitle="Uma carreira transversal dedicada ao fortalecimento da gestão pública na maior cidade da América Latina."
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
                  A carreira de Analista de Políticas Públicas e Gestão Governamental (APPGG) foi criada em 2015 pela Lei Municipal nº 16.193, como carreira de nível superior da administração direta da Prefeitura de São Paulo. Seus integrantes atuam na implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas.
                </p>
                <p>
                  Desde a criação, o município tem colhido os frutos de um investimento consistente em capacidades estatais transversais. Os APPGGs compõem a engrenagem institucional da Prefeitura, contribuindo com profundidade técnica e sensibilidade para temas estratégicos, sempre com o olhar atento à melhoria das políticas públicas e à efetividade das ações de governo.
                </p>
                <p>
                  A carreira se aproxima do exercício da função de burocracia de médio escalão, atuando como elo entre a formulação e a implementação de políticas públicas. Seus integrantes estão presentes em praticamente todos os órgãos da administração direta municipal, atuando de forma transversal.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    {/* Citação */}
    <section className="py-20 md:py-24 bg-section-alt">
      <div className="container">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-lg md:text-xl font-display font-normal text-foreground leading-relaxed italic">
              "A carreira é feita de pessoas e estas conseguem se adaptar ao novo e, ainda mais, são capazes de antecipar e formular o novo."
            </blockquote>
            <div className="luxury-divider mt-6 mb-4" />
            <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
              Cibele Franzese — Professora da FGV EAESP
            </cite>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Perfil" title="Profissionais" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  Os integrantes da carreira possuem formação diversificada em áreas como administração pública, ciências sociais, economia, direito, engenharia e outras disciplinas. O ingresso ocorre por concurso público de provas e títulos, exigindo nível superior completo.
                </p>
                <p>
                  Os APPGGs atuam como atores institucionais importantes na interpretação de problemas públicos e na construção de instituições e políticas duradouras, usando ferramentas de gestão e planejamento para formulação, implementação e avaliação de políticas públicas.
                </p>
                <p>
                  O desempenho da carreira vai além da estrutura burocrática clássica: os profissionais lideram projetos, formam novas lideranças, promovem espaços de inovação, implementam políticas, reformulam processos e resolvem problemas complexos.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <SectionTitle label="Competências" title="Áreas de Atuação" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-luxury-border mt-8">
          {areasAtuacao.map((area, i) => (
            <FadeIn key={area} delay={i * 0.05}>
              <div className="bg-section-alt p-6 flex items-start gap-4">
                <span className="text-[10px] font-medium text-gold mt-0.5">0{i + 1}</span>
                <span className="text-sm font-light text-foreground">{area}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
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

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <SectionTitle label="Dados" title="APPGGs em Números" center />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxury-border mt-8 max-w-3xl mx-auto">
          {[
            { num: "100+", label: "Analistas em exercício" },
            { num: "500+", label: "Usuários do SMAE" },
            { num: "5", label: "Módulos do SMAE" },
            { num: "10", label: "Anos de carreira" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="bg-section-alt p-8 text-center">
                <span className="text-3xl font-display font-normal text-gold">{stat.num}</span>
                <span className="block text-[11px] font-light text-text-caption mt-2 tracking-wide">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Marco Legal */}
    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Legislação" title="Marco Legal" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  As atribuições institucionais da carreira estão definidas no artigo 13 da Lei nº 16.193/2015: <em className="text-foreground">"implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas da Administração Direta e Indireta da Prefeitura do Município de São Paulo."</em>
                </p>
                <p>
                  Em 2021, a Portaria SEGES nº 13 formalizou a alocação prioritária dos APPGGs para atuação na elaboração do Programa de Metas, planejamento orçamentário (LOA e PPA), estruturação de políticas públicas prioritárias e projetos de reestruturação e eficiência.
                </p>
                <p>
                  Em 2024, o Decreto nº 63.336 institucionalizou o SMAE como sistema oficial de monitoramento e criou a Rede SMAE, coordenada pela SEPEP e composta em grande parte por APPGGs.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CarreiraPage;
