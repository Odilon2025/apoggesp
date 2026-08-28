import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CarreiraDashboard from "@/components/CarreiraDashboard";
import CMSMarkdown from "@/components/CMSMarkdown";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { cronologia as timelineItems } from "@/data/cronologia";
import { snapshot } from "@/data/snapshot";
import SEO from "@/components/SEO";

const areasAtuacao: { texto: string; destaques: string[] }[] = [
  { texto: "Colaboração com a formulação, implementação e avaliação de políticas públicas em todas as áreas de governo", destaques: ["formulação", "implementação", "avaliação"] },
  { texto: "Apoio ao planejamento estratégico e ao monitoramento do Programa de Metas da cidade", destaques: ["planejamento estratégico", "Programa de Metas"] },
  { texto: "Participação na gestão de projetos prioritários e na coordenação de entregas intersetoriais", destaques: ["gestão de projetos", "entregas intersetoriais"] },
  { texto: "Contribuição com inovação em serviços públicos, em parceria com equipes técnicas, por meio de ciências comportamentais e design centrado no cidadão", destaques: ["inovação em serviços públicos", "ciências comportamentais", "design centrado no cidadão"] },
  { texto: "Articulação entre secretarias e colaboração na construção de políticas transversais", destaques: ["políticas transversais"] },
  { texto: "Apoio à governança orçamentária, à gestão fiscal e às transferências entre entes", destaques: ["governança orçamentária", "gestão fiscal"] },
  { texto: "Colaboração com a transformação digital, a gestão da informação e os sistemas de monitoramento", destaques: ["transformação digital", "gestão da informação"] },
  { texto: "Apoio à formação de lideranças, ao desenvolvimento de equipes e à construção de capacidades estatais", destaques: ["formação de lideranças", "capacidades estatais"] },
];

