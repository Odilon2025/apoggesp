import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import diretoriaTodos from "@/assets/diretoria-todos.jpg";
import diretorOdilon from "@/assets/diretor-odilon.jpg";
import diretoraMariaCamila from "@/assets/diretora-maria-camila.jpg";
import diretorHenrique from "@/assets/diretor-henrique.jpg";
import diretorCaio from "@/assets/diretor-caio.jpg";
import diretorJoao from "@/assets/diretor-joao.jpg";

const diretoria = [
  {
    nome: "Maria Camila Florêncio Dotto",
    cargo: "Diretoria Geral",
    foto: diretoraMariaCamila,
    bio: "APPGG desde 2017, alocada na PGM. Possui 18 anos de experiência em projetos sociais, políticas públicas, saúde, educação, inovação, tecnologia, transparência, controle e participação social. É bacharel e mestre em Direito, doutora em Administração Pública e Governo.",
  },
  {
    nome: "Odilon Alves Cândido",
    cargo: "Diretoria de Assuntos Jurídicos",
    foto: diretorOdilon,
    bio: "APPGG desde 2024, alocado na PGM. Bacharel em Direito, advogado e mestrando em Gestão e Políticas Públicas pela FGV, possui 10 anos de experiência no setor público. Atua na valorização da carreira como instrumento de fortalecimento da gestão pública municipal.",
  },
  {
    nome: "Caio Rocha",
    cargo: "Diretoria Administrativa e Financeira",
    foto: diretorCaio,
    bio: "APPGG desde 2024, alocado na PGM. Engenheiro químico e mestre em Economia, tem experiência no setor privado, especialmente em consultoria de gestão. Ingressou no serviço público para contribuir com políticas de maior impacto social na cidade.",
  },
  {
    nome: "Henrique Pougy",
    cargo: "Diretoria de Assuntos Profissionais e Formação Continuada",
    foto: diretorHenrique,
    bio: "APPGG desde 2016, atua com dados e analytics na Prefeitura de São Paulo. Formado em Ciências Sociais, é especialista em Ciência de Dados e Big Data e mestre em Sistemas Inteligentes, com foco em estatística bayesiana. Defende a valorização da carreira e a conversão de seu reconhecimento institucional em melhores condições de trabalho.",
  },
  {
    nome: "João Resende",
    cargo: "Diretoria de Assuntos Institucionais e Comunicação",
    foto: diretorJoao,
    bio: "APPGG desde 2022, alocado na Controladoria Geral do Município. Sociólogo e mestre em Gestão de Políticas Públicas, tem trajetória na CGM, Prefeitura de Osasco e Secretaria Estadual de Desenvolvimento Social de SP, com atuação em transparência pública, planejamento governamental e indicadores sociais. Participou da mobilização pela nomeação de aprovados do primeiro concurso da carreira.",
  },
];

const objetivos = [
  "Promover o reconhecimento institucional da carreira como pilar estratégico da gestão municipal",
  "Contribuir para que políticas públicas sejam formuladas com rigor técnico e implementadas com efetividade",
  "Produzir e disseminar conhecimento original sobre gestão governamental na esfera municipal",
  "Representar os interesses dos associados com independência e transparência perante órgãos públicos e a sociedade",
  "Investir no desenvolvimento profissional contínuo e na construção de capacidades estatais duradouras",
  "Estimular o debate público qualificado sobre administração pública e o futuro das políticas municipais",
];

