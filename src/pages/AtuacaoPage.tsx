import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

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
    atuacao: "Redesenho dos fluxos de atendimento, criação de indicadores de desempenho e monitoramento de metas por território.",
    resultados: "Melhoria na cobertura territorial e no acompanhamento de indicadores de saúde por região.",
  },
  {
    titulo: "Sistema de Avaliação da Qualidade do Ensino",
    area: "Educação",
    contexto: "Ausência de sistema integrado de monitoramento da qualidade educacional na rede municipal.",
    atuacao: "Formulação de modelo de avaliação baseado em evidências, com coleta padronizada e análise comparativa.",
    resultados: "Implantação de painel de indicadores educacionais e subsídios para políticas de formação docente.",
  },
  {
    titulo: "Plano Municipal de Assistência Social",
    area: "Assistência Social",
    contexto: "Necessidade de atualização do plano municipal com diagnóstico territorial e participação social.",
    atuacao: "Coordenação técnica do processo de elaboração, sistematização de dados e facilitação de audiências públicas.",
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
    titulo: "Fomento à Cultura nas Periferias",
    area: "Cultura",
    contexto: "Baixa capilaridade dos programas de fomento cultural em territórios periféricos.",
    atuacao: "Mapeamento de equipamentos culturais, análise de distribuição de recursos e proposta de critérios territoriais.",
    resultados: "Redistribuição de editais com critérios de vulnerabilidade social e territorial.",
  },
  {
    titulo: "Implantação do Programa de Metas",
    area: "Gestão e Inovação",
    contexto: "Obrigatoriedade legal de apresentação de Programa de Metas no início de cada gestão.",
    atuacao: "Coordenação técnica da metodologia de construção, monitoramento e prestação de contas.",
    resultados: "Consolidação de ciclos de monitoramento e relatórios públicos de acompanhamento.",
  },
  {
    titulo: "Reforma da Governança Orçamentária",
    area: "Fazenda e Planejamento",
    contexto: "Fragmentação dos processos de planejamento e execução orçamentária entre secretarias.",
    atuacao: "Desenho de novo modelo de governança com integração entre PPA, LOA e execução setorial.",
    resultados: "Maior articulação entre planejamento e orçamento, com redução de remanejamentos.",
  },
  {
    titulo: "Estratégia de Desenvolvimento Econômico",
    area: "Desenvolvimento Econômico",
    contexto: "Necessidade de visão integrada para políticas de emprego, renda e desenvolvimento local.",
    atuacao: "Elaboração de diagnóstico econômico territorial e proposta de eixos estratégicos.",
    resultados: "Documento base para articulação de programas de emprego e qualificação profissional.",
  },
];

const AtuacaoPage = () => {
  const [areaFiltro, setAreaFiltro] = useState("Todas");
  const casosFiltrados = areaFiltro === "Todas" ? casos : casos.filter((c) => c.area === areaFiltro);

  return (
    <PageLayout>
      <PageHero
        label="Impacto"
        title="Atuação dos APPGGs"
        subtitle="Casos concretos de contribuição para a gestão pública municipal."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Casos" title="Contribuições por Área" subtitle="Selecione uma área para filtrar." />

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setAreaFiltro(area)}
                className={`px-4 py-2 text-[11px] font-light tracking-wide border transition-all duration-300 ${
                  areaFiltro === area
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-text-caption border-luxury-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="space-y-px">
            {casosFiltrados.map((caso, i) => (
              <FadeIn key={caso.titulo} delay={i * 0.06}>
                <article className="group bg-card border-b border-luxury-border hover:bg-card-hover transition-colors duration-300">
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div>
                        <span className="text-[10px] font-medium tracking-luxury uppercase text-gold">{caso.area}</span>
                        <h3 className="text-lg md:text-xl font-display font-normal text-foreground mt-2">{caso.titulo}</h3>
                      </div>
                      <ArrowRight size={14} strokeWidth={1.5} className="text-luxury-border group-hover:text-gold transition-colors duration-300 mt-2 shrink-0" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: "Contexto", text: caso.contexto },
                        { label: "Atuação", text: caso.atuacao },
                        { label: "Resultados", text: caso.resultados },
                      ].map((col) => (
                        <div key={col.label}>
                          <span className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">{col.label}</span>
                          <p className="text-sm font-light text-text-body leading-relaxed">{col.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AtuacaoPage;
