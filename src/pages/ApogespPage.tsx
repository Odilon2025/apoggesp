import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";

const diretoria = [
  { nome: "Maria Emília Nascimento Santos", cargo: "Assessoria de Carreiras Transversais (ACT)" },
  { nome: "Bruna Almeida Braga Soares", cargo: "ACT — Coordenação editorial" },
  { nome: "Erika Caracho Ribeiro", cargo: "ACT" },
  { nome: "Lucas Guimarães de Almeida", cargo: "ACT" },
  { nome: "Rafaela Bastianelli", cargo: "ACT" },
  { nome: "Carolina Teixeira", cargo: "Diagramação" },
];

const objetivos = [
  "Promover a valorização e o reconhecimento institucional da carreira de APPGG",
  "Contribuir para o aprimoramento das políticas públicas municipais",
  "Produzir e disseminar conhecimento sobre gestão governamental",
  "Representar os interesses dos associados junto a órgãos públicos e sociedade",
  "Fomentar o desenvolvimento profissional e as capacidades estatais",
  "Estimular o debate público sobre administração e políticas públicas",
];

const ApogespPage = () => (
  <PageLayout>
    <PageHero
      label="Institucional"
      title="A APOGESP"
      subtitle="Associação dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo."
    />

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Sobre" title="Quem Somos" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  A APOGESP é a entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo. Atua na valorização da carreira, na produção de conhecimento sobre gestão pública municipal e na articulação institucional com órgãos de governo, entidades parceiras e sociedade civil.
                </p>
                <p>
                  A carreira de APPGG, criada em 2015 pela Lei Municipal nº 16.193, tem sua gestão vinculada à Assessoria de Carreiras Transversais (ACT), que compõe o gabinete da Secretaria Municipal de Gestão (SEGES) da Prefeitura de São Paulo. A ACT é responsável pela coordenação institucional, alocação e desenvolvimento dos integrantes da carreira.
                </p>
                <p>
                  A associação não possui fins lucrativos e é orientada por princípios de independência, transparência e compromisso com a melhoria da administração pública.
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
              "Os 9 textos que compõem esse livro mostram como os servidores públicos da carreira de APPGG utilizaram suas competências a serviço de projetos e políticas públicas que geraram valor para os paulistanos."
            </blockquote>
            <div className="luxury-divider mt-6 mb-4" />
            <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
              Cibele Franzese — Prefácio do Caderno Gestão Pública em Rede
            </cite>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <SectionTitle label="Propósito" title="Missão" center />
          <FadeIn>
            <p className="text-sm font-light text-text-body leading-[1.8]">
              Fortalecer a carreira de APPGG e contribuir para o aprimoramento da gestão pública no município de São Paulo, por meio de produção técnica, representação institucional, articulação intersetorial e desenvolvimento de capacidades estatais.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <SectionTitle label="Diretrizes" title="Objetivos" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-luxury-border mt-8">
          {objetivos.map((obj, i) => (
            <FadeIn key={obj} delay={i * 0.05}>
              <div className="bg-section-alt p-6 flex items-start gap-4">
                <span className="text-[10px] font-medium text-gold mt-0.5">0{i + 1}</span>
                <span className="text-sm font-light text-foreground leading-relaxed">{obj}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Equipe editorial" title="Assessoria de Carreiras Transversais" subtitle="Equipe responsável pela coordenação institucional da carreira e pela produção do Caderno Gestão Pública em Rede." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-luxury-border mt-8">
          {diretoria.map((membro, i) => (
            <FadeIn key={membro.nome} delay={i * 0.06}>
              <div className="bg-card p-8">
                <p className="text-sm font-normal text-foreground">{membro.nome}</p>
                <p className="text-[11px] font-light text-text-caption mt-1">{membro.cargo}</p>
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
            <SectionTitle label="Contexto" title="Vinculação Institucional" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  A carreira de APPGG está vinculada à Secretaria Municipal de Gestão (SEGES) da Prefeitura de São Paulo. A SEGES, sob a gestão da Secretária Marcela Arruda e da Secretária Adjunta Regina Silvério, é responsável pela política de gestão de pessoas e carreiras transversais do município.
                </p>
                <p>
                  A Assessoria de Carreiras Transversais (ACT), vinculada ao gabinete da SEGES, é a unidade responsável pela coordenação, alocação e desenvolvimento dos APPGGs. Em 2021, a Portaria SEGES nº 13 formalizou a alocação prioritária da carreira para atuação no Programa de Metas, planejamento orçamentário e projetos estratégicos.
                </p>
                <p>
                  A carreira conta com integrantes distribuídos em praticamente todos os órgãos da administração direta, atuando de forma transversal em temas como planejamento, monitoramento, inovação e articulação intersetorial.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ApogespPage;
