# Área do Associado — 5 novas páginas com CMS

## Objetivo
Expandir `/area-associado` (hoje apenas login) com um hub autenticado e 5 sub-páginas, todas com conteúdo editável pelo painel admin no mesmo padrão já estabelecido (page_fields + listas estruturadas + notas de revisão).

## Páginas

1. **Painel do Associado** (`/area-associado`) — hub pós-login com cards para as 4 áreas + boas-vindas e avisos institucionais.
2. **Biblioteca da Carreira** (`/area-associado/biblioteca`) — documentos, materiais e referências organizados por categoria.
3. **Valorização e Advocacy** (`/area-associado/valorizacao`) — status das campanhas, ações em curso, materiais de apoio.
4. **Grupos de Trabalho** (`/area-associado/grupos`) — GTs ativos, coordenação, agenda, como participar.
5. **Transparência APOGESP** (`/area-associado/transparencia`) — prestação de contas, atas, documentos institucionais.

Todas exigem login (mesmo guard de `useAuth`). Sem login, redireciona para o formulário de magic link atual.

## Modelo de conteúdo

Cada página combina dois tipos de conteúdo CMS já usados no projeto:

### A) page_fields (textos institucionais)
Por página: `hero_label`, `hero_titulo`, `hero_subtitulo`, `intro`, `cta_titulo`, `cta_texto`. Markdown nos campos longos.

### B) Listas estruturadas (tabelas CMS novas)

| Tabela | Página | Campos JSON |
|---|---|---|
| `associado_avisos` | Painel | `titulo`, `texto` (md), `tipo` (info/alerta/destaque), `data` |
| `biblioteca_itens` | Biblioteca | `titulo`, `categoria`, `descricao`, `tipo` (PDF/Vídeo/Link/Planilha), `url`, `restrito` (bool) |
| `valorizacao_acoes` | Valorização | `titulo`, `eixo` (Salarial/Nomeação/Carreira/Institucional), `status` (Em curso/Conquista/Em análise), `descricao` (md), `proxima_etapa` |
| `grupos_trabalho` | GTs | `nome`, `tema`, `coordenacao`, `descricao` (md), `frequencia`, `como_participar` (md), `ativo` (bool) |
| `transparencia_itens` | Transparência | `titulo`, `categoria` (Atas/Financeiro/Estatuto/Relatórios), `periodo`, `descricao`, `url` |

Todas seguem o mesmo padrão das tabelas existentes (`casos_atuacao`, `observatorio_indicadores`): colunas `id, ordem, publicado, deletado, dados_publicado, dados_rascunho, tem_rascunho, created_at, updated_at, updated_by`, RLS pública para publicados + RLS de editor para escrita.

### Decisão sobre visibilidade
Conteúdo da Área do Associado **é restrito**. Duas opções:

- **Opção 1 (mais simples, recomendada):** mantemos RLS pública nas tabelas (já que o conteúdo institucional não é sigiloso) e protegemos só pela rota (guard de auth na UI). Vantagem: reaproveita 100% do padrão atual, inclusive admin/CRUD.
- **Opção 2:** RLS exige autenticação (`auth.uid() is not null`) para leitura. Mais seguro contra scraping, mas exige `select` autenticado nos hooks.

Vou seguir Opção 1 salvo indicação contrária — confirmar antes de migrar caso prefira Opção 2.

## Mudanças técnicas

### Banco (migração única)
- 5 novas tabelas no padrão CMS draft/publish.
- Adicionar todas ao whitelist de `publish_cms_item` e `publish_cms_all`.
- Seed inicial com 2–3 itens por tabela (placeholders editáveis).
- Seed dos `page_fields` das 5 páginas.

### Frontend
- `src/App.tsx`: 5 novas rotas filhas de `/area-associado/*`.
- `src/pages/area-associado/PainelPage.tsx` (hub) + 4 páginas temáticas.
- Refatorar `AreaAssociadoPage.tsx`: quando logado, renderiza o **Painel do Associado** (hub) ao invés do `SignedInPanel` atual.
- Componente `AssociadoLayout` com sub-nav lateral/superior linkando as 5 áreas.
- Guard de auth reaproveitando `useAuth` — não-logado vê o formulário de magic link.
- `src/lib/cms.ts`: novos fetchers (`getAssociadoAvisos`, `getBibliotecaItens`, `getValorizacaoAcoes`, `getGruposTrabalho`, `getTransparenciaItens`).

### Painel admin
- `src/pages/admin/AdminHubPage.tsx`: novo grupo "Área do Associado" com 5+5 cards (textos + dados de cada página).
- `src/pages/admin/cmsSchemas.ts`: 5 novos `TableSchema` para CRUD genérico.
- Integração automática com `DadosCRUDPage` e `ConteudoEditorPage` existentes — sem código novo de admin além dos schemas e links.
- `NotasPanel` funciona automaticamente para tudo.

## Arquivos

**Criar:**
- Migração SQL (5 tabelas + seeds + whitelist nas RPCs)
- `src/pages/area-associado/PainelPage.tsx`
- `src/pages/area-associado/BibliotecaPage.tsx`
- `src/pages/area-associado/ValorizacaoPage.tsx`
- `src/pages/area-associado/GruposPage.tsx`
- `src/pages/area-associado/TransparenciaPage.tsx`
- `src/components/AssociadoLayout.tsx` (sub-nav)

**Editar:**
- `src/App.tsx` (rotas)
- `src/pages/AreaAssociadoPage.tsx` (render hub se logado)
- `src/lib/cms.ts` (fetchers)
- `src/pages/admin/AdminHubPage.tsx` (cards)
- `src/pages/admin/cmsSchemas.ts` (schemas)

## Pontos a confirmar antes de implementar

1. **Visibilidade**: Opção 1 (rota protegida, RLS pública) ou Opção 2 (RLS exige login)?
2. **Sub-nav**: tabs no topo da Área do Associado, ou sidebar lateral?
3. **Slugs das rotas**: ok usar `/area-associado/biblioteca`, `/valorizacao`, `/grupos`, `/transparencia`?
