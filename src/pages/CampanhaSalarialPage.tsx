import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePageFields } from "@/hooks/useCMS";
import { field, getSnapshot } from "@/lib/cms";
import { ArrowRight, TrendingDown, Scale, AlertTriangle, Users, LineChart, FileCheck2, Shield, Eye, Receipt, Landmark, Gavel, Building2, ClipboardCheck, Coins, Briefcase } from "lucide-react";
import SEO from "@/components/SEO";

// Ordenação: prioridade para temas de eficiência fiscal, segurança, controle de
// contratos, redução de desperdício e modernização — pautas que mais ressoam
// com leitores de centro-direita interessados em resultado e responsabilidade.
const projetosAltoImpacto = [
  {
    icon: Receipt,
    titulo: "CADIN IPTU — Recuperação de Inadimplência",
    area: "Arrecadação · Fazenda/Lab11",
    metrica: "+R$ 60 milhões em arrecadação · 15.348 contribuintes no experimento",
    desc: "Redesenho do comunicado de cobrança validado em experimento randomizado. A versão vencedora elevou a regularização em 8,4%. Eficiência fiscal mensurável: cada real investido em inteligência retornou multiplicado.",
  },
  {
    icon: Shield,
    titulo: "CompStat Paulistano — Reforma dos Indicadores da GCM",
    area: "Segurança Urbana · SMSU",
    metrica: "Roteiros diários de policiamento baseados em dados de criminalidade",
    desc: "Substituição do modelo rígido de quantidade de rondas por arquitetura de indicadores que cruza criminalidade, produtividade policial e proteção de equipamentos públicos. Policiamento orientado por evidências.",
  },
  {
    icon: FileCheck2,
    titulo: "Contratos.gov.br na Prefeitura",
    area: "Compras & Contratos · SEGES",
    metrica: "11 mil contratações · ~60 órgãos · integração federal",
    desc: "Implementação do sistema federal de gestão contratual em conformidade com a Lei 14.133/2021. Padronização ponta a ponta do ciclo de contratação, com integração ao Compras.gov.br e ao PNCP.",
  },
  {
    icon: Eye,
    titulo: "Dronepol — Monitoramento Aéreo de Segurança Urbana",
    area: "Segurança Urbana · SMSU",
    metrica: "Menção honrosa Premia Sampa · referência nacional",
    desc: "Incorporação de veículos aéreos não tripulados no planejamento e suporte de atividades de policiamento e defesa civil. Equipe especializada treinada internamente. Referência para forças policiais do Brasil.",
  },
  {
    icon: Coins,
    titulo: "Revisão de Renúncias Fiscais",
    area: "Receita & Política Tributária · SF",
    metrica: "Mapeamento de benefícios fiscais e custo-efetividade",
    desc: "Análise técnica das renúncias tributárias municipais, identificando incentivos com baixo retorno social e econômico. Insumo para decisões de cortar gastos tributários ineficientes e proteger a base de arrecadação.",
  },
  {
    icon: ClipboardCheck,
    titulo: "Painel de Acompanhamento de Obras",
    area: "Infraestrutura · SIURB/SEPLAN",
    metrica: "Visibilidade ponta a ponta do cronograma físico-financeiro",
    desc: "Monitoramento centralizado de obras públicas, com indicadores de execução, desvios de cronograma e empenhos. Reduz espaço para aditivos abusivos e dá transparência ao contribuinte sobre cada real investido.",
  },
  {
    icon: LineChart,
    titulo: "SMAE — Sistema de Acompanhamento Estratégico",
    area: "Planejamento · SEPLAN/FGV",
    metrica: "500+ usuários · 5 módulos · patrimônio público permanente",
    desc: "Plataforma que substituiu planilhas e e-mails no monitoramento do Programa de Metas, Planos Setoriais, Projetos, Obras e Transferências Voluntárias. Decreto tornou o sistema patrimônio público permanente.",
  },
  {
    icon: Gavel,
    titulo: "Implementação da Nova Lei de Licitações",
    area: "Compras & Contratos · SEGES/PGM",
    metrica: "Capacitação de pregoeiros e padronização de editais",
    desc: "Adequação da Prefeitura à Lei 14.133/2021: novos fluxos de planejamento, gestão de riscos, matriz de responsabilidades e modelos de edital. Mais segurança jurídica e menos contestação em contratações.",
  },
  {
    icon: AlertTriangle,
    titulo: "Comitê de Proteção Escolar",
    area: "Segurança Institucional · SME/SMSU",
    metrica: "Protocolos emergenciais e preventivos · articulação intersecretarial",
    desc: "Protocolos integrados de prevenção, intervenção e pós-venção para violência contra escolas. Mapeamento de iniciativas, revisão de protocolos e minuta de decreto. Decisões técnicas, não ideológicas.",
  },
  {
    icon: Landmark,
    titulo: "Concessões e Parcerias Público-Privadas",
    area: "Desestatização · SGM/SF",
    metrica: "Modelagem técnica de ativos para concessão ao setor privado",
    desc: "Apoio técnico na estruturação de PPPs e concessões de parques, mercados, iluminação e equipamentos urbanos. Atração de investimento privado, redução de custo fiscal e modernização de serviços.",
  },
  {
    icon: Building2,
    titulo: "Reforma Administrativa Municipal",
    area: "Gestão de Pessoas · SGM/SUBSEC",
    metrica: "Diagnóstico de cargos, funções e produtividade",
    desc: "Estudos técnicos para racionalização da máquina pública: revisão de estruturas, eliminação de sobreposições e foco em entregas. Estado menor, mais ágil e orientado a resultado.",
  },
  {
    icon: Briefcase,
    titulo: "Desburocratização do Ambiente de Negócios",
    area: "Desenvolvimento Econômico · SMDET",
    metrica: "Redução de prazos e exigências para alvarás e licenças",
    desc: "Revisão de processos de licenciamento e abertura de empresas, com digitalização e padronização de exigências. Menos burocracia para empreendedores, mais formalização e geração de emprego.",
  },
];

