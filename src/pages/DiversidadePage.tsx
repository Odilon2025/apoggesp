import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, Building2, Award, Shield, Target, BarChart3, Scale } from "lucide-react";
import { snapshot } from "@/data/snapshot";

const fmtPct = (n: number) => `${n.toString().replace(".", ",")}%`;
const ind = snapshot.indicadores;

const indicadores = [
  { numero: String(ind.mulheres), label: "Mulheres na carreira", detalhe: `${fmtPct(ind.mulheresPct)} do total`, icon: Users },
  { numero: String(ind.negros), label: "Negros e afrodescendentes", detalhe: `${fmtPct(ind.negrosPct)} do total`, icon: Users },
  { numero: String(ind.pcd), label: "Pessoas com deficiência", detalhe: `${fmtPct(ind.pcdPct)} do total`, icon: Users },
  { numero: String(ind.lideranca), label: "Em cargos de liderança", detalhe: `${fmtPct(ind.liderancaPct)} do efetivo`, icon: Award },
];

const geracoes = snapshot.coortes;
const secretarias = snapshot.secretariasDiv;

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
      title="Representar a cidade ainda é uma agenda em disputa"
      subtitle="A APOGESP olha para a composição da carreira sem complacência. Os números mostram avanços, mas também distâncias persistentes em relação à cidade que administramos — e oscilações entre concursos que contradizem qualquer narrativa de progresso automático. Diversidade não se corrige por inércia: depende de regras de ingresso, critérios de promoção, abertura a posições decisórias e disposição institucional para revisar o que está naturalizado."
    />

    {/* Indicadores Gerais */}
    <section className="py-20 md:py-28">
      <div className="container text-justify">
        <SectionTitle
          label="Panorama"
          title="O retrato — e o que ele cobra"
          subtitle={`A carreira reúne ${snapshot.total} gestores públicos municipais. Em uma cidade onde a maioria da população é negra, ${fmtPct(ind.negrosPct)} de APPGGs negros e apenas ${ind.pcd} pessoas com deficiência (${fmtPct(ind.pcdPct)}) ainda não traduzem a São Paulo real. O dado é ponto de partida, não conquista.`}
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
        <p className="text-[10px] font-light tracking-luxury uppercase text-text-caption/70 text-center mt-8">
          Snapshot da base de pessoal — {snapshot.mesReferencia}
        </p>
      </div>
    </section>

    {/* Por que isso importa para a gestão */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container text-justify">
        <SectionTitle
          label="Contexto"
          title="A neutralidade administrativa é uma ficção conveniente"
          subtitle="Critérios de elegibilidade, modelos de atendimento, fluxos de aprovação e bases de dados raramente são neutros em seus efeitos. Quando o corpo técnico que os formula reproduz uma única perspectiva social, a administração tende a confundir suas próprias zonas cegas com universalidade — e a tratar como exceção o que é, na verdade, exclusão sistemática."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <FadeIn delay={0.05}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <h3 className="text-sm font-medium text-text-display mb-3">Exclusão sem autoria explícita</h3>
              <p className="text-sm text-text-body font-light leading-relaxed">
                Políticas públicas não falham apenas por má-fé ou subfinanciamento. Falham, com frequência, em decisões aparentemente técnicas: o documento exigido, o canal eleito como padrão, o horário de atendimento, o indicador escolhido para medir sucesso. Cada uma dessas escolhas filtra quem acessa, quem é contado e quem permanece invisível. Sem diversidade no desenho, o filtro opera no automático.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <h3 className="text-sm font-medium text-text-display mb-3">Onde a diretriz se perde</h3>
              <p className="text-sm text-text-body font-light leading-relaxed">
                Entre o discurso de equidade e o efeito concreto no território existe uma cadeia longa de decisões técnicas. É nessa cadeia — operada por gestores como o APPGG — que prioridades viram procedimentos e procedimentos viram acesso (ou barreira). Tratar essa camada como neutra é o que permite que governos defendam pautas progressistas enquanto suas burocracias seguem produzindo desigualdade.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 max-w-3xl p-6 border-l-2 border-gold bg-card rounded-sm">
            <p className="text-sm text-text-body font-light leading-relaxed italic">
              "Burocracia representativa não é concessão simbólica nem cota a tolerar. É uma exigência técnica: ampliar repertórios de análise no Estado é o que permite identificar exclusões antes que elas se consolidem em política pública."
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
          title="Quem decide ainda não reflete quem entra"
          subtitle="A presença de mulheres e pessoas negras em cargos de liderança é um dos testes mais duros da maturidade institucional. Os números abaixo mostram avanços relativos — mulheres e pessoas negras estão proporcionalmente mais presentes na liderança do que na carreira como um todo. Mas isso não autoriza autocomplacência: liderança ainda é majoritariamente branca e masculina, e o acesso a essas posições segue dependente de redes informais que a APOGESP entende como objeto legítimo de escrutínio."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          <FadeIn delay={0.05}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Mulheres em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">{fmtPct(snapshot.lideranca.mulheresPct)}</span>
                <span className="text-sm text-text-caption font-light">{snapshot.lideranca.mulheres} de {snapshot.lideranca.total}</span>
              </div>
              <ProgressBar value={snapshot.lideranca.mulheresPct} color="bg-gold" delay={0.3} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                A participação de mulheres em cargos de liderança ({fmtPct(snapshot.lideranca.mulheresPct)}) comparada à sua proporção na carreira ({fmtPct(ind.mulheresPct)}) é um indicador relevante do acesso a posições decisórias.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="p-8 border border-luxury-border rounded-sm bg-card">
              <span className="text-xs font-medium tracking-luxury uppercase text-text-caption block mb-6">
                Negros em Liderança
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display text-text-display">{fmtPct(snapshot.lideranca.negrosPct)}</span>
                <span className="text-sm text-text-caption font-light">{snapshot.lideranca.negros} de {snapshot.lideranca.total}</span>
              </div>
              <ProgressBar value={snapshot.lideranca.negrosPct} color="bg-accent" delay={0.4} />
              <p className="mt-4 text-xs text-text-caption font-light leading-relaxed">
                A presença de pessoas negras em liderança ({fmtPct(snapshot.lideranca.negrosPct)}) frente à sua proporção na carreira ({fmtPct(ind.negrosPct)}) permite acompanhar a equidade no acesso a posições decisórias.
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
          title="O progresso não é linear — e os dados mostram"
          subtitle="A leitura honesta das coortes desautoriza qualquer narrativa de avanço automático. A representatividade racial caiu da geração pioneira (37,5%) para os concursos de 2021–2022 (29,2%) e 2024 (25,5%), recuperando-se em parte em 2026 (35,3%) — ainda abaixo do patamar inicial e muito distante da composição racial da cidade. Cada concurso é uma decisão política sobre quem o Estado escolhe formar."
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
          subtitle={`Presentes em mais de ${snapshot.totalOrgaos} órgãos municipais, os APPGGs levam capacidades técnicas e repertórios sociais diversos a diferentes áreas da gestão pública: planejamento, controle, meio ambiente, governo, gestão e outras políticas setoriais.`}
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
