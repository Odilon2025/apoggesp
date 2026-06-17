## Objetivo

Continuar o texto da página `/campanha-salarial` mostrando, **com dados concretos**, por que a carreira APPGG é estratégica para a cidade — e por que a defasagem salarial coloca esse patrimônio técnico em risco. Tudo respeitando o tom colaborativo (APPGG nunca como protagonista isolado) e o "quiet luxury" do site.

## Onde entra

Nova seção inserida **entre o bloco "Comparativo" e o "CTA"** em `src/pages/CampanhaSalarialPage.tsx`. Nada é removido; a tabela comparativa e o CTA permanecem.

## Estrutura da nova seção

Dois blocos curtos com narrativa breve + grid de indicadores numéricos. Todos os textos passam pelo CMS (`field()` / `CMSMarkdown`) para edição posterior.

### Bloco A — "O que está em jogo" (Impacto da carreira)

Fontes: `src/data/snapshot.json` (snapshot fev/2026).

Indicadores (4 cards em grid):
- **185** APPGGs em exercício
- **23** órgãos da administração direta com APPGGs colaborando
- **57** em posições de coordenação/liderança (≈31% do quadro)
- **6** concursos realizados desde 2016 (coortes 2016–2026)

Texto curto acima do grid:
> "A carreira APPGG é hoje um tecido técnico distribuído por 23 secretarias e órgãos da Prefeitura. Não substitui ninguém — colabora com gestores, dirigentes e demais carreiras na formulação, implementação e avaliação de políticas públicas."

### Bloco B — "O custo de não recompor" (Risco de evasão)

Fontes: coortes do snapshot + categorias do Observatório de Evasões já documentadas no projeto.

Indicadores (3 cards):
- **10 anos** desde o primeiro concurso (2016) sem equiparação salarial
- **34%** abaixo do piso do EPPGG federal no ingresso (já mencionado, mas aqui ressignificado como vetor de evasão)
- **4 frentes** de evasão monitoradas pelo Observatório: exonerações, LIPs, cedências, aposentadorias

Texto curto:
> "Cada APPGG que sai leva conhecimento institucional irrecuperável. O Observatório de Evasões da APOGESP acompanha exonerações a pedido, licenças sem vencimento, cedências e aposentadorias — quatro vetores que, somados à defasagem salarial, comprometem a continuidade das políticas públicas municipais."

Link discreto ao final do bloco: "Conheça o Observatório de Evasões →" para `/observatorio-evasoes`.

## Detalhes técnicos

- Arquivo único editado: `src/pages/CampanhaSalarialPage.tsx`.
- Importar `getSnapshot` de `@/lib/cms` e consumir via `useEffect`/`useState` (ou criar pequeno hook local) — mesma abordagem usada em outras páginas que leem snapshot.
- Indicadores em grid 2x2 / 1x3 com tipografia display para o número (text-4xl/5xl, `text-gold`) e caption em uppercase tracking luxury, seguindo o padrão de `ObservatorioEvasoesPage`.
- Seção com `bg-card` para alternar com os fundos `bg-section-alt` que cercam.
- Todos os textos (label, título, subtítulo, frases dos dois blocos) ficam atrás de chaves CMS:
  - `campanha-salarial.dados.label`
  - `campanha-salarial.dados.titulo`
  - `campanha-salarial.dados.subtitulo`
  - `campanha-salarial.dados.impacto.texto`
  - `campanha-salarial.dados.risco.texto`
- Nenhuma mudança de schema, migration, RLS ou dependências.
- Tom: institucional, técnico; APPGG sempre como colaborador.

## Fora de escopo

- Não altera tabela comparativa nem CTA.
- Não cria novos campos no banco (usa snapshot existente e fallbacks hardcoded).
- Não adiciona gráficos novos — apenas KPIs numéricos discretos.
