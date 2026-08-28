// Conteúdo jurídico do Observatório do Estágio Probatório.
// Documento de caráter institucional e informativo. Não trata de casos concretos
// nem atribui responsabilidade a pessoas determinadas.

export const ATUALIZADO_EM = "Agosto de 2026";

export type NaturezaFundamento =
  | "Aplicação direta"
  | "Obrigação municipal"
  | "Parâmetro técnico"
  | "Jurisprudência orientadora";

export type CategoriaFonte =
  | "Constituição"
  | "Legislação municipal"
  | "NR-1"
  | "Estágio probatório"
  | "Assédio"
  | "Jurisprudência"
  | "Improbidade";

export interface Fundamento {
  norma: string;
  artigo: string;
  sintese: string;
  natureza: NaturezaFundamento;
  categoria: CategoriaFonte;
  url?: string;
}

export const fundamentos: Fundamento[] = [
  {
    norma: "Constituição Federal",
    artigo: "Art. 7º, XXII c/c art. 39, § 3º",
    sintese:
      "Assegura a redução dos riscos inerentes ao trabalho por normas de saúde, higiene e segurança, com extensão aos ocupantes de cargo público. A proteção à saúde laboral não é benefício discricionário: é dever jurídico da Administração.",
    natureza: "Aplicação direta",
    categoria: "Constituição",
  },
  {
    norma: "Constituição Federal",
    artigo: "Art. 37, caput",
    sintese:
      "Legalidade, impessoalidade, moralidade, publicidade e eficiência vinculam todo ato de avaliação funcional, inclusive quanto a critérios, motivação e finalidade.",
    natureza: "Aplicação direta",
    categoria: "Constituição",
  },
  {
    norma: "Constituição Federal",
    artigo: "Art. 41",
    sintese:
      "Estabilidade após três anos de efetivo exercício, condicionada a avaliação especial de desempenho por comissão instituída para essa finalidade.",
    natureza: "Aplicação direta",
    categoria: "Constituição",
  },
  {
    norma: "Lei Orgânica do Município de São Paulo",
    artigo: "Dispositivos sobre saúde do trabalhador",
    sintese:
      "Determina ações de promoção, proteção, recuperação e reabilitação da saúde dos trabalhadores submetidos a riscos decorrentes das condições de trabalho, com controle das condições de segurança, redução das nocividades e participação dos trabalhadores nas decisões.",
    natureza: "Obrigação municipal",
    categoria: "Legislação municipal",
  },
  {
    norma: "Lei Municipal nº 13.174/2001",
    artigo: "CIPA municipal",
    sintese:
      "Institui as Comissões Internas de Prevenção de Acidentes nas unidades municipais: inspecionar ambientes, detectar riscos ocupacionais, estudar situações nocivas, indicar medidas preventivas, acompanhar providências e analisar denúncias relacionadas a riscos.",
    natureza: "Obrigação municipal",
    categoria: "Legislação municipal",
  },
  {
    norma: "Decreto Municipal nº 58.107/2018",
    artigo: "Regulamentação das CIPAs",
    sintese:
      "Regulamenta o funcionamento das CIPAs no âmbito municipal, inclusive em unidades compostas por servidores estatutários.",
    natureza: "Obrigação municipal",
    categoria: "Legislação municipal",
  },
  {
    norma: "Lei Municipal nº 14.641/2007",
    artigo: "SESMT Municipal",
    sintese:
      "Institui o Serviço Especializado em Engenharia de Segurança e em Medicina do Trabalho, com ações integradas de prevenção de acidentes e de doenças relacionadas ao trabalho e de promoção de ambientes adequados.",
    natureza: "Obrigação municipal",
    categoria: "Legislação municipal",
  },
  {
    norma: "Lei Municipal nº 13.288/2002",
    artigo: "Assédio moral",
    sintese:
      "Prevê responsabilização administrativa por assédio moral no âmbito da Administração Municipal.",
    natureza: "Obrigação municipal",
    categoria: "Assédio",
  },
  {
    norma: "Decreto Municipal nº 57.817/2017",
    artigo: "Estágio probatório",
    sintese:
      "Disciplina a avaliação especial de desempenho no estágio probatório, com comissão, periodicidade, ciência ao servidor, reconsideração e recurso.",
    natureza: "Obrigação municipal",
    categoria: "Estágio probatório",
  },
  {
    norma: "Portaria SEGES nº 60/2024",
    artigo: "Estágio probatório dos APPGG",
    sintese:
      "Define critérios e procedimentos aplicáveis ao estágio probatório da carreira, distribuídos entre conduta funcional e desempenho.",
    natureza: "Obrigação municipal",
    categoria: "Estágio probatório",
  },
  {
    norma: "NR-1 — Gerenciamento de Riscos Ocupacionais",
    artigo: "Programa de Gerenciamento de Riscos",
    sintese:
      "Aplica-se diretamente a órgãos e entidades com empregados celetistas, estatais e trabalhadores terceirizados. Para estatutários, serve como parâmetro técnico de diligência: identificação, avaliação, classificação, prevenção, registro e monitoramento de riscos — inclusive psicossociais.",
    natureza: "Parâmetro técnico",
    categoria: "NR-1",
  },
  {
    norma: "NR-17 — Ergonomia",
    artigo: "Organização do trabalho",
    sintese:
      "Trata da adaptação das condições de trabalho às características dos trabalhadores, inclusive ritmo, conteúdo das tarefas e exigências de tempo.",
    natureza: "Parâmetro técnico",
    categoria: "NR-1",
  },
  {
    norma: "Lei nº 13.146/2015 — Lei Brasileira de Inclusão",
    artigo: "Adaptações razoáveis e não discriminação",
    sintese:
      "Veda discriminação em razão de deficiência e impõe adaptações razoáveis antes de qualquer conclusão sobre inadequação funcional.",
    natureza: "Aplicação direta",
    categoria: "Constituição",
  },
  {
    norma: "Lei nº 8.429/1992, com a Lei nº 14.230/2021",
    artigo: "Improbidade administrativa",
    sintese:
      "Exige dolo, finalidade ilícita, enquadramento em hipótese legal e individualização da conduta. Irregularidade e má gestão, sem dolo demonstrado, não configuram improbidade.",
    natureza: "Aplicação direta",
    categoria: "Improbidade",
  },
  {
    norma: "STF — Súmula 21",
    artigo: "Estágio probatório",
    sintese:
      "O servidor em estágio probatório não pode ser exonerado ou demitido sem procedimento que observe as formalidades legais de apuração de sua capacidade.",
    natureza: "Jurisprudência orientadora",
    categoria: "Jurisprudência",
  },
  {
    norma: "STJ — RMS 19.210/RS",
    artigo: "Motivação",
    sintese:
      "A utilização de conceitos indeterminados sem exposição dos elementos concretos que conduziram à avaliação pode comprometer a motivação do ato.",
    natureza: "Jurisprudência orientadora",
    categoria: "Jurisprudência",
  },
  {
    norma: "STJ — RMS 20.288/SP",
    artigo: "Suficiência da motivação",
    sintese:
      "Dúvidas, impressões ou incertezas genéricas não constituem motivação suficiente para decisão funcional desfavorável.",
    natureza: "Jurisprudência orientadora",
    categoria: "Jurisprudência",
  },
  {
    norma: "STJ — RMS 14.064/SP",
    artigo: "Avaliação periódica como garantia",
    sintese:
      "A avaliação periódica também é garantia do servidor: permite acompanhamento, correção de dificuldades e legitimidade do processo.",
    natureza: "Jurisprudência orientadora",
    categoria: "Jurisprudência",
  },
];

