import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

interface CasoAtuacao {
  titulo: string;
  area: string;
  contexto: string;
  atuacao: string;
  resultados: string;
}

const areas = ["Todas", "Saúde", "Educação", "Assistência Social", "Mobilidade", "Cultura", "Gestão e Inovação", "Fazenda e Planejamento", "Desenvolvimento Econômico"];

const casos: CasoAtuacao[] = [
  {
    titulo: "Reestruturação da Atenção Básica",
    area: "Saúde",
    contexto: "Necessidade de reorganização dos serviços de atenção básica com foco em territorialização e equidade.",
    atuacao: "APPGGs participaram do redesenho dos fluxos de atendimento, criação de indicadores de desempenho e monitoramento de metas por território.",
    resultados: "Melhoria na cobertura territorial e no acompanhamento de indicadores de saúde por região.",
  },
  {
    titulo: "Sistema de Avaliação da Qualidade do Ensino",
    area: "Educação",
    contexto: "Ausência de um sistema integrado de monitoramento da qualidade educacional na rede municipal.",
    atuacao: "Formulação de modelo de avaliação baseado em evidências, com coleta de dados padronizada e análise comparativa entre unidades.",
    resultados: "Implantação de painel de indicadores educacionais e subsídios para políticas de formação docente.",
  },
  {
    titulo: "Plano Municipal de Assistência Social",
    area: "Assistência Social",
    contexto: "Necessidade de atualização do plano municipal com diagnóstico territorial e participação social.",
    atuacao: "Coordenação técnica do processo de elaboração, incluindo sistematização de dados e facilitação de audiências públicas.",
    resultados: "Aprovação do novo plano com metas e indicadores alinhados ao SUAS.",
  },
  {
    titulo: "Modernização do Bilhete Único",
    area: "Mobilidade",
    contexto: "Demanda por modernização do sistema de bilhetagem eletrônica de transporte público.",
    atuacao: "Análise de modelos internacionais, elaboração de termos de referência e acompanhamento de processos licitatórios.",
    resultados: "Contribuição para a especificação técnica do novo sistema de bilhetagem.",
  },
  {
    titulo: "Programa de Fomento à Cultura nas Periferias",
    area: "Cultura",
    contexto: "Baixa capilaridade dos programas de fomento cultural em territórios periféricos.",
    atuacao: "Mapeamento de equipamentos culturais, análise de distribuição de recursos e proposta de critérios de priorização territorial.",
    resultados: "Redistribuição de editais com critérios de vulnerabilidade social e territorial.",
  },
  {
    titulo: "Implantação do Programa de Metas",
    area: "Gestão e Inovação",
    contexto: "Obrigatoriedade legal de apresentação de Programa de Metas no início de cada gestão.",
    atuacao: "Coordenação técnica da metodologia de construção, monitoramento e prestação de contas do programa.",
    resultados: "Consolidação de ciclos de monitoramento e relatórios públicos de acompanhamento.",
  },
  {
    titulo: "Reforma da Governança Orçamentária",
    area: "Fazenda e Planejamento",
    contexto: "Fragmentação dos processos de planejamento e execução orçamentária entre secretarias.",
    atuacao: "Desenho de novo modelo de governança orçamentária com integração entre PPA, LOA e execução setorial.",
    resultados: "Maior articulação entre planejamento e orçamento, com redução de remanejamentos não planejados.",
  },
  {
    titulo: "Estratégia Municipal de Desenvolvimento Econômico",
    area: "Desenvolvimento Econômico",
    contexto: "Necessidade de uma visão integrada para políticas de emprego, renda e desenvolvimento local.",
    atuacao: "Elaboração de diagnóstico econômico territorial e proposta de eixos estratégicos para políticas de desenvolvimento.",
    resultados: "Documento base para articulação de programas de emprego e qualificação profissional.",
  },
];

const AtuacaoPage = () => {
  const [areaFiltro, setAreaFiltro] = useState("Todas");
  const casosFiltrados = areaFiltro === "Todas" ? casos : casos.filter((c) => c.area === areaFiltro);

  return (
    <PageLayout>
      <PageHero
        title="Atuação dos APPGGs"
        subtitle="Casos concretos de contribuição dos Analistas de Políticas Públicas e Gestão Governamental para a administração municipal."
      />

      <section className="py-16 bg-card">
        <div className="container">
          <SectionTitle title="Casos de Atuação" subtitle="Exemplos organizados por área temática." />

          {/* Filtro simples */}
          <div className="flex flex-wrap gap-2 mb-8">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setAreaFiltro(area)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                  areaFiltro === area
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {casosFiltrados.map((caso) => (
              <article key={caso.titulo} className="p-6 border border-border rounded bg-card">
                <span className="text-xs font-medium text-accent uppercase tracking-wide">{caso.area}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-3 font-serif">{caso.titulo}</h3>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <span className="font-medium text-foreground">Contexto: </span>
                    {caso.contexto}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Atuação dos APPGGs: </span>
                    {caso.atuacao}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Resultados: </span>
                    {caso.resultados}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AtuacaoPage;
