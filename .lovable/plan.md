# Atlas PPGG na página A Carreira

## Objetivo
Incorporar ao portal APOGESP uma subseção institucional inspirada no Atlas PPGG já existente, para apresentar e ampliar progressivamente o repertório de carreiras de políticas públicas e gestão governamental no Brasil e no exterior.

## O que será construído
- Criar a subseção `Atlas PPGG` em `/carreira#atlas-ppgg`, preservando integralmente a identidade visual Quiet Luxury do portal.
- Abrir a seção com um panorama editorial sobre carreiras permanentes de gestão como infraestrutura de capacidade estatal.
- Organizar o conteúdo em dois recortes claros: Brasil e referências internacionais.
- Exibir fichas comparáveis por carreira, com esfera/localidade, nome e sigla, síntese institucional, base legal ou fonte oficial quando disponível e link externo.
- Incluir os casos já mapeados no Atlas: EPPGG federal, APPGG São Paulo e referências estaduais; Reino Unido, Argentina, Chile, Estados Unidos e Singapura.
- Evitar comparações valorativas não documentadas e não transformar “burocracia de elite” em identidade principal.
- Adicionar `Atlas PPGG` ao submenu de A Carreira, com carregamento correto pela âncora.

## Gestão do conteúdo
- Criar uma coleção estruturada no painel administrativo para cadastrar, editar, ordenar, publicar e remover carreiras.
- Permitir os campos: recorte geográfico, país/UF, nome, sigla, esfera, resumo, base legal/fonte, URL oficial, destaque e ordem.
- Publicar somente registros marcados como publicados; alterações administrativas seguirão as permissões editoriais já existentes.
- Manter dados iniciais de fallback no projeto para a página continuar útil mesmo se o serviço de conteúdo estiver indisponível.

## Validação
- Conferir carregamento da âncora pelo menu.
- Conferir legibilidade, filtros e fichas em celular e desktop.
- Validar compilação e ausência de erros no navegador.
- Não alterar números ou demais conteúdos da página A Carreira nesta entrega.

## Detalhes técnicos
- Nova tabela pública com permissões explícitas e políticas de segurança: leitura anônima apenas de itens publicados; escrita apenas por editores autorizados.
- Reaproveitar os padrões existentes de listas do CMS, publicação e componentes do portal.
- Usar fontes oficiais como referência e identificar claramente links externos.
