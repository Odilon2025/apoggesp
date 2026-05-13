## Objetivo

Criar uma seção institucional de **Notícias** com:
1. **Bloco na home** com as 3 notícias mais recentes.
2. **Página dedicada** `/noticias` listando todas (com paginação simples) e `/noticias/:slug` para leitura do conteúdo completo.
3. **Painel administrativo** `/admin/noticias` (login + lista + editor) restrito a editores autorizados via whitelist de e-mails.

A estética seguirá o "quiet luxury" do site (Navy/Gold/Off-white, Playfair + Inter, divisores sutis).

---

## 1. Backend (Lovable Cloud)

### Tabelas novas

**`noticias`**
- `id` (uuid, PK)
- `slug` (text, único) — gerado a partir do título
- `titulo` (text)
- `resumo` (text) — 1-2 linhas para preview
- `conteudo` (text, markdown) — corpo completo
- `autor` (text)
- `capa_url` (text, opcional) — URL pública da imagem
- `publicado_em` (timestamptz)
- `publicado` (boolean, default false) — só aparece publicamente quando `true`
- `created_at`, `updated_at`

**`noticias_editores`** (whitelist)
- `email` (citext, PK)
- `added_at` (timestamptz)
- `nome` (text, opcional)

### Storage
- Bucket público **`noticias`** para imagens de capa, com política de leitura pública e escrita restrita a editores autenticados (via função `is_editor()`).

### Função de segurança
```sql
create or replace function public.is_editor(_email text)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.noticias_editores where email = _email) $$;
```

### RLS — `noticias`
- **Leitura pública:** qualquer um pode ler `WHERE publicado = true`.
- **Leitura completa:** editores autenticados (`is_editor(auth.jwt()->>'email')`) podem ver todas, inclusive rascunhos.
- **Insert/Update/Delete:** apenas editores autenticados.

### RLS — `noticias_editores`
- Leitura/escrita bloqueada no público. Gerenciada apenas via SQL/Cloud (você adiciona e-mails manualmente quando precisar de novos editores).

### Auth
- Manter cadastro **apenas por e-mail+senha** (sem Google, para simplificar gestão da whitelist).
- Trigger `before insert on auth.users` recusa cadastro de e-mail fora da whitelist `noticias_editores` (mesmo padrão da Área do Associado).
- Sem auto-confirm — editor precisa verificar e-mail antes de logar.

---

## 2. Frontend público

### Bloco na Home (`src/pages/Index.tsx`)
Inserido **logo após o Hero** (acima de Campanhas), com 3 colunas:
- Cada card: data pequena em gold, título em Playfair, resumo em Inter light, link "Ler" → `/noticias/:slug`.
- Header da seção: rótulo "Comunicados" + título "Notícias".
- Link "Ver todas" no canto superior direito → `/noticias`.

### Página `/noticias` (`src/pages/NoticiasPage.tsx`)
- Hero curto com `PageHero`.
- Lista cronológica em 2 colunas no desktop, 1 no mobile.
- Cada item: data, título, resumo, autor, link.
- Carregamento simples (sem paginação na v1; mostrar até 30, ordenado por `publicado_em desc`).

### Página `/noticias/:slug` (`src/pages/NoticiaDetalhePage.tsx`)
- Capa em destaque (se houver), título, data, autor.
- Conteúdo renderizado com `react-markdown` (já cabe na stack).
- Link "Voltar para Notícias".
- Tags `<title>`, meta description e canonical via `react-helmet`-style inline (manter padrão do projeto).

### Header
Adicionar "Notícias" ao `navItems` em `src/components/SiteHeader.tsx`, entre Atuação e PAI.

---

## 3. Painel administrativo

### `/admin/noticias` (`src/pages/admin/NoticiasAdminPage.tsx`)
- Se não autenticado: tela de **Login** (e-mail + senha) com link "Esqueci a senha" e tela `/reset-password`.
- Se autenticado mas e-mail fora da whitelist: mensagem "Acesso restrito a editores".
- Se autorizado: tabela com todas as notícias (rascunho/publicado), botões **Nova**, **Editar**, **Publicar/Despublicar**, **Excluir**.

### `/admin/noticias/nova` e `/admin/noticias/:id` (`NoticiaEditorPage.tsx`)
- Form com: título, slug (auto-gerado, editável), resumo, autor, data de publicação, upload de capa (Storage), conteúdo em **textarea markdown** com preview lado a lado.
- Toggle "Publicado".
- Botões **Salvar rascunho** e **Salvar e publicar**.

### Rotas em `App.tsx`
Adicionar:
```
/noticias
/noticias/:slug
/admin/noticias
/admin/noticias/nova
/admin/noticias/:id
/reset-password
```

---

## 4. Dependências
- `react-markdown` (renderizar conteúdo).
- Reutilizar `@supabase/supabase-js` já presente.

---

## 5. Entregáveis e ordem de execução

1. Migration: tabelas `noticias`, `noticias_editores`, função `is_editor`, RLS, trigger de whitelist, bucket Storage.
2. Auth setup (e-mail/senha, sem auto-confirm).
3. Páginas públicas: home (bloco), `/noticias`, `/noticias/:slug`, item no menu.
4. Páginas admin: login, listagem, editor com upload.
5. Inserir 1-2 notícias seed para você visualizar.

Após aprovação, eu executo a migration primeiro (você confirma) e depois implemento as telas. Você precisará me passar **o seu e-mail de editor** para eu inserir na whitelist na hora de testar.
