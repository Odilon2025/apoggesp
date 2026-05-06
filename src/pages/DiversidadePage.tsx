import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, Building2, Award, Shield, Target, BarChart3, Scale } from "lucide-react";

const indicadores = [
  { numero: "93", label: "Mulheres na carreira", detalhe: "38,8% do total", icon: Users },
  { numero: "75", label: "Negros e afrodescendentes", detalhe: "31,3% do total", icon: Users },
  { numero: "14", label: "Pessoas com deficiência", detalhe: "5,8% do total", icon: Users },
  { numero: "74", label: "Em cargos de liderança", detalhe: "30,8% do efetivo", icon: Award },
];

const geracoes = [
  { periodo: "2016–2018", total: 94, negros: 37, mulheres: 48, label: "Geração pioneira" },
  { periodo: "2021–2022", total: 71, negros: 27, mulheres: 31, label: "Expansão da carreira" },
  { periodo: "2024", total: 47, negros: 26, mulheres: 28, label: "Consolidação técnica" },
  { periodo: "2026", total: 17, negros: 35, mulheres: 41, label: "Coorte mais recente" },
];

const secretarias = [
  { sigla: "SEGES", total: 68, mulheres: 49, negros: 31 },
  { sigla: "CGM", total: 59, mulheres: 39, negros: 31 },
  { sigla: "SEPLAN", total: 17, mulheres: 24, negros: 12 },
  { sigla: "SVMA", total: 10, mulheres: 30, negros: 20 },
  { sigla: "SME", total: 10, mulheres: 40, negros: 20 },
  { sigla: "SGM", total: 9, mulheres: 56, negros: 44 },
];

const eixosAtuacao = [
  {
    icon: Shield,
    titulo: "Governança institucional",
    descricao: "APPGGs participam de comitês, grupos de trabalho, comissões e instâncias decisórias. Nesses espaços, podem incorporar critérios de equidade a protocolos, fluxos, minutas, sistemas e rotinas administrativas antes que escolhas aparentemente neutras se consolidem como barreiras de acesso.",
  },
  {
    icon: BarChart3,
    titulo: "Planejamento e orçamento",
    descricao: "Na posição de médio escalão, o APPGG converte diretrizes em metas, indicadores e alocação de recursos. Isso inclui desagregar informações por raça, gênero, território, deficiência e outros marcadores relevantes, evitando que médias gerais ocultem desigualdades específicas.",
  },
  {
    icon: Target,
    titulo: "Desenho de políticas",
    descricao: "Critérios de elegibilidade, regras de priorização, modelos de atendimento e requisitos documentais raramente são neutros em seus efeitos. O gestor público pode calibrar esses instrumentos para reduzir barreiras, ampliar acesso e aumentar a efetividade das políticas.",
  },
  {
    icon: Scale,
    titulo: "Implementação e avaliação",
    descricao: "A implementação é o momento em que a política encontra a realidade. O APPGG atua nessa fronteira: identifica gargalos, monitora exclusões, revisa procedimentos e propõe ajustes com base em evidências. A literatura sobre governança experimental reforça essa lógica: regras gerais precisam ser acompanhadas de revisão, aprendizado e correção a partir da implementação concreta.",
  },
];