const renderComDestaques = (texto: string, destaques: string[]) => {
  if (destaques.length === 0) return texto;
  const pattern = new RegExp(`(${destaques.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = texto.split(pattern);
  return parts.map((part, idx) =>
    destaques.includes(part) ? (
      <span key={idx} className="font-medium text-gold">{part}</span>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
};

const CarreiraPage = () => {
  const f = usePageFields("carreira");
  const atosItems = useCMSList(getAtos, []);
  const atos = agruparAtos(atosItems);
  const grupos = [
    { label: "Lei da carreira", itens: [atos.principal] },
    { label: "Alterações", itens: atos.alteracoes },
    { label: "Anexos", itens: atos.anexos },
    { label: "Normas correlatas", itens: atos.correlacoes },
  ].filter((g) => g.itens.length > 0);

  return (
  <PageLayout>
      <SEO title="Carreira APPGG \u2014 Hist\u00f3ria e estrutura | APOGESP" description="Conhe\u00e7a a carreira de Analista de Pol\u00edticas P\u00fablicas e Gest\u00e3o Governamental do Munic\u00edpio de S\u00e3o Paulo: hist\u00f3rico, atribui\u00e7\u00f5es, dados demogr\u00e1ficos e estrutura." path="/carreira" />
    <PageHero
      label={field(f, "carreira.hero.label", "A Carreira")}
      title={field(f, "carreira.hero.titulo", "Analistas de Políticas Públicas e Gestão Governamental")}
      subtitle={field(f, "carreira.hero.subtitulo", "A carreira que colabora para que São Paulo transforme intenções em entregas que mudam a realidade e promovem uma cidade mais pujante, justa e democrática.")}
    />

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label={field(f, "carreira.intro.label", "Sobre")} title={field(f, "carreira.intro.titulo", "O que é a carreira")} />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="carreira.intro.texto"
                fallback={"Em 2015, o município de São Paulo fez uma aposta: criar uma carreira de nível superior dedicada a colaborar com o fortalecimento da capacidade do governo municipal de planejar, implementar e avaliar políticas públicas. A Lei Municipal nº 16.193 deu nome a essa aposta — Analista de Políticas Públicas e Gestão Governamental — e definiu suas atribuições: implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas, sempre em apoio às prioridades fixadas pela administração superior.\n\nUma década depois, os frutos dessa decisão estão espalhados por toda a administração — sempre como produto de um trabalho conjunto. Os APPGGs colaboram, lado a lado com outras carreiras municipais e com as lideranças de cada pasta, na intersecção entre a formulação técnica e a realidade do território.\n\nA carreira atua na chamada burocracia de médio escalão: o espaço entre quem decide e quem executa. É ali que se contribui para traduzir diretrizes em projetos, indicadores em ações e compromissos em entregas mensuráveis — sempre em diálogo com as equipes técnicas, gestores e parceiros institucionais que conduzem cada iniciativa."}
                className="space-y-5 text-sm font-light text-text-body leading-[1.8]"
              />
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
              "{field(f, "carreira.citacao.frase", "A força da carreira está em colaborar para que cada política pública chegue ao cidadão com técnica, integridade e continuidade.")}"
            </blockquote>
            <div className="luxury-divider mt-6 mb-4" />
            <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
              {field(f, "carreira.citacao.autor", "Odilon A. Candido — Diretor Jurídico da APOGESP")}
            </cite>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label={field(f, "carreira.perfil.label", "Perfil")} title={field(f, "carreira.perfil.titulo", "Quem São os APPGGs")} />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="carreira.perfil.texto"
                fallback={"Administradores públicos, economistas, cientistas sociais, engenheiros, advogados — os APPGGs chegam de formações diversas, mas convergem em uma competência comum: a capacidade de traduzir problemas complexos em decisões implementáveis. O ingresso ocorre por concurso público de provas e títulos, exigindo nível superior.\n\nNa prática, os analistas atuam como intérpretes — de problemas públicos, de dados, de contextos políticos e institucionais. Em diálogo com as equipes técnicas e com as lideranças de cada órgão, contribuem para identificar lacunas entre a diretriz e sua execução e participam da construção do caminho para preenchê-las. Ferramentas de gestão e planejamento são o vocabulário; a colaboração com a melhoria das políticas públicas, o objetivo.\n\nO trabalho vai além da técnica isolada. APPGGs participam de projetos, contribuem com a formação de novas lideranças, colaboram com laboratórios de inovação, apoiam o redesenho de processos e enfrentam problemas que nenhum manual previu."}
                className="space-y-5 text-sm font-light text-text-body leading-[1.8]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <SectionTitle label={field(f, "carreira.areas.label", "Competências")} title={field(f, "carreira.areas.titulo", "Áreas de Atuação")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-luxury-border mt-8">
          {areasAtuacao.map((area, i) => (
            <FadeIn key={area.texto} delay={i * 0.05}>
              <div className="bg-section-alt p-6 flex items-start gap-4">
                <span className="text-[10px] font-medium text-gold mt-0.5">0{i + 1}</span>
                <span className="text-sm font-light text-foreground">{renderComDestaques(area.texto, area.destaques)}</span>
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
            <SectionTitle label={field(f, "carreira.memoria.label", "Continuidade")} title={field(f, "carreira.memoria.titulo", "Memória Institucional das Políticas Públicas")} />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="carreira.memoria.texto"
                fallback={"Governos passam, ciclos políticos se sucedem, secretários chegam e partem. O que permanece — e o que sustenta a capacidade de São Paulo de governar a si mesma — é o conhecimento acumulado sobre como cada política pública foi pensada, executada e revisada ao longo do tempo. Os APPGGs são, em larga medida, responsáveis por preservar essa continuidade.\n\nPor estarem distribuídos nas secretarias, nos órgãos de planejamento, nos sistemas de monitoramento e nos projetos estratégicos, os analistas registram, documentam e preservam a trajetória das decisões: o que motivou determinada escolha, quais alternativas foram descartadas, quais entregas funcionaram, quais aprendizados ficaram. É uma memória técnica que não cabe em um único arquivo, mas que vive nas equipes, nos processos e nos sistemas que a carreira ajuda a construir.\n\nEssa função silenciosa — costurar passado, presente e futuro das políticas públicas municipais — é o que permite que cada nova gestão encontre, ao chegar, não uma página em branco, mas um repertório vivo. Preservar essa memória é, também, preservar o direito da cidade de aprender com a própria história."}
                className="space-y-5 text-sm font-light text-text-body leading-[1.8]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label={field(f, "carreira.cronologia.label", "Cronologia")} title={field(f, "carreira.cronologia.titulo", "Uma Década em Construção")} />
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
        <SectionTitle label={field(f, "carreira.numeros.label", "Dados")} title={field(f, "carreira.numeros.titulo", "APPGGs em Números")} center />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxury-border mt-8 max-w-3xl mx-auto">
          {[
            { num: String(snapshot.total), label: "APPGGs em exercício" },
            { num: String(snapshot.totalOrgaos), label: "Órgãos e entidades com APPGGs" },
            { num: String(snapshot.lideranca.total), label: "Em funções de liderança" },
            { num: "13", label: "Cedidos a outros entes" },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="bg-section-alt p-8 text-center">
                <span className="text-3xl font-display font-normal text-gold">{stat.num}</span>
                <span className="block text-[11px] font-light text-text-caption mt-2 tracking-wide">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="text-[10px] font-light text-text-caption mt-6 tracking-wide text-center">
          {field(f, "carreira.numeros.legenda", "Snapshot fevereiro de 2026")}
        </p>
      </div>
    </section>

    <CarreiraDashboard />

    {/* Marco Legal */}
    <section id="marco-legal" className="py-24 md:py-32 bg-card scroll-mt-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label={field(f, "carreira.legal.label", "Legislação")} title={field(f, "carreira.legal.titulo", "Marco Legal")} />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <CMSMarkdown
                fields={f}
                fieldKey="carreira.legal.texto"
                fallback={"O artigo 13 da Lei nº 16.193/2015 define as atribuições do APPGG como: *\"implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas da Administração Direta e Indireta da Prefeitura do Município de São Paulo.\"* Poucas carreiras municipais no Brasil têm um mandato tão amplo — e tão exigente.\n\nOs APPGGs devem ser alocados prioritariamente em apoio à elaboração do Programa de Metas, ao planejamento orçamentário (LOA e PPA) e a projetos de reestruturação institucional. A alocação é realizada pela Assessoria de Carreiras Transversais da Secretaria Municipal de Gestão do Município de São Paulo."}
                className="space-y-5 text-sm font-light text-text-body leading-[1.8]"
              />
            </FadeIn>

            <div className="mt-14 space-y-12">
              {grupos.map((grupo) => (
                <div key={grupo.label}>
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-4">
                    {grupo.label}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    {grupo.itens.map((item, i) => (
                      <FadeIn key={item.url + i} delay={i * 0.04}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 py-5 border-b border-luxury-border"
                        >
                          <Scale size={16} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-light text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">
                              {item.titulo}
                            </p>
                            <p className="text-xs font-light text-text-body mt-1 leading-relaxed">{item.descricao}</p>
                          </div>
                          <ExternalLink
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-caption mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </a>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  </PageLayout>
  );
};

export default CarreiraPage;
