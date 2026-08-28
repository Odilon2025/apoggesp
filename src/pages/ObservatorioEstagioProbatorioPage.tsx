import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowDown,
  Scale,
  ShieldAlert,
  Gavel,
  Printer,
  CircleHelp,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from "lucide-react";
import {
  ATUALIZADO_EM,
  categoriasFonte,
  cautelaAssedio,
  comparativo,
  condutasAssedio,
  criteriosProbatorio,
  etapasPolitica,
  evitarDiscriminacao,
  fluxoIndividualizacao,
  fluxoPrevencao,
  formulacoesFrageis,
  fundamentos,
  hipotesesImprobidade,
  matrizRiscos,
  niveisResponsabilidade,
  perguntasAdministracao,
  perguntasDiagnostico,
  propostas,
  requisitosLegitimidade,
  riscosPsicossociais,
  usoLegitimo,
  vulnerabilidades,
  type CategoriaFonte,
  type NivelRisco,
} from "@/data/estagioProbatorio";

const nivelClasses: Record<NivelRisco, string> = {
  Alto: "bg-alert-soft text-alert border-alert/30",
  "Muito alto": "bg-danger-soft text-danger border-danger/30",
  Condicional: "bg-section-alt text-text-body border-luxury-border",
  Excepcional: "bg-section-alt text-text-body border-luxury-border",
};

const tomClasses = {
  verde: "border-safe/40 bg-safe-soft",
  ambar: "border-alert/40 bg-alert-soft",
  vermelho: "border-danger/40 bg-danger-soft",
} as const;

const Fluxo = ({ passos, tone }: { passos: string[]; tone: "danger" | "safe" }) => (
  <ol className="mt-6 space-y-1">
    {passos.map((p, i) => (
      <li key={p}>
        <div
          className={`border px-4 py-3 text-sm font-light ${
            tone === "danger"
              ? "border-danger/25 bg-danger-soft text-text-display"
              : "border-safe/25 bg-safe-soft text-text-display"
          }`}
        >
          {p}
        </div>
        {i < passos.length - 1 && (
          <div className="flex justify-center py-1" aria-hidden="true">
            <ArrowDown className="h-3 w-3 text-text-caption" />
          </div>
        )}
      </li>
    ))}
  </ol>
);

