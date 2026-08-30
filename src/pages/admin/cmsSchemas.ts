/**
 * Esquemas dos dados estruturados gerenciados pelo CMS.
 * Cada tabela mapeia para uma lista de campos do JSON `dados`.
 */
export type FieldType = "text" | "textarea" | "number" | "url" | "select" | "boolean" | "json";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // para select
  rows?: number; // para textarea
  required?: boolean;
}

export interface TableSchema {
  table: string;
  titulo: string;
  descricao: string;
  campos: FieldDef[];
  /** Função opcional para gerar um label curto do item na listagem. */
  resumo: (dados: any) => string;
}

export const TABELAS: Record<string, TableSchema> = {
  cronologia_itens: {
    table: "cronologia_itens",
    titulo: "Cronologia",
    descricao: "Marcos históricos da carreira de APPGG.",
    campos: [
      { key: "year", label: "Ano (ou intervalo)", type: "text", required: true },
      { key: "text", label: "Descrição", type: "textarea", rows: 3, required: true },
    ],
    resumo: (d) => `${d?.year ?? ""} — ${d?.text?.slice(0, 80) ?? ""}…`,
  },
  atos_normativos_itens: {
    table: "atos_normativos_itens",
    titulo: "Atos normativos",
    descricao: "Lei principal, alterações, anexos e correlações.",
    campos: [
      { key: "categoria", label: "Categoria", type: "select", options: ["principal", "alteracao", "anexo", "correlacao"], required: true },
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 2 },
      { key: "url", label: "URL", type: "url", required: true },
    ],
    resumo: (d) => `[${d?.categoria}] ${d?.titulo ?? ""}`,
  },
  planos_itens: {
    table: "planos_itens",
    titulo: "Planos de Atuação Institucional",
    descricao: "PAI por órgão — descrição, vigência, projetos, destaques e marcação ambiental.",
    campos: [
      { key: "sigla", label: "Sigla", type: "text", required: true },
      { key: "orgao", label: "Órgão", type: "text", required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 4 },
      { key: "vigencia", label: "Vigência", type: "text" },
      { key: "appggsNecessarios", label: "APPGGs necessários", type: "number" },
      { key: "projetos", label: "Projetos (JSON: [{\"nome\":\"…\",\"descricao\":\"…\"}])", type: "json", rows: 10 },
      { key: "destaques", label: "Destaques (JSON: [\"tag1\",\"tag2\"])", type: "json", rows: 3 },
      { key: "ambiental", label: "Faz parte da agenda ambiental?", type: "boolean" },
    ],
    resumo: (d) => `${d?.sigla} — ${d?.orgao ?? ""}`,
  },
  publicacoes_itens: {
    table: "publicacoes_itens",
    titulo: "Publicações",
    descricao: "Publicações e artigos exibidos no site.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "tipo", label: "Tipo", type: "text" },
      { key: "ano", label: "Ano", type: "text" },
      { key: "url", label: "URL", type: "url" },
    ],
    resumo: (d) => `${d?.titulo ?? ""} (${d?.ano ?? ""})`,
  },
  atuacao_destaques: {
    table: "atuacao_destaques",
    titulo: "Destaques de atuação (home)",
    descricao: "Cards de área de atuação exibidos na página inicial.",
    campos: [
      { key: "area", label: "Área", type: "text", required: true },
      { key: "desc", label: "Descrição", type: "textarea", rows: 4, required: true },
    ],
    resumo: (d) => `${d?.area ?? ""}`,
  },
  casos_atuacao: {
    table: "casos_atuacao",
    titulo: "Casos de atuação",
    descricao: "Casos documentados de colaboração dos APPGGs exibidos na página Atuação.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "area", label: "Área", type: "text", required: true },
      { key: "contexto", label: "Contexto", type: "textarea", rows: 4, required: true },
      { key: "atuacao", label: "Colaboração dos APPGGs", type: "textarea", rows: 4, required: true },
      { key: "resultados", label: "Resultados coletivos", type: "textarea", rows: 4, required: true },
    ],
    resumo: (d) => `[${d?.area ?? ""}] ${d?.titulo ?? ""}`,
  },
  observatorio_indicadores: {
    table: "observatorio_indicadores",
    titulo: "Observatório — Indicadores",
    descricao: "Números/indicadores exibidos na página Observatório das Evasões.",
    campos: [
      { key: "num", label: "Número", type: "text", required: true },
      { key: "label", label: "Descrição", type: "text", required: true },
    ],
    resumo: (d) => `${d?.num ?? "—"} · ${d?.label ?? ""}`,
  },
  observatorio_categorias: {
    table: "observatorio_categorias",
    titulo: "Observatório — Categorias",
    descricao: "Eixos de análise exibidos na página Observatório das Evasões.",
    campos: [
      { key: "icon", label: "Ícone (lucide)", type: "select", options: ["LogOut", "Clock", "Users", "TrendingDown", "AlertTriangle", "FileText"], required: true },
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 4, required: true },
      { key: "foco", label: "Focos (JSON: [\"item1\",\"item2\"])", type: "json", rows: 6, required: true },
    ],
    resumo: (d) => `${d?.titulo ?? ""}`,
  },
  associado_avisos: {
    table: "associado_avisos",
    titulo: "Área do Associado — Avisos",
    descricao: "Avisos exibidos no Painel do Associado.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "texto", label: "Texto", type: "textarea", rows: 4, required: true },
      { key: "tipo", label: "Tipo", type: "select", options: ["info", "alerta", "destaque"], required: true },
      { key: "data", label: "Data (opcional)", type: "text" },
    ],
    resumo: (d) => `[${d?.tipo ?? "info"}] ${d?.titulo ?? ""}`,
  },
  biblioteca_itens: {
    table: "biblioteca_itens",
    titulo: "Biblioteca da Carreira",
    descricao: "Documentos, materiais e referências exibidos na Biblioteca da Carreira.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "categoria", label: "Categoria", type: "text", required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 3 },
      { key: "tipo", label: "Tipo", type: "select", options: ["PDF", "Vídeo", "Link", "Planilha", "Documento"], required: true },
      { key: "url", label: "URL", type: "url", required: true },
      { key: "restrito", label: "Acesso restrito a associados?", type: "boolean" },
    ],
    resumo: (d) => `[${d?.categoria ?? ""}] ${d?.titulo ?? ""}`,
  },
  valorizacao_acoes: {
    table: "valorizacao_acoes",
    titulo: "Valorização e Advocacy — Ações",
    descricao: "Ações exibidas na página Valorização e Advocacy.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "eixo", label: "Eixo", type: "select", options: ["Salarial", "Nomeação", "Carreira", "Institucional"], required: true },
      { key: "status", label: "Status", type: "select", options: ["Em curso", "Conquista", "Em análise"], required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 4, required: true },
      { key: "proxima_etapa", label: "Próxima etapa", type: "text" },
    ],
    resumo: (d) => `[${d?.eixo ?? ""}] ${d?.titulo ?? ""}`,
  },
  grupos_trabalho: {
    table: "grupos_trabalho",
    titulo: "Grupos de Trabalho",
    descricao: "Grupos de Trabalho exibidos na página de GTs.",
    campos: [
      { key: "nome", label: "Nome", type: "text", required: true },
      { key: "tema", label: "Tema", type: "text", required: true },
      { key: "coordenacao", label: "Coordenação", type: "text" },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 4, required: true },
      { key: "frequencia", label: "Frequência de encontros", type: "text" },
      { key: "como_participar", label: "Como participar", type: "textarea", rows: 3 },
      { key: "ativo", label: "Ativo?", type: "boolean" },
    ],
    resumo: (d) => `${d?.nome ?? ""}${d?.ativo === false ? " (inativo)" : ""}`,
  },
  wiki_verbetes: {
    table: "wiki_verbetes",
    titulo: "Wiki da Carreira — Verbetes",
    descricao: "Verbetes da Wiki da Carreira. Cada verbete possui seções (id, título, corpo em markdown) que os associados podem comentar individualmente.",
    campos: [
      { key: "slug", label: "Slug (URL: /area-associado/wiki/SLUG)", type: "text", required: true },
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "categoria", label: "Categoria (ex.: Estrutura, História, Direitos, Glossário)", type: "text", required: true },
      { key: "resumo", label: "Resumo (1-2 linhas, aparece no índice)", type: "textarea", rows: 2, required: true },
      { key: "tags", label: "Tags (JSON: [\"tag1\",\"tag2\"])", type: "json", rows: 3 },
      { key: "secoes", label: "Seções (JSON: [{\"id\":\"slug-secao\",\"titulo\":\"…\",\"corpo_md\":\"…\"}])", type: "json", rows: 16, required: true },
      { key: "referencias", label: "Referências (JSON: [{\"label\":\"…\",\"url\":\"…\"}])", type: "json", rows: 5 },
    ],
    resumo: (d) => `[${d?.categoria ?? ""}] ${d?.titulo ?? ""}`,
  },
  transparencia_itens: {
    table: "transparencia_itens",
    titulo: "Transparência APOGESP",
    descricao: "Documentos exibidos na página Transparência APOGESP.",
    campos: [
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "categoria", label: "Categoria", type: "select", options: ["Atas", "Financeiro", "Estatuto", "Relatórios"], required: true },
      { key: "periodo", label: "Período", type: "text" },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 3 },
      { key: "url", label: "URL", type: "url", required: true },
    ],
    resumo: (d) => `[${d?.categoria ?? ""}] ${d?.titulo ?? ""}`,
  },
  links_uteis_itens: {
    table: "links_uteis_itens",
    titulo: "Links úteis",
    descricao: "Links externos organizados por categoria na página Links úteis.",
    campos: [
      { key: "categoria", label: "Categoria", type: "select", options: ["Prefeitura de São Paulo", "Câmara Municipal", "Tribunal de Contas", "Diário Oficial", "Concursos e Bancas", "Legislação", "Transparência e Dados", "Planejamento", "Gestão e Processos", "Publicações Oficiais", "Ferramentas", "Outros"], required: true },
      { key: "titulo", label: "Título", type: "text", required: true },
      { key: "descricao", label: "Descrição", type: "textarea", rows: 2, required: true },
      { key: "url", label: "URL", type: "url", required: true },
    ],
    resumo: (d) => `[${d?.categoria ?? ""}] ${d?.titulo ?? ""}`,
  },
  jurisprudencia_itens: {
    table: "jurisprudencia_itens",
    titulo: "Jurisprudência — Estágio probatório",
    descricao: "Precedentes exibidos no Observatório do Estágio Probatório.",
    campos: [
      { key: "processo", label: "Precedente (nº do processo)", type: "text", required: true },
      { key: "tese", label: "Tese que sustenta", type: "textarea", rows: 3, required: true },
      { key: "aderencia", label: "Aderência", type: "select", options: ["Muito alta", "Alta", "Média", "Contraponto necessário"], required: true },
      { key: "observacao", label: "Observação (opcional)", type: "textarea", rows: 2 },
    ],
    resumo: (d) => `${d?.processo ?? ""} — ${d?.aderencia ?? ""}`,
  },
};


