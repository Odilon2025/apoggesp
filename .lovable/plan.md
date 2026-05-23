## Wiki da Carreira — Área do Associado

Uma wiki colaborativa sobre a carreira APPGG, organizada por **verbetes** hierárquicos (com categorias), versionada (draft/publicado como o CMS atual) e com **comentários inline por seção** — reaproveitando o sistema `cms_notas` que já existe.

A diferença em relação a uma wiki tradicional: cada verbete é dividido em **seções nomeadas** (não um blob de markdown), e qualquer associado autenticado pode comentar numa seção específica. Editores publicam/revisam; associados discutem.

---

### Estrutura de dados (1 nova tabela + reuso)

**`wiki_verbetes`** — segue o padrão dos outros CMS (`dados_publicado`/`dados_rascunho`/`tem_rascunho`/`publicado`/`deletado`/`ordem`):
```
dados = {
  slug: string,           // "estrutura-da-carreira"
  titulo: string,
  categoria: string,      // "Estrutura", "História", "Direitos", "Glossário"…
  resumo: string,         // 1-2 linhas, aparece no índice
  tags: string[],
  secoes: [
    { id: "historico", titulo: "Histórico", corpo_md: "..." },
    { id: "ingresso",  titulo: "Ingresso",  corpo_md: "..." },
    ...
  ],
  referencias: [{ label, url }],
  atualizado_em: ISO,
}
```
- Render do `corpo_md` com `react-markdown` + `remark-gfm` (sanitizado).
- Cada seção tem `id` estável → endereço único `?#secao=ingresso`.

**Comentários:** reusar `cms_notas` com novo escopo `wiki_secao`:
- `alvo` = `{verbete_slug}` (ex: `estrutura-da-carreira`)
- `campo` = `{secao_id}` (ex: `ingresso`) — `null` = comentário no verbete inteiro
- `alvo_label` = título do verbete (para listagens)

A função `is_editor` continua governando edição. Para **associados comentarem** (sem ser editores), precisamos de uma policy adicional só para o escopo `wiki_secao`:
- `INSERT` permitido a qualquer `authenticated` quando `escopo = 'wiki_secao'` e `autor_email = auth.jwt()->>'email'`
- `SELECT` permitido a qualquer `authenticated` quando `escopo = 'wiki_secao'`
- `UPDATE/DELETE` apenas pelo autor da nota OU editor (resolver/apagar próprio comentário)

Também adicionar `wiki_verbetes` ao `publish_cms_item` / `publish_cms_all`.

---

### Frontend — `/area-associado/wiki`

**Página índice (`WikiPage.tsx`)**
- Hero curto + busca client-side por título/tags/categoria.
- Sidebar à esquerda: lista de **categorias** com verbetes (estilo Notion/MDN).
- Conteúdo principal: cards de "destaques" (últimos atualizados / mais comentados) + grid por categoria.

**Página de verbete (`WikiVerbetePage.tsx` em `/area-associado/wiki/:slug`)**
- Layout 3 colunas:
  - **Esquerda:** índice (TOC) das seções, com badge de nº de comentários abertos por seção.
  - **Centro:** título, resumo, metadados (categoria, tags, "Atualizado em"), e as seções renderizadas em sequência. No header de cada seção:
    - botão `💬 N` que abre painel lateral de comentários daquela seção.
    - botão `🔗` copia link com âncora.
    - se editor: botão `✎` vai para o editor admin daquele verbete e foca naquela seção.
  - **Direita (drawer):** painel de comentários da seção ativa — usa o componente `NotasPanel` existente, adaptado para aceitar o escopo `wiki_secao` e mostrar nome/email do autor.
- Rodapé: "Referências", "Verbetes relacionados" (mesma categoria/tags).

**Componente novo: `WikiCommentsDrawer.tsx`**
- Wrapper sobre `NotasPanel` que:
  - Aceita `escopo="wiki_secao"`, `alvo={slug}`, `campo={secao_id}`.
  - Permite a qualquer associado autenticado postar (não só editores).
  - Mostra "resolver" só para editores; "apagar" só para o autor ou editor.

