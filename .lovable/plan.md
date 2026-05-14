## Objetivo

Tirar do código todo o texto institucional e os dados estruturados para que editores autorizados (mesma whitelist de Notícias) possam alterá-los pelo painel `/admin`, sem mexer no repositório.

Modelo: **editor por campo (formulário)** + fluxo **rascunho → publicar** + CRUDs próprios para listas estruturadas.

---

## 1. O que vira editável

### A. Conteúdo textual das páginas (chave→valor por campo)
Páginas: Home (hero, mensagem da presidente, labels de seções), APOGESP, Atuação, Carreira (textos introdutórios, não os dashboards), Contato, Diversidade, Sustentabilidade, Campanha Salarial, Campanha Nomeação, Observatório das Evasões, Publicações (intro), Planos (intro).

Cada página tem um conjunto de campos nomeados, ex.:
- `home.hero.eyebrow` → "Associação dos APPGGs — São Paulo"
- `home.hero.title` → "Políticas Públicas, Gestão Governamental"
- `home.hero.subtitle` → "Uma década contribuindo…"
- `home.presidente.frase` → "Fortalecer a carreira…"
- `apogesp.intro.titulo`, `apogesp.intro.corpo`, …

### B. Dados estruturados (CRUD com tela própria)
- **Snapshot da carreira** (`snapshot.json`) — campos numéricos + mês de referência.
- **Cronologia** (`cronologia.json`) — lista (ano, texto).
- **Atos normativos** (`atosNormativos.json`) — principal + alterações + anexos + correlações (cada item: título, descrição, url).
- **Planos estratégicos** (`planos.ts`) — itens com título, descrição, link.
- **Publicações recentes** (lista que aparece em Publicações e na home).
- **Atuação destaques** (3 cards de área/descrição da home).

---

## 2. Backend (Lovable Cloud)

### Tabelas

**`page_fields`** — chave/valor por campo
- `key` (text, PK) — ex.: `home.hero.title`
- `value_publicado` (text)
- `value_rascunho` (text)
- `tipo` (enum: `text`, `markdown`) — controla o renderer no front
- `descricao` (text) — ajuda para o editor ("Título principal do hero da home")
- `pagina` (text) — agrupador no admin ("Home", "APOGESP", …)
- `ordem` (int) — ordem de exibição no formulário
- `updated_at`, `updated_by` (text email)

**`snapshot_carreira`** — uma única linha (singleton, `id = 'current'`)
- Campos numéricos do snapshot + `mes_referencia` + versões `_rascunho` para os mesmos campos + flag `tem_rascunho`.

**`cronologia_itens`**
- `id`, `ano` (text), `texto` (text), `ordem` (int), `publicado` (bool), `rascunho_ano`, `rascunho_texto`.

**`atos_normativos_itens`**
- `id`, `categoria` (enum: `principal`, `alteracao`, `anexo`, `correlacao`), `titulo`, `descricao`, `url`, `ordem`, `publicado`, campos `rascunho_*`.

**`planos_itens`**, **`publicacoes_itens`**, **`atuacao_destaques`** — mesmo padrão (campos próprios + versão rascunho + `publicado`).

> Optamos pelo padrão **duas colunas (publicado + rascunho) na mesma linha** (em vez de tabela de versões) para manter simples e barato. Quando o editor clica "Publicar", os campos `_rascunho` são copiados para os `publicado`.

### RLS
- **Leitura pública:** anon e authenticated leem apenas as colunas/registros publicados (via views `v_*_publico`).
- **Leitura/escrita completa:** apenas `is_editor(auth.jwt()->>'email')` (função já existe).

### Sem nova auth
Reutiliza a whitelist `noticias_editores` e o magic link já implementado. (Renomeio mental: "Editores" cobre notícias **e** conteúdo do site.)

---

## 3. Frontend público

Cada página passa a buscar seu conteúdo do backend, com **fallback para os textos atuais hardcoded** (assim o site nunca quebra se a tabela estiver vazia).

