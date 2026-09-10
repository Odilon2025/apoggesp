# Analytics detalhado: saber de onde vêm os acessos

## Situação hoje

O site já tem a medição básica da Lovable. Nos últimos 30 dias: 216 visitantes, 755 páginas vistas. Origens registradas: Direto 148, Google 62, Bing 2, Facebook 2, ChatGPT 1, Teams 1. Páginas mais vistas: home (120), /integridade (47), /campanha-salarial (35), /area-associado (35).

Limite atual: "Direto" (quase 70%) é uma caixa-preta — inclui WhatsApp, e-mail, PDF, links copiados e apps que escondem a origem. Não dá para saber qual grupo ou mensagem trouxe cada visita, nem o que a pessoa fez depois de entrar.

## O que será feito

### 1. Medição aprofundada com PostHog
Adicionar o PostHog (plano gratuito, 1 milhão de eventos/mês — muito acima do volume atual) para registrar, por visita:

- Origem completa: site de referência, campanha, mecanismo de busca
- Localização (cidade/estado/país), aparelho, navegador, sistema
- Jornada: sequência de páginas, tempo em cada uma, ponto de saída
- Ações: cliques em links externos, downloads de documentos, envio do pedido de acesso, entrada na Área do Associado, uso da Wiki e das votações
- Gravação de sessão e mapas de calor (opcional, pode ficar desligado)
- Funis: por exemplo, quantos chegam na home e acabam na Área do Associado

### 2. Iluminar o "Direto" com links etiquetados
Preparar uma lista de links etiquetados para cada canal que a APOGESP usa (grupo de WhatsApp, e-mail aos associados, LinkedIn, assinatura, QR em apresentações). Quem entra por um desses links passa a aparecer com a origem certa, em vez de "Direto". Os links internos do site continuam sem etiqueta, para não apagar a origem original.

### 3. Painel próprio no admin (opcional, decidir depois)
Uma página em /admin com os números principais já resumidos, para não depender de abrir o PostHog. Fica para uma segunda etapa.

## Privacidade

O site é institucional e público. A configuração usará mascaramento de campos sensíveis nas gravações, sem cruzar dados com e-mails de associados, e a Área do Associado ficará com gravação desativada. Um aviso curto de cookies/medição pode ser incluído se você quiser.

## Detalhes técnicos

- Conectar o PostHog pelo conector nativo (`standard_connectors--connect`), que injeta `VITE_LOVABLE_CONNECTOR_POSTHOG_API_KEY` e a região.
- Inicializar `posthog-js` em `src/main.tsx` com `capture_pageview: false` e um componente de rastreio de rota dentro do `BrowserRouter`, para registrar cada mudança de página do app (SPA).
- Helper `src/lib/analytics.ts` com `track(evento, props)` e captura de UTMs na primeira visita, persistidas na sessão.
- Eventos nomeados nos pontos-chave: cliques externos em `LinksUteisPage`, downloads na Biblioteca, login/magic link, voto e comentário nas Votações, comentários da Wiki.
- Session replay com `maskAllInputs: true` e desativado nas rotas `/area-associado/*` e `/admin/*`.
- Nenhuma mudança de banco ou de RLS.

## O que fica com você

Depois da implementação: criar/entrar na conta PostHog no momento de conectar, e me dizer quais canais você usa para eu gerar os links etiquetados.
