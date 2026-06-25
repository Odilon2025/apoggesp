## Contexto

O Ofício ATL SEI nº 159925158 (Prefeito Ricardo Nunes, 24/06/2026) encaminha à Câmara um Projeto de Lei que:

1. Cria o **Quadro dos Profissionais do Meio Ambiente – QPMA**, com tabela de subsídio de **R$ 11.045,76 (QPMA1) a R$ 22.716,48 (QPMA17)**.
2. Cria cargos e propõe **revalorização do QGAS** (carreira APPGG), com tabela de **R$ 12.674,83 (QGAS1) a R$ 22.814,56 (QGAS17)** — J40.

Ou seja: o Executivo já reconhece a necessidade de revalorizar carreiras técnicas municipais. O Analista de Meio Ambiente ganhou quadro próprio e tabela robusta; o APPGG entra na mesma propositura, mas com diferença de topo de apenas **R$ 98** sobre uma carreira de atuação setorial — sem refletir a **transversalidade**, a complexidade e o caráter de gestão sistêmica do APPGG.

## O que adicionar à página `/campanha-salarial`

Nova seção **"Um precedente que reforça nosso pedido"**, inserida **logo após a tabela "Comparativo com outras carreiras"** e antes do bloco de "Projetos de Alto Impacto". Tom institucional, respeitoso com a carreira de Meio Ambiente (sem demérito), agradecendo o movimento do Executivo e pedindo que a revalorização do APPGG seja consolidada e calibrada à altura da transversalidade da carreira.

### Estrutura

**a) SectionTitle**
- Label: `Precedente institucional`
- Título: `Meio Ambiente revalorizado: um passo certo que precisa alcançar o APPGG`
- Subtítulo: `O Projeto de Lei encaminhado pelo Prefeito Ricardo Nunes em junho de 2026 cria o Quadro dos Profissionais do Meio Ambiente e propõe nova tabela de subsídios — reconhecendo, com acerto, o valor das carreiras técnicas municipais. A APOGESP saúda a iniciativa e pede que a revalorização do APPGG, contemplada na mesma propositura, seja calibrada à transversalidade e à complexidade da carreira.`

**b) Grid de 3 KPIs**
- `R$ 22.716,48` — Topo proposto para Analista de Meio Ambiente (QPMA17)
- `R$ 22.814,56` — Topo proposto para APPGG (QGAS17) — diferença de apenas R$ 98
- `23 secretarias` — Alcance transversal atual do APPGG na Prefeitura

**c) Dois cards lado a lado**

Card 1 — *"O acerto do Executivo"*: parágrafo curto reconhecendo a criação do QPMA, a gestão centralizada pela SVMA e o fortalecimento da identidade institucional da área ambiental. Citar literalmente o trecho do ofício: *"valorização do servidor público, sempre orientada à melhoria da qualidade dos serviços oferecidos à população"*.

Card 2 — *"Por que o APPGG precisa de calibragem específica"*: parágrafo curto destacando que o APPGG atua de forma **transversal** (não setorial), em planejamento, orçamento, gestão de projetos, modernização administrativa, governança de dados e articulação interinstitucional — em todas as 23 secretarias. A diferença de R$ 98 no topo não reflete essa amplitude. Pedir que a revalorização do QGAS seja **consolidada na tramitação** e calibrada para refletir a complexidade sistêmica da carreira.

**d) Frase de fechamento + CTA discreto**

Blockquote curto: *"Se a Prefeitura reconhece, com justiça, a especificidade técnica do Analista de Meio Ambiente, o mesmo princípio se aplica — em maior escala — à carreira responsável por dar coerência transversal a todas as políticas municipais."*

Link discreto para o ofício no portal de processos da Prefeitura (código 159925158).

## Implementação técnica

Arquivo único editado: `src/pages/CampanhaSalarialPage.tsx`.

- Reusar `SectionTitle`, `FadeIn`, `CMSMarkdown` e os utilitários `field()` já presentes na página.
- Inserir a seção como `<section className="py-20 bg-section-alt">` (alternando com o fundo neutro adjacente).
- Todos os textos atrás de chaves CMS para edição posterior:
  - `campanha-salarial.precedente.label`
  - `campanha-salarial.precedente.titulo`
  - `campanha-salarial.precedente.subtitulo`
  - `campanha-salarial.precedente.kpi1.num` / `.label`
  - `campanha-salarial.precedente.kpi2.num` / `.label`
  - `campanha-salarial.precedente.kpi3.num` / `.label`
  - `campanha-salarial.precedente.card1.titulo` / `.texto` (markdown)
  - `campanha-salarial.precedente.card2.titulo` / `.texto` (markdown)
  - `campanha-salarial.precedente.frase`
  - `campanha-salarial.precedente.link.label` / `.url`
- KPIs com tipografia display (`text-4xl/5xl`, `text-gold`) e caption uppercase tracking, mesmo padrão dos outros KPIs da página.
- Sem mudanças de schema, RLS, migrations ou dependências.
- Sem alterar a tabela comparativa, os projetos de alto impacto, o CTA ou demais seções.

## Tom

- Institucional, técnico, agradece o movimento do Executivo.
- **Nunca** sugere que Analista de Meio Ambiente é "menor" ou desmerece a carreira.
- Foca em **transversalidade × especialização setorial** como o argumento de calibragem.
- APPGG como colaborador da administração superior — não como protagonista isolado.

## Fora de escopo

- Não cria página nova, não mexe em outras páginas.
- Não publica o PDF do ofício no site (apenas link externo opcional).
- Não altera dados do snapshot nem cria novas tabelas no banco.