const ApogespPage = () => {
  const f = usePageFields("apogesp");
  return (
  <PageLayout>
    <PageHero
      label={field(f, "apogesp.hero.label", "Institucional")}
      title={field(f, "apogesp.hero.titulo", "A APOGESP")}
      subtitle={field(f, "apogesp.hero.subtitulo", "A voz coletiva de quem dedica a carreira a fazer a gestão pública de São Paulo funcionar melhor.")}
    />

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label={field(f, "apogesp.quem-somos.label", "Sobre")} title={field(f, "apogesp.quem-somos.titulo", "Quem Somos")} />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="apogesp.quem-somos.texto"
                fallback={"A APOGESP nasceu de uma convicção simples: profissionais que compartilham uma missão precisam de um espaço para pensar juntos. Como entidade representativa dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo, a associação existe para amplificar o impacto coletivo da carreira.\n\nA APOGESP é uma entidade civil, sem fins lucrativos, independente de governo e de partidos. Sua atuação se organiza em três frentes: valorização da carreira, produção de conhecimento sobre gestão municipal e interlocução com órgãos públicos, entidades parceiras e sociedade civil.\n\nA independência da APOGESP é condição para sua relevância. É ela que permite à associação dialogar com diferentes governos, propor aprimoramentos à carreira com franqueza e produzir análises técnicas sem constrangimentos institucionais. A APOGESP fala em nome dos seus associados — e só deles."}
                className="space-y-5 text-sm font-light text-text-body leading-[1.8]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <SectionTitle label={field(f, "apogesp.missao.label", "Propósito")} title={field(f, "apogesp.missao.titulo", "Missão")} center />
          <FadeIn>
            <CMSMarkdown
              fields={f}
              fieldKey="apogesp.missao.texto"
              fallback="Fortalecer a carreira de APPGG e contribuir para o aprimoramento da gestão pública no município de São Paulo — não com discursos, mas com produção técnica, representação institucional qualificada, articulação entre setores e investimento permanente em capacidades estatais. A missão da APOGESP é garantir que a experiência acumulada por seus integrantes se converta em memória, método e legado."
              className="text-sm font-light text-text-body leading-[1.8]"
            />
          </FadeIn>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label={field(f, "apogesp.objetivos.label", "Diretrizes")} title={field(f, "apogesp.objetivos.titulo", "Objetivos")} />
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

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <SectionTitle label="Gestão" title="Diretoria" />

        <FadeIn>
          <div className="mb-16 overflow-hidden">
            <img
              src={diretoriaTodos}
              alt="Diretoria da APOGESP reunida em São Paulo"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <p className="mt-4 text-[11px] font-light tracking-luxury uppercase text-text-muted">
              Diretoria APOGESP — São Paulo
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border mb-16">
            {[
              {
                titulo: "Conselho de Ética",
                membros: [
                  "José Carlos Callegari",
                  "Mônica de Azevedo Costa Nogara",
                  "Nathalia Leone Marco",
                ],
              },
              {
                titulo: "Conselho Fiscal",
                membros: [
                  "Cassiana Montesião de Sousa",
                  "Larissa Diana Michelam",
                  "Og Oliveira Pinto",
                ],
              },
            ].map((conselho) => (
              <div key={conselho.titulo} className="bg-card p-8">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-4">
                  {conselho.titulo}
                </span>
                <ul className="space-y-2">
                  {conselho.membros.map((nome) => (
                    <li key={nome} className="text-sm font-light text-foreground leading-relaxed">
                      {nome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-luxury-border">
          {diretoria.map((pessoa, i) => (
            <FadeIn key={pessoa.nome} delay={i * 0.05}>
              <div className="bg-card h-full flex flex-col">
                <div className="aspect-[3/4] overflow-hidden bg-section-alt">
                  <img
                    src={pessoa.foto}
                    alt={`${pessoa.nome} — ${pessoa.cargo} da APOGESP`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-2">
                    {pessoa.cargo}
                  </span>
                  <h3 className="text-base font-serif text-foreground leading-tight mb-4">
                    {pessoa.nome}
                  </h3>
                  <p className="text-xs font-light text-text-body leading-[1.7] text-justify">
                    {pessoa.bio}
                  </p>
                </div>
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
            <SectionTitle label="Posicionamento" title="Uma Entidade Independente" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  A carreira de APPGG foi criada em 2015 e seus integrantes atuam vinculados à estrutura administrativa da Prefeitura de São Paulo. A APOGESP, por sua vez, é uma associação civil sem fins lucrativos, independente e autônoma — não integra a estrutura administrativa da Prefeitura, não depende do governo e não fala por ele.
                </p>
                <p>
                  Essa separação é deliberada. A APOGESP é, antes de tudo, uma entidade de representação dos interesses de classe dos APPGGs — atua pela valorização da carreira, pela defesa de condições adequadas de trabalho e pelo reconhecimento institucional de seus associados. Ao mesmo tempo, pretende contribuir com o debate público sobre gestão municipal, produzindo conhecimento técnico e mantendo um canal de diálogo permanente com a administração pública.
                </p>
                <p>
                  A APOGESP reconhece e valoriza o trabalho das instâncias governamentais responsáveis pela gestão da carreira, mas preserva sua autonomia para analisar, propor e, quando necessário, divergir. É essa independência que sustenta a credibilidade da associação perante seus associados e a sociedade.
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
