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

const areas = [
  "Todas",
  "Inovação e Ciências Comportamentais",
  "Planejamento e Monitoramento",
  "Políticas Intersetoriais",
  "Gestão Institucional",
  "Transformação Digital",
  "Participação Social",
  "Segurança Urbana",
  "Políticas Sociais",
  "Educação Ambiental",
  "Gestão Documental",
];

const casos: CasoAtuacao[] = [
  // ── Caderno Gestão Pública em Rede (2025) ──
  {
    titulo: "Ciências Comportamentais para Alimentação Escolar",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Nas escolas municipais, estudantes do 6º ao 9º ano desperdiçavam alimentos e rejeitavam pratos menos conhecidos. O problema não era a comida — era como ela era apresentada, percebida e descartada.",
    atuacao: "O Lab11, em parceria com a CODAE/SME, redesenhou a experiência da refeição. Lixeiras foram reposicionadas para tornar o desperdício visível. Painéis com linguagem de redes sociais tornaram pratos desconhecidos familiares. Contagem digital substituiu estimativas manuais. Em oito escolas, observação direta, entrevistas e mensuração validaram cada intervenção.",
    resultados: "Aumento médio de 13,8% na adesão às refeições. Redução de 3 kg de alimentos desperdiçados por escola. Estimativa de impacto potencial: 4,3 toneladas a menos por dia em toda a rede.",
  },
  {
    titulo: "SMAE — O Sistema que Deu Olhos à Prefeitura",
    area: "Planejamento e Monitoramento",
    contexto: "Durante anos, o monitoramento do Programa de Metas dependeu de planilhas, e-mails e memória individual. O conhecimento estava nas pessoas, não nas instituições. Erros manuais eram frequentes. A Prefeitura planejava no escuro.",
    atuacao: "APPGGs contribuíram com o desenvolvimento do SMAE, em parceria com a FGV, utilizando metodologia ágil e software livre (licença AGPL v3). A decisão por código aberto não foi ideológica — foi estratégica: garantiu soberania sobre os dados e possibilidade de compartilhamento com outros entes públicos.",
    resultados: "Cinco módulos operacionais — Programa de Metas, Planos Setoriais, Gestão de Projetos, Monitoramento de Obras e Transferências Voluntárias. Mais de 500 usuários ativos. E um decreto municipal que transformou o sistema em patrimônio público permanente.",
  },
  {
    titulo: "Primeira Infância — Quando Silos Precisam Cair",
    area: "Políticas Intersetoriais",
    contexto: "Uma criança de dois anos não sabe se seu problema é de saúde, educação ou assistência social. Mas a Prefeitura organizava suas respostas como se a criança soubesse. A política da primeira infância exigia integração — e a estrutura administrativa, por natureza, resiste a ela.",
    atuacao: "APPGGs contribuíram como articuladores intersetoriais: ajudaram a construir pontes entre secretarias que historicamente operavam em paralelo, facilitaram diálogos que não aconteceriam espontaneamente e ajudaram a traduzir a linguagem de cada área para as demais.",
    resultados: "Uma política integrada que articula saúde, educação, assistência social e outras áreas — com a carreira funcionando como o tecido conectivo que mantém a rede coesa.",
  },
  {
    titulo: "SP156 — Redesenhando a Porta de Entrada Digital da Cidade",
    area: "Inovação e Ciências Comportamentais",
    contexto: "O portal SP156 era a principal interface entre o cidadão e os serviços municipais. Mas era também complexo, visualmente poluído e escrito em linguagem burocrática. Muitos desistiam antes de concluir o que precisavam.",
    atuacao: "O Lab11 conduziu uma reformulação radical: testes de usabilidade com 320 cidadãos, reorganização da taxonomia por card sorting, prototipagem iterativa em três ciclos. Cada decisão de design foi validada com quem realmente usaria o portal.",
    resultados: "Taxa de resolutividade elevada para 84%. Redução de 30% na desistência. Aumento de 200% na visualização de serviços de transporte. O portal passou a funcionar para quem ele deveria sempre ter funcionado: o cidadão.",
  },
  {
    titulo: "Residência em Gestão Pública",
    area: "Gestão Institucional",
    contexto: "A administração pública precisa de renovação constante — não apenas de quadros, mas de perspectivas. Ao mesmo tempo, profissionais de fora raramente têm oportunidade de entender como a máquina pública realmente funciona.",
    atuacao: "APPGGs contribuíram com a estruturação de um programa que resolve os dois problemas simultaneamente: profissionais com vínculo flexível e tempo determinado entram na Prefeitura para observar, aprender e contribuir — trazendo olhares novos para problemas antigos.",
    resultados: "Um mecanismo institucional de renovação que beneficia tanto a administração quanto os residentes — e que demonstra que a gestão pública pode ser, ao mesmo tempo, estável e permeável.",
  },
  {
    titulo: "I Plano Municipal de Educação Ambiental",
    area: "Educação Ambiental",
    contexto: "São Paulo nunca havia tido um plano municipal de educação ambiental. Construí-lo exigia alinhar secretarias com agendas diferentes, níveis de governo com tempos distintos e atores com prioridades por vezes conflitantes.",
    atuacao: "APPGGs participaram do alinhamento estratégico entre secretarias e entre níveis de governo, utilizando o ferramental da teoria de múltiplos fluxos para identificar a janela de oportunidade e viabilizar a construção do plano.",
    resultados: "Aprovação do I Plano Municipal de Educação Ambiental — um marco que só foi possível porque alguém soube conectar agendas, traduzir urgências e coordenar atores que, sozinhos, não teriam chegado ao mesmo resultado.",
  },
  {
    titulo: "Modernização do Arquivo Histórico Municipal",
    area: "Gestão Institucional",
    contexto: "O Arquivo Histórico Municipal de São Paulo guardava a memória da cidade, mas sua gestão precisava de atualização. A pandemia de COVID-19 tornou o desafio mais complexo: como modernizar uma instituição quando a equipe está dispersa, insegura e resistente à mudança?",
    atuacao: "APPGGs contribuíram com o projeto de reestruturação, aplicando princípios da Nova Gestão Pública ao contexto real — com todas as suas contradições. Enfrentaram cultura organizacional arraigada, desconfiança legítima e limitações impostas pelo cenário pandêmico.",
    resultados: "Avanços concretos na modernização, mas, sobretudo, lições valiosas sobre os limites da reforma quando ela não dialoga com a cultura da organização. Um caso honesto sobre o que funciona — e o que não funciona — em gestão da mudança.",
  },
  {
    titulo: "Gestão Documental na Rede Municipal de Ensino",
    area: "Gestão Documental",
    contexto: "A maior rede de ensino municipal do país não tinha uma política estruturada de gestão documental. Arquivos se perdiam, memórias institucionais desapareciam e cada escola tratava seus documentos de forma diferente.",
    atuacao: "APPGGs contribuíram com o desenvolvimento de uma política institucional que integra arquivos, memória e educação — com governança clara para que a gestão documental nas unidades de ensino deixasse de ser improviso e passasse a ser método.",
    resultados: "Diretrizes e estrutura de governança estabelecidas para toda a rede municipal de ensino. A memória institucional da educação paulistana passou a ter um sistema para ser preservada.",
  },
  {
    titulo: "MEI Nota Fácil — Simplificando o Complexo",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Em São Paulo, mais de 760 mil MEIs dependem da emissão de nota fiscal eletrônica. Para isso, precisavam navegar por um sistema repleto de termos técnicos e etapas desnecessárias. O digital que deveria facilitar estava, na prática, excluindo.",
    atuacao: "O Lab11 fez o que a boa gestão pública exige: ouviu antes de desenhar. Envolveu 2.044 MEIs, identificou 39 dores na jornada e testou 13 protótipos em ciclos rápidos de experimentação.",
    resultados: "12.514 dispositivos ativos. 5.773 notas emitidas no período inicial. Nota 4,8 na Play Store, com 80% das avaliações em 5 estrelas. Inclusão digital não como slogan, mas como resultado mensurável.",
  },
  {
    titulo: "COVID-19 nos Terminais de Ônibus",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Durante a pandemia, terminais de ônibus eram pontos críticos de transmissão. Milhares de pessoas circulavam diariamente, e campanhas tradicionais de comunicação não mudavam comportamentos reais.",
    atuacao: "O Lab11 desenvolveu campanhas baseadas em ciências comportamentais e enviou 1 milhão de mensagens geolocalizadas para usuários dos 31 terminais, combinando informação, instrução e motivação.",
    resultados: "Alcance de 87% das pessoas presentes nos terminais. Mais de 10 mil interações com o link informativo. Diagnóstico preciso sobre comportamentos reais em espaços públicos. Evidência no lugar de intuição.",
  },

  // ── 2º Seminário APPGG ──
  {
    titulo: "CompStat Paulistano — Reforma dos Indicadores de Policiamento da GCM",
    area: "Segurança Urbana",
    contexto: "A Guarda Civil Metropolitana operava com taxas baixíssimas de cumprimento das rondas previstas em equipamentos públicos, especialmente escolas municipais. O modelo de programação era rígido e ineficaz.",
    atuacao: "APPGGs contribuíram com o redesenho do modelo, substituindo a programação por quantidade de rondas por roteiros diários de policiamento (RDP), baseados em períodos de patrulhamento e baseamento, cruzando dados de criminalidade e produtividade policial.",
    resultados: "Modelo mais flexível, eficiente e efetivo. Arquitetura de indicadores articulando todo o ciclo de atividades da GCM — da proteção de próprios municipais à proteção de vítimas de violência doméstica.",
  },
  {
    titulo: "IDMAS — Inspetoria de Defesa da Mulher e Ações Sociais da GCM",
    area: "Segurança Urbana",
    contexto: "O Programa Guardiã Maria da Penha precisava de institucionalização e integração do efetivo de guardas civis capacitados no monitoramento de medidas protetivas a mulheres vítimas de violência doméstica.",
    atuacao: "APPGGs contribuíram com a modelagem e implantação de uma Inspetoria da GCM com efetivo especializado e dedicado à proteção de pessoas e ações sociais, com foco central no Programa Guardiã Maria da Penha.",
    resultados: "Criação da IDMAS em 2019, mais que triplicando a capacidade de cobertura de proteção especializada a mulheres vítimas de violência doméstica no quadriênio 2019-2022.",
  },
  {
    titulo: "DRONEPOL — Programa de Monitoramento Aéreo de Segurança Urbana",
    area: "Segurança Urbana",
    contexto: "A SMSU precisava incorporar novas tecnologias de videomonitoramento e veículos aéreos não tripulados no planejamento e suporte de atividades de policiamento e defesa civil.",
    atuacao: "APPGGs contribuíram com o estabelecimento de equipe especializada de profissionais treinados na utilização de drones para finalidades de política pública, valendo-se da expertise dos próprios profissionais da SMSU.",
    resultados: "Menção honrosa como inovação no Premia Sampa. O Dronepol se tornou referência nacional e celeiro de capacitação de operadores de drones em forças policiais de todo o Brasil.",
  },
  {
    titulo: "Agenda Municipal 2030 — Municipalização dos ODS",
    area: "Planejamento e Monitoramento",
    contexto: "Entre 2019 e 2021, o município avançou na institucionalização da Agenda Municipal 2030, precisando criar governança para a Comissão Municipal ODS com participação social e coerência estratégica.",
    atuacao: "APPGGs contribuíram com a municipalização da Agenda 2030, estabelecendo a governança da Comissão Municipal ODS com garantia de paridade de gênero e alinhamento aos instrumentos de planejamento.",
    resultados: "Comissão Municipal ODS instituída. Agenda Municipal 2030 publicada. Plano de Ação 2021-2024 alinhado ao Programa de Metas e ao PPA 2022-2025.",
  },
  {
    titulo: "Incremento do Monitoramento de Obras no SMAE",
    area: "Planejamento e Monitoramento",
    contexto: "O monitoramento de obras da Prefeitura apresentava fragilidades, com etapas manuais e trabalhosas que dificultavam a consolidação de informações de todas as obras executadas.",
    atuacao: "APPGGs contribuíram com o incremento do SMAE para automatizar processos: introduziram a edição de lote, permitindo atualizar mais de 1.000 obras simultaneamente, e novos instrumentos de precisão.",
    resultados: "Ferramenta de edição de lote operacional. Novos instrumentos aumentando a precisão do monitoramento. Sugestões dos pontos focais integradas ao sistema.",
  },
  {
    titulo: "Acompanhamento do Backlog do SMAE",
    area: "Planejamento e Monitoramento",
    contexto: "O SMAE é melhorado continuamente por sprints mensais, mas a priorização de demandas entre múltiplos módulos exigia cocriação entre usuários e desenvolvedores.",
    atuacao: "APPGGs contribuíram com a organização de discussões entre usuários finais (SEPLAN) e desenvolvedores (FGV), construindo uma trilha de prioridades para atender às demandas mais urgentes de quatro módulos do sistema.",
    resultados: "Melhorias organizadas por prioridade. Experiência dos usuários aprimorada. Novas funcionalidades entregues com maior qualidade de inteligência.",
  },
  {
    titulo: "Carteira Prioritária de Projetos",
    area: "Planejamento e Monitoramento",
    contexto: "Mais de 90 projetos do Programa de Metas apresentavam complexidades e riscos exigindo acompanhamento próximo de um escritório de projetos para dar suporte à sua evolução.",
    atuacao: "APPGGs contribuíram com a consolidação de informações, geração de insumos para decisões estratégicas e deram suporte aos órgãos responsáveis, destravando gargalos e difundindo boas práticas de gestão de projetos.",
    resultados: "Relatórios mensais com pontos de atenção para lideranças. Carteira organizada e atualizada no SMAE. Padronização que permite visão geral de cada projeto em meio ao grande volume de informações.",
  },
  {
    titulo: "Residência Jurídica da PGM/SP",
    area: "Gestão Institucional",
    contexto: "A Procuradoria Geral do Município criou um programa inédito de Residência Jurídica, mas faltava estruturar toda a gestão acadêmica para recepção e acompanhamento de 150 residentes.",
    atuacao: "APPGG contribuiu com a montagem do curso 'Teoria e Prática da Advocacia Pública Municipal', estabeleceu fluxos para acompanhamento de monografias jurídicas e relatórios trimestrais.",
    resultados: "Curso assíncrono inédito realizado. Estrutura acadêmica consolidada. Pesquisa de avaliação indicou poucos ajustes necessários, sobretudo na organização de orientadores e bancas.",
  },
  {
    titulo: "Função Social da Propriedade Urbana",
    area: "Gestão Institucional",
    contexto: "A política de função social da propriedade urbana enfrentava desafios como imóveis alcançando a quinta alíquota de IPTU progressivo no tempo, exigindo melhorias nos fluxos e instrumentos alternativos.",
    atuacao: "APPGG contribuiu com a reorganização do CEPEUC, estabeleceu melhores fluxos com a Secretaria da Fazenda e estudou instrumentos alternativos ao cumprimento da função social da propriedade.",
    resultados: "Atualização de portarias, edição de portaria intersecretarial com a Fazenda, estudos de instrumentos alternativos e oferta de cursos na EMASP.",
  },
  {
    titulo: "Reformulação do Programa de Renda Familiar Mínima Municipal",
    area: "Políticas Sociais",
    contexto: "O PGRFMM operava com valores e público muito baixos, metodologia defasada e altos custos operacionais. Para reformulá-lo, era necessário um diagnóstico preciso e aumento no aporte financeiro.",
    atuacao: "APPGG contribuiu com o levantamento do histórico do programa, realizando diagnóstico com dados do Cadastro Único e construiu cenários orçamentários para retirar elegíveis da linha da pobreza.",
    resultados: "Cenários orçamentários elaborados. Estudo de Impacto Financeiro produzido. Subsídio ao PL 107/2023 (Renda Básica), aprovado em 1º turno na Câmara.",
  },
  {
    titulo: "Modelagem Organizacional da SMADS",
    area: "Gestão Institucional",
    contexto: "A SMADS necessitava de revisão estratégica do Gabinete Central, com desafios na interlocução e coleta de dados para reformular atribuições, organograma e força de trabalho.",
    atuacao: "APPGG contribuiu com a captação de informações de todas as áreas, estabeleceu interlocução qualificada e desenvolveu instrumental validado para modelagem organizacional e dimensionamento da força de trabalho.",
    resultados: "Propostas intermediárias de novas atribuições e estruturas. Instrumental de modelagem validado. Base consolidada para o Decreto de reorganização da SMADS.",
  },
  {
    titulo: "Transformação Digital da SMDET",
    area: "Transformação Digital",
    contexto: "A Secretaria de Desenvolvimento Econômico e Trabalho sofria com falta de centralização de dados, uso intenso de planilhas manuais, erros e retrabalho constantes.",
    atuacao: "APPGG contribuiu com a implantação de um sistema CRM (Dynamics 365) para acompanhamento da jornada dos cidadãos nos programas da Secretaria, automatizando processos e centralizando dados.",
    resultados: "CRM desenvolvido e em operacionalização nos 5 maiores programas da Secretaria. Maturidade em gestão de projetos ampliada. Conhecimento dos processos de trabalho aprofundado.",
  },
  {
    titulo: "Implantação do Contratos.gov.br na Prefeitura",
    area: "Gestão Institucional",
    contexto: "Com a Lei Federal 14.133/2021, a Prefeitura precisava de um sistema unificado de gestão contratual que atendesse às novas regras de licitações e contratos públicos.",
    atuacao: "APPGGs contribuíram com a cooperação técnica com o Ministério de Gestão para desenvolver, adaptar e implementar o Contratos.gov.br na Prefeitura, integrando-o aos sistemas existentes.",
    resultados: "Mais de 11 mil contratações registradas. Quase 60 órgãos e entidades utilizando a ferramenta. Integração com sistemas federais (Compras.gov.br, PNCP) concluída.",
  },
  {
    titulo: "Estratégia de Pesquisa e Avaliação da SME",
    area: "Planejamento e Monitoramento",
    contexto: "A Secretaria Municipal de Educação tem orçamento de mais de R$ 22 bilhões, mas realizava poucas pesquisas avaliativas e fazia pouco uso das já produzidas para orientar decisões.",
    atuacao: "APPGG contribuiu com a estruturação de repositório de pesquisas, identificou necessidades de avaliação e buscou modelo de Policy Lab onde pesquisa e formulação caminhem juntas, com parcerias e contratações.",
    resultados: "Contratação de consultores via programa AEPP+ (BID). Parcerias com SEPLAN e universidades. Avanço na construção de uma cultura de avaliação contínua de políticas educacionais.",
  },
  {
    titulo: "Escritório de Projetos da SME",
    area: "Planejamento e Monitoramento",
    contexto: "A Secretaria de Educação precisava padronizar metodologias de gestão de projetos, estruturar governança e apoiar projetos prioritários com tecnologias adequadas.",
    atuacao: "APPGG contribuiu com a criação do Escritório de Projetos, com manual, templates padronizados e modelo de avaliação de maturidade, apoiando Coordenadorias no mapeamento de projetos e iniciativas.",
    resultados: "Sharepoint estruturado. Apoio às Coordenadorias em seus desafios de gestão. Consultoria pelo BID para modelo de gestão de obras como projetos. Priorização a partir do Plano Estratégico da SME.",
  },
  {
    titulo: "Governança Integrada dos Instrumentos de Planejamento da PGM",
    area: "Planejamento e Monitoramento",
    contexto: "A PGM, recém-estruturada como Secretaria, precisava integrar Programa de Metas, PPA, LOA e outros instrumentos, superando visão histórica focada em atuação judicial.",
    atuacao: "APPGGs contribuíram com o alinhamento de instrumentos de planejamento e consolidaram modelo de gestão orientado a metas, governança, integridade e participação das unidades da PGM.",
    resultados: "Processo de planejamento estratégico iniciado. Comissão instituída. Etapas participativas concluídas e articulação inédita entre todas as áreas da Procuradoria.",
  },
  {
    titulo: "Fale com RH — Canal Digital de Atendimento Interno",
    area: "Transformação Digital",
    contexto: "Na PGM, atendimentos de RH por e-mail eram lentos, dispersos e sobrecarregavam a equipe em períodos de alta demanda, gerando atrasos e retrabalho.",
    atuacao: "APPGG contribuiu com a criação de formulários temáticos com triagem automática para organizar solicitações, padronizar informações e agilizar respostas, direcionando demandas ao responsável correto.",
    resultados: "Redução da sobrecarga de e-mails. Triagem direta para responsáveis. Menos retrabalho. Geração de dados sobre demandas e prazos para melhoria contínua.",
  },
  {
    titulo: "Planejamento Estratégico PGM 2030",
    area: "Planejamento e Monitoramento",
    contexto: "A Procuradoria Geral do Município precisava alinhar suas prioridades até 2030, com diagnóstico robusto e participação ampla para orientar decisões institucionais de longo prazo.",
    atuacao: "APPGGs contribuíram com a construção da visão de futuro, Missão, Visão e Valores, baseados em dados, diálogo e etapas estruturadas. Diagnóstico concluído, relatórios publicados, oficinas realizadas.",
    resultados: "MVV validados. Objetivos estratégicos em redação final. Desdobramento de metas e indicadores para 2026, com planos de ação e sistema de monitoramento para implementação contínua.",
  },
  {
    titulo: "Reestruturação Organizacional da PGM",
    area: "Gestão Institucional",
    contexto: "A PGM operava com estrutura e quadro de cargos defasados, sendo uma das poucas secretarias ainda sem reforma administrativa atualizada.",
    atuacao: "APPGGs contribuíram com diagnóstico, modelagem institucional e alinhamento para modernizar atribuições, áreas e quadro de cargos mediante proposta articulada.",
    resultados: "Diagnóstico concluído. Minuta de decreto e planilha de cargos em finalização. Tratativas contínuas para validação da nova estrutura organizacional.",
  },
  {
    titulo: "Mapeamento e Redesenho de Processos da PGM",
    area: "Gestão Institucional",
    contexto: "Na CGGM da PGM, o conhecimento estava concentrado em poucas pessoas e havia escassez de documentos de referência, dificultando a melhoria contínua e o controle dos processos.",
    atuacao: "APPGG contribuiu com a identificação, mapeamento e melhoria dos principais processos, articulando alterações com equipes, líderes e outras pastas envolvidas como SMIT e Secretaria da Fazenda.",
    resultados: "Processos mapeados em Visio e descritos em manuais. Alterações articuladas com todas as partes envolvidas. Modelo replicável para outras divisões da CGGM.",
  },
  {
    titulo: "Plano Municipal de Turismo — PLATUM 2030",
    area: "Planejamento e Monitoramento",
    contexto: "A governança do turismo em São Paulo precisava ser reativada, com construção participativa de um plano que integrasse diagnósticos, propostas setoriais e diretrizes de longo prazo.",
    atuacao: "APPGG contribuiu com a estruturação do PLATUM, com ampla participação social, retomando o COMTUR e realizando workshops, consulta pública e a 1ª Conferência Municipal de Turismo.",
    resultados: "Plano Municipal de Turismo (Perspectivas 2030) concluído. COMTUR retomado. Workshops, consulta pública e Conferência Municipal realizados com ampla participação.",
  },
  {
    titulo: "Expansão e Modernização do Sistema de Gestão Pedagógica (SGP)",
    area: "Transformação Digital",
    contexto: "A rede de ensino com 1 milhão de alunos, 80 mil servidores e 1.500 escolas fazia registros pedagógicos em papel. A pandemia acelerou a urgência da digitalização.",
    atuacao: "APPGG contribuiu com a implantação da nova versão do SGP e ampliou para toda a rede, integrando todas as etapas e modalidades de ensino, conectando escolas e famílias via sistemas digitais.",
    resultados: "SGP modernizado e expandido para EI, EF, EJA, educação especial e ensino médio. App Escola Aqui lançado. Metodologias ágeis adotadas em toda a secretaria.",
  },
  {
    titulo: "3º Plano de Ação em Governo Aberto de São Paulo",
    area: "Participação Social",
    contexto: "A cidade precisava criar compromissos de transparência, integridade e participação, articulando governo e sociedade no Fórum de Gestão Compartilhada.",
    atuacao: "APPGGs contribuíram com o processo colaborativo, incluindo consultas públicas, oficinas e diálogo multissetorial para definir ações concretas de governo aberto.",
    resultados: "Plano publicado e compromissos homologados pelo Comitê Intersecretarial de Governo Aberto, fortalecendo políticas municipais de abertura e transparência.",
  },
  {
    titulo: "Processo Eleitoral dos 32 Conselhos Participativos Municipais",
    area: "Participação Social",
    contexto: "A eleição unificada dos CPMs envolvia 32 Subprefeituras, exigindo lisura, padronização e suporte técnico-operacional em escala inédita.",
    atuacao: "APPGG contribuiu com a estruturação e coordenação de todas as etapas do pleito: edital, sistema eletrônico, comissões eleitorais, inscrições e capacitações para garantir um processo democrático e transparente.",
    resultados: "Eleição dos 32 CPMs concluída em 2022 com sistema unificado, comissões formadas, calendário executado e ampla participação social.",
  },
  {
    titulo: "Fortalecimento da Participação Social no Planejamento da Saúde",
    area: "Participação Social",
    contexto: "O SUS municipal precisava garantir planejamento transparente e participativo, integrando contribuições de conselhos e conferência aos instrumentos de planejamento.",
    atuacao: "APPGGs contribuíram com a qualificação do diálogo com cidadãos e incorporaram propostas nos instrumentos da Secretaria de Saúde, com encontros formativos, nota metodológica e devolutivas publicadas.",
    resultados: "Conselheiros envolvidos. Materiais formativos produzidos. Transparência e controle social ampliados no planejamento da saúde municipal.",
  },
  {
    titulo: "Reestruturação da Casa Civil",
    area: "Gestão Institucional",
    contexto: "A Casa Civil precisava expandir sua atuação para integrar interlocução com Subprefeituras e sociedade civil, exigindo revisão estrutural e administrativa completa.",
    atuacao: "APPGGs contribuíram com a elaboração de minuta de decreto para redefinir competências, criar novas unidades e fortalecer a articulação territorial e social da Secretaria.",
    resultados: "Decreto 61.928/2022 publicado, criando a Coordenadoria de Interlocução Governamental e reorganizando a Coordenadoria de Participação Social.",
  },
  {
    titulo: "Levantamento de Necessidades de RH para Gestão de Parcerias na SMADS",
    area: "Gestão Institucional",
    contexto: "O aumento de equipamentos de assistência social no pós-pandemia tornou a gestão das parcerias mais desafiadora, especialmente pela escassez de mão de obra qualificada.",
    atuacao: "APPGG contribuiu com o desenvolvimento do 'Mapa de Necessidades de RH', quantificando a necessidade de pessoal por meio de entrevistas, formulários e eventos com equipes de toda a cidade.",
    resultados: "Mapa que expõe necessidades de mão de obra especializada na gestão técnica das parcerias e sua distribuição nas diversas regiões da cidade.",
  },
  {
    titulo: "POT Busca Ativa Escolar",
    area: "Políticas Sociais",
    contexto: "Após a pandemia, era preciso reestruturar a busca ativa escolar para ampliar o apoio em todas as unidades da rede municipal, enfrentando o abandono e a evasão escolar.",
    atuacao: "APPGG contribuiu com a estruturação do novo POT, definindo fluxos, responsabilidades e instrumentos; qualificou o trabalho de até 5.000 Agentes de Busca Ativa Escolar (ABAEs) por meio de formação e materiais orientadores.",
    resultados: "Implementação sistemática em toda a Rede Municipal. Fluxos definidos, instrumentos de registro desenvolvidos e avaliação de implementação realizada.",
  },
  {
    titulo: "Ampliação do Atendimento Psicossocial na Rede de Educação",
    area: "Políticas Sociais",
    contexto: "O crescimento da demanda por apoio psicossocial nas escolas exigia reorganização do NAAPA e ampliação da proteção integral aos estudantes.",
    atuacao: "APPGG contribuiu com a definição de funções, fluxos de trabalho e instrumentos de monitoramento; integrou atuações psicopedagógica e psicossocial; estruturou contratação de OSC para o atendimento.",
    resultados: "Programa de Apoio e Acompanhamento para a Aprendizagem instituído pela IN 44/2025. NAAPA reorganizado. SAEPS criado com equipes e atribuições definidas.",
  },
  {
    titulo: "Comitê de Proteção Escolar",
    area: "Políticas Intersetoriais",
    contexto: "O aumento de episódios de violência contra escolas exigia articulação intersetorial para criar protocolos integrados de prevenção, intervenção e pós-venção.",
    atuacao: "APPGG contribuiu com a organização das ações do Comitê intersecretarial, estruturou reuniões e pautas, sistematizou diagnósticos e desenvolveu protocolos emergenciais e preventivos.",
    resultados: "Relatório com mapeamento de iniciativas. Proposta de reformulação do Gabinete Integrado de Segurança Escolar. Revisão de protocolos. Minuta de decreto e portaria produzidos.",
  },
  {
    titulo: "Perfis Comportamentais na Implementação do SEI",
    area: "Inovação e Ciências Comportamentais",
    contexto: "A implementação do SEI transformou a lógica da Prefeitura, mas o conhecimento sobre como servidores reagem em contextos de transição permanecia difuso e não sistematizado.",
    atuacao: "APPGG contribuiu com a documentação do conhecimento acumulado pelas equipes, criando perfis comportamentais e estratégias de engajamento replicáveis para gestão da mudança institucional.",
    resultados: "8 perfis comportamentais identificados com necessidades, dores, motivações e estratégias de engajamento. Material tornou-se referência em eventos nacionais e internacionais.",
  },
  {
    titulo: "CADIN IPTU — Reduzindo Inadimplência com Ciências Comportamentais",
    area: "Inovação e Ciências Comportamentais",
    contexto: "Em 2018, mais de R$ 1,6 bilhão deixou de entrar nos cofres municipais por inadimplência do IPTU. Mais da metade dos contribuintes não regularizava sua situação mesmo recebendo aviso do CADIN.",
    atuacao: "APPGG contribuiu com o redesenho do comunicado de cobrança usando princípios de ciências comportamentais, testando seis versões de cartas em experimento randomizado com 15.348 contribuintes.",
    resultados: "A carta vencedora aumentou a regularização em 8,4%. Impacto direto de R$ 953 mil no teste e aumento de arrecadação de R$ 60 milhões no ano.",
  },
  {
    titulo: "Glossário de Compras Públicas da Prefeitura",
    area: "Gestão Institucional",
    contexto: "Documentos e ferramentas de compras públicas usavam linguagem técnica e burocrática, dificultando transparência, controle social e participação de empresas nos processos licitatórios.",
    atuacao: "APPGGs contribuíram com o desenvolvimento de glossário em linguagem simples, com quase 200 termos e expressões, integrado ao Diário Oficial e Portal de Transparência.",
    resultados: "Glossário publicado no Portal de Compras. 2º lugar no Premia Sampa 2024 na categoria Linguagem Simples. Cerca de 15 pessoas envolvidas na elaboração.",
  },
  {
    titulo: "Tipificação da Rede de Atendimento de Direitos Humanos",
    area: "Políticas Intersetoriais",
    contexto: "A absorção de equipamentos de secretarias extintas em 2017 e a necessidade de ampliar atendimento a públicos específicos criou uma rede desarticulada de serviços de direitos humanos.",
    atuacao: "APPGG contribuiu com a produção de parâmetros comuns para atuação dos equipamentos da SMDHC, respeitando especificidades de cada público-alvo e fortalecendo a noção de atuação em rede.",
    resultados: "Portaria SMDHC nº 15/2021 publicada. Manuais de atendimento e fluxos especializados. Indicadores para monitoramento e avaliação dos serviços.",
  },
  {
    titulo: "Protocolos Integrados de Atenção à Primeira Infância",
    area: "Políticas Intersetoriais",
    contexto: "Apesar de diversas iniciativas para gestantes e crianças, predominava atuação segmentada entre órgãos, criando obstáculos à proteção integral e ao desenvolvimento na primeira infância.",
    atuacao: "APPGGs contribuíram com a elaboração de protocolos integrados e apoiaram implementação com cursos de capacitação e ações de sensibilização para atuação integrada entre diferentes políticas públicas.",
    resultados: "Protocolos publicados. Mais de 14 mil profissionais capacitados desde 2022 em parceria com a EMASP. Fortalecimento da visão integral do cidadão.",
  },
  {
    titulo: "Dashboards de Monitoramento e Avaliação da SMDET",
    area: "Planejamento e Monitoramento",
    contexto: "A SMDET expandiu suas políticas sem infraestrutura adequada de gestão da informação — dados fragmentados, pouca padronização e alta rotatividade dificultavam decisões baseadas em evidências.",
    atuacao: "APPGGs contribuíram com a estruturação de processos de coleta e processamento, criaram rede de pontos focais e padronizaram milhões de registros retroativos para produzir indicadores confiáveis.",
    resultados: "Relatórios e dashboards consistentes entregues ao Gabinete. Gestão baseada em evidências fortalecida. Governança de dados e capacitação recorrente implementadas.",
  },
  {
    titulo: "5ª Conferência Municipal do Meio Ambiente",
    area: "Educação Ambiental",
    contexto: "O Ministério do Meio Ambiente convocou a 5ª Conferência Nacional, com foco na Emergência Climática e tendo como pano de fundo a COP30 no Brasil. São Paulo precisava realizar sua etapa municipal.",
    atuacao: "APPGGs contribuíram com a organização da Conferência, com 20 grupos de trabalho em 5 eixos temáticos, garantindo diversidade de atores e inclusão de diferentes segmentos da sociedade.",
    resultados: "Mais de 400 participantes. 10 propostas eleitas e 100 representantes municipais encaminhados à etapa estadual. Diversidade de atores refletida nas propostas finais.",
  },
  {
    titulo: "PROMAC — Incentivo Fiscal à Cultura com Territorialização",
    area: "Gestão Institucional",
    contexto: "A 'Lei Rouanet Paulistana' acabava de ter seu primeiro decreto regulamentador. Havia o desafio de implementá-la evitando a concentração de recursos em grupos privilegiados do setor cultural.",
    atuacao: "APPGG contribuiu com o desenho de fluxos operacionais, formação de equipe, e criou editais com cotas para regiões periféricas (menor IDH) para descentralizar os recursos do incentivo fiscal.",
    resultados: "Novos decretos regulamentadores publicados. Cerca de R$ 135 milhões geridos em 5 anos. Descentralização efetiva de recursos. Programa tornou-se referência como modelo de fomento cultural.",
  },
  {
    titulo: "Plataforma Integrada de Incentivos Fiscais",
    area: "Transformação Digital",
    contexto: "O PROMAC e outros incentivos fiscais operavam de forma precária, via e-mails e SEI, sem plataforma integrada para contribuintes pagarem impostos e incentivarem projetos simultaneamente.",
    atuacao: "APPGG contribuiu com o desenho do fluxo da Plataforma Integrada, articulando SMC e Secretaria da Fazenda para integração com o SOF e expansão para todos os incentivos fiscais municipais.",
    resultados: "Desenho completo do fluxo concluído. Contratação do desenvolvimento realizada. Expectativa: redução do tempo de recebimento de recursos de 3 meses para 3 minutos.",
  },
  {
    titulo: "Reestruturação da Secretaria de Cultura e Economia Criativa",
    area: "Gestão Institucional",
    contexto: "Com a nova denominação da pasta, era necessário definir o escopo de Economia Criativa e modernizar uma estrutura organizacional cujo último decreto datava de 2018.",
    atuacao: "APPGG contribuiu com o processo de escuta com servidores, visitas a todas as áreas, diagnóstico da pasta e definição dos eixos de atuação em Economia Criativa e sua modelagem organizacional.",
    resultados: "Diagnóstico concluído. Eixos de Economia Criativa definidos. Minuta de Decreto de Reestruturação em construção com base em ampla participação dos servidores.",
  },
  {
    titulo: "Diagnóstico dos Desafios de Gestão das Subprefeituras",
    area: "Gestão Institucional",
    contexto: "Não se sabia com clareza quais eram os principais desafios de gestão da SMSUB e das 32 Subprefeituras, dificultando a proposição de melhorias em orçamento, licitações, governança e dados.",
    atuacao: "APPGGs contribuíram com visitas às 32 Subprefeituras, escutando servidores de diversos níveis hierárquicos e consolidaram percepções difusas em um documento único e organizado.",
    resultados: "Relatório 'Desafios de Gestão das Subprefeituras' publicado e divulgado. Maior alinhamento interno. Registro inédito de percepções dos servidores de todo o território da cidade.",
  },
  {
    titulo: "Reestruturação da SMSUB — Após 40 Anos sem Revisão",
    area: "Gestão Institucional",
    contexto: "O último decreto de estrutura completa da SMSUB datava de 1977, quando nem existia o modelo atual de 32 Subprefeituras. Um emaranhado de normativos acumulados em 40 anos precisava ser reorganizado.",
    atuacao: "APPGGs contribuíram com visitas, reuniões e oficinas junto a servidores das 32 Subprefeituras, construindo processo participativo com instrumentos de coleta e propostas de nova modelagem.",
    resultados: "Diagnóstico da estrutura e governança produzido. Propostas de nova modelagem construídas participativamente. Trabalho serviu de base para publicação da nova estrutura organizacional.",
  },
  {
    titulo: "Prato Aberto — Transparência na Alimentação Escolar",
    area: "Inovação e Ciências Comportamentais",
    contexto: "A divulgação de 2,2 milhões de refeições diárias para 995 mil estudantes era pouco transparente e intuitiva. Não havia ferramentas para avaliação da qualidade da alimentação escolar.",
    atuacao: "APPGGs contribuíram com a criação de site responsivo para consulta a cardápios, o primeiro chatbot da Prefeitura (Robô Edu) e um Editor de Cardápios para a gestão — tudo em código aberto e com apoio da UNESCO.",
    resultados: "Primeira ferramenta do Brasil a oferecer transparência nos cardápios escolares fora do Diário Oficial. Prêmio Internacional Gobernarte (BID) em 2017. Referência em inovação na América Latina.",
  },
  {
    titulo: "Revisão Participativa do Plano Diretor Estratégico (PDE 2014-2029)",
    area: "Participação Social",
    contexto: "O PDE previa revisão participativa em 2021, prorrogada pela COVID-19. Havia desconfiança sobre a capacidade de produzir processo participativo com ampla adesão em tempo reduzido.",
    atuacao: "APPGGs contribuíram com o desenvolvimento de metodologia estruturante de participação social, sistematizaram resultados de múltiplos formatos (Participe+, debates, oficinas) e articularam equipes internas.",
    resultados: "Diversificação dos canais participativos. Promoção da transparência dos resultados. Projeto de lei com resultado das contribuições enviado à Câmara.",
  },
  {
    titulo: "8ª Conferência da Cidade de São Paulo",
    area: "Participação Social",
    contexto: "A Conferência integrou movimento nacional voltado ao desenvolvimento urbano sustentável, com papel estratégico na construção da Política Nacional de Desenvolvimento Urbano (PNDU).",
    atuacao: "APPGGs contribuíram com a estruturação de 15 Encontros Regionais preparatórios e a condução de dois dias de Conferência, descentralizando o debate e captando demandas locais para a PNDU.",
    resultados: "Mais de 1.500 participantes nos Encontros Regionais. Mais de 4 mil pessoas na Conferência. 640 propostas geradas. 242 delegados eleitos para representar São Paulo.",
  },
  {
    titulo: "QUALIFICA SUAS-SP — Fortalecimento da Assistência Social",
    area: "Políticas Sociais",
    contexto: "Na maior cidade do país, investimentos em assistência social estão sempre aquém do necessário, comprometendo a qualidade do atendimento e as condições de trabalho nos equipamentos.",
    atuacao: "APPGGs contribuíram com o desenvolvimento de estratégia de captação de recursos, alinhando diagnósticos e Planos Setoriais para direcionar investimento em infraestrutura, modernização e ampliação de cobertura.",
    resultados: "Projeto de financiamento aprovado pelo Banco Mundial com juros subsidiados. Atividades preparatórias já iniciadas com fundos de doação. Expectativa de recebimento no 2º semestre de 2026.",
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
        subtitle="Mais de 50 casos reais de atuação de Analistas de Políticas Públicas e Gestão Governamental na Prefeitura de São Paulo. Do Caderno Gestão Pública em Rede ao 2º Seminário APPGG."
      />

      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <SectionTitle label="Casos Documentados" title="Onde a Carreira Fez Diferença" subtitle="Cada caso abaixo é baseado em registros públicos produzidos por APPGGs. Não são promessas: são resultados." />

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
              <FadeIn key={caso.titulo} delay={i * 0.04}>
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

      {/* Eixos da Carreira */}
      <section className="py-24 md:py-32 bg-section-alt">
        <div className="container max-w-3xl">
          <SectionTitle label="Vocação" title="Os Três Eixos da Carreira" />
          <FadeIn>
            <div className="space-y-0 border-t border-luxury-border">
              {[
                { num: "I", title: "Formulação de Políticas Públicas", desc: "Antes de qualquer obra, decreto ou programa, alguém precisa traduzir um problema difuso em uma política viável. O APPGG é quem senta à mesa com dados, evidências e experiência de campo para desenhar soluções que resistam à troca de gestão — porque políticas públicas sérias não podem depender de quem ocupa a cadeira." },
                { num: "II", title: "Gestão Estratégica e Governança", desc: "Gerir uma cidade de 12 milhões de pessoas exige mais do que boa vontade. Exige método, visão sistêmica e alguém capaz de conectar secretarias que não se falam, alinhar orçamentos que competem entre si e garantir que a máquina entregue o que prometeu. É esse o trabalho silencioso que mantém a engrenagem girando — e que raramente aparece nos holofotes." },
                { num: "III", title: "Articulação Transversal e Inovação", desc: "Os problemas mais urgentes da cidade — primeira infância, mudanças climáticas, transformação digital — não cabem dentro de uma única secretaria. O APPGG atua nas fronteiras do organograma, costurando soluções que nenhuma área sozinha conseguiria entregar. É o profissional que cruza silos, provoca desconforto produtivo e faz a inovação acontecer onde ela é mais necessária: dentro do Estado." },
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
