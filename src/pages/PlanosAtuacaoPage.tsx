import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FadeIn from "@/components/FadeIn";
import { Building2, ChevronDown, ChevronUp, Target, Users } from "lucide-react";

interface Projeto {
  nome: string;
  descricao: string;
}

interface PlanoAtuacao {
  sigla: string;
  orgao: string;
  descricao: string;
  vigencia: string;
  appggsNecessarios: number;
  projetos: Projeto[];
  destaques: string[];
}

const planos: PlanoAtuacao[] = [
  {
    sigla: "CGM",
    orgao: "Controladoria Geral do Município",
    descricao:
      "Órgão central do Sistema de Controle Interno, atuando no combate à corrupção, promoção da transparência, proteção de dados pessoais e fortalecimento da cultura de integridade na administração pública municipal.",
    vigencia: "24 meses",
    appggsNecessarios: 7,
    projetos: [
      { nome: "Programa de Integridade e Boas Práticas", descricao: "Implementação e consolidação do PIBP nos órgãos da PMSP, fortalecendo mecanismos preventivos de integridade." },
      { nome: "Governança em Privacidade e Proteção de Dados", descricao: "Consolidação de diretrizes para adequação à LGPD, com capacitação de agentes públicos e suporte técnico." },
      { nome: "Gestão do Sistema de Ouvidorias", descricao: "Fortalecimento do sistema de ouvidorias, reestruturação do Fórum de Ouvidorias Setoriais e ampliação das redes LAI e RENOUV." },
      { nome: "Planejamento e Gestão Estratégica da CGM", descricao: "Estruturação e monitoramento do planejamento institucional com metas, indicadores e mecanismos de avaliação." },
      { nome: "Projeto Estudantes em Ação", descricao: "Engajamento de estudantes em atividades de controle social e educação para a integridade." },
      { nome: "Modelo de Capacidade de Auditoria Interna", descricao: "Elevação da qualidade técnica das auditorias com padronização metodológica e alinhamento às melhores práticas." },
      { nome: "Governança dos Procedimentos Correcionais", descricao: "Padronização e fortalecimento da gestão dos processos correcionais." },
    ],
    destaques: ["Controle interno", "LGPD", "Transparência", "Integridade"],
  },
  {
    sigla: "SEGES",
    orgao: "Secretaria Municipal de Gestão",
    descricao:
      "Responsável pela modernização administrativa e inovação na PMSP, atuando em gestão de pessoas, desenvolvimento institucional, suprimentos, gestão documental, parcerias com o terceiro setor e gestão da frota veicular.",
    vigencia: "24 meses (jan/2026 – jan/2028)",
    appggsNecessarios: 22,
    projetos: [
      { nome: "Sistema de Informações Organizacionais", descricao: "Implantação de sistema para gestão da estrutura organizacional da PMSP." },
      { nome: "Recadastramento Digital", descricao: "Modernização do processo de recadastramento de servidores." },
      { nome: "Modernização do Sistema de Gestão de Pessoas", descricao: "Atualização dos sistemas e processos de RH da Prefeitura." },
      { nome: "Núcleo de Inteligência de Dados de Pessoal", descricao: "Criação de capacidade analítica para decisões baseadas em dados sobre a força de trabalho." },
      { nome: "Bonificação por Resultados", descricao: "Estruturação de metas específicas para o programa de bonificação." },
      { nome: "Política de Movimentação de Servidores", descricao: "Desenvolvimento de política integrada de movimentação e alocação." },
      { nome: "DOC Sampa: Gestão Documental", descricao: "Modernização da gestão documental e do Arquivo Público Municipal." },
      { nome: "Portal e Sistema de Parcerias", descricao: "Aprimoramento da gestão de parcerias com o terceiro setor." },
      { nome: "Gestão do Patrimônio Imobiliário", descricao: "Sistema de informações georreferenciadas para gestão do patrimônio." },
      { nome: "Modernização e Inovação Tecnológica", descricao: "Projetos transversais de transformação digital e inovação na gestão." },
    ],
    destaques: ["Gestão de pessoas", "Inovação", "Transformação digital", "Parcerias"],
  },
  {
    sigla: "SEPLAN",
    orgao: "Secretaria Municipal de Planejamento e Eficiência",
    descricao:
      "Órgão central de planejamento e orçamento, responsável pelo PPA, Programa de Metas, LDO e LOA. Atua na integração das políticas públicas e na eficiência dos gastos municipais.",
    vigencia: "24 meses",
    appggsNecessarios: 12,
    projetos: [
      { nome: "Estratégia para Eficiência de Gastos", descricao: "Otimização do orçamento público com redução de despesas e aumento do custo-benefício dos programas." },
      { nome: "Monitoramento do Programa de Metas", descricao: "Gestão do SMAE e acompanhamento estratégico das metas do PdM 2025-2028." },
      { nome: "Planejamento Orçamentário Integrado", descricao: "Integração entre PPA, LDO, LOA e Programa de Metas com foco na regionalização." },
      { nome: "Acompanhamento de Fundos e Operações Urbanas", descricao: "Monitoramento de arrecadação, execução orçamentária e impactos de fundos municipais." },
      { nome: "Acompanhamento Estratégico de Projetos", descricao: "Gestão de projetos prioritários com análise preditiva de riscos." },
      { nome: "Tecnologia e Dados (CODATA)", descricao: "Atuação na LGPD, desenvolvimento de sistemas e monitoramento de conformidade." },
    ],
    destaques: ["Orçamento", "Metas", "Eficiência", "Dados"],
  },
  {
    sigla: "PGM",
    orgao: "Procuradoria Geral do Município",
    descricao:
      "Órgão jurídico permanente da Prefeitura, responsável pela assessoria jurídica do Executivo, representação judicial, cobrança da dívida ativa e gestão do patrimônio imóvel.",
    vigencia: "24 meses",
    appggsNecessarios: 8,
    projetos: [
      { nome: "Planejamento Estratégico da PGM", descricao: "Formulação de plano estratégico com metas mensuráveis e otimização de recursos." },
      { nome: "Reestruturação da PGM", descricao: "Adequação organizacional às normas técnicas, com piloto na CGGM." },
      { nome: "Mapeamento e Redesenho de Processos", descricao: "Eliminação de gargalos e padronização de fluxos em compras e aquisições." },
      { nome: "Automação e Digitalização", descricao: "Automação de atividades repetitivas, com piloto na Divisão de RH." },
      { nome: "Pesquisa e Difusão do Conhecimento Jurídico", descricao: "Programa de Residência Jurídica e futura Escola de Direito Público." },
      { nome: "Política de Atendimento ao Cidadão", descricao: "Expansão do modelo bem-sucedido da Praça de Dívida Ativa." },
      { nome: "Segurança de Dados e Informações", descricao: "Criação de base unificada para assessorias jurídicas descentralizadas." },
      { nome: "Sistema de Informações Geográficas", descricao: "Implementação de SIG com demandas georreferenciadas." },
    ],
    destaques: ["Jurídico", "Modernização", "Atendimento ao cidadão", "Gestão"],
  },
  {
    sigla: "SECLIMA",
    orgao: "Secretaria Executiva de Mudanças Climáticas",
    descricao:
      "Responsável pela formulação e implementação de políticas climáticas, coordenando o Plano Municipal de Ação Climática (PlanClima SP) com meta de neutralidade de carbono até 2050.",
    vigencia: "24 meses",
    appggsNecessarios: 4,
    projetos: [
      { nome: "Implementação do PlanClima SP", descricao: "Coordenação do Plano Municipal de Ação Climática, com revisão periódica de metas e indicadores." },
      { nome: "Gestão do COMFROTA", descricao: "Transição para frotas mais sustentáveis, incluindo veículos elétricos e combustíveis de baixa emissão." },
      { nome: "Eficiência Energética em Edifícios Públicos", descricao: "Modernização de sistemas HVAC e implementação de gerenciamento de energia no Edifício Matarazzo." },
      { nome: "Captação de Recursos Internacionais", descricao: "Articulação com Banco Mundial, BID e AFD para financiamento de projetos climáticos." },
    ],
    destaques: ["Clima", "Sustentabilidade", "Energia", "Cooperação internacional"],
  },
  {
    sigla: "SEDP",
    orgao: "Secretaria Executiva de Desestatização e Parcerias",
    descricao:
      "Unidade vinculada à SGM, responsável pela implementação do Plano Municipal de Desestatização, gestão de PPPs, concessões e parcerias para potencializar investimentos na cidade.",
    vigencia: "24 meses",
    appggsNecessarios: 3,
    projetos: [
      { nome: "Gestão do Portfólio de Projetos de Desestatização", descricao: "Estruturação de metodologia de gerenciamento e acompanhamento da carteira do PMD." },
      { nome: "Novo Plano Municipal de Desestatização", descricao: "Elaboração de novo PMD adaptado aos desafios atuais da cidade." },
      { nome: "Gestão de Informação e Conhecimento", descricao: "Sistematização do conhecimento técnico e padronização de processos internos." },
    ],
    destaques: ["PPPs", "Concessões", "Investimento", "Governança"],
  },
  {
    sigla: "SEHAB",
    orgao: "Secretaria Municipal de Habitação",
    descricao:
      "Responsável pela política habitacional de interesse social, gestão de programas habitacionais, planejamento urbano e gestão do Fundo Municipal de Saneamento Ambiental e Infraestrutura.",
    vigencia: "24 meses",
    appggsNecessarios: 9,
    projetos: [
      { nome: "Planejamento da Política Habitacional", descricao: "Integração entre peças de planejamento, gestão do patrimônio imobiliário e estruturação de critérios de priorização." },
      { nome: "Gestão Integrada de Programas Habitacionais", descricao: "Mapeamento, redesenho e melhoria de processos de atendimento habitacional provisório e definitivo." },
      { nome: "Gestão de Informações da SEHAB", descricao: "Desenvolvimento do HabitaSampa, aperfeiçoamento de cadastros e sistemas de informação." },
      { nome: "Interlocução entre Planejamento e Áreas Técnicas", descricao: "Articulação entre os diversos setores da Secretaria e instrumentos de planejamento." },
      { nome: "Gestão do FMSAI", descricao: "Fortalecimento dos mecanismos de controle sobre receitas e execução orçamentária do fundo." },
    ],
    destaques: ["Habitação", "Planejamento urbano", "Dados", "Processos"],
  },
  {
    sigla: "SEME",
    orgao: "Secretaria Municipal de Esportes e Lazer",
    descricao:
      "Responsável pelo planejamento e execução das políticas de esportes e lazer, incluindo o programa Rede Olímpica, Bolsa Atleta e gestão de equipamentos esportivos.",
    vigencia: "24 meses",
    appggsNecessarios: 10,
    projetos: [
      { nome: "Planejamento Programático e Orçamentário", descricao: "Elaboração e monitoramento do PdM, PPA e LOA para Esportes e Lazer." },
      { nome: "Sistema de Indicadores e Banco de Dados", descricao: "Monitoramento de programas esportivos com indicadores de desempenho e alcance." },
      { nome: "Banco de Dados de Obras", descricao: "Acompanhamento do andamento das obras de infraestrutura esportiva." },
      { nome: "Chamamentos Públicos", descricao: "Seleção de OSCs para programas esportivos com transparência e eficácia." },
      { nome: "Plano Municipal de Esportes e Lazer", descricao: "Definição de diretrizes e metas para o setor esportivo municipal." },
      { nome: "Gestão do Programa Rede Olímpica", descricao: "Democratização do acesso ao esporte de alto rendimento nos polos existentes." },
      { nome: "Melhoria e Expansão da Rede Olímpica", descricao: "Ampliação do programa para regiões com menor oferta de equipamentos esportivos." },
      { nome: "Expansão do Bolsa Atleta Rei Pelé", descricao: "Melhoria da gestão e ampliação do número de beneficiários do programa." },
      { nome: "Novas Modalidades no COTP", descricao: "Implantação de novas modalidades esportivas no Centro Olímpico de Treinamento e Pesquisa." },
    ],
    destaques: ["Esporte", "Rede Olímpica", "Planejamento", "Inclusão"],
  },
];

