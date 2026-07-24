UPDATE public.planos_itens
SET dados_publicado = jsonb_set(
  dados_publicado,
  '{projetos}',
  '[
    {"nome":"Apoio à atualização dos mecanismos de gestão de parceria na SMADS","descricao":"Elaboração de um Manual de Parcerias e acompanhamento da Portaria Nº 069/SMADS/2024, que institui o Sistema de Gestão do Terceiro Setor (SGTS)."},
    {"nome":"Estruturação das atividades do Núcleo de Desenvolvimento Social da SMADS","descricao":"Revisão da metodologia de concessão dos auxílios reencontro, com foco na moradia, e contribuição para a elaboração do PLAMSAN."},
    {"nome":"Apoio às ações de enfrentamento a situações de calamidade","descricao":"Melhoria no atendimento socioassistencial em calamidades, garantindo segurança e bem-estar a populações vulneráveis através da oferta de bens e serviços."},
    {"nome":"Aperfeiçoamento do Controle Interno","descricao":"Aprimoramento da transparência, tratamento de ações de controle interno e externo, e promoção de uma cultura de integridade na Administração Pública."},
    {"nome":"Dimensionamento de equipes nas unidades da SMADS","descricao":"Estudo das necessidades de recursos humanos para gestão de parcerias e adequação à NOB RH SUAS, com elaboração de planilhas de alocação de profissionais."},
    {"nome":"Estruturação de gestão estratégica de compras e contratos","descricao":"Apoio ao planejamento de compras e desenvolvimento de fluxos e ferramentas para a execução do Plano de Contratações Anual."},
    {"nome":"Modernização e integração de Sistemas Informatizados","descricao":"Apoio à vigilância socioassistencial para qualificação das ofertas e atendimento das demandas."},
    {"nome":"Estruturação do Planejamento setorial e orçamentário","descricao":"Criação de um ponto de interlocução na Assessoria Técnica para atender demandas de informação e subsidiar a tomada de decisões."},
    {"nome":"Implementação de Plano de Educação Permanente","descricao":"Apoio à implementação do plano de educação para trabalhadores do SUAS e à criação de um Ambiente Virtual de Aprendizagem."},
    {"nome":"Estruturação do Planejamento e Execução Orçamentária","descricao":"Integração dos instrumentos de planejamento e orçamento para qualificar a elaboração dos planos da Pasta."},
    {"nome":"Desenvolvimento de ações para a melhoria do atendimento ao cidadão","descricao":"Consolidação do Comitê de Atendimento ao Cidadão e melhorias nos serviços, infraestrutura, participação e transparência."},
    {"nome":"Rede de Planejamento Sepep","descricao":"Monitoramento e articulação intersecretarial do Programa de Metas e outros instrumentos de planejamento."},
    {"nome":"Coordenação do Projeto \"Qualifica SUAS-SP\"","descricao":"Planejamento e detalhamento de ações para aprovação e implementação do projeto, coordenando a Unidade de Gestão de financiamento junto ao Banco Mundial."},
    {"nome":"Gestão Documental","descricao":"Diagnóstico da situação documental da SMADS e sugestões para melhoria dos fluxos de gestão documental."},
    {"nome":"Desenho de ações de trabalho e renda","descricao":"Articulação com a SMDET para estabelecer fluxos de trabalho e renda no serviço social."},
    {"nome":"Redesenho do Programa Renda Mínima","descricao":"Necessidade urgente de reformulação para ampliar a cobertura do programa e alinhar-se à Meta 01 do Programa de Metas, visando atender mais famílias em situação de vulnerabilidade social."}
  ]'::jsonb
),
dados_rascunho = NULL,
tem_rascunho = false
WHERE id = 'ddfe0e3b-c174-4ea8-85ff-459197a92f7a';