import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";

const diretoria = [
  { nome: "Ana Paula Oliveira", cargo: "Presidenta" },
  { nome: "Carlos Eduardo Santos", cargo: "Vice-Presidente" },
  { nome: "Mariana Costa", cargo: "Secretária-Geral" },
  { nome: "Rafael Mendes", cargo: "Tesoureiro" },
  { nome: "Fernanda Ribeiro", cargo: "Diretora de Comunicação" },
  { nome: "Lucas Almeida", cargo: "Diretor de Relações Institucionais" },
];

const objetivos = [
  "Promover a valorização e o reconhecimento da carreira de APPGG",
  "Contribuir para o aprimoramento das políticas públicas municipais",
  "Produzir e disseminar conhecimento sobre gestão governamental",
  "Representar os interesses dos associados junto a órgãos públicos",
  "Fomentar o desenvolvimento profissional dos integrantes",
  "Estimular o debate público sobre administração pública",
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
                  A APOGESP é a entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo. Fundada em 2012, atua na valorização da carreira, na produção de conhecimento sobre gestão pública e na articulação institucional.
                </p>
                <p>
                  A associação não possui fins lucrativos e é mantida por contribuições voluntárias de seus associados. Sua atuação é orientada por princípios de independência, transparência e compromisso com a melhoria da administração pública.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <SectionTitle label="Propósito" title="Missão" center />
          <FadeIn>
            <p className="text-sm font-light text-text-body leading-[1.8]">
              Fortalecer a carreira de APPGG e contribuir para o aprimoramento da gestão pública no município de São Paulo, por meio de produção técnica, representação institucional e desenvolvimento profissional.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Diretrizes" title="Objetivos" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-luxury-border mt-8">
          {objetivos.map((obj, i) => (
            <FadeIn key={obj} delay={i * 0.05}>
              <div className="bg-card p-6 flex items-start gap-4">
                <span className="text-[10px] font-medium text-gold mt-0.5">0{i + 1}</span>
                <span className="text-sm font-light text-foreground leading-relaxed">{obj}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <SectionTitle label="Gestão" title="Diretoria" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-luxury-border mt-8">
          {diretoria.map((membro, i) => (
            <FadeIn key={membro.nome} delay={i * 0.06}>
              <div className="bg-section-alt p-8">
                <p className="text-sm font-normal text-foreground">{membro.nome}</p>
                <p className="text-[11px] font-light text-text-caption mt-1">{membro.cargo}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="text-[10px] font-light text-text-caption mt-6 tracking-wide italic">
          * Nomes fictícios para fins de demonstração.
        </p>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Trajetória" title="Histórico" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  A APOGESP foi fundada em 2012 por um grupo de APPGGs que identificou a necessidade de uma entidade representativa capaz de articular os interesses da carreira e promover o debate sobre gestão pública municipal.
                </p>
                <p>
                  Desde sua fundação, produziu relatórios institucionais, notas técnicas e propostas de aprimoramento que contribuíram para o fortalecimento da carreira e para o diálogo com a administração municipal.
                </p>
                <p>
                  Mantém interlocução regular com secretarias municipais, entidades representativas de carreiras análogas em outros entes federativos e instituições acadêmicas e de pesquisa.
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