export const categoriasFonte: CategoriaFonte[] = [
  "Constituição",
  "Legislação municipal",
  "NR-1",
  "Estágio probatório",
  "Assédio",
  "Jurisprudência",
  "Improbidade",
];

export const formulacoesFrageis = [
  "“Não suporta pressão.”",
  "“Não sabe lidar com prazos.”",
  "“Não tem resiliência.”",
  "“Tem dificuldade emocional.”",
  "“Não se adapta.”",
  "“Questiona excessivamente.”",
  "“Apresenta resistência à gestão.”",
];

export const fluxoIndividualizacao = [
  "Dificuldade ou manifestação",
  "Rotulação socioemocional",
  "Avaliação negativa",
  "Silenciamento",
  "Manutenção da causa organizacional",
];

export const fluxoPrevencao = [
  "Relato ou dificuldade",
  "Escuta protegida",
  "Análise da atividade real",
  "Avaliação das condições organizacionais",
  "Medidas preventivas",
  "Monitoramento dos resultados",
];

export const perguntasDiagnostico = [
  "O volume de trabalho é compatível com o quadro disponível?",
  "Os prazos são razoáveis?",
  "Existem prioridades conflitantes?",
  "As atribuições estão claras?",
  "Há autonomia decisória suficiente?",
  "As chefias fornecem orientação?",
  "Existem recursos e informações adequados?",
  "Há sobreposição de projetos?",
  "Existe tratamento desigual?",
  "Há situações de assédio, discriminação ou retaliação?",
  "O servidor recebeu feedback e oportunidade de correção?",
  "A dificuldade é individual, coletiva ou organizacional?",
];

