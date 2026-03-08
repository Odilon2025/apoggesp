import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";

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
  "Formulação, implementação e avaliação de políticas públicas em todas as áreas de governo",
  "Planejamento estratégico e monitoramento do Programa de Metas da cidade",
  "Gestão de projetos prioritários e coordenação de entregas intersetoriais",
  "Inovação em serviços públicos por meio de ciências comportamentais e design centrado no cidadão",
  "Articulação entre secretarias e construção de políticas transversais",
  "Governança orçamentária, gestão fiscal e transferências entre entes",
  "Transformação digital, gestão da informação e sistemas de monitoramento",
  "Formação de lideranças, desenvolvimento de equipes e construção de capacidades estatais",
];

const CarreiraPage = () => (
  <PageLayout>
    <PageHero
      label="A Carreira"
      title="Analistas de Políticas Públicas e Gestão Governamental"
      subtitle="A carreira que existe para que São Paulo consiga transformar intenções em entregas — e entregas em legado."
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
                  Em 2015, São Paulo fez uma aposta: criar uma carreira de nível superior dedicada exclusivamente a fortalecer a capacidade do governo municipal de planejar, implementar e avaliar políticas públicas. A Lei Municipal nº 16.193 deu nome a essa aposta — Analista de Políticas Públicas e Gestão Governamental — e definiu suas atribuições: implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas.
                </p>
                <p>
                  Uma década depois, os frutos dessa decisão estão espalhados por toda a administração. Os APPGGs se tornaram a engrenagem silenciosa da Prefeitura — profissionais que operam na intersecção entre a formulação técnica e a realidade do território, entre o que o dado revela e o que a política precisa resolver.
                </p>
                <p>
                  A carreira ocupa o que a literatura chama de burocracia de médio escalão: o espaço entre quem decide e quem executa. É ali, nesse elo muitas vezes invisível, que se traduzem diretrizes em projetos, indicadores em ações e compromissos em entregas mensuráveis. Seus integrantes estão presentes em praticamente todos os órgãos da administração direta, atuando de forma transversal — não como observadores, mas como construtores.
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
            <SectionTitle label="Perfil" title="Quem São os APPGGs" />
          </div>
          <div className="lg:col-span-8">
            <FadeIn>
              <div className="space-y-5 text-sm font-light text-text-body leading-[1.8]">
                <p>
                  Administradores públicos, economistas, cientistas sociais, engenheiros, advogados — os APPGGs chegam de formações diversas, mas convergem em uma competência comum: a capacidade de traduzir complexidade em ação. O ingresso ocorre por concurso público de provas e títulos, exigindo nível superior. A seleção é rigorosa porque a função exige rigor.
                </p>
                <p>
                  Na prática, os analistas atuam como intérpretes — de problemas públicos, de dados, de contextos políticos e institucionais. São eles que, muitas vezes, identificam o gap entre uma diretriz e sua execução, e constroem o caminho para preenchê-lo. Ferramentas de gestão e planejamento são o vocabulário; a melhoria das políticas públicas, o objetivo.
                </p>
                <p>
                  Mas o desempenho vai além da técnica. APPGGs lideram projetos, formam novas lideranças, criam laboratórios de inovação, redesenham processos e enfrentam problemas que nenhum manual previu. A carreira se construiu fazendo — e cada desafio superado alargou o entendimento coletivo do que um servidor público transversal pode realizar.
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
                  A base legal da carreira está no artigo 13 da Lei nº 16.193/2015, que define suas atribuições com clareza cirúrgica: <em className="text-foreground">"implementação, supervisão, coordenação, execução, monitoramento e avaliação de projetos, atividades e políticas públicas da Administração Direta e Indireta da Prefeitura do Município de São Paulo."</em> Poucas carreiras municipais no Brasil têm um mandato tão amplo — e tão exigente.
                </p>
                <p>
                  Em 2021, a Portaria SEGES nº 13 deu o próximo passo: formalizou que os APPGGs devem ser alocados prioritariamente na elaboração do Programa de Metas, no planejamento orçamentário (LOA e PPA) e em projetos de reestruturação institucional. A portaria não criou a prática — apenas reconheceu o que a carreira já vinha demonstrando no campo.
                </p>
                <p>
                  O marco mais recente veio em 2024, quando o Decreto nº 63.336 institucionalizou o SMAE como sistema oficial de monitoramento e criou a Rede SMAE — uma comunidade de mais de 500 servidores. O decreto transformou um projeto em política permanente, e uma ferramenta em patrimônio público.
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
