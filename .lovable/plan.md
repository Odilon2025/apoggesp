## Objetivo

Permitir que revisores deixem **notas de revisão** (comentários, sugestões, dúvidas de estilo) vinculadas a qualquer conteúdo editável do painel — sem mexer no texto publicado nem no rascunho. Serve como camada de discussão antes do editor aplicar a mudança.

## Estratégia recomendada: tabela única `cms_notas`

Uma única tabela polimórfica indexa todas as notas, ancoradas no alvo por dois campos:

- `escopo` — identifica o "tipo" de conteúdo: `page_field`, `cms_item`, `snapshot`, `noticia`.
- `alvo` — identificador dentro do escopo:
  - `page_field` → `key` do campo (ex.: `home.hero.titulo`)
  - `cms_item` → `{tabela}:{id}` (ex.: `casos_atuacao:uuid`)
  - `snapshot` → `current`
  - `noticia` → `id` da notícia

Vantagens vs. tabelas separadas por entidade:
- Uma migration só, um conjunto de RLS, uma UI de notas reutilizável em todas as telas.
- Permite filtrar "tudo o que tem nota aberta" no hub do admin.
- Fácil estender para futuras entidades (basta adicionar um `escopo`).

### Schema proposto

```text
cms_notas
  id            uuid pk
  escopo        text   ('page_field' | 'cms_item' | 'snapshot' | 'noticia')
  alvo          text   (chave/id conforme escopo acima)
  alvo_label    text   (rótulo legível p/ listagens: "Home → hero.titulo")
  campo         text   (opcional — sub-campo dentro de um item JSON, ex.: "resultados")
  autor_email   text
  texto         text   (markdown curto)
  status        text   ('aberta' | 'resolvida')   default 'aberta'
  resolvida_por text
  resolvida_em  timestamptz
  created_at    timestamptz
  updated_at    timestamptz

índices: (escopo, alvo, status), (status, created_at desc)
```

**RLS**: mesma política dos demais — `SELECT/INSERT/UPDATE/DELETE` somente para `is_editor(jwt.email)`. Nada público.

### Por que não usar `value_rascunho`?
O rascunho já tem semântica de "próxima versão a publicar". Misturar comentário com texto poluiria a publicação e exigiria edição destrutiva pra resolver. Notas são uma camada paralela, não-publicável.

## UI — três pontos de integração

### 1. Editor de textos (`ConteudoEditorPage`)
Ao lado de cada `<input>`/`<textarea>` de `page_fields`:
- Badge "X notas" (vermelho se houver aberta) abre um drawer/popover lateral.
- Drawer mostra notas existentes (autor, data, status) + campo pra adicionar nova + botão "Resolver".

### 2. Editor de itens estruturados (`DadosCRUDPage`)
Cada linha de `casos_atuacao`, `planos_itens`, etc. ganha:
- Botão "Notas" no header da linha (escopo=`cms_item`, alvo=`{tabela}:{id}`).
- Opcionalmente, ao editar, mesmo drawer por sub-campo (`campo`), pra comentar especificamente "resultados" ou "atuacao".

### 3. Snapshot + Notícias
Mesmo padrão: botão "Notas" no topo do editor.

### 4. Hub do admin
Novo card "**Revisões pendentes (N)**" listando todas as notas `status=aberta`, agrupadas por página/entidade, com link direto pro editor correspondente. Permite ao editor varrer tudo o que precisa discutir antes de publicar.

## Componente reutilizável

Um único componente `<NotasPanel escopo alvo campo? label />` encapsula:
- Fetch das notas (`supabase.from('cms_notas').select(...).eq('escopo', e).eq('alvo', a)`)
- Lista + form de nova nota + ação resolver
- Realtime opcional (subscription) para colaboração ao vivo.

## Migrações e arquivos previstos

```text
supabase/migrations/<ts>_cms_notas.sql
  • create table cms_notas + RLS

src/lib/notas.ts
  • listNotas, addNota, resolveNota, deleteNota, countByAlvo, countAbertas

src/components/admin/NotasPanel.tsx
  • drawer/popover reutilizável

src/components/admin/NotasBadge.tsx
  • bolinha "3 abertas" usada nos editores

src/pages/admin/RevisoesPendentesPage.tsx
  • lista global agrupada, rota /admin/revisoes

edições:
  • AdminHubPage.tsx          → card "Revisões pendentes"
  • ConteudoEditorPage.tsx    → badge + drawer por campo
  • DadosCRUDPage.tsx         → badge + drawer por linha
  • SnapshotEditorPage.tsx    → drawer no topo
  • NoticiaEditorPage.tsx     → drawer no topo
```

## Fluxo de uso

1. Revisor abre `/admin/conteudo/home`, clica no balão ao lado de `hero.titulo`, escreve "Sugiro trocar 'gestores' por 'líderes municipais' — soa menos técnico" e salva.
2. Editor recebe a discussão (lista no hub mostra "1 nota aberta em Home → hero.titulo").
3. Editor aplica (ou não) a mudança no rascunho normalmente, depois marca a nota como **resolvida** — o histórico permanece.
4. Notas resolvidas continuam visíveis em modo recolhido pra auditoria.

## Pontos abertos pra decidir antes de implementar

- **Threading**: notas simples (lista plana) ou conversas com respostas? Sugiro começar plano e adicionar `parent_id` depois se necessário.
- **Menção/notificação**: avisar editores por e-mail quando nota for criada? Pode entrar numa segunda fase via edge function.
- **Permissões**: qualquer editor pode resolver qualquer nota, ou só autor + admin? Sugiro: qualquer editor resolve (já é grupo confiável).
- **Sub-campo em itens estruturados**: usar `campo` granular ou só uma thread por item? Granular dá mais precisão mas exige mais UI; começar por thread-por-item é mais simples.

Se topar a abordagem, sigo com a migration + componente + integração nas 4 telas do admin.