const tabelaComparativa = [
  { ref: "1", appgg: "13.208,14", eppgg: "20.000,00", niteroi: "18.230,97" },
  { ref: "2", appgg: "14.528,96", eppgg: "20.565,95", niteroi: "19.377,87" },
  { ref: "3", appgg: "14.892,18", eppgg: "21.147,92", niteroi: "20.524,74" },
  { ref: "4", appgg: "15.264,48", eppgg: "21.746,35", niteroi: "21.671,64" },
  { ref: "5", appgg: "15.646,09", eppgg: "22.361,72", niteroi: "22.818,56" },
  { ref: "6", appgg: "16.037,24", eppgg: "23.645,19", niteroi: "23.965,43" },
  { ref: "7", appgg: "17.961,73", eppgg: "24.314,29", niteroi: "25.112,33" },
  { ref: "8", appgg: "18.410,77", eppgg: "25.002,32", niteroi: "26.259,23" },
  { ref: "9", appgg: "18.871,04", eppgg: "25.709,82", niteroi: "27.472,41" },
  { ref: "10", appgg: "19.342,80", eppgg: "26.437,35", niteroi: "28.553,01" },
  { ref: "11", appgg: "19.826,39", eppgg: "27.759,21", niteroi: "—" },
  { ref: "12", appgg: "21.869,74", eppgg: "28.544,73", niteroi: "—" },
  { ref: "13", appgg: "22.416,47", eppgg: "29.352,48", niteroi: "—" },
  { ref: "14", appgg: "22.976,89", eppgg: "30.183,08", niteroi: "—" },
  { ref: "15", appgg: "23.551,31", eppgg: "31.037,19", niteroi: "—" },
  { ref: "16", appgg: "—", eppgg: "32.818,59", niteroi: "—" },
  { ref: "17", appgg: "—", eppgg: "33.747,27", niteroi: "—" },
  { ref: "18", appgg: "—", eppgg: "34.702,24", niteroi: "—" },
  { ref: "19", appgg: "—", eppgg: "35.684,22", niteroi: "—" },
  { ref: "20", appgg: "—", eppgg: "36.694,00", niteroi: "—" },
];

