create table public.cms_notas (
  id uuid primary key default gen_random_uuid(),
  escopo text not null check (escopo in ('page_field','cms_item','snapshot','noticia')),
  alvo text not null,
  alvo_label text,
  campo text,
  autor_email text not null,
  texto text not null,
  status text not null default 'aberta' check (status in ('aberta','resolvida')),
  resolvida_por text,
  resolvida_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cms_notas_alvo_idx on public.cms_notas (escopo, alvo, status);
create index cms_notas_status_idx on public.cms_notas (status, created_at desc);

create trigger cms_notas_set_updated_at
  before update on public.cms_notas
  for each row execute function public.set_updated_at();

alter table public.cms_notas enable row level security;

create policy "editores leem notas" on public.cms_notas
  for select to authenticated using (is_editor((auth.jwt() ->> 'email')));
create policy "editores inserem notas" on public.cms_notas
  for insert to authenticated with check (is_editor((auth.jwt() ->> 'email')));
create policy "editores atualizam notas" on public.cms_notas
  for update to authenticated using (is_editor((auth.jwt() ->> 'email'))) with check (is_editor((auth.jwt() ->> 'email')));
create policy "editores excluem notas" on public.cms_notas
  for delete to authenticated using (is_editor((auth.jwt() ->> 'email')));