- `src/lib/cms.ts` com:
  - `getFields(pagina)` → `Record<key, value>` (apenas publicado).
  - `getSnapshot()`, `getCronologia()`, `getAtos()`, `getPlanos()`, `getPublicacoes()`, `getAtuacaoDestaques()`.
  - Cache simples em memória por sessão (evita refetch entre rotas).
- Componente `<CMSText fieldKey="home.hero.title" fallback="…" />` para campos curtos.
- Componente `<CMSMarkdown fieldKey="…" fallback="…" />` para corpos longos (usa `react-markdown` já instalado).
- Páginas que hoje importam `snapshot.ts`, `cronologia.ts`, `atosNormativos.ts`, `planos.ts` passam a buscar via React Query. Os arquivos JSON viram **seed inicial** (script popula o backend) e **fallback de build**.

---

## 4. Painel admin

Nova navegação dentro de `/admin`:

```
/admin
├── /admin/noticias              (já existe)
├── /admin/conteudo              ← novo: lista de páginas com campos editáveis
│   └── /admin/conteudo/:pagina  ← formulário com todos os campos da página
├── /admin/snapshot              ← form único do snapshot
├── /admin/cronologia            ← lista + adicionar/editar/excluir/reordenar
├── /admin/atos                  ← lista por categoria
├── /admin/planos                ← lista
├── /admin/publicacoes           ← lista
└── /admin/atuacao-destaques     ← lista (3 itens fixos)
```

### Padrão de cada tela
- **Banner de status:** "Você tem alterações em rascunho não publicadas."
- **Botões:** `Salvar rascunho` / `Publicar alterações` / `Descartar rascunho`.
- **Diff visual simples** (publicado × rascunho lado a lado nos campos modificados).
- Validação com `zod` (limites de tamanho, URL válida em links).

### Layout do formulário de conteúdo
Para `/admin/conteudo/:pagina`, renderiza dinamicamente cada campo conforme `tipo`:
- `text` → `<Input>` (com contador de caracteres)
- `markdown` → `<Textarea>` + preview com `react-markdown`

---

## 5. Migração e seed

1. Migration cria todas as tabelas + RLS + função helper para "publicar rascunho" (`publish_field(key)`, `publish_all_drafts(pagina)`).
2. Script de seed (executado via SQL) lê os valores atuais hardcoded e insere em `page_fields`, `snapshot_carreira`, `cronologia_itens`, etc., já marcados como **publicado** (sem rascunho pendente).
3. Componentes do front são refatorados para consumir o backend, mantendo os JSONs como fallback de segurança até validarmos.

---

## 6. Ordem de execução

1. **Migration** das tabelas + RLS + funções `publish_*`. (Você confirma.)
2. **Seed inicial** copiando todo o texto atual para o backend.
3. **`src/lib/cms.ts`** + componentes `<CMSText>` / `<CMSMarkdown>`.
4. **Refator das páginas** (uma por vez, começando pela Home) para consumir o CMS.
5. **Painel admin**: tela de conteúdo por página, depois CRUDs estruturados (snapshot → cronologia → atos → planos → publicações → atuação).
6. Smoke test com você logado: editar um campo, publicar, conferir no site.

---

## 7. Detalhes técnicos relevantes

- **Sem cache server-side**: dados leves, `useQuery` com `staleTime: 60s` é suficiente.
- **Sem ISR/SSR**: app é SPA; mudanças aparecem na próxima navegação/refresh.
- **Reordenação**: campo `ordem` (int) editável via setas ↑/↓ no admin (sem drag-and-drop na v1).
- **Histórico de versões**: fora do escopo. Se quiser depois, adicionamos tabela `*_historico` com snapshots a cada publicação.
- **Imagens**: nesta primeira versão não há upload de imagens institucionais (todas continuam no `src/assets`). Notícias seguem usando o bucket `noticias`.
- **Internacionalização**: fora do escopo (site é só PT-BR).

Após aprovação eu: (1) rodo a migration, (2) faço o seed, (3) implemento `cms.ts` + refator da Home como prova de conceito, (4) sigo com o restante das páginas e telas admin.