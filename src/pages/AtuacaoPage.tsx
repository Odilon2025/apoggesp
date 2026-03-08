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

const areas = ["Todas", "Inovação e Ciências Comportamentais", "Planejamento e Monitoramento", "Políticas Intersetoriais", "Gestão Institucional", "Educação Ambiental", "Gestão Documental"];

const casos: CasoAtuacao[] = [
  {
    titulo: "Ciências Comportamentais para Alimentação Escolar",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Necessidade de aumentar a aceitação dos alimentos menos consumidos e reduzir o desperdício entre estudantes do 6º ao 9º ano da rede municipal.",
    atuacao: "O Lab11 conduziu o projeto em parceria com a CODAE/SME. Intervenções incluíram reposicionamento da lixeira, comunicação visual atrativa com linguagem de redes sociais e contagem digital de refeições. Metodologia mista com observação, entrevistas e mensuração em oito escolas.",
    resultados: "Aumento da aceitação dos alimentos e redução do desperdício. Maior adesão à alimentação escolar — mais estudantes passaram a consumir regularmente as refeições oferecidas.",
  },
  {
    titulo: "Sistema de Monitoramento e Acompanhamento Estratégico (SMAE)",
    area: "Planejamento e Monitoramento",
    contexto: "Desafios persistentes no planejamento estratégico: ausência de estrutura conceitual consolidada, conhecimento tácito não institucionalizado e processos manuais sujeitos a erros na gestão do Programa de Metas.",
    atuacao: "APPGGs tiveram papel central no desenvolvimento do SMAE, em parceria com a FGV, utilizando metodologia ágil e software livre (AGPL v3). O sistema garante soberania sobre dados e possibilidade de compartilhamento com outros entes públicos.",
    resultados: "Sistema com 5 módulos operacionais (Programa de Metas, Planos Setoriais, Gestão de Projetos, Monitoramento de Obras e Transferências Voluntárias), 500+ usuários ativos e institucionalização por decreto municipal.",
  },
  {
    titulo: "Política da Primeira Infância e Intersetorialidade",
    area: "Políticas Intersetoriais",
    contexto: "Problemas complexos da primeira infância exigem articulação entre múltiplas secretarias, rompendo silos setoriais tradicionais da administração pública.",
    atuacao: "APPGGs estabeleceram conexões entre diferentes atores institucionais, promovendo ligações entre secretarias e trabalhando de forma intersetorial na formulação e implementação da política municipal da primeira infância.",
    resultados: "Construção de uma política integrada que articula saúde, educação, assistência social e outras áreas, com participação ativa da carreira como articulador institucional.",
  },
  {
    titulo: "Reformulação do Portal SP156",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Canais digitais avaliados como complexos, visualmente poluídos e com linguagem pouco acessível. Alta taxa de desistência no uso do portal de serviços municipais.",
    atuacao: "Lab11 conduziu reformulação com metodologia ágil e design centrado no usuário. Foram realizados testes de usabilidade com 320 cidadãos, reorganização taxonômica via card sorting e prototipagem iterativa em três ciclos.",
    resultados: "Redução de 30% na taxa de desistência do portal. Navegação 41% mais rápida na nova taxonomia. Aumento de 200% nas visualizações da categoria trânsito e transporte.",
  },
  {
    titulo: "Programa de Residência em Gestão Pública",
    area: "Gestão Institucional",
    contexto: "Necessidade de trazer profissionais com visões renovadas e vínculos flexíveis para contribuir com inovações na administração pública.",
    atuacao: "Estruturação de programa que permite a profissionais observarem o funcionamento do setor público e, ao mesmo tempo, contribuírem com soluções inovadoras para problemas públicos, com vínculo por tempo determinado.",
    resultados: "Criação de um mecanismo institucional de renovação de perspectivas e capacitação prática em gestão pública.",
  },
  {
    titulo: "I Plano Municipal de Educação Ambiental",
    area: "Educação Ambiental",
    contexto: "Necessidade de alinhar estratégias intersetoriais para construção do primeiro plano municipal de educação ambiental, envolvendo múltiplos níveis de governo.",
    atuacao: "APPGGs participaram do alinhamento de estratégias entre secretarias e níveis de governo, utilizando teoria de múltiplos fluxos para viabilizar a construção do plano.",
    resultados: "Aprovação do I Plano Municipal de Educação Ambiental com articulação multinível e participação de diversas secretarias.",
  },
  {
    titulo: "Reestruturação do Arquivo Histórico Municipal",
    area: "Gestão Institucional",
    contexto: "Necessidade de modernização institucional do Arquivo Histórico Municipal de São Paulo, com desafios de gestão da mudança durante a pandemia de COVID-19.",
    atuacao: "APPGGs conduziram projeto de reestruturação baseado em princípios da Nova Gestão Pública, enfrentando desafios de cultura organizacional, insegurança e desconfiança dos funcionários agravados pelo contexto pandêmico.",
    resultados: "Resultados positivos na modernização do Arquivo, com lições importantes sobre gestão da mudança e adaptação cultural em organizações públicas.",
  },
  {
    titulo: "Gestão Documental na Rede Municipal de Ensino",
    area: "Gestão Documental",
    contexto: "Necessidade de construir uma política e governança de gestão documental para a Rede Municipal de Ensino de São Paulo.",
    atuacao: "Desenvolvimento de política institucional integrando arquivos, memória e educação, com construção de governança para gestão documental nas unidades de ensino.",
    resultados: "Estabelecimento de diretrizes e estrutura de governança para gestão documental, preservando a memória institucional da rede de ensino municipal.",
  },
  {
    titulo: "Aplicativo MEI Nota Fácil",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Sistema complexo de emissão de notas fiscais eletrônicas para Microempreendedores Individuais, com 15% de taxa de erro e público com 33% de baixa escolaridade.",
    atuacao: "Lab11 conduziu pesquisa com usuários, mapeamento de jornada, desenvolvimento e testes de protótipos. Testes de usabilidade validaram interface simples e design minimalista, com foco em linguagem acessível.",
    resultados: "12.514 dispositivos ativos, 5.773 notas emitidas no período inicial, nota 4,8 na Play Store e 80% das avaliações com 5 estrelas.",
  },
  {
    titulo: "Campanha Comportamental COVID-19 nos Terminais de Ônibus",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Necessidade de incentivar comportamentos preventivos (uso de máscara, distanciamento, higienização) em terminais de transporte público durante a pandemia.",
    atuacao: "Desenvolvimento de campanhas baseadas em ciências comportamentais com análise observacional via câmeras de segurança para avaliar padrões de comportamento dos usuários após intervenções.",
    resultados: "Identificação de pontos críticos e comportamentos de risco, subsidiando mudanças operacionais e campanhas futuras da SPTrans.",
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
        subtitle="Casos documentados de contribuição para a gestão pública municipal, baseados no Caderno Gestão Pública em Rede (2025)."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Casos Documentados" title="Contribuições por Área" subtitle="Os casos a seguir são baseados nos artigos publicados no Caderno Gestão Pública em Rede — 1ª edição (2025)." />

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
                        { label: "Atuação dos APPGGs", text: caso.atuacao },
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

          {casosFiltrados.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm font-light text-text-caption">Nenhum caso encontrado para esta área.</p>
            </div>
          )}
        </div>
      </section>

      {/* Eixos */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container max-w-3xl">
          <SectionTitle label="Organização" title="Eixos Temáticos do Caderno" />
          <FadeIn>
            <div className="space-y-0 border-t border-luxury-border">
              {[
                { num: "I", title: "Capacidades Transversais Emergentes no Estado", desc: "Ciências comportamentais, sistema SMAE e gestão documental na rede de ensino." },
                { num: "II", title: "Gestão Pública como Prática Social Histórica", desc: "Arquivo Histórico Municipal, Assessoria de Planejamento da Saúde e Residência em Gestão Pública." },
                { num: "III", title: "Problemas Complexos, Políticas e a Atuação dos APPGGs", desc: "Política da Primeira Infância, Educação Ambiental e recuperação de fachadas." },
              ].map((eixo) => (
                <div key={eixo.num} className="py-6 border-b border-luxury-border">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-display text-gold mt-0.5">Eixo {eixo.num}</span>
                    <div>
                      <h3 className="text-base font-display font-normal text-foreground">{eixo.title}</h3>
                      <p className="text-sm font-light text-text-body mt-1 leading-relaxed">{eixo.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default AtuacaoPage;
