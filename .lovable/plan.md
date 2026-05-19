## Status atual da migração para o CMS

### Páginas com textos já no CMS (OK)
- Home, APOGESP, Contato, Carreira, Diversidade, Sustentabilidade, Publicações, Planos Ambientais, Campanha Salarial, Campanha Nomeação.

### Dados estruturados já no CMS (CRUD no admin)
- `cronologia_itens`, `atos_normativos_itens`, `planos_itens`, `publicacoes_itens`, `atuacao_destaques`, `snapshot_carreira`.

---

## O que ainda falta refatorar

### 1. AtuacaoPage — lista de casos (alta prioridade)
Os textos do hero e seções já vêm do CMS, **mas** os ~50 cases documentados (`casos: CasoAtuacao[]`) e a lista de filtros `areas` continuam hardcoded no arquivo (linhas 19–428, ~400 linhas).

**Proposta**: criar tabela `casos_atuacao` (mesmo padrão dos outros: `dados_publicado`/`dados_rascunho`/`ordem`/`publicado`/`deletado`), seedar com os 50 casos atuais, adicionar schema no admin (`cmsSchemas.ts`) e consumir via `useCMSList`. A lista `areas` pode ser derivada dinamicamente dos casos.

### 2. PlanosAtuacaoPage — textos das seções
Já consome `planos_itens` da base, mas a maioria dos títulos/labels/explicações das seções intermediárias (introdução, legenda, CTAs) ainda está hardcoded (apenas hero e stats foram migrados).

**Proposta**: seedar os campos restantes em `page_fields` (pagina = `planos-atuacao`) e trocar strings por `field(f, ...)` / `<CMSMarkdown />`.

### 3. ObservatorioEvasoesPage — 100% hardcoded
251 linhas sem nenhum uso do CMS. Contém:
- Hero e textos institucionais
- 4 indicadores (`indicadores`)
- 4 categorias com `icon` + título + descrição + lista de focos (`categorias`)
- Seções de metodologia/CTA

**Proposta**:
- Textos institucionais → `page_fields` (pagina = `observatorio-evasoes`).
- Indicadores → tabela `observatorio_indicadores` (num + label).
- Categorias → tabela `observatorio_categorias` (icon string + título + descrição + focos[]).
- Schemas correspondentes no admin.

### 4. AreaAssociadoPage — fora do escopo
Já é uma página minimalista de boas-vindas + logout. Sugestão: deixar como está (não tem conteúdo institucional a editar). Se quiser, dá pra mover só os 2-3 textos curtos para `page_fields`.

---

## Plano sugerido de execução (3 entregas)

```text
Entrega A — Atuação (casos)
  • migration: criar tabela casos_atuacao + RLS
  • seed: importar os 50 casos atuais
  • admin: adicionar schema em cmsSchemas.ts (categoria, ano, titulo, area, atuacao, resultados, etc.)
  • frontend: trocar `casos`/`areas` por useCMSList; derivar filtros

Entrega B — Planos de Atuação (textos)
  • seed page_fields para hero secundário, intro, legenda, CTAs
  • refatorar PlanosAtuacaoPage para usar field()/CMSMarkdown

Entrega C — Observatório de Evasões (completo)
  • migration: observatorio_indicadores + observatorio_categorias
  • seed page_fields (textos) + dados das tabelas
  • admin: 2 schemas novos
  • refatorar ObservatorioEvasoesPage
```

Cada entrega é independente — posso ir em qualquer ordem.

---

## Pergunta

Quer começar por **A (Atuação/casos — o maior bloco hardcoded)**, **C (Observatório — página inteira)**, ou prefere **B (Planos textos — mais rápido)**? Posso também executar as três em sequência.