export const riscosPsicossociais = [
  "Sobrecarga",
  "Metas incompatíveis com os recursos",
  "Prazos inexequíveis",
  "Baixa autonomia",
  "Falta de apoio",
  "Ambiguidade de papéis",
  "Prioridades conflitantes",
  "Comunicação inadequada",
  "Assédio",
  "Discriminação",
  "Insegurança funcional",
  "Ausência de reconhecimento",
  "Exposição pública",
  "Controle excessivo",
  "Responsabilização sem poder decisório",
  "Mudanças organizacionais mal conduzidas",
];

export const etapasPolitica = [
  { n: "1", titulo: "Identificação", desc: "Identificar perigos, fontes, processos, grupos expostos e situações recorrentes." },
  { n: "2", titulo: "Avaliação", desc: "Avaliar probabilidade, severidade, abrangência e duração da exposição." },
  { n: "3", titulo: "Classificação", desc: "Definir prioridades de intervenção segundo critérios documentados." },
  { n: "4", titulo: "Prevenção", desc: "Adotar medidas coletivas, administrativas e organizacionais." },
  { n: "5", titulo: "Registro", desc: "Manter inventário, plano de ação, responsáveis, prazos e indicadores." },
  { n: "6", titulo: "Monitoramento", desc: "Avaliar a eficácia das medidas e revisar o diagnóstico." },
];

export const comparativo: Array<[string, string]> = [
  ["Examina desempenho profissional", "Examina condições e organização do trabalho"],
  ["Pode ser individual", "Deve considerar grupos, processos e ambientes"],
  ["Utiliza critérios funcionais", "Utiliza metodologia de identificação e controle de riscos"],
  ["Produz feedback e desenvolvimento", "Produz medidas preventivas e plano de ação"],
  ["Exige comportamentos observáveis", "Exige identificação de fontes e circunstâncias"],
  ["Não é diagnóstico psicológico", "Não investiga personalidade"],
  ["Não substitui ergonomia", "Não substitui avaliação de desempenho"],
  ["Deve considerar o contexto", "Deve considerar a atividade real"],
];

export const usoLegitimo = [
  "Cooperação",
  "Comunicação profissional",
  "Trabalho em equipe",
  "Capacidade de negociação",
  "Gestão de conflitos",
  "Cumprimento de compromissos",
  "Atuação ética",
  "Capacidade de articular diferentes áreas",
  "Orientação ao interesse público",
];

export const requisitosLegitimidade = [
  "Previsão normativa",
  "Aderência às atribuições",
  "Definição operacional",
  "Fatos concretos",
  "Uniformidade entre avaliadores",
  "Documentação",
  "Feedback",
  "Possibilidade de desenvolvimento",
  "Contraditório",
  "Revisão",
];

export const vulnerabilidades = [
  { titulo: "Critério não previsto", desc: "Uso de “inteligência emocional”, “resiliência”, “maturidade” ou expressões equivalentes sem correspondência clara com os critérios normativos." },
  { titulo: "Conceito indeterminado", desc: "Emprego de rótulos sem decomposição em fatos, comportamentos, datas e consequências." },
  { titulo: "Avaliação psicológica informal", desc: "Atribuição de deficiência emocional, transtorno, instabilidade ou incapacidade psicológica sem competência técnica e sem procedimento adequado." },
  { titulo: "Falha de contextualização", desc: "Desconsideração de carga, prazos, recursos, prioridades, suporte, autonomia e atuação das chefias." },
  { titulo: "Retaliação", desc: "Uso de críticas, denúncias, comunicações de obstáculos ou divergências técnicas em prejuízo do servidor." },
  { titulo: "Desvio de finalidade", desc: "Uso da avaliação para afastar pessoas consideradas inconvenientes, críticas ou pouco aderentes a determinada orientação gerencial." },
  { titulo: "Ausência de contraditório", desc: "Falta de ciência, motivação, documentos, feedback, possibilidade de correção, reconsideração ou recurso." },
  { titulo: "Incoerência administrativa", desc: "Exigir que o servidor relate dificuldades e posteriormente utilizar o relato como prova de incapacidade." },
];