const ObservatorioEstagioProbatorioPage = () => {
  const [filtro, setFiltro] = useState<CategoriaFonte | "Todas">("Todas");

  const fundamentosFiltrados = useMemo(
    () => (filtro === "Todas" ? fundamentos : fundamentos.filter((f) => f.categoria === filtro)),
    [filtro]
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Avaliar pessoas não substitui gerir riscos",
    description:
      "Análise da APOGESP sobre o dever da Prefeitura de São Paulo de prevenir riscos psicossociais e assegurar avaliações objetivas, contextualizadas e não retaliatórias no estágio probatório.",
    author: { "@type": "Organization", name: "APOGESP" },
    publisher: { "@type": "Organization", name: "APOGESP" },
    inLanguage: "pt-BR",
    keywords:
      "APPGG, APOGESP, estágio probatório, competência socioemocional, riscos psicossociais, NR-1, Prefeitura de São Paulo, saúde do servidor, assédio moral, avaliação de desempenho, capacidade estatal, improbidade administrativa",
  };

  return (
    <PageLayout>
      <SEO
        title="Avaliação socioemocional, riscos psicossociais e estágio probatório dos APPGG"
        description="Análise da APOGESP sobre o dever da Prefeitura de São Paulo de prevenir riscos psicossociais e assegurar avaliações objetivas, contextualizadas e não retaliatórias."
        path="/observatorio-estagio-probatorio"
        ogType="article"
        jsonLd={jsonLd}
      />

      <PageHero
        label="Observatório do Estágio Probatório"
        title="Avaliar pessoas não substitui gerir riscos"
        subtitle="Competências profissionais podem e devem ser avaliadas. Mas dificuldades relacionadas a prazos, sobrecarga, conflitos, ausência de suporte e organização do trabalho não podem ser automaticamente atribuídas a limitações socioemocionais dos servidores."
      />

      {/* Abertura + tese */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="text-lg md:text-xl font-display font-normal text-text-display leading-snug text-balance">
                A Administração tem o dever de avaliar o desempenho dos servidores. Também tem o dever de
                avaliar sua própria organização: processos, chefias, recursos, prioridades, prazos e
                condições concretas de trabalho.
              </p>
              <p className="mt-6 text-sm text-text-body font-light leading-relaxed">
                O Poder Público possui dever constitucional e legal de identificar, avaliar e prevenir
                riscos decorrentes das condições e da organização do trabalho. Esta página não se opõe à
                avaliação de desempenho: examina os limites jurídicos do uso de critérios socioemocionais
                e a necessidade de diagnóstico institucional das causas organizacionais.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border border-safe/30 bg-safe-soft p-6">
                <h3 className="text-xs font-medium tracking-luxury uppercase text-safe">
                  Avaliação legítima quando
                </h3>
                <ul className="mt-4 space-y-2 text-sm font-light text-text-body">
                  {[
                    "Vinculada às atribuições do cargo",
                    "Decorrente de critérios previamente definidos",
                    "Traduzida em comportamentos observáveis",
                    "Baseada em fatos individualizados e documentados",
                    "Considerando as condições concretas de trabalho",
                    "Com acompanhamento, orientação e desenvolvimento",
                    "Com contraditório, revisão e motivação",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-safe" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-alert/30 bg-alert-soft p-6">
                <h3 className="text-xs font-medium tracking-luxury uppercase text-alert">
                  Juridicamente vulnerável quando usada para
                </h3>
                <ul className="mt-4 space-y-2 text-sm font-light text-text-body">
                  {[
                    "Explicar genericamente dificuldades organizacionais",
                    "Individualizar sobrecarga, prazos ou falta de suporte",
                    "Produzir avaliações psicológicas informais",
                    "Desqualificar críticas, denúncias ou divergências técnicas",
                    "Introduzir critérios não previstos no estágio probatório",
                    "Punir o servidor por comunicar obstáculos ao desempenho",
                    "Produzir retaliação, exclusão funcional ou ocultar falhas da Administração",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-alert" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <aside className="lg:col-span-5">
            <FadeIn delay={0.15}>
              <nav aria-label="Sumário da página" className="border border-luxury-border p-6">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption">
                  Nesta página
                </span>
                <ul className="mt-4 space-y-2 text-sm font-light">
                  {[
                    ["#tres-dimensoes", "Três dimensões que não se confundem"],
                    ["#inversao", "A inversão crítica"],
                    ["#marco-normativo", "Fundamento constitucional e municipal"],
                    ["#riscos-psicossociais", "O que são riscos psicossociais"],
                    ["#politica", "O que uma política de riscos deve conter"],
                    ["#socioemocional", "Competências socioemocionais: uso legítimo"],
                    ["#probatorio", "Estágio probatório dos APPGG"],
                    ["#assedio", "Assédio, discriminação e adaptações"],
                    ["#responsabilidade", "Responsabilidade da Administração"],
                    ["#matriz", "Matriz de riscos"],
                    ["#propostas", "O que a APOGESP defende"],
                    ["#perguntas", "Perguntas públicas à Administração"],
                    ["#fontes", "Fontes jurídicas"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-text-body hover:text-gold transition-colors duration-300"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium tracking-luxury uppercase text-text-caption hover:text-gold transition-colors duration-300"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" /> Imprimir ou salvar em PDF
                </button>
                <p className="mt-6 text-[11px] font-light text-text-caption leading-relaxed">
                  Documento de finalidade institucional e informativa. Atualizado em {ATUALIZADO_EM}. Não
                  trata de casos concretos, não menciona pessoas e não afirma a existência de improbidade
                  em situação determinada.
                </p>
              </nav>
            </FadeIn>
          </aside>
        </div>
      </section>

      {/* Três dimensões */}
      <section id="tres-dimensoes" className="py-20 md:py-24 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Formulação institucional"
            title="Três dimensões complementares que não são intercambiáveis"
            subtitle="A avaliação individual não pode substituir a investigação das causas organizacionais dos problemas."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Scale,
                titulo: "Avaliação de desempenho",
                desc: "Examina a atuação funcional do servidor segundo critérios previamente estabelecidos.",
              },
              {
                icon: ArrowRight,
                titulo: "Desenvolvimento de competências",
                desc: "Identifica capacidades que podem ser aperfeiçoadas mediante orientação, formação, feedback e experiência profissional.",
              },
              {
                icon: ShieldAlert,
                titulo: "Gestão de riscos psicossociais",
                desc: "Examina como a concepção, a organização e a gestão do trabalho podem produzir ou agravar riscos à saúde e ao desempenho.",
              },
            ].map((d, i) => (
              <FadeIn key={d.titulo} delay={i * 0.08}>
                <article className="h-full bg-card border border-luxury-border p-8">
                  <d.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-display text-text-display">{d.titulo}</h3>
                  <p className="mt-3 text-sm font-light text-text-body leading-relaxed">{d.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Inversão crítica */}
      <section id="inversao" className="py-20 md:py-28 scroll-mt-24">
        <div className="container">
          <SectionTitle label="Visual law" title="A inversão crítica" />
          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <div className="border border-luxury-border p-8 h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-danger">
                  Coluna A — Individualização do problema
                </span>
                <h3 className="mt-3 text-xl font-display text-text-display">“O problema está no servidor”</h3>
                <Fluxo passos={fluxoIndividualizacao} tone="danger" />
                <h4 className="mt-8 text-xs font-medium tracking-luxury uppercase text-text-caption">
                  Formulações frágeis
                </h4>
                <ul className="mt-4 space-y-2 text-sm font-light text-text-body">
                  {formulacoesFrageis.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="mt-5 text-xs font-light text-text-caption leading-relaxed">
                  Essas expressões são insuficientes quando não acompanhadas de fatos, critérios, contexto
                  e demonstração de relação com as atribuições funcionais.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="border border-luxury-border p-8 h-full">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-safe">
                  Coluna B — Abordagem preventiva
                </span>
                <h3 className="mt-3 text-xl font-display text-text-display">
                  “O problema deve ser investigado”
                </h3>
                <Fluxo passos={fluxoPrevencao} tone="safe" />
                <h4 className="mt-8 text-xs font-medium tracking-luxury uppercase text-text-caption">
                  Perguntas que a Administração deve responder
                </h4>
                <ul className="mt-4 space-y-2 text-sm font-light text-text-body">
                  {perguntasDiagnostico.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CircleHelp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Marco normativo */}
      <section id="marco-normativo" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Linha normativa"
            title="Prevenir riscos é dever constitucional — e obrigação municipal"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <FadeIn>
              <article className="h-full bg-card border-l-2 border-l-gold border border-luxury-border p-8">
                <h3 className="text-lg font-display text-text-display">Fundamento constitucional</h3>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A Constituição assegura a redução dos riscos inerentes ao trabalho por meio de normas de
                  saúde, higiene e segurança, direito estendido aos ocupantes de cargos públicos pelo art.
                  39, § 3º, combinado com o art. 7º, XXII.
                </p>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A diferença entre regime celetista e estatutário pode alterar os instrumentos normativos
                  aplicáveis, mas não elimina o direito do servidor à redução dos riscos relacionados ao
                  trabalho. A proteção à saúde laboral não é benefício discricionário.
                </p>
              </article>
            </FadeIn>
            <FadeIn delay={0.08}>
              <article className="h-full bg-card border-l-2 border-l-gold border border-luxury-border p-8">
                <h3 className="text-lg font-display text-text-display">Lei Orgânica, CIPA e SESMT</h3>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A Lei Orgânica determina ações de promoção, proteção, recuperação e reabilitação da saúde
                  dos trabalhadores submetidos a riscos, com controle das condições de segurança, redução
                  das nocividades e participação dos trabalhadores nas decisões.
                </p>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A Lei nº 13.174/2001 institui as CIPAs municipais, regulamentadas pelo Decreto nº
                  58.107/2018, inclusive em unidades de servidores estatutários. A Lei nº 14.641/2007
                  institui o SESMT Municipal.
                </p>
              </article>
            </FadeIn>
            <FadeIn delay={0.16}>
              <article className="h-full bg-card border-l-2 border-l-gold border border-luxury-border p-8">
                <h3 className="text-lg font-display text-text-display">NR-1: equivalência material</h3>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A NR-1 aplica-se diretamente a órgãos com empregados celetistas, estatais e terceirizados.
                  Para estatutários, não é tecnicamente correto afirmar incidência formal integral.
                </p>
                <p className="mt-4 text-sm font-light text-text-body leading-relaxed">
                  A ausência de incidência formal não afasta o dever constitucional de redução dos riscos,
                  os deveres da Lei Orgânica, as obrigações de CIPA e SESMT, nem a adoção de medidas
                  materialmente equivalentes. O regime jurídico pode ser distinto; o nível de proteção não
                  pode ser inexistente.
                </p>
              </article>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 py-2">
              <p className="text-base md:text-lg font-display text-text-display leading-snug text-balance">
                Antes de atribuir uma dificuldade ao servidor, a Administração deve verificar se o
                ambiente, os processos, os prazos e as relações de trabalho estão produzindo ou agravando o
                problema.
              </p>
            </blockquote>
            <div className="mt-8 border border-luxury-border bg-card p-6">
              <div className="flex gap-3">
                <Building2 className="h-4 w-4 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-sm font-light text-text-body leading-relaxed">
                  <strong className="font-medium text-text-display">Pergunta de controle.</strong> As
                  dificuldades relatadas pelos servidores estão sendo analisadas pelas estruturas de saúde
                  e segurança do trabalho — CIPA e SESMT — ou apenas pelos sistemas de avaliação de
                  desempenho?
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Riscos psicossociais */}
      <section id="riscos-psicossociais" className="py-20 md:py-28 scroll-mt-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle label="Conceito" title="O que são riscos psicossociais" />
            <p className="text-sm font-light text-text-body leading-relaxed">
              Riscos psicossociais não correspondem a traços pessoais, fragilidade emocional ou diagnóstico
              psicológico do trabalhador. Decorrem da interação entre o trabalhador e a forma como o
              trabalho é concebido, organizado, distribuído, supervisionado e avaliado.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="text-base md:text-lg font-display text-text-display leading-snug text-balance">
                Risco psicossocial não é sinônimo de fragilidade emocional. É risco produzido ou agravado
                pela organização e pela gestão do trabalho.
              </p>
            </blockquote>
          </div>
          <div className="lg:col-span-7">
            <FadeIn>
              <ul className="grid gap-px bg-luxury-border sm:grid-cols-2 border border-luxury-border">
                {riscosPsicossociais.map((r) => (
                  <li key={r} className="bg-card px-5 py-4 text-sm font-light text-text-body">
                    {r}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Política de riscos */}
      <section id="politica" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Infográfico"
            title="O que uma política de riscos deve conter"
            subtitle="Seis etapas encadeadas, documentadas e revisáveis."
          />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {etapasPolitica.map((e, i) => (
              <FadeIn key={e.n} delay={i * 0.06}>
                <li className="h-full bg-card border border-luxury-border p-8">
                  <span className="text-3xl font-display text-gold">{e.n}</span>
                  <h3 className="mt-4 text-base font-display text-text-display">{e.titulo}</h3>
                  <p className="mt-2 text-sm font-light text-text-body leading-relaxed">{e.desc}</p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn delay={0.1}>
            <div className="mt-10 border border-luxury-border bg-card p-8">
              <h3 className="text-xs font-medium tracking-luxury uppercase text-text-caption">
                Participação dos trabalhadores
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[
                  "Escuta protegida",
                  "Participação das entidades representativas",
                  "Consulta aos servidores",
                  "Mecanismos de relato",
                  "Proteção contra retaliação",
                  "Transparência dos resultados agregados",
                ].map((t) => (
                  <li
                    key={t}
                    className="border border-luxury-border px-3 py-1.5 text-xs font-light text-text-body"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Tabela comparativa */}
          <FadeIn delay={0.15}>
            <div className="mt-12 overflow-x-auto border border-luxury-border bg-card">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Comparação entre avaliação de competências e gestão de riscos psicossociais
                </caption>
                <thead>
                  <tr className="bg-section-alt">
                    <th scope="col" className="px-6 py-4 text-xs font-medium tracking-luxury uppercase text-text-caption">
                      Avaliação de competências
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-medium tracking-luxury uppercase text-text-caption">
                      Gestão de riscos psicossociais
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparativo.map(([a, b]) => (
                    <tr key={a} className="border-t border-luxury-border">
                      <td className="px-6 py-4 font-light text-text-body">{a}</td>
                      <td className="px-6 py-4 font-light text-text-body">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 border-l-2 border-alert bg-alert-soft px-6 py-4">
              <p className="text-sm font-light text-text-body">
                <strong className="font-medium text-alert">Alerta.</strong> Avaliação de desempenho e
                gestão de riscos são instrumentos complementares. Utilizar a primeira para substituir a
                segunda distorce ambos.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Competências socioemocionais */}
      <section id="socioemocional" className="py-20 md:py-28 scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Uso legítimo"
            title="Competências socioemocionais podem ser avaliadas — com método"
            subtitle="A Administração pode avaliar dimensões comportamentais relacionadas ao exercício do cargo."
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <h3 className="text-xs font-medium tracking-luxury uppercase text-text-caption">
                Dimensões admissíveis
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {usoLegitimo.map((t) => (
                  <li key={t} className="border border-luxury-border px-3 py-1.5 text-xs font-light text-text-body">
                    {t}
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-xs font-medium tracking-luxury uppercase text-text-caption">
                Requisitos de legitimidade
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {requisitosLegitimidade.map((t) => (
                  <li key={t} className="border border-gold/40 px-3 py-1.5 text-xs font-light text-text-body">
                    {t}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="border border-luxury-border p-8">
                <h3 className="text-xs font-medium tracking-luxury uppercase text-text-caption">
                  Exemplo de formulação
                </h3>
                <div className="mt-5 border-l-2 border-danger bg-danger-soft px-5 py-4">
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-danger">
                    Em vez de
                  </span>
                  <p className="mt-2 text-sm font-light text-text-body">
                    “O servidor não possui maturidade emocional.”
                  </p>
                </div>
                <div className="mt-4 border-l-2 border-safe bg-safe-soft px-5 py-4">
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-safe">
                    Utilizar
                  </span>
                  <p className="mt-2 text-sm font-light text-text-body">
                    “Na reunião realizada em determinada data, o servidor interrompeu reiteradamente os
                    demais participantes, apesar de orientação anterior, comprometendo a deliberação
                    coletiva.”
                  </p>
                </div>
                <p className="mt-5 text-xs font-light text-text-caption leading-relaxed">
                  A segunda formulação descreve comportamento, contexto e efeito. A primeira apenas rotula.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16">
            <h3 className="text-xs font-medium tracking-luxury uppercase text-text-caption">
              Quando a avaliação se torna juridicamente vulnerável
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {vulnerabilidades.map((v, i) => (
                <FadeIn key={v.titulo} delay={i * 0.04}>
                  <article className="h-full border border-alert/30 bg-alert-soft p-6">
                    <h4 className="text-sm font-medium text-text-display">{v.titulo}</h4>
                    <p className="mt-2 text-xs font-light text-text-body leading-relaxed">{v.desc}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estágio probatório */}
      <section id="probatorio" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Portaria SEGES nº 60/2024 e Decreto nº 57.817/2017"
            title="Estágio probatório dos APPGG"
            subtitle="A regulamentação prevê critérios determinados e procedimentos específicos. A expressão “competência socioemocional” não constitui, por si só, critério autônomo."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { titulo: "Conduta funcional", itens: criteriosProbatorio.conduta },
              { titulo: "Desempenho", itens: criteriosProbatorio.desempenho },
              { titulo: "Deveres da chefia", itens: criteriosProbatorio.chefia },
              { titulo: "Deveres da comissão", itens: criteriosProbatorio.comissao },
            ].map((bloco, i) => (
              <FadeIn key={bloco.titulo} delay={i * 0.06}>
                <article className="h-full bg-card border border-luxury-border p-8">
                  <h3 className="text-base font-display text-text-display">{bloco.titulo}</h3>
                  <ul className="mt-4 space-y-2 text-sm font-light text-text-body">
                    {bloco.itens.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="mt-8 border-l-2 border-alert bg-alert-soft px-6 py-5">
              <p className="text-sm font-light text-text-body">
                <strong className="font-medium text-alert">Contradição institucional a evitar.</strong> A
                Administração não pode obrigar o servidor a comunicar fatores que impedem seu desempenho e
                utilizar essa comunicação como elemento negativo da avaliação.
              </p>
            </div>
          </FadeIn>

          {/* Jurisprudência */}
          <FadeIn delay={0.2}>
            <h3 className="mt-16 text-xs font-medium tracking-luxury uppercase text-text-caption">
              Jurisprudência orientadora
            </h3>
            <Accordion type="single" collapsible className="mt-4 border-t border-luxury-border">
              {fundamentos
                .filter((f) => f.categoria === "Jurisprudência")
                .map((f) => (
                  <AccordionItem key={f.norma} value={f.norma} className="border-b border-luxury-border">
                    <AccordionTrigger className="text-left text-sm font-normal text-text-display hover:text-gold">
                      {f.norma} — {f.artigo}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-light text-text-body leading-relaxed">
                      {f.sintese}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
            <p className="mt-6 text-sm font-light text-text-body leading-relaxed max-w-3xl">
              <strong className="font-medium text-text-display">Síntese.</strong> O Poder Judiciário não
              substitui a Administração na atribuição de notas, mas controla critérios, procedimento,
              motivação, finalidade, documentação, contraditório e correspondência entre os fatos e a
              conclusão.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Assédio e discriminação */}
      <section id="assedio" className="py-20 md:py-28 scroll-mt-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle label="Lei Municipal nº 13.288/2002" title="Assédio moral" />
            <p className="text-sm font-light text-text-body leading-relaxed">
              A lei prevê responsabilização administrativa por assédio moral. Podem integrar práticas de
              assédio, quando reiteradas:
            </p>
            <ul className="mt-5 space-y-2 text-sm font-light text-text-body">
              {condutasAssedio.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="mt-8 border border-luxury-border p-6">
              <h3 className="text-xs font-medium tracking-luxury uppercase text-text-caption">
                Cautela jurídica
              </h3>
              <p className="mt-3 text-sm font-light text-text-body leading-relaxed">
                Uma manifestação isolada ou uma avaliação desfavorável não comprova assédio moral. É
                necessário examinar: {cautelaAssedio.join(", ").toLowerCase()}.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="text-base font-display text-text-display leading-snug text-balance">
                A avaliação deixa de ser instrumento de desenvolvimento quando passa a integrar um padrão
                de humilhação, exclusão, intimidação ou retaliação.
              </p>
            </blockquote>
          </div>
          <div>
            <SectionTitle
              label="Lei nº 13.146/2015"
              title="Discriminação e adaptações razoáveis"
            />
            <p className="text-sm font-light text-text-body leading-relaxed">
              A avaliação de competências socioemocionais pode produzir riscos adicionais quando aplicada a
              pessoas com deficiência, neurodivergência ou condições de saúde. A Administração deve evitar:
            </p>
            <ul className="mt-5 space-y-2 text-sm font-light text-text-body">
              {evitarDiscriminacao.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div className="mt-8 border border-safe/30 bg-safe-soft p-6">
              <h3 className="text-xs font-medium tracking-luxury uppercase text-safe">
                Princípio orientador
              </h3>
              <p className="mt-3 text-sm font-light text-text-body leading-relaxed">
                Diferenças de comunicação, interação ou processamento não podem ser automaticamente
                tratadas como falhas funcionais. Quando necessária, a Administração deve avaliar adaptações
                razoáveis antes de concluir pela inadequação do servidor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilidade */}
      <section id="responsabilidade" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Matriz de responsabilização"
            title="Responsabilidade da Administração"
            subtitle="Quatro níveis distintos. Nem toda irregularidade é ilegalidade; nem toda ilegalidade é improbidade."
          />
          <div className="space-y-4">
            {niveisResponsabilidade.map((n, i) => (
              <FadeIn key={n.nivel} delay={i * 0.06}>
                <article
                  className={`border-l-2 border ${tomClasses[n.tom]} p-8`}
                  style={{ marginInline: `${i * 0}px` }}
                >
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption">
                    {n.nivel}
                  </span>
                  <h3 className="mt-2 text-lg font-display text-text-display">{n.titulo}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {n.itens.map((t) => (
                      <li
                        key={t}
                        className="border border-luxury-border bg-card px-3 py-1.5 text-xs font-light text-text-body"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-10 border border-luxury-border bg-card p-8">
              <div className="flex gap-3">
                <Gavel className="h-4 w-4 mt-1 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-light text-text-body leading-relaxed">
                    Nem toda ilegalidade é improbidade. Entretanto, a manipulação dolosa de avaliações, a
                    falsificação de motivos, a retaliação deliberada ou o uso do estágio probatório para
                    finalidade ilícita podem ultrapassar a má gestão e justificar apuração por improbidade.
                  </p>
                  <h3 className="mt-6 text-xs font-medium tracking-luxury uppercase text-text-caption">
                    Hipóteses que podem justificar apuração aprofundada
                  </h3>
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 text-sm font-light text-text-body">
                    {hipotesesImprobidade.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-light text-text-caption">
                    A mera adoção de modelo gerencial inadequado, sem dolo demonstrado, não é suficiente.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Matriz de riscos */}
      <section id="matriz" className="py-20 md:py-28 scroll-mt-24">
        <div className="container">
          <SectionTitle label="Diagnóstico" title="Matriz de riscos" />
          <div className="overflow-x-auto border border-luxury-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Matriz de riscos do processo avaliativo</caption>
              <thead>
                <tr className="bg-section-alt">
                  <th scope="col" className="px-6 py-4 text-xs font-medium tracking-luxury uppercase text-text-caption">
                    Risco
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-medium tracking-luxury uppercase text-text-caption">
                    Situação
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-medium tracking-luxury uppercase text-text-caption">
                    Nível
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrizRiscos.map((r) => (
                  <tr key={r.risco} className="border-t border-luxury-border">
                    <td className="px-6 py-4 font-medium text-text-display">{r.risco}</td>
                    <td className="px-6 py-4 font-light text-text-body">{r.situacao}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block border px-3 py-1 text-xs font-medium ${nivelClasses[r.nivel]}`}>
                        {r.nivel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Propostas */}
      <section id="propostas" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Posição institucional"
            title="Não defendemos ausência de avaliação. Defendemos avaliação legítima."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propostas.map((p, i) => (
              <FadeIn key={p.titulo} delay={i * 0.05}>
                <article className="h-full bg-card border border-luxury-border p-8">
                  <span className="text-2xl font-display text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-base font-display text-text-display">{p.titulo}</h3>
                  <p className="mt-2 text-sm font-light text-text-body leading-relaxed">{p.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisprudência de primeiro grau */}
      <section id="jurisprudencia" className="py-20 md:py-28 scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Controle judicial"
            title="Jurisprudência aplicável"
            subtitle="Precedentes que indicam os limites da avaliação funcional e o dever de investigar as condições de trabalho."
          />
          <div className="overflow-x-auto border border-luxury-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-luxury-border bg-section-alt">
                  <th scope="col" className="px-6 py-4 text-[10px] font-medium tracking-luxury uppercase text-text-caption">
                    Precedente
                  </th>
                  <th scope="col" className="px-6 py-4 text-[10px] font-medium tracking-luxury uppercase text-text-caption">
                    Tese que sustenta
                  </th>
                  <th scope="col" className="px-6 py-4 text-[10px] font-medium tracking-luxury uppercase text-text-caption">
                    Aderência
                  </th>
                </tr>
              </thead>
              <tbody>
                {jurisprudenciaTJ.map((j) => (
                  <tr key={j.processo} className="border-b border-luxury-border last:border-0 bg-card">
                    <td className="px-6 py-5 align-top whitespace-nowrap font-medium text-text-display">
                      {j.processo}
                    </td>
                    <td className="px-6 py-5 align-top font-light text-text-body leading-relaxed">
                      {j.tese}
                    </td>
                    <td className="px-6 py-5 align-top whitespace-nowrap">
                      <span
                        className={`inline-block border px-3 py-1 text-[10px] font-medium tracking-luxury uppercase ${
                          j.aderencia === "Muito alta"
                            ? "border-safe/30 bg-safe-soft text-safe"
                            : j.aderencia === "Alta"
                              ? "border-gold/40 bg-gold/10 text-gold"
                              : "border-luxury-border bg-section-alt text-text-body"
                        }`}
                      >
                        {j.aderencia}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[11px] font-light text-text-caption leading-relaxed">
            Referências de âmbito estadual (TJSP), indicadas como orientação argumentativa. A última linha
            registra o contraponto: avaliações documentadas, motivadas e precedidas de acompanhamento não
            são invalidadas por alegações genéricas — razão pela qual a APOGESP defende avaliação legítima,
            e não ausência de avaliação.
          </p>
        </div>
      </section>

      {/* Fontes jurídicas com filtro */}
      <section id="fontes" className="py-20 md:py-28 bg-section-alt scroll-mt-24">
        <div className="container">
          <SectionTitle
            label="Fundamentos"
            title="Fontes jurídicas"
            subtitle="Cada fundamento indica norma, dispositivo, síntese e natureza da incidência."
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar fontes por categoria">
            {(["Todas", ...categoriasFonte] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filtro === c}
                onClick={() => setFiltro(c as CategoriaFonte | "Todas")}
                className={`border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 ${
                  filtro === c
                    ? "border-gold bg-gold/10 text-text-display"
                    : "border-luxury-border bg-card text-text-body hover:border-gold/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {fundamentosFiltrados.map((f) => (
              <li key={f.norma + f.artigo} className="bg-card border border-luxury-border p-8">
                <span className="text-[10px] font-medium tracking-luxury uppercase text-gold">
                  {f.natureza}
                </span>
                <h3 className="mt-3 text-base font-display text-text-display">{f.norma}</h3>
                <p className="mt-1 text-xs font-medium text-text-caption">{f.artigo}</p>
                <p className="mt-3 text-sm font-light text-text-body leading-relaxed">{f.sintese}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-light text-text-caption">
            Complementarmente: materiais oficiais do Ministério do Trabalho sobre riscos psicossociais e
            jurisprudência sobre assédio moral e retaliação no serviço público. Atualizado em{" "}
            {ATUALIZADO_EM}.
          </p>
        </div>
      </section>

      {/* Chamada final */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <FadeIn>
            <span className="text-[10px] font-medium tracking-luxury uppercase opacity-50">
              Síntese editorial
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-display font-normal leading-tight max-w-3xl text-balance">
              Quem avalia também deve ser avaliado
            </h2>
            <p className="mt-6 text-sm md:text-base font-light opacity-70 max-w-2xl leading-relaxed">
              A capacidade estatal não depende apenas da seleção de bons profissionais. Depende de
              processos claros, chefias responsáveis, ambientes seguros e instituições capazes de aprender
              com a crítica. Avaliar o servidor sem avaliar a organização do trabalho produz diagnóstico
              incompleto e pode produzir injustiça.
            </p>
            <p className="mt-8 text-base md:text-lg font-display leading-snug max-w-2xl text-balance">
              Competência profissional deve ser desenvolvida e avaliada. Risco institucional deve ser
              identificado e corrigido. Confundir essas duas dimensões fragiliza o servidor, a
              Administração e a própria capacidade estatal.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#fontes"
                className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3 text-xs font-medium tracking-luxury uppercase hover:bg-gold/10 transition-colors duration-300"
              >
                Conheça os fundamentos jurídicos <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="#propostas"
                className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-xs font-medium tracking-luxury uppercase hover:border-primary-foreground/50 transition-colors duration-300"
              >
                Consulte as propostas da APOGESP
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-xs font-medium tracking-luxury uppercase hover:border-primary-foreground/50 transition-colors duration-300"
              >
                Relate uma situação
              </Link>
            </div>
            <p className="mt-10 text-[11px] font-light opacity-40 max-w-2xl leading-relaxed">
              Conteúdo de finalidade institucional e informativa, orientado à melhoria das práticas
              administrativas. Não se refere a pessoas determinadas, não atribui responsabilidade
              individual sem decisão ou apuração e não afirma a existência de improbidade em caso concreto.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default ObservatorioEstagioProbatorioPage;
