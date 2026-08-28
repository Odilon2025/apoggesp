# Votação ao vivo na Área do Associado

Nova página `/area-associado/votacoes` para deliberações em reuniões online: qualquer associado logado abre um tema, todos votam Sim / Não / Abstenção com voto nominal (não secreto), e há comentários abaixo de cada votação. Tudo atualiza em tempo real, sem recarregar a página.

## Como funciona

1. **Lista de votações** — pautas abertas no topo, encerradas abaixo, com placar e data.
2. **Abrir pauta** — qualquer associado logado cria um tema (título + descrição opcional). Quem criou pode encerrar ou reabrir; editores também podem.
3. **Votar** — três botões (Sim / Não / Abstenção). Um voto por pessoa, alterável enquanto a pauta está aberta. Votos encerrados ficam travados.
4. **Log nominal** — lista visível de quem votou o quê e quando, agrupada por opção, mais o placar com percentuais e total de votantes.
5. **Comentários** — thread simples abaixo da votação, com autor e horário, no mesmo padrão visual dos comentários da Wiki.
6. **Tempo real** — placar, log e comentários chegam via Realtime para todos na reunião simultaneamente.

Visual: mesma linguagem quiet luxury já usada na área do associado (tipografia, bordas finas, acento dourado). Nenhum redesenho.

## Detalhes técnicos

**Banco (migração única):**
- `votacoes` — id, titulo, descricao, status (`aberta`/`encerrada`), criado_por (email), created_at, closed_at.
- `votacao_votos` — id, votacao_id (FK), votante_email, votante_nome, voto (`sim`/`nao`/`abstencao`), created_at, updated_at; `unique (votacao_id, votante_email)` para 1 voto por pessoa, com upsert na troca.
- `votacao_comentarios` — id, votacao_id (FK), autor_email, texto, created_at.
- GRANTs para `authenticated` e `service_role`; sem acesso `anon` (conteúdo restrito a associados).
- RLS: SELECT/INSERT restrito a `public.is_associate(auth.jwt()->>'email')` ou `is_editor(...)`; UPDATE/DELETE do voto e do comentário apenas pelo próprio e-mail; encerrar/reabrir pauta apenas pelo criador ou editor. Voto só é aceito se a votação estiver aberta (trigger de validação, não CHECK).
- Realtime habilitado nas três tabelas (`REPLICA IDENTITY FULL` + publicação).

**Front-end:**
- `src/pages/area-associado/VotacoesPage.tsx` usando `AssociadoLayout`, rota em `src/App.tsx`, item "Votações" no subnav do layout e card no Painel do Associado.
- `src/hooks/useVotacoes.ts` — fetch inicial + assinaturas Realtime nas três tabelas.
- Validação de entrada com zod (título ≤ 160 chars, descrição ≤ 1000, comentário ≤ 1000, trim e obrigatoriedade), erros via toast.
- Sem `dangerouslySetInnerHTML`; textos renderizados como texto puro.

**Admin:** as votações são operadas pelos próprios associados, sem CMS de conteúdo. Editores logados no `/admin` já cobertos pelas políticas de moderação (encerrar pauta, remover comentário).
