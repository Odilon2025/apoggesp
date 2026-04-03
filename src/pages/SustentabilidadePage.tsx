import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { Leaf, Droplets, Sun, Wind, TreePine, ArrowRight, Building2, Globe } from "lucide-react";

const eixos = [
  {
    icon: Leaf,
    titulo: "Mudanças Climáticas e Resiliência Urbana",
    descricao:
      "APPGGs contribuem com a formulação e implementação de políticas de adaptação climática para a maior metrópole da América Latina, integrando planejamento urbano, gestão de riscos e infraestrutura verde.",
    acoes: [
      "Contribuição com o Plano de Ação Climática do Município (PlanClima SP)",
      "Apoio à estruturação de políticas de resiliência em áreas de risco",
      "Participação na elaboração de indicadores de vulnerabilidade climática",
      "Apoio técnico à transição para uma economia de baixo carbono na gestão municipal",
    ],
  },
  {
    icon: Droplets,
    titulo: "Gestão Hídrica e Saneamento",
    descricao:
      "A segurança hídrica de São Paulo exige planejamento integrado e políticas públicas de longo prazo. APPGGs atuam na articulação intersetorial para garantir abastecimento, drenagem e qualidade das águas.",
    acoes: [
      "Apoio à gestão integrada de recursos hídricos no âmbito municipal",
      "Contribuição com programas de drenagem sustentável e controle de enchentes",
      "Participação em projetos de despoluição de córregos e rios urbanos",
      "Articulação entre secretarias para políticas de saneamento ambiental",
    ],
  },
  {
    icon: Sun,
    titulo: "Transição Energética e Eficiência",
    descricao:
      "APPGGs participam da modernização da gestão energética municipal, contribuindo com políticas que promovem eficiência e fontes renováveis nos equipamentos públicos.",
    acoes: [
      "Apoio à implementação de programas de eficiência energética em prédios públicos",
      "Contribuição com a expansão de energia solar em equipamentos municipais",
      "Participação na elaboração de diretrizes para frota pública sustentável",
      "Apoio técnico a programas de iluminação pública eficiente",
    ],
  },
  {
    icon: TreePine,
    titulo: "Áreas Verdes e Biodiversidade",
    descricao:
      "Com mais de 12 milhões de habitantes, São Paulo enfrenta o desafio de preservar e ampliar suas áreas verdes. APPGGs contribuem com políticas que integram urbanismo e conservação ambiental.",
    acoes: [
      "Apoio à gestão de parques urbanos e unidades de conservação municipal",
      "Contribuição com programas de arborização e corredores ecológicos",
      "Participação na formulação de políticas de compensação ambiental",
      "Apoio técnico ao monitoramento de biodiversidade urbana",
    ],
  },
  {
    icon: Wind,
    titulo: "Qualidade do Ar e Mobilidade Sustentável",
    descricao:
      "A melhoria da qualidade do ar passa por políticas integradas de transporte, uso do solo e controle de emissões. APPGGs contribuem com a articulação dessas agendas no nível municipal.",
    acoes: [
      "Apoio ao planejamento de mobilidade ativa e transporte público limpo",
      "Contribuição com programas de monitoramento da qualidade do ar",
      "Participação em políticas de redução de emissões veiculares",
      "Articulação de políticas de logística urbana sustentável",
    ],
  },
  {
    icon: Globe,
    titulo: "Economia Circular e Resíduos Sólidos",
    descricao:
      "A gestão sustentável dos resíduos em uma metrópole de 12 milhões de pessoas exige inovação e governança eficiente. APPGGs participam da modernização das políticas de resíduos sólidos.",
    acoes: [
      "Apoio à implementação de programas de coleta seletiva e reciclagem",
      "Contribuição com políticas de redução de resíduos em equipamentos públicos",
      "Participação na elaboração de modelos de economia circular para a cidade",
      "Apoio técnico a programas de compostagem comunitária",
    ],
  },
];

const stats = [
  { num: "6", label: "Eixos de atuação ambiental" },
  { num: "24+", label: "Ações e programas mapeados" },
  { num: "12M", label: "Habitantes beneficiados" },
  { num: "18", label: "Órgãos com APPGGs em sustentabilidade" },
];

const SustentabilidadePage = () => {
  return (
    <PageLayout>
      <PageHero
        label="Meio Ambiente"
        title="Sustentabilidade"
        subtitle="Como os APPGGs contribuem com a construção de uma São Paulo mais sustentável, resiliente e preparada para os desafios ambientais do século XXI."
      />

      {/* Intro narrativa */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <FadeIn>
            <p className="text-lg font-light leading-relaxed text-text-body">
              São Paulo é a maior metrópole da América Latina — e também uma das mais vulneráveis às mudanças climáticas. Enchentes, ilhas de calor, crises hídricas e poluição atmosférica são desafios que exigem políticas públicas sofisticadas, baseadas em evidências e com visão de longo prazo.
            </p>
            <p className="mt-6 text-lg font-light leading-relaxed text-text-body">
              Nesse cenário, os Analistas de Políticas Públicas e Gestão Governamental desempenham um papel fundamental: são eles que ajudam a traduzir os compromissos ambientais em programas concretos, indicadores mensuráveis e governança efetiva. Da Secretaria do Verde e Meio Ambiente à Secretaria de Infraestrutura Urbana, APPGGs contribuem para que a sustentabilidade deixe de ser uma intenção e se torne realidade administrativa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <span className="text-3xl md:text-4xl font-display font-bold text-gold">{s.num}</span>
                  <p className="mt-2 text-sm font-light text-text-caption">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Eixos de Atuação */}
      <section className="py-20 bg-background">
        <div className="container">
          <SectionTitle
            label="Eixos Temáticos"
            title="Onde os APPGGs contribuem com a sustentabilidade"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {eixos.map((eixo, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-sm p-8 h-full hover:border-gold/30 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center">
                      <eixo.icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground leading-tight">
                      {eixo.titulo}
                    </h3>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-text-body mb-6">
                    {eixo.descricao}
                  </p>

                  <ul className="space-y-3">
                    {eixo.acoes.map((acao, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Leaf size={14} className="text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-sm font-light text-text-caption">{acao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Visão de futuro */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <SectionTitle
            label="Perspectiva"
            title="Uma cidade que planeja seu futuro"
          />
          <FadeIn>
            <div className="mt-12 bg-card border border-border rounded-sm p-10">
              <p className="text-base font-light leading-relaxed text-text-body">
                A agenda ambiental não é um tema isolado — ela atravessa todas as áreas da gestão pública. Saúde, mobilidade, habitação, educação: cada política setorial tem uma dimensão ambiental que precisa ser considerada. Os APPGGs, por sua formação transversal e capacidade de articulação, são peças-chave para garantir que a sustentabilidade seja tratada como eixo estruturante — e não como pauta secundária.
              </p>
              <p className="mt-6 text-base font-light leading-relaxed text-text-body">
                Com o avanço das metas climáticas globais e os compromissos assumidos por São Paulo em fóruns internacionais, a demanda por gestores públicos qualificados na área ambiental só tende a crescer. Fortalecer a carreira de APPGG é, também, fortalecer a capacidade do município de responder aos maiores desafios do nosso tempo.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <FadeIn>
            <p className="text-sm font-light text-text-caption mb-6">
              Conheça os Planos de Atuação Institucional dos órgãos com projetos ambientais
            </p>
            <Link
              to="/planos-atuacao"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors duration-300"
            >
              Ver Planos de Atuação <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default SustentabilidadePage;