const ProgressBar = ({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
};

const DiversidadePage = () => (
  <PageLayout>
    <PageHero
      label="Diversidade"
      title="Representatividade como capacidade institucional"
      subtitle="Desigualdades não se corrigem por inércia. Podem ser reproduzidas por normas, critérios, formulários, fluxos e rotinas administrativas aparentemente neutros. Representatividade no serviço público não é apenas simbólica: é uma condição institucional para ampliar repertórios de análise, identificar riscos de exclusão e calibrar políticas com maior aderência à realidade da população atendida."
    />

    {/* Indicadores Gerais */}
    <section className="py-20 md:py-28">
      <div className="container text-justify">
        <SectionTitle
          label="Panorama"
          title="Quem são os APPGGs"
          subtitle="A carreira reúne 185 gestores públicos municipais. Um corpo técnico que, a cada geração, aproxima sua composição da diversidade da cidade que administra."
          center
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {indicadores.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <div className="text-center p-6 md:p-8 border border-luxury-border rounded-sm bg-card hover:bg-card-hover transition-colors duration-300">
                <item.icon size={20} strokeWidth={1.2} className="mx-auto mb-4 text-gold" />
                <span className="block text-3xl md:text-4xl font-display text-text-display mb-1">
                  {item.numero}
                </span>
                <span className="block text-sm font-light text-text-body mb-1">
                  {item.label}
                </span>
                <span className="block text-xs text-text-caption font-light">
                  {item.detalhe}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Por que isso importa para a gestão */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container text-justify">
        <SectionTitle
          label="Contexto"
          title="Por que a composição do corpo técnico importa"
          subtitle="A literatura recente em administração pública trata a diversidade como uma variável organizacional relevante, mas condicionada. Seus efeitos dependem do tipo de diversidade, do desenho dos processos, da qualidade da liderança e da existência de rotinas capazes de transformar diferentes perspectivas em decisões públicas melhores."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <FadeIn delay={0.05}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <h3 className="text-sm font-medium text-text-display mb-3">Viés estrutural invisível</h3>
              <p className="text-sm text-text-body font-light leading-relaxed">
                Políticas públicas não produzem efeitos apenas por seus objetivos declarados. Elas produzem efeitos por seus critérios operacionais: quem é elegível, qual documento é exigido, qual canal é utilizado, em que horário o serviço funciona, quais dados são coletados e quais desigualdades permanecem invisíveis. Quando esses critérios são formulados sem considerar assimetrias sociais, a administração pode reproduzir exclusões sem intenção explícita.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <h3 className="text-sm font-medium text-text-display mb-3">O gestor como calibrador</h3>
              <p className="text-sm text-text-body font-light leading-relaxed">
                Entre a diretriz política e o efeito concreto no território existe uma cadeia de decisões técnicas. O APPGG atua nesse ponto intermediário: traduz prioridades em metas, transforma planos em procedimentos, organiza indicadores e acompanha entregas. É nessa tradução que a equidade pode ser incorporada — ou perdida.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 max-w-3xl p-6 border-l-2 border-gold bg-card rounded-sm">
            <p className="text-sm text-text-body font-light leading-relaxed italic">
              "Uma burocracia representativa não substitui técnica, mérito ou planejamento. Ao contrário: qualifica a capacidade decisória do Estado quando combinada com dados, liderança, procedimentos transparentes e avaliação permanente."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* O papel do APPGG na equidade */}
    <section className="py-20 md:py-28">
      <div className="container text-justify">
        <SectionTitle
          label="Atuação estratégica"
          title="Onde o APPGG faz diferença"
          subtitle="O APPGG não apenas executa políticas. Ele desenha, ajusta, mede e corrige. Em cada uma dessas funções, diversidade e capacidade técnica podem se reforçar mutuamente."
        />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {eixosAtuacao.map((eixo, i) => (
            <FadeIn key={eixo.titulo} delay={i * 0.08}>
              <div className="p-6 md:p-8 border border-luxury-border rounded-sm bg-card h-full">
                <eixo.icon size={18} strokeWidth={1.2} className="text-gold mb-4" />
                <h3 className="text-sm font-medium text-text-display mb-3 tracking-wide">
                  {eixo.titulo}
                </h3>
                <p className="text-sm text-text-body font-light leading-relaxed">
                  {eixo.descricao}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Liderança */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container text-justify">
        <SectionTitle
          label="Liderança"
          title="Diversidade onde as decisões acontecem"
          subtitle="A presença de mulheres e pessoas negras em cargos de liderança é um indicador relevante de maturidade institucional, mas deve ser lida com cautela. Representatividade em posições decisórias pode ampliar legitimidade interna, oportunidades de ascensão e sensibilidade institucional; sua recepção, contudo, depende do ambiente organizacional e pode gerar resistências quando não há gestão explícita da diversidade."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          <FadeIn delay={0.05}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Mulheres em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">36,8%</span>
                <span className="text-sm text-text-caption font-light">21 de 57</span>
              </div>
              <ProgressBar value={36.8} color="bg-gold" delay={0.3} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                A participação de mulheres em cargos de liderança aproxima-se de sua proporção na carreira (39,6%), o que sugere avanço no acesso a posições decisórias.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Negros em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">29,8%</span>
                <span className="text-sm text-text-caption font-light">17 de 57</span>
              </div>
              <ProgressBar value={29.8} color="bg-accent" delay={0.4} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                A presença de pessoas negras em liderança acompanha a tendência de crescimento observada nas últimas gerações da carreira, embora ainda indique espaço para acompanhamento contínuo.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Evolução por Geração */}
    <section className="py-20 md:py-28">
      <div className="container text-justify">
        <SectionTitle
          label="Evolução"
          title="Cada concurso, uma mudança mensurável"
          subtitle="A diversidade racial da carreira cresce de forma consistente nas coortes informadas. O dado é relevante porque mostra que mecanismos de ingresso, quando bem desenhados, podem alterar a composição do serviço público ao longo do tempo."
        />
        <div className="space-y-6 max-w-3xl">
          {geracoes.map((g, i) => (
            <FadeIn key={g.periodo} delay={i * 0.1}>
              <div className="p-6 md:p-8 border border-luxury-border rounded-sm bg-card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-medium tracking-luxury uppercase text-gold block mb-1">
                      Coorte {g.periodo}
                    </span>
                    <span className="text-lg font-display text-text-display">
                      {g.label}
                    </span>
                    <span className="block text-xs text-text-caption font-light mt-1">
                      {g.total} servidores
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} strokeWidth={1.5} className="text-gold" />
                    <span className="text-sm font-light text-text-body">
                      {g.negros}% negros
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-text-caption font-light">Negros e afrodescendentes</span>
                      <span className="text-xs text-text-body font-medium">{g.negros}%</span>
                    </div>
                    <ProgressBar value={g.negros} color="bg-accent" delay={0.2 + i * 0.1} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-text-caption font-light">Mulheres</span>
                      <span className="text-xs text-text-body font-medium">{g.mulheres}%</span>
                    </div>
                    <ProgressBar value={g.mulheres} color="bg-gold" delay={0.3 + i * 0.1} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-3xl p-6 border-l-2 border-gold bg-card rounded-sm">
            <p className="text-sm text-text-body font-light leading-relaxed italic">
              "A evolução de 27% para 40% de pessoas negras entre a primeira e a mais recente coorte sugere avanço substantivo na representatividade racial. O dado não deve ser tratado como prova automática de efetividade organizacional, mas como evidência de mudança institucional relevante. A literatura sobre burocracia representativa indica que diversidade passiva só se converte em capacidade pública quando encontra condições organizacionais para influenciar decisões, rotinas e prioridades."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Diversidade Institucional */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container text-justify">
        <SectionTitle
          label="Presença institucional"
          title="Diversidade distribuída pela administração"
          subtitle="Presentes em mais de 22 órgãos municipais, os APPGGs levam capacidades técnicas e repertórios sociais diversos a diferentes áreas da gestão pública: planejamento, educação, meio ambiente, governo, gestão e outras políticas setoriais."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {secretarias.map((s, i) => (
            <FadeIn key={s.sigla} delay={i * 0.06}>
              <div className="p-6 border border-luxury-border rounded-sm bg-card hover:bg-card-hover transition-colors duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={14} strokeWidth={1.2} className="text-gold" />
                  <span className="text-sm font-medium text-text-display tracking-wide">
                    {s.sigla}
                  </span>
                </div>
                <span className="text-xs text-text-caption block mb-3">{s.total} APPGGs</span>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[11px] text-text-caption font-light">Mulheres</span>
                      <span className="text-[11px] text-text-body">{s.mulheres}%</span>
                    </div>
                    <ProgressBar value={s.mulheres} color="bg-gold" delay={0.1 + i * 0.05} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[11px] text-text-caption font-light">Negros</span>
                      <span className="text-[11px] text-text-body">{s.negros}%</span>
                    </div>
                    <ProgressBar value={s.negros} color="bg-accent" delay={0.15 + i * 0.05} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 max-w-3xl p-6 border-l-2 border-gold bg-card rounded-sm">
            <p className="text-sm text-text-body font-light leading-relaxed italic">
              "A distribuição entre órgãos importa porque diversidade não deve ser observada apenas no agregado. A literatura metodológica recente recomenda olhar não só para quantidade, mas também para dispersão, concentração e presença efetiva dos grupos nos espaços onde decisões são tomadas."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Fechamento */}
    <section className="py-20 md:py-28">
      <div className="container text-justify">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption block mb-6">
              Compromisso institucional
            </span>
            <h2 className="text-2xl md:text-3xl font-display text-text-display leading-tight text-balance mb-6">
              Efetividade exige representatividade, método e governança
            </h2>
            <p className="text-sm text-text-body font-light leading-relaxed mb-4 text-justify">
              A carreira de APPGG mostra avanço relevante na construção de um corpo técnico mais representativo. Os dados indicam crescimento da diversidade racial, presença expressiva de mulheres e participação de pessoas negras em posições de liderança. Também apontam desafios: ampliar a inclusão de pessoas com deficiência, acompanhar a distribuição por órgão e preservar a equidade no acesso a posições decisórias.
            </p>
            <p className="text-sm text-text-body font-light leading-relaxed mb-4 text-justify">
              A tese central é simples: diversidade não é ornamento institucional. É uma dimensão da capacidade estatal. Uma burocracia mais representativa tende a enxergar melhor a cidade, formular perguntas mais completas e antecipar efeitos que uma administração homogênea pode ignorar.
            </p>
            <p className="text-sm text-text-body font-light leading-relaxed mb-4 text-justify">
              Mas representatividade só produz efeito público quando combinada com técnica, dados, liderança, rotinas de avaliação e abertura institucional para revisão. É nessa combinação — diversidade, método e governança — que a administração pública se torna mais capaz de enfrentar desigualdades concretas.
            </p>
            <p className="text-sm text-text-body font-light leading-relaxed text-justify">
              A APOGESP acompanha essa evolução com dados e transparência, defendendo uma gestão pública que reconheça a complexidade da cidade e organize sua burocracia para responder a ela com competência, equidade e responsabilidade institucional.
            </p>
            <div className="mt-8 luxury-divider" />
          </FadeIn>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default DiversidadePage;
