import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CarreiraDashboard from "@/components/CarreiraDashboard";

const timelineItems = [
  { year: "2015", text: "A Lei Municipal nº 16.193 cria a carreira de APPGG — a primeira carreira transversal de nível superior da administração direta paulistana." },
  { year: "2016–17", text: "Os primeiros concursados tomam posse. Distribuídos por dezenas de secretarias, começam a aprender que a gestão pública se faz no terreno, não no gabinete." },
  { year: "2017", text: "A carreira encontra seu primeiro grande teste: estruturar a execução do Programa de Metas 2017–2020. Planejamento vira prática." },
  { year: "2018", text: "Nasce o Lab11, o Laboratório de Inovação Pública — prova de que ciências comportamentais podem mudar a forma como São Paulo entrega serviços." },
  { year: "2021", text: "A Portaria SEGES nº 13 formaliza a alocação prioritária dos APPGGs em projetos estratégicos, Programa de Metas e planejamento orçamentário." },
  { year: "2022", text: "Começa o desenvolvimento do SMAE em parceria com a FGV. Metodologia ágil, software livre, soberania sobre os dados públicos." },
  { year: "2023", text: "O SMAE entra em operação com módulos de Programa de Metas, Gestão de Projetos, Planos Setoriais e Obras. A Prefeitura passa a enxergar suas próprias entregas." },
  { year: "2024", text: "O Decreto nº 63.336 institucionaliza o SMAE como sistema oficial. A Rede SMAE reúne mais de 500 servidores. O que era projeto vira política." },
  { year: "2025", text: "O Caderno Gestão Pública em Rede celebra uma década com nove artigos que documentam, pela primeira vez, o que a carreira construiu." },
];

const areasAtuacao = [
  "Colaboração com a formulação, implementação e avaliação de políticas públicas em todas as áreas de governo",
  "Apoio ao planejamento estratégico e ao monitoramento do Programa de Metas da cidade",
  "Participação na gestão de projetos prioritários e na coordenação de entregas intersetoriais",
  "Contribuição com inovação em serviços públicos, em parceria com equipes técnicas, por meio de ciências comportamentais e design centrado no cidadão",
  "Articulação entre secretarias e colaboração na construção de políticas transversais",
  "Apoio à governança orçamentária, à gestão fiscal e às transferências entre entes",
  "Colaboração com a transformação digital, a gestão da informação e os sistemas de monitoramento",
  "Apoio à formação de lideranças, ao desenvolvimento de equipes e à construção de capacidades estatais",
];

