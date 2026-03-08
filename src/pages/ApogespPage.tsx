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
  "Promover o reconhecimento institucional da carreira como pilar estratégico da gestão municipal",
  "Contribuir para que políticas públicas sejam formuladas com rigor técnico e implementadas com efetividade",
  "Produzir e disseminar conhecimento original sobre gestão governamental na esfera municipal",
  "Representar os interesses dos associados com independência e transparência perante órgãos públicos e sociedade",
  "Investir no desenvolvimento profissional contínuo e na construção de capacidades estatais duradouras",
  "Estimular o debate público qualificado sobre administração pública e o futuro das políticas municipais",
];

const ApogespPage = () => (
  <PageLayout>
    <PageHero
      label="Institucional"
      title="A APOGESP"
      subtitle="A voz coletiva de quem dedica a carreira a fazer a gestão pública de São Paulo funcionar melhor."
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
                  A APOGESP nasceu de uma convicção simples: profissionais que compartilham uma missão precisam de um espaço para pensar juntos. Como entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo, a associação existe para amplificar o impacto coletivo de uma carreira que, por natureza, trabalha nos bastidores.
                </p>
                <p>
                  A carreira de APPGG foi criada em 2015 pela Lei Municipal nº 16.193 e tem sua coordenação institucional vinculada à Assessoria de Carreiras Transversais (ACT), no gabinete da Secretaria Municipal de Gestão. A ACT é responsável pela alocação, desenvolvimento e articulação dos integrantes — o elo entre a carreira e as demandas estratégicas da Prefeitura.
                </p>
                <p>
                  Sem fins lucrativos e orientada por princípios de independência e transparência, a APOGESP atua em três frentes: valorização da carreira, produção de conhecimento sobre gestão municipal e articulação com órgãos de governo, entidades parceiras e sociedade civil. Não é um sindicato, nem uma entidade corporativa — é um espaço de reflexão e ação sobre o que significa servir ao público.
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
              Fortalecer a carreira de APPGG e contribuir para o aprimoramento da gestão pública no município de São Paulo — não com discursos, mas com produção técnica, representação institucional qualificada, articulação entre setores e investimento permanente em capacidades estatais. A missão da APOGESP é garantir que a experiência acumulada por seus integrantes se converta em memória, método e legado.
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
        <SectionTitle label="Equipe editorial" title="Assessoria de Carreiras Transversais" subtitle="A equipe que coordena a carreira no dia a dia e que tornou possível o Caderno Gestão Pública em Rede — a primeira publicação coletiva dos APPGGs." />
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
                  A carreira de APPGG está abrigada na Secretaria Municipal de Gestão (SEGES), sob a liderança da Secretária Marcela Arruda e da Secretária Adjunta Regina Silvério. A SEGES é o órgão responsável pela política de gestão de pessoas e carreiras transversais — o que faz dela, na prática, a guardiã institucional dos APPGGs.
                </p>
                <p>
                  Dentro da SEGES, a Assessoria de Carreiras Transversais (ACT) é quem opera essa relação cotidianamente. A ACT coordena a alocação dos analistas, articula oportunidades de desenvolvimento e funciona como o ponto de contato entre a carreira e as prioridades estratégicas do governo. Em 2021, a Portaria SEGES nº 13 formalizou o que já era tendência: APPGGs devem ser priorizados para atuar no Programa de Metas, no planejamento orçamentário e em projetos de reestruturação institucional.
                </p>
                <p>
                  O resultado dessa arquitetura é uma carreira presente em praticamente todos os órgãos da administração direta — não como figurantes, mas como articuladores que conectam planejamento a execução, dados a decisões, e secretarias umas às outras.
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