const argumentos = [
  {
    icon: TrendingDown,
    titulo: "Defasagem Frente ao Governo Federal",
    desc: "O APPGG paulistano inicia a carreira com R$ 13.208 — 34% abaixo do piso do EPPGG federal em 2026 (R$ 20.000). No topo, a diferença chega a R$ 13.143, uma distância de 56%.",
  },
  {
    icon: Users,
    titulo: "Defasagem Entre Municípios",
    desc: "Em Niterói, o APPGG — cargo equivalente — pode alcançar R$ 28.553 no topo com gratificação. O APPGG de São Paulo, maior cidade do país, fica R$ 5.000 abaixo.",
  },
  {
    icon: Scale,
    titulo: "Mesma Missão, Remuneração Desigual",
    desc: "APPGGs e EPPGGs exercem funções análogas: formulação, implementação e avaliação de políticas públicas. A diferença não está na complexidade do trabalho, mas no ente que remunera.",
  },
  {
    icon: AlertTriangle,
    titulo: "Risco de Evasão",
    desc: "Sem recomposição, a carreira perde competitividade frente ao governo federal, a outros municípios e ao setor privado. Cada analista que sai leva consigo anos de conhecimento institucional irrecuperável.",
  },
];

const CampanhaSalarialPage = () => {
  const f = usePageFields("campanha-salarial");
  const [snap, setSnap] = useState<any>(null);
  useEffect(() => {
    getSnapshot().then(setSnap);
  }, []);

  const total = snap?.total ?? 195;
  const totalOrgaos = snap?.totalOrgaos ?? 23;
  const lideranca = snap?.indicadores?.lideranca ?? 57;
  const liderancaPct = snap?.indicadores?.liderancaPct ?? 30.8;
  const concursos = Array.isArray(snap?.ingresso) ? snap.ingresso.length : 6;

  return (
    <PageLayout>
      <SEO title="Campanha pela Recomposi\u00e7\u00e3o Salarial | APOGESP" description="Dados, fundamentos e atualiza\u00e7\u00f5es da campanha pela recomposi\u00e7\u00e3o salarial da carreira de Analistas de Pol\u00edticas P\u00fablicas e Gest\u00e3o Governamental de S\u00e3o Paulo." path="/campanha-salarial" />
      <PageHero
        label={field(f, "campanha-salarial.hero.label", "Campanha 2026")}
        title={field(f, "campanha-salarial.hero.titulo", "Remuneração Justa para Quem Constrói a Cidade")}
        subtitle={field(f, "campanha-salarial.hero.subtitulo", "Uma carreira estratégica não sobrevive com remuneração defasada. Conheça os números, compare com o governo federal e com outros municípios — e entenda por que a recomposição salarial dos APPGGs é urgente.")}
      />

      {/* Contexto narrativo */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <SectionTitle
                label={field(f, "campanha-salarial.problema.label", "O Problema")}
                title={field(f, "campanha-salarial.problema.titulo", "Uma Década Sem Equiparação")}
                subtitle={field(f, "campanha-salarial.problema.subtitulo", "Em 2015, a carreira de APPGG foi criada como espelho municipal do EPPGG federal. Dez anos depois, a remuneração não acompanhou — nem o governo federal, nem municípios como Niterói.")}
              />
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {argumentos.map((arg, i) => (
                  <FadeIn key={arg.titulo} delay={i * 0.1}>
                    <div className="p-8 bg-section-alt border-b border-luxury-border">
                      <div className="flex items-start gap-4">
                        <arg.icon size={20} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-base font-display font-normal text-foreground mb-2">{arg.titulo}</h3>
                          <p className="text-sm font-light text-text-body leading-relaxed">{arg.desc}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela Comparativa Única */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label={field(f, "campanha-salarial.comparativo.label", "Comparativo")}
            title={field(f, "campanha-salarial.comparativo.titulo", "O Mesmo Trabalho, Três Realidades")}
            subtitle={field(f, "campanha-salarial.comparativo.subtitulo", "Remuneração por nível de progressão na carreira. APPGG (São Paulo), EPPGG (Federal, 2026) e APPGG (Niterói, com gratificação de 50%).")}
          />
          <FadeIn>
            <div className="overflow-x-auto mt-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-luxury-border">
                    <th className="text-left text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3 pr-4">Nível</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3 px-4">APPGG · SP (R$)</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3 px-4">EPPGG · Federal (R$)</th>
                    <th className="text-right text-[10px] font-medium tracking-luxury uppercase text-text-caption py-3 pl-4">APPGG · Niterói (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {tabelaComparativa.map((row, i) => {
                    const isFirst = i === 0;
                    const isLastAppgg = i === 14;
                    const isLastEppgg = i === 19;
                    const highlight = isFirst || isLastAppgg || isLastEppgg;
                    return (
                      <tr key={row.ref} className={`border-b border-luxury-border ${highlight ? "bg-gold/5" : ""}`}>
                        <td className="py-3 text-sm font-light text-text-caption pr-4">{row.ref}</td>
                        <td className={`py-3 text-sm text-right px-4 ${row.appgg === "—" ? "text-text-caption" : "font-light text-foreground"}`}>{row.appgg}</td>
                        <td className={`py-3 text-sm text-right px-4 ${row.eppgg === "—" ? "text-text-caption" : "font-light text-gold"}`}>{row.eppgg}</td>
                        <td className={`py-3 text-sm text-right pl-4 ${row.niteroi === "—" ? "text-text-caption" : "font-light text-gold-muted"}`}>{row.niteroi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xs font-light text-text-caption mt-6 max-w-3xl">
              {field(f, "campanha-salarial.comparativo.fontes", "Fontes: Lei nº 18.235/2025 (APPGG SP); MP nº 1.286/2024 (EPPGG Federal); Diário Oficial de Niterói, 28/11/2025 (APPGG Niterói, com gratificação de desempenho de 50%).")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <CMSMarkdown
              fields={f}
              fieldKey="campanha-salarial.comparativo.sintese"
              fallback="O APPGG de São Paulo — maior metrópole da América Latina — recebe **27% menos** que o cargo equivalente em Niterói e **34% menos** que o EPPGG federal no início da carreira. No topo, a defasagem frente ao governo federal chega a **56%**."
              className="text-center text-sm font-light text-text-body mt-10 max-w-2xl mx-auto leading-relaxed"
            />
          </FadeIn>
        </div>
      </section>

      {/* Dados Concretos: Importância da carreira + Risco de evasão */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle
            label={field(f, "campanha-salarial.dados.label", "Dados Concretos")}
            title={field(f, "campanha-salarial.dados.titulo", "Por Que Essa Carreira Importa para a Cidade")}
            subtitle={field(f, "campanha-salarial.dados.subtitulo", "A defasagem salarial não é uma questão corporativa. É uma questão de continuidade das políticas públicas municipais — e os números mostram o tamanho do que está em jogo.")}
          />

          {/* Bloco A — Impacto da carreira */}
          <FadeIn>
            <div className="mt-4 mb-16">
              <p className="text-sm md:text-base font-light text-text-body leading-relaxed max-w-3xl">
                {field(
                  f,
                  "campanha-salarial.dados.impacto.texto",
                  "A carreira APPGG é hoje um tecido técnico distribuído pela administração direta da Prefeitura. Não substitui ninguém — colabora com gestores, dirigentes e demais carreiras na formulação, implementação e avaliação de políticas públicas."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-luxury-border border border-luxury-border mb-24">
            {[
              { num: String(total), label: "APPGGs em exercício" },
              { num: String(totalOrgaos), label: "órgãos com APPGGs colaborando" },
              { num: String(lideranca), label: `em coordenação e liderança · ${liderancaPct.toFixed(0)}% do quadro` },
              { num: String(concursos), label: "concursos realizados desde 2016" },
            ].map((kpi, i) => (
              <FadeIn key={kpi.label} delay={i * 0.08}>
                <div className="bg-card p-8 h-full flex flex-col justify-between min-h-[160px]">
                  <span className="text-4xl md:text-5xl font-display font-normal text-gold leading-none">{kpi.num}</span>
                  <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption mt-6 leading-relaxed">
                    {kpi.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bloco B — Risco de evasão */}
          <div className="border-t border-luxury-border pt-16">
            <FadeIn>
              <h3 className="text-xl md:text-2xl font-display font-normal text-foreground mb-6 max-w-2xl">
                {field(f, "campanha-salarial.dados.risco.titulo", "O custo de não recompor")}
              </h3>
              <p className="text-sm md:text-base font-light text-text-body leading-relaxed max-w-3xl mb-12">
                {field(
                  f,
                  "campanha-salarial.dados.risco.texto",
                  "Cada APPGG que sai leva conhecimento institucional irrecuperável. O Observatório de Evasões da APOGESP acompanha exonerações a pedido, licenças sem vencimento, cedências e aposentadorias — quatro vetores que, somados à defasagem salarial, comprometem a continuidade das políticas públicas municipais."
                )}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-luxury-border border border-luxury-border">
              {[
                { num: "195", suffix: "/ 300", label: "APPGGs em exercício · 105 vagas em aberto no quadro" },
                { num: "27", suffix: "", label: "exonerações a pedido — perda técnica irrecuperável" },
                { num: "8", suffix: "", label: "em licença para interesse particular (LIP)" },
                { num: "14", suffix: "", label: "afastados para outros órgãos (cedências e colaborações)" },
                { num: "34%", suffix: "", label: "abaixo do piso federal no ingresso — vetor direto de evasão" },
              ].map((kpi, i) => (
                <FadeIn key={kpi.label} delay={i * 0.08}>
                  <div className="bg-card p-8 h-full flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-display font-normal text-gold leading-none">{kpi.num}</span>
                      {kpi.suffix && (
                        <span className="text-xs font-light text-text-caption uppercase tracking-luxury">{kpi.suffix}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption mt-6 leading-relaxed">
                      {kpi.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <Link
                to="/observatorio-evasoes"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-10"
              >
                <span>Conheça o Observatório de Evasões</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projetos de Alto Impacto */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container">
          <SectionTitle
            label={field(f, "campanha-salarial.projetos.label", "Projetos de Alto Impacto")}
            title={field(f, "campanha-salarial.projetos.titulo", "O Que a Cidade Construiu com a Colaboração de APPGGs")}
            subtitle={field(f, "campanha-salarial.projetos.subtitulo", "Uma seleção de iniciativas em segurança urbana, arrecadação, controle de contratos, planejamento estratégico e transparência — áreas em que APPGGs colaboraram na entrega de resultados concretos e mensuráveis para a cidade.")}
          />

          <FadeIn>
            <p className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mt-4 mb-3">
              {projetosAltoImpacto.length} projetos · role para ver todos
            </p>
            <ScrollArea className="h-[640px] border border-luxury-border bg-luxury-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {projetosAltoImpacto.map((p) => (
                  <article key={p.titulo} className="bg-card p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-5">
                      <p.icon size={20} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-[10px] font-medium tracking-luxury uppercase text-text-caption mb-2">{p.area}</p>
                        <h3 className="text-base md:text-lg font-display font-normal text-foreground leading-snug">{p.titulo}</h3>
                      </div>
                    </div>
                    <p className="text-sm font-light text-text-body leading-relaxed mb-6 flex-1">{p.desc}</p>
                    <div className="pt-4 border-t border-luxury-border">
                      <p className="text-xs font-light text-gold-muted tracking-wide">{p.metrica}</p>
                    </div>
                  </article>
                ))}
              </div>
            </ScrollArea>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xs font-light text-text-caption mt-8 max-w-3xl">
              {field(f, "campanha-salarial.projetos.nota", "Recorte ilustrativo. APPGGs sempre colaboram — nunca substituem gestores, dirigentes ou demais carreiras. A continuidade desses resultados depende de uma carreira competitiva o suficiente para reter o conhecimento institucional acumulado.")}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link
              to="/atuacao"
              className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-6"
            >
              <span>Veja todos os casos de atuação</span>
              <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-card">


        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground leading-tight text-balance italic">
                "{field(f, "campanha-salarial.cta.frase", "Não se trata de privilégio. Trata-se de reter os profissionais que a cidade precisa para funcionar.")}"
              </h2>
              <div className="luxury-divider mt-6 mb-4" />
              <p className="text-[11px] font-light text-text-caption tracking-wide">{field(f, "campanha-salarial.cta.assinatura", "APOGESP — Campanha Salarial 2026")}</p>
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 text-sm font-light text-accent hover:text-foreground transition-colors duration-300 mt-8"
              >
                <span>{field(f, "campanha-salarial.cta.link", "Apoie a campanha")}</span>
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CampanhaSalarialPage;
