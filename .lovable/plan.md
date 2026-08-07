# Plano: Página Links Úteis

## Objetivo
Criar uma página pública "Links úteis" no site da APOGESP, com links externos organizados por categoria, posicionada de forma clara na navegação principal.

## Decisão de UX
Com base nas respostas:
- **Público-alvo:** visitantes gerais (jornalistas, gestores, candidatos, pesquisadores).
- **Conteúdo inicial:** sites da Prefeitura de São Paulo e órgãos relacionados.
- **Localização:** item no menu principal, entre "Publicações" e "Diversidade", e reforço no rodapé.

O menu principal é o local correto porque a página é de utilidade pública e deve ser encontrável sem depender do rodapé.

## O que será construído

### 1. Página `/links-uteis`
- Rota nova em `src/App.tsx`.
- Página em `src/pages/LinksUteisPage.tsx`.
- Layout institucional com `PageLayout`, `PageHero`, `FadeIn` e `SectionTitle`.
- Lista de links organizada por categorias em cards expansíveis ou seções (ex.: Prefeitura, Câmara, Tribunal, Diário Oficial, Bancas de concurso, Legislação).
- Cada link mostra: título, descrição curta, ícone de external link.

### 2. Integração com CMS
- Criar tabela `links_uteis_itens` no banco com campos: `categoria`, `titulo`, `descricao`, `url`, `ordem`, `publicado`.
- Adicionar função `getLinksUteis()` em `src/lib/cms.ts`.
- Usar `useCMSList` no componente para permitir atualização sem deploy.
- Fallback local em `src/data/linksUteis.ts` com dados iniciais.

### 3. Administração
- Adicionar card "Links úteis" no `AdminHubPage` apontando para `/admin/dados/links_uteis_itens`.
- O CRUD genérico de dados (`DadosCRUDPage`) já suportará a nova tabela automaticamente.

### 4. Navegação
- Inserir "Links úteis" no `navItems` do `SiteHeader` entre "Publicações" e "Diversidade".
- Inserir link no `SiteFooter` na coluna de navegação.

### 5. Dados iniciais
Categorias e links sugeridos (podem ser editados depois no admin):
- **Prefeitura de São Paulo**: portal da Prefeitura, SIMPROC, e-SIC, PDE.
- **Câmara Municipal**: portal e acompanhamento de projetos de lei.
- **Tribunal de Contas do Município**: consultas e decisões.
- **Diário Oficial da Cidade**: publicações oficiais.
- **Bancas e concursos**: FCC, FGV, Vunesp.
- **Legislação**: Lei 16.193/2024 (link já existente), Lei de Responsabilidade Fiscal, etc.

## Critérios de aceitação
- [ ] A página `/links-uteis` é acessível e renderiza corretamente.
- [ ] O item aparece no menu principal desktop e mobile.
- [ ] O item aparece no rodapé.
- [ ] Os dados são carregados do CMS quando disponíveis, com fallback local.
- [ ] O admin possui controle para adicionar, editar e remover links.
- [ ] O design segue os tokens existentes (navy/gold/off-white, Playfair Display, Inter).
