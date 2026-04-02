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
  {
    sigla: "SEPE",
    orgao: "Secretaria Executiva de Projetos Estratégicos",
    descricao:
      "Coordena, integra e articula projetos estratégicos intersetoriais da gestão municipal, priorizando iniciativas que reduzam desigualdades sociais, econômicas e urbanas.",
    vigencia: "24 meses",
    appggsNecessarios: 10,
    projetos: [
      { nome: "Política Municipal Integrada pela Primeira Infância", descricao: "Coordenação do PMPI 2018-2030, fortalecendo a atenção integral a gestantes e crianças de 0 a 6 anos com governança intersetorial." },
      { nome: "Monitoramento e Avaliação do PMPI", descricao: "Estruturação de sistema de monitoramento e avaliação com indicadores e escuta das crianças." },
      { nome: "Sistema de Comunicação Intersetorial", descricao: "Implantação de sistema de TI para comunicação entre secretarias envolvidas na primeira infância." },
      { nome: "Programa Redenção", descricao: "Articulação intersetorial para atenção a pessoas em uso abusivo de álcool e drogas, com integração de bases de dados." },
      { nome: "Monitoramento e Avaliação do Redenção", descricao: "Estruturação de banco de dados e avaliação global das ações como política pública sistêmica." },
      { nome: "Programa Reencontro", descricao: "Promoção da saída qualificada da situação de rua, com integração de serviços e bases de dados municipais." },
    ],
    destaques: ["Primeira infância", "Intersetorialidade", "Vulnerabilidade social", "Monitoramento"],
  },
  {
    sigla: "SERI",
    orgao: "Secretaria Executiva de Relações Institucionais",
    descricao:
      "Promove a agenda de Governo Aberto e participação social, gerindo a plataforma Participe+ e coordenando o Orçamento Cidadão, Conselhos Participativos e o Programa Diálogo Aberto.",
    vigencia: "24 meses",
    appggsNecessarios: 4,
    projetos: [
      { nome: "Plataforma Participe+", descricao: "Aprimoramento da plataforma digital de participação social, incluindo consultas públicas e georreferenciamento." },
      { nome: "Orçamento Cidadão", descricao: "Implementação e aprimoramento das etapas digitais do orçamento participativo na Plataforma Participe+." },
      { nome: "Ferramenta Conselhos", descricao: "Centralização de informações dos conselhos de políticas públicas com participação social." },
      { nome: "4º Plano de Ação em Governo Aberto", descricao: "Cocriação, implementação e monitoramento do plano 2025-2028 alinhado à OGP." },
      { nome: "Programa Diálogo Aberto", descricao: "Implementação nas 32 subprefeituras para diálogo direto entre gestores e cidadãos." },
    ],
    destaques: ["Governo aberto", "Participação social", "Transparência", "Tecnologia cívica"],
  },
  {
    sigla: "SF",
    orgao: "Secretaria Municipal da Fazenda",
    descricao:
      "Responsável pela gestão fiscal e tributária do município, incluindo previsão de receitas, elaboração de peças orçamentárias e gestão da Planta Genérica de Valores.",
    vigencia: "24 meses",
    appggsNecessarios: 4,
    projetos: [
      { nome: "Projeções de Receitas", descricao: "Aprimoramento dos fluxos de previsão de receitas orçamentárias para PPA, LDO e LOA." },
      { nome: "Projetos Estratégicos e Modelagens Econômicas", descricao: "Apoio a projetos estratégicos com modelagens econômico-financeiras e análises de reequilíbrio contratual." },
      { nome: "Suporte e Estruturação de Atividades", descricao: "Sistematização de informações econômicas e ampliação da interlocução intersecretarial." },
      { nome: "Gestão Tributária com Dados Geoespaciais", descricao: "Sistema integrado para análise avançada de dados geoespaciais visando maior justiça tributária." },
    ],
    destaques: ["Finanças", "Tributação", "Dados geoespaciais", "Orçamento"],
  },
  {
    sigla: "SIURB",
    orgao: "Secretaria Municipal de Infraestrutura Urbana e Obras",
    descricao:
      "Responsável pela execução de projetos de infraestrutura urbana, incluindo pavimentação, pontes, viadutos, sistemas de drenagem e construção de edifícios públicos.",
    vigencia: "12 meses",
    appggsNecessarios: 5,
    projetos: [
      { nome: "SIURBDigital", descricao: "Transformação digital do sistema de planejamento e monitoramento dos projetos de infraestrutura urbana." },
      { nome: "Gerenciamento de Riscos", descricao: "Implementação de plano de gerenciamento de riscos de fluxos e processos internos." },
      { nome: "BIM SIURB", descricao: "Implantação da metodologia BIM (Building Information Modeling) no âmbito da secretaria." },
      { nome: "Programa de Metas 2025-2028", descricao: "Acompanhamento e monitoramento das metas do PdM sob responsabilidade da SIURB." },
      { nome: "Portal Obras Abertas", descricao: "Atualização e sistematização dos dados de obras no portal de transparência." },
    ],
    destaques: ["Infraestrutura", "Transformação digital", "BIM", "Transparência"],
  },
  {
    sigla: "Casa Civil",
    orgao: "Secretaria Municipal da Casa Civil",
    descricao:
      "Articula as relações institucionais do Poder Executivo com o Legislativo e a sociedade civil, coordenando os Conselhos Participativos Municipais e processos de participação social.",
    vigencia: "24 meses",
    appggsNecessarios: 3,
    projetos: [
      { nome: "Padronização de Processos dos CPMs", descricao: "Implementação de modelo estruturado para eficiência e clareza dos fluxos de trabalho dos Conselhos Participativos." },
      { nome: "Capacitação de Conselheiros", descricao: "Desenvolvimento de trilhas de capacitação para conselheiros participativos municipais." },
      { nome: "Engajamento da População", descricao: "Organização de eventos e formações para fortalecer o diálogo entre sociedade civil e poder público." },
      { nome: "Transparência e Controle Social", descricao: "Aprimoramento do acompanhamento de iniciativas intersecretariais com maior transparência." },
      { nome: "Eleição dos CPMs 2027-2028", descricao: "Condução do processo eleitoral para o próximo biênio dos Conselhos Participativos." },
    ],
    destaques: ["Participação social", "Conselhos", "Transparência", "Governança"],
  },
  {
    sigla: "SMADS",
    orgao: "Secretaria Municipal de Assistência Social",
    descricao:
      "Implementa a política de assistência social do município, gerindo parcerias com organizações da sociedade civil, programas de proteção social e a rede socioassistencial do SUAS.",
    vigencia: "24 meses",
    appggsNecessarios: 14,
    projetos: [
      { nome: "Gestão de Parcerias com OSCs", descricao: "Elaboração de Manual de Parcerias e aprimoramento da transparência nas colaborações com organizações sociais." },
      { nome: "Núcleo de Desenvolvimento Social", descricao: "Revisão de metodologias de concessão de auxílios e contribuição para o PLAMSAN." },
      { nome: "Enfrentamento a Calamidades", descricao: "Qualificação do atendimento socioassistencial em situações de calamidade." },
      { nome: "Controle Interno e Integridade", descricao: "Institucionalização do NACI e promoção de cultura de integridade." },
      { nome: "Qualifica SUAS-SP", descricao: "Coordenação do projeto junto ao Banco Mundial para melhorias no Sistema Único de Assistência Social." },
      { nome: "Modernização de Sistemas", descricao: "Integração e modernização dos sistemas informatizados para sistematização de dados de atendimento." },
      { nome: "Redesenho do Programa Renda Mínima", descricao: "Ampliação da cobertura e implementação de sistema de monitoramento robusto." },
    ],
    destaques: ["Assistência social", "SUAS", "Parcerias", "Banco Mundial"],
  },
  {
    sigla: "SMC",
    orgao: "Secretaria Municipal de Cultura",
    descricao:
      "Gestão das políticas culturais do município, incluindo museus, programas de formação artística, editais culturais e implementação do Plano Municipal de Cultura.",
    vigencia: "24 meses",
    appggsNecessarios: 4,
    projetos: [
      { nome: "Criação de Novos Memoriais e Museus", descricao: "Memorial Virtual da Migração Nordestina, Memorial dos Aflitos e Museu da História Rural Paulistana." },
      { nome: "Gestão Orçamentária e Financeira", descricao: "Planejamento orçamentário alinhado ao Plano de Metas e Plano de Contratações." },
      { nome: "Editais com Critérios Territoriais e Ações Afirmativas", descricao: "Desenho de editais de formação cultural com critérios de equidade territorial." },
      { nome: "Política Nacional Aldir Blanc", descricao: "Regulamentação e implementação dos recursos do Governo Federal para fomento à cultura." },
      { nome: "Indicadores e Gestão do Conhecimento", descricao: "Sistematização e análise de dados para monitoramento das atividades culturais." },
    ],
    destaques: ["Cultura", "Museus", "Editais", "Formação artística"],
  },
  {
    sigla: "SMDET",
    orgao: "Secretaria Municipal de Desenvolvimento Econômico e Trabalho",
    descricao:
      "Atua em três frentes — trabalho, empreendedorismo e agricultura urbana — com programas como Operação Trabalho, Bolsa Trabalho, CATE, Ade Sampa e Sampa+Rural.",
    vigencia: "24 meses",
    appggsNecessarios: 20,
    projetos: [
      { nome: "Projetos Estratégicos do Gabinete", descricao: "Atualização do SMAE, articulação intersecretarial e implementação de projetos prioritários." },
      { nome: "Inteligência Analítica", descricao: "Produção de relatórios mensais com dashboards sobre atendimentos, metas e orçamentos." },
      { nome: "Transformação Digital", descricao: "Digitalização das políticas públicas responsáveis por 60% dos orçamentos." },
      { nome: "Controles Internos", descricao: "Implementação de rotinas estruturadas de controle nas políticas com maior orçamento." },
      { nome: "Melhoria de Processos do Operação Trabalho", descricao: "Otimização de fluxos e procedimentos do programa de inclusão produtiva." },
      { nome: "Melhoria de Processos do Bolsa Trabalho", descricao: "Aprimoramento da gestão e alcance do programa de transferência de renda condicionada." },
      { nome: "Melhoria de Processos do CATE", descricao: "Modernização dos Centros de Apoio ao Trabalho e Empreendedorismo." },
      { nome: "Acompanhamento da Ade Sampa", descricao: "Melhoria do monitoramento das ações da agência de desenvolvimento." },
      { nome: "Melhoria do SP Coopera", descricao: "Otimização do programa de apoio ao cooperativismo." },
      { nome: "Melhoria do Sampa+Rural", descricao: "Aprimoramento do programa de agricultura urbana e periurbana." },
    ],
    destaques: ["Trabalho", "Empreendedorismo", "Agricultura urbana", "Transformação digital"],
  },
  {
    sigla: "SMDHC",
    orgao: "Secretaria Municipal de Direitos Humanos e Cidadania",
    descricao:
      "Formula e coordena a política municipal de direitos humanos de forma transversal e interseccional, com 15 coordenações temáticas e 18 colegiados de participação social.",
    vigencia: "24 meses",
    appggsNecessarios: 7,
    projetos: [
      { nome: "Revisão da Estrutura Organizacional", descricao: "Redesenho do organograma, atribuições e gestão da mudança após expansão da secretaria." },
      { nome: "Sistema Integrado de Atendimento (SIAD)", descricao: "Implantação de sistema para centralizar dados de cadastro e atendimento da rede de direitos humanos." },
      { nome: "Capacidades em Tecnologia da Informação", descricao: "Estruturação e qualificação das capacidades de TI para gestão de informação e dados." },
      { nome: "Planejamento Estratégico e Metas", descricao: "Elaboração do Programa de Metas 2025-2028 e monitoramento de planos setoriais." },
      { nome: "Planejamento Orçamentário", descricao: "Melhoria dos processos de planejamento e execução orçamentária." },
    ],
    destaques: ["Direitos humanos", "Diversidade", "Gestão da informação", "Participação social"],
  },
  {
    sigla: "SME",
    orgao: "Secretaria Municipal de Educação",
    descricao:
      "A maior secretaria da Prefeitura, com 67% dos servidores ativos, gestão de mais de 4 mil unidades educacionais e orçamento superior a R$ 27 bilhões, atendendo mais de 1 milhão de estudantes.",
    vigencia: "24 meses",
    appggsNecessarios: 15,
    projetos: [
      { nome: "Gestão Estratégica e Governança Institucional", descricao: "Estruturação da governança estratégica, escritório de projetos e coordenação institucional." },
      { nome: "Planejamento Estratégico 2025-2028", descricao: "Diagnóstico de capacidades institucionais e definição de prioridades para o ciclo de gestão." },
      { nome: "Gestão de Processos e Transformação Digital", descricao: "Redesenho de fluxos administrativos, gestão documental e fomento à transformação digital." },
      { nome: "Políticas Educacionais com Foco em Equidade", descricao: "Busca Ativa Escolar, SAEPS, política de proteção de direitos e segurança escolar." },
      { nome: "Programa A Educação Paulistana Pode+ (BID)", descricao: "Implementação do programa em parceria com o Banco Interamericano de Desenvolvimento." },
      { nome: "São Paulo Integral", descricao: "Aprimoramento do programa de educação integral com articulação entre áreas." },
      { nome: "Infraestrutura e Planejamento da Rede Física", descricao: "Planejamento para construção de novas unidades e modelagem de PPPs educacionais." },
      { nome: "Dados, Monitoramento e Avaliação", descricao: "Estratégia de pesquisa, avaliação e painéis de visualização para tomada de decisão." },
    ],
    destaques: ["Educação", "Equidade", "BID", "Planejamento"],
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
            <p className="text-xs font-medium tracking-luxury uppercase text-gold mb-4">Presença institucional</p>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-4">
              {planos.length} órgãos com planos formalizados
            </h2>
            <p className="text-sm font-light text-text-body leading-relaxed max-w-xl mx-auto">
              Os Planos de Atuação Institucional são instrumentos vivos. Cada PAI formaliza a demanda
              estratégica de um órgão por APPGGs, demonstrando o alcance da carreira na
              modernização da gestão pública de São Paulo.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};

export default PlanosAtuacaoPage;