const totalAppggs = planos.reduce((sum, p) => sum + p.appggsNecessarios, 0);
const totalProjetos = planos.reduce((sum, p) => sum + p.projetos.length, 0);

const PlanosAtuacaoPage = () => {
  const [expandido, setExpandido] = useState<string | null>(null);

  const toggle = (sigla: string) => {
    setExpandido(expandido === sigla ? null : sigla);
  };

  return (
    <PageLayout>
      <PageHero
        title="Planos de Atuação Institucional"
        subtitle="Os PAIs formalizam a demanda de cada órgão por APPGGs, detalhando projetos estratégicos, resultados esperados e competências necessárias. Conheça onde e como os analistas contribuem para a modernização da gestão pública em São Paulo."
      />

      {/* Números */}
      <section className="py-16 md:py-20 border-b border-luxury-border">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <FadeIn>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{planos.length}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">Órgãos com PAI</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{totalProjetos}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">Projetos Estratégicos</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="text-3xl md:text-4xl font-display text-foreground">{totalAppggs}</span>
                <p className="text-xs font-light text-text-caption mt-1 tracking-wide uppercase">APPGGs Demandados</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <SectionTitle label="Detalhamento" title="Planos por Órgão" />

          <div className="space-y-4">
            {planos.map((plano, i) => (
              <FadeIn key={plano.sigla} delay={i * 0.03}>
                <div className="border border-luxury-border rounded-sm overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => toggle(plano.sigla)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-section-alt/50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center">
                        <Building2 size={16} className="text-gold" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium tracking-wider uppercase text-gold">{plano.sigla}</span>
                          <span className="text-[11px] text-text-caption">·</span>
                          <span className="text-[11px] text-text-caption">{plano.appggsNecessarios} APPGG{plano.appggsNecessarios > 1 ? "s" : ""}</span>
                          <span className="text-[11px] text-text-caption">·</span>
                          <span className="text-[11px] text-text-caption">{plano.projetos.length} projeto{plano.projetos.length > 1 ? "s" : ""}</span>
                        </div>
                        <h3 className="text-sm font-display font-normal text-foreground mt-0.5 truncate">{plano.orgao}</h3>
                      </div>
                    </div>
                    {expandido === plano.sigla ? (
                      <ChevronUp size={16} className="text-text-caption flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-text-caption flex-shrink-0" />
                    )}
                  </button>

                  {/* Conteúdo expandido */}
                  {expandido === plano.sigla && (
                    <div className="px-6 pb-6 border-t border-luxury-border/50">
                      <p className="text-sm font-light text-text-body leading-relaxed mt-5 mb-6">{plano.descricao}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {plano.destaques.map((d) => (
                          <span key={d} className="text-[11px] px-2.5 py-1 rounded-sm bg-gold/8 text-gold tracking-wide">
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Projetos */}
                      <div className="space-y-0 border-t border-luxury-border/50">
                        {plano.projetos.map((projeto, j) => (
                          <div key={j} className="py-4 border-b border-luxury-border/30 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <Target size={12} className="text-gold mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-foreground">{projeto.nome}</h4>
                                <p className="text-xs font-light text-text-caption mt-1 leading-relaxed">{projeto.descricao}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-section-alt">
        <div className="container max-w-3xl text-center">
          <FadeIn>
            <p className="text-xs font-medium tracking-luxury uppercase text-gold mb-4">Panorama em construção</p>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-4">
              8 de 16 órgãos documentados
            </h2>
            <p className="text-sm font-light text-text-body leading-relaxed max-w-xl mx-auto">
              Os Planos de Atuação Institucional são instrumentos vivos. À medida que novos órgãos formalizam
              suas demandas por APPGGs, esta página será atualizada para refletir o alcance crescente da carreira
              na administração municipal.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default PlanosAtuacaoPage;