export const criteriosProbatorio = {
  conduta: ["Assiduidade", "Disciplina", "Respeito à hierarquia dentro dos limites legais", "Dedicação", "Conduta funcional"],
  desempenho: ["Trabalho em equipe", "Visão sistêmica", "Uso adequado dos recursos", "Eficiência"],
  chefia: ["Orientar", "Acompanhar", "Registrar", "Documentar", "Justificar a avaliação", "Responder a pedidos de reconsideração e recurso"],
  comissao: ["Ouvir o servidor", "Identificar dificuldades", "Oferecer orientação", "Ouvir a chefia", "Examinar as razões da nota", "Orientar a chefia, quando necessário"],
};

export const niveisResponsabilidade = [
  {
    nivel: "Nível 1",
    titulo: "Dever de prevenção e correção",
    tom: "verde" as const,
    itens: ["Diagnosticar", "Prevenir", "Orientar", "Capacitar chefias", "Corrigir processos", "Proteger denunciantes", "Monitorar resultados"],
  },
  {
    nivel: "Nível 2",
    titulo: "Invalidade administrativa",
    tom: "ambar" as const,
    itens: ["Critério não previsto", "Ausência de motivação", "Fatos inexistentes", "Erro material", "Desvio de finalidade", "Retaliação", "Discriminação", "Descumprimento do procedimento", "Ausência de contraditório"],
  },
  {
    nivel: "Nível 3",
    titulo: "Responsabilidade administrativa e civil",
    tom: "ambar" as const,
    itens: ["Omissão diante de risco conhecido", "Assédio", "Retaliação", "Discriminação", "Dano à saúde", "Exoneração ilegal", "Prejuízo funcional", "Violação de dever específico de prevenção"],
  },
  {
    nivel: "Nível 4",
    titulo: "Improbidade administrativa — hipótese excepcional",
    tom: "vermelho" as const,
    itens: ["Conduta dolosa", "Vontade consciente de alcançar resultado ilícito", "Finalidade ilícita", "Enquadramento em hipótese legal", "Individualização da conduta do agente", "Prova suficiente"],
  },
];

export const hipotesesImprobidade = [
  "Fabricação consciente de fatos",
  "Inserção de informação falsa em avaliação",
  "Combinação deliberada entre avaliadores para prejudicar servidor",
  "Ocultação intencional de documentos favoráveis",
  "Uso da avaliação para perseguir denunciante",
  "Aplicação seletiva de critérios",
  "Manipulação de notas",
  "Supressão dolosa de contraditório",
  "Uso do estágio probatório para finalidade estranha ao interesse público",
  "Discriminação deliberada",
  "Descumprimento consciente de decisão administrativa ou judicial",
];

export type NivelRisco = "Alto" | "Muito alto" | "Condicional" | "Excepcional";

export const matrizRiscos: Array<{ risco: string; situacao: string; nivel: NivelRisco }> = [
  { risco: "Individualização", situacao: "Problema organizacional atribuído ao servidor", nivel: "Alto" },
  { risco: "Silenciamento", situacao: "Crítica tratada como inadequação", nivel: "Alto" },
  { risco: "Critério oculto", situacao: "Uso informal de competência socioemocional", nivel: "Alto" },
  { risco: "Subjetividade", situacao: "Ausência de fatos e indicadores", nivel: "Alto" },
  { risco: "Retaliação", situacao: "Manifestação influencia avaliação", nivel: "Muito alto" },
  { risco: "Omissão preventiva", situacao: "Risco não analisado por CIPA ou SESMT", nivel: "Alto" },
  { risco: "Diagnóstico informal", situacao: "Rotulação psicológica por não especialistas", nivel: "Alto" },
  { risco: "Assédio", situacao: "Condutas reiteradas e degradantes", nivel: "Condicional" },
  { risco: "Discriminação", situacao: "Prejuízo ligado à deficiência ou neurodivergência", nivel: "Condicional" },
  { risco: "Responsabilidade civil", situacao: "Dano e nexo causal demonstrados", nivel: "Condicional" },
  { risco: "Improbidade", situacao: "Dolo, finalidade ilícita e tipificação", nivel: "Excepcional" },
];

