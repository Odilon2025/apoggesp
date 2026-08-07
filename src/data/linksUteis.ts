export interface LinkUtil {
  categoria: string;
  titulo: string;
  descricao: string;
  url: string;
}

export const linksUteisFallback: LinkUtil[] = [
  {
    categoria: "Prefeitura de São Paulo",
    titulo: "Portal da Prefeitura",
    descricao: "Acesso a serviços, notícias e informações institucionais da Prefeitura de São Paulo.",
    url: "https://www.capital.sp.gov.br/",
  },
  {
    categoria: "Prefeitura de São Paulo",
    titulo: "SIMPROC",
    descricao: "Sistema de Processos Eletrônicos da Prefeitura de São Paulo.",
    url: "https://simproc.prefeitura.sp.gov.br/",
  },
  {
    categoria: "Prefeitura de São Paulo",
    titulo: "e-SIC",
    descricao: "Canal oficial para pedidos de acesso à informação (Lei de Acesso à Informação).",
    url: "https://capital.sp.gov.br/servicos/servico/informacoes_e-sic",
  },
  {
    categoria: "Prefeitura de São Paulo",
    titulo: "PDE — Prefeitura Digital",
    descricao: "Plataforma de serviços digitais e atendimento ao cidadão.",
    url: "https://www.prefeitura.sp.gov.br/cidade/secretarias/gestao/preftech/",
  },
  {
    categoria: "Câmara Municipal",
    titulo: "Portal da Câmara Municipal de São Paulo",
    descricao: "Acompanhamento de projetos de lei, vereadores e atividades legislativas.",
    url: "https://www.camara.sp.gov.br/",
  },
  {
    categoria: "Câmara Municipal",
    titulo: "Legislação Municipal",
    descricao: "Consulta a leis, decretos e projetos em tramitação na Câmara.",
    url: "https://www.camara.sp.gov.br/legislacao/",
  },
  {
    categoria: "Tribunal de Contas",
    titulo: "Tribunal de Contas do Município de São Paulo",
    descricao: "Consultas a decisões, processos e pareceres de contas municipais.",
    url: "https://www.tcm.sp.gov.br/",
  },
  {
    categoria: "Diário Oficial",
    titulo: "Diário Oficial da Cidade de São Paulo",
    descricao: "Publicações oficiais diárias da Prefeitura e da Câmara Municipal.",
    url: "https://www.docidadesp.com.br/",
  },
  {
    categoria: "Concursos e Bancas",
    titulo: "FCC — Fundação Carlos Chagas",
    descricao: "Banca organizadora de concursos públicos, incluindo a carreira APPGG.",
    url: "https://www.fcc.org.br/",
  },
  {
    categoria: "Concursos e Bancas",
    titulo: "FGV Projetos",
    descricao: "Fundação Getulio Vargas — banca e consultoria em gestão pública.",
    url: "https://fgvprojetos.fgv.br/",
  },
  {
    categoria: "Concursos e Bancas",
    titulo: "Vunesp",
    descricao: "Banca organizadora de concursos públicos no estado de São Paulo.",
    url: "https://www.vunesp.com.br/",
  },
  {
    categoria: "Legislação",
    titulo: "Lei 16.193/2024 — Criação da Carreira APPGG",
    descricao: "Lei municipal que criou a carreira de Analista de Políticas Públicas e Gestão Governamental.",
    url: "https://www.docidadesp.com.br/servicos-de-governo/legislacao/lei-161932024-criacao-da-carreira-de-analista-de-politicas-publicas-e-gestao-governamental",
  },
  {
    categoria: "Legislação",
    titulo: "Lei de Responsabilidade Fiscal (LRF)",
    descricao: "Lei Complementar 101/2000 — disciplina a gestão fiscal responsável.",
    url: "http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm",
  },
  {
    categoria: "Legislação",
    titulo: "Lei de Acesso à Informação (LAI)",
    descricao: "Lei 12.527/2011 — regulamenta o acesso a informações públicas.",
    url: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm",
  },
];