---

### Admin — gerenciamento dos verbetes

- Card novo no `AdminHubPage` (grupo "Área do Associado"): **"Wiki da Carreira"** → `DadosCRUDPage` para `wiki_verbetes`.
- Novo schema em `cmsSchemas.ts`:
  - Campos top-level: `slug`, `titulo`, `categoria`, `resumo`, `tags` (lista), `referencias` (lista de objetos).
  - Campo `secoes` como **lista repetível** com `id` (slug), `titulo`, `corpo_md` (textarea grande).
- Cada verbete herda toda a infra existente: rascunho/publicado, "Revisões pendentes", notas internas (escopo `cms_item`) usadas pelos editores entre si — separadas dos comentários públicos dos associados (escopo `wiki_secao`).

---

### Diferenciais que tornam a wiki interessante

1. **Discussão ancorada por seção** — não um mural genérico; cada parágrafo tem seu fio.
2. **Dois canais de notas separados**: internas dos editores (`cms_item` — já existe) vs. públicas dos associados (`wiki_secao` — novo). Editores vêem ambas; associados só as públicas.
3. **Indicador visual de atividade**: badges de comentários abertos no TOC e no índice geral revelam onde há debate vivo.
4. **Permalink por seção** (`/wiki/slug#secao=ingresso`) — facilita compartilhar trechos específicos em e-mails/WhatsApp.
5. **Editor mantém o mesmo fluxo draft/publish** já dominado, então não há retreinamento.

---

### Detalhes técnicos

```text
SQL migration:
  - CREATE TABLE wiki_verbetes (mesma estrutura dos outros CMS)
  - RLS: editores CRUD; público lê publicados
  - ALTER FUNCTION publish_cms_item / publish_cms_all → adicionar 'wiki_verbetes'
  - Nova policy em cms_notas para escopo 'wiki_secao':
      * INSERT: authenticated, autor_email = jwt email
      * SELECT: authenticated AND escopo='wiki_secao' (ou is_editor)
      * UPDATE/DELETE: autor_email = jwt email OR is_editor

Arquivos novos:
  - src/pages/area-associado/WikiPage.tsx           (índice)
  - src/pages/area-associado/WikiVerbetePage.tsx    (verbete)
  - src/components/wiki/WikiCommentsDrawer.tsx
  - src/components/wiki/WikiSectionAnchor.tsx       (header com 💬/🔗/✎)
  - src/lib/wiki.ts                                 (fetchers + tipos)
  - supabase/migrations/...sql

Arquivos editados:
  - src/components/AssociadoLayout.tsx              (sub-nav + item "Wiki")
  - src/App.tsx                                     (rotas /wiki, /wiki/:slug)
  - src/lib/cms.ts                                  (fetcher wiki_verbetes)
  - src/lib/notas.ts                                (suportar escopo wiki_secao)
  - src/pages/admin/cmsSchemas.ts                   (schema wiki_verbetes)
  - src/pages/admin/AdminHubPage.tsx                (card "Wiki")

Dependências: react-markdown + remark-gfm (provavelmente já instalado; senão adicionar).
```

---

### Perguntas antes de implementar

1. **Quem pode comentar?** Qualquer associado autenticado (na whitelist), ou só editores? *(recomendo: qualquer associado, pra ter discussão real)*
2. **Comentários são públicos para todos os associados ou privados (só autor + editores)?** *(recomendo: visíveis a todos os associados, como num fórum)*
3. **Conteúdo das seções:** markdown puro está OK? Ou prefere o mesmo editor rico que já usamos em notícias?
4. **Sementes iniciais:** quer que eu já popule a wiki com verbetes-base (Estrutura da Carreira, História da APPGG, Ingresso, Direitos e Deveres, Glossário)?