export const propostas = [
  { titulo: "Política municipal de riscos psicossociais", desc: "Sistema aplicável aos servidores estatutários, materialmente equivalente às medidas preventivas previstas na NR-1." },
  { titulo: "Integração institucional", desc: "Articulação entre gestão de pessoas, CIPA, SESMT, COGESS, unidades de integridade, corregedoria e entidades representativas." },
  { titulo: "Diagnóstico organizacional", desc: "Avaliação de carga, prazos, recursos, autonomia, suporte, prioridades, processos, estrutura, chefias e relações de trabalho." },
  { titulo: "Transparência dos critérios", desc: "Publicação de critérios, indicadores, escalas, orientações às chefias, documentos exigidos, procedimentos de revisão e mecanismos de calibragem." },
  { titulo: "Vedação a rótulos psicológicos", desc: "Não utilização de expressões como deficiência emocional, instabilidade, falta de maturidade ou baixa resiliência sem base técnica, contexto e finalidade legítima." },
  { titulo: "Proteção contra retaliação", desc: "Garantia de que críticas, denúncias, divergências e comunicações de dificuldades não sejam utilizadas em prejuízo funcional." },
  { titulo: "Feedback e desenvolvimento", desc: "Acompanhamento tempestivo, individualizado e documentado, com oportunidade real de aperfeiçoamento." },
  { titulo: "Participação da carreira", desc: "Inclusão dos servidores e de sua representação associativa na revisão dos modelos de avaliação e prevenção." },
  { titulo: "Auditoria dos instrumentos", desc: "Revisão de avaliações baseadas em conceitos vagos, juízos de personalidade, referências genéricas a comportamento ou dificuldades decorrentes da organização do trabalho." },
];

export const perguntasAdministracao = [
  "Existe política municipal específica para riscos psicossociais dos servidores estatutários?",
  "Quais órgãos são responsáveis por identificar esses riscos?",
  "As CIPAs estão capacitadas para examinar fatores psicossociais?",
  "Existem inventários ou diagnósticos por unidade?",
  "Como a Administração diferencia problema individual de problema organizacional?",
  "Como são definidos os critérios socioemocionais?",
  "Quais fatos e documentos podem sustentar uma avaliação negativa?",
  "Como é assegurado o contraditório?",
  "Como são protegidos servidores que apresentam críticas ou denúncias?",
  "Há mecanismos para avaliar a atuação das chefias?",
  "As condições de trabalho são consideradas na avaliação?",
  "Como são tratadas situações envolvendo deficiência e necessidade de adaptação?",
  "Quem audita a consistência das avaliações?",
  "Há análise de padrões de notas entre unidades e chefias?",
  "Existe canal independente para relatos de retaliação?",
];

export const condutasAssedio = [
  "Críticas persistentes e desqualificadoras",
  "Exposição",
  "Subestimação de esforços",
  "Atribuição de prazos impossíveis",
  "Isolamento",
  "Retirada injustificada de atribuições",
  "Transferência retaliatória",
  "Questionamento sistemático da competência",
  "Ameaça à estabilidade ou à permanência",
];

export const cautelaAssedio = [
  "Reiteração",
  "Contexto",
  "Direcionamento",
  "Abuso",
  "Finalidade",
  "Degradação do ambiente",
  "Prejuízo funcional ou pessoal",
  "Nexo causal",
];

export const evitarDiscriminacao = [
  "Exigir padrões comportamentais sem relação necessária com o cargo",
  "Confundir diferença comunicacional com incompetência",
  "Avaliar características relacionadas à deficiência sem análise funcional",
  "Negar adaptações razoáveis",
  "Utilizar linguagem patologizante",
  "Realizar diagnóstico informal",
  "Impor exigência de “normalidade” comportamental",
];
