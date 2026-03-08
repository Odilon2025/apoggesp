import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

const diretoria = [
  { nome: "Ana Paula Oliveira", cargo: "Presidenta" },
  { nome: "Carlos Eduardo Santos", cargo: "Vice-Presidente" },
  { nome: "Mariana Costa", cargo: "Secretária-Geral" },
  { nome: "Rafael Mendes", cargo: "Tesoureiro" },
  { nome: "Fernanda Ribeiro", cargo: "Diretora de Comunicação" },
  { nome: "Lucas Almeida", cargo: "Diretor de Relações Institucionais" },
];

const ApogespPage = () => (
  <PageLayout>
    <PageHero
      title="A APOGESP"
      subtitle="Associação dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo."
    />

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <SectionTitle title="Quem Somos" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A APOGESP é a entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental (APPGGs) do Município de São Paulo. Fundada em 2012, a associação atua na valorização da carreira, na produção de conhecimento sobre gestão pública municipal e na articulação institucional com órgãos de governo, entidades parceiras e sociedade civil.
          </p>
          <p>
            A associação não possui fins lucrativos e é mantida por contribuições voluntárias de seus associados. Sua atuação é orientada por princípios de independência, transparência e compromisso com a melhoria da administração pública.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container max-w-3xl">
        <SectionTitle title="Missão e Objetivos" />
        <p className="text-muted-foreground leading-relaxed mb-6">
          A APOGESP tem como missão fortalecer a carreira de APPGG e contribuir para o aprimoramento da gestão pública no município de São Paulo.
        </p>
        <div className="space-y-3">
          {[
            "Promover a valorização e o reconhecimento da carreira de APPGG",
            "Contribuir para o aprimoramento das políticas públicas municipais",
            "Produzir e disseminar conhecimento sobre gestão governamental",
            "Representar os interesses dos associados junto a órgãos públicos e entidades",
            "Fomentar o desenvolvimento profissional dos integrantes da carreira",
            "Estimular o debate público sobre administração e políticas públicas",
          ].map((obj) => (
            <div key={obj} className="flex items-start gap-2 p-3 border border-border rounded bg-card">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-sm text-foreground">{obj}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <SectionTitle title="Diretoria" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {diretoria.map((membro) => (
            <div key={membro.nome} className="p-4 border border-border rounded">
              <p className="text-sm font-semibold text-foreground">{membro.nome}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{membro.cargo}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">
          * Nomes fictícios para fins de demonstração.
        </p>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container max-w-3xl">
        <SectionTitle title="Histórico" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A APOGESP foi fundada em 2012 por um grupo de APPGGs que identificou a necessidade de uma entidade representativa capaz de articular os interesses da carreira e promover o debate sobre gestão pública municipal.
          </p>
          <p>
            Desde sua fundação, a associação produziu relatórios institucionais, notas técnicas e propostas de aprimoramento que contribuíram para o fortalecimento da carreira e para o diálogo com a administração municipal.
          </p>
          <p>
            A APOGESP mantém interlocução regular com secretarias municipais, com entidades representativas de carreiras análogas em outros entes federativos e com instituições acadêmicas e de pesquisa.
          </p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ApogespPage;