const CarreiraPage = () => (
  <PageLayout>
    <PageHero
      label="A Carreira"
      title="Analistas de Políticas Públicas e Gestão Governamental"
      subtitle="A carreira que colabora — em conjunto com outras carreiras municipais e dentro das diretrizes da administração superior — para que São Paulo transforme intenções em entregas que mudam a realidade e promovem uma cidade mais pujante, justa e democrática."
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
                  Em 2015, o município de São Paulo fez uma aposta: criar uma carreira de nível superior dedicada a colaborar com o fortalecimento da capacidade do governo municipal de planejar, implementar e avaliar políticas públicas. A Lei Municipal nº 16.193 deu nome a essa aposta — Analista de Políticas Públicas e Gestão Governamental — e definiu suas atribuições: implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas, sempre em apoio às prioridades fixadas pela administração superior.
                </p>
                <p>
                  Uma década depois, os frutos dessa decisão estão espalhados por toda a administração — sempre como produto de um trabalho conjunto. Os APPGGs colaboram, lado a lado com outras carreiras municipais e com as lideranças de cada pasta, na intersecção entre a formulação técnica e a realidade do território.
                </p>
                <p>
                  A carreira ocupa o que a literatura chama de burocracia de médio escalão: o espaço entre quem decide e quem executa. É ali que se contribui para traduzir diretrizes em projetos, indicadores em ações e compromissos em entregas mensuráveis — sempre em diálogo com as equipes técnicas, gestores e parceiros institucionais que conduzem cada iniciativa.
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
              "A força da carreira está em colaborar, dentro da legalidade e das prioridades da administração superior, para que cada política pública chegue ao cidadão com técnica, integridade e continuidade."
            </blockquote>
            <div className="luxury-divider mt-6 mb-4" />
            <cite className="text-[11px] font-light text-text-caption not-italic tracking-wide">
              Odilon A. Candido — Diretor Jurídico da APOGESP
            </cite>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionTitle label="Perfil" title="Quem São os APPGGs" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  Administradores públicos, economistas, cientistas sociais, engenheiros, advogados — os APPGGs chegam de formações diversas, mas convergem em uma competência comum: a capacidade de colaborar com a tradução da complexidade em ação. O ingresso ocorre por concurso público de provas e títulos, exigindo nível superior.
                </p>
                <p>
                  Na prática, os analistas atuam como intérpretes — de problemas públicos, de dados, de contextos políticos e institucionais. Em diálogo com as equipes técnicas e com as lideranças de cada órgão, contribuem para identificar lacunas entre uma diretriz e sua execução e participam da construção do caminho para preenchê-las. Ferramentas de gestão e planejamento são o vocabulário; a colaboração com a melhoria das políticas públicas, o objetivo.
                </p>
                <p>
                  O trabalho vai além da técnica isolada. APPGGs participam de projetos, contribuem com a formação de novas lideranças, colaboram com laboratórios de inovação, apoiam o redesenho de processos e enfrentam — sempre em conjunto com outras carreiras e dentro dos Planos de Atuação Institucional — problemas que nenhum manual previu.
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
            <SectionTitle label="Continuidade" title="Memória Institucional das Políticas Públicas" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  Governos passam, ciclos políticos se sucedem, secretários chegam e partem. O que permanece — e o que sustenta a capacidade de São Paulo de governar a si mesma — é o conhecimento acumulado sobre como cada política pública foi pensada, executada e revisada ao longo do tempo. Os APPGGs são, em larga medida, os guardiões discretos dessa continuidade.
                </p>
                <p>
                  Por estarem distribuídos nas secretarias, nos órgãos de planejamento, nos sistemas de monitoramento e nos projetos estratégicos, os analistas registram, documentam e preservam a trajetória das decisões: o que motivou determinada escolha, quais alternativas foram descartadas, quais entregas funcionaram, quais aprendizados ficaram. É uma memória técnica que não cabe em um único arquivo, mas que vive nas equipes, nos processos e nos sistemas que a carreira ajuda a construir.
                </p>
                <p>
                  Essa função silenciosa — costurar passado, presente e futuro das políticas públicas municipais — é o que permite que cada nova gestão encontre, ao chegar, não uma página em branco, mas um repertório vivo. Preservar essa memória é, também, preservar o direito da cidade de aprender com a própria história.
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
            <SectionTitle label="Cronologia" title="Uma Década em Construção" />
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
            { num: "185", label: "APPGGs em exercício" },
            { num: "23", label: "Órgãos e entidades com APPGGs" },
            { num: "57", label: "Em funções de liderança" },
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
          Snapshot fevereiro de 2026
        </p>
      </div>
    </section>

    <CarreiraDashboard />

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
                  A base legal da carreira está no artigo 13 da Lei nº 16.193/2015, que define suas atribuições com clareza cirúrgica: <em className="text-foreground">"implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas da Administração Direta e Indireta da Prefeitura do Município de São Paulo."</em> Poucas carreiras municipais no Brasil têm um mandato tão amplo — e tão exigente.
                </p>
                <p>
                  Em 2021, a Portaria SEGES nº 13 deu o próximo passo: formalizou que os APPGGs devem ser alocados prioritariamente em apoio à elaboração do Programa de Metas, ao planejamento orçamentário (LOA e PPA) e a projetos de reestruturação institucional, sempre conforme as prioridades definidas pela administração superior.
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
