
-- Extensões
create extension if not exists citext;

-- Tabela de editores (whitelist)
create table public.noticias_editores (
  email citext primary key,
  nome text,
  added_at timestamptz not null default now()
);

alter table public.noticias_editores enable row level security;

-- Função security definer para verificar editor
create or replace function public.is_editor(_email text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.noticias_editores where email = _email::citext
  )
$$;

-- Política: editores autenticados podem ver a whitelist
create policy "editores podem ver whitelist"
on public.noticias_editores
for select
to authenticated
using (public.is_editor((auth.jwt()->>'email')));

-- Tabela de notícias
create table public.noticias (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo text not null,
  resumo text not null,
  conteudo text not null,
  autor text not null,
  capa_url text,
  publicado_em timestamptz not null default now(),
  publicado boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index noticias_publicado_em_idx on public.noticias (publicado_em desc);
create index noticias_publicado_idx on public.noticias (publicado);

alter table public.noticias enable row level security;

-- Leitura pública: apenas notícias publicadas
create policy "publico le noticias publicadas"
on public.noticias
for select
to anon, authenticated
using (publicado = true);

-- Editores leem tudo
create policy "editores leem todas as noticias"
on public.noticias
for select
to authenticated
using (public.is_editor((auth.jwt()->>'email')));

-- Editores escrevem
create policy "editores inserem noticias"
on public.noticias
for insert
to authenticated
with check (public.is_editor((auth.jwt()->>'email')));

create policy "editores atualizam noticias"
on public.noticias
for update
to authenticated
using (public.is_editor((auth.jwt()->>'email')))
with check (public.is_editor((auth.jwt()->>'email')));

create policy "editores excluem noticias"
on public.noticias
for delete
to authenticated
using (public.is_editor((auth.jwt()->>'email')));

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger noticias_set_updated_at
before update on public.noticias
for each row execute function public.set_updated_at();

-- Trigger whitelist em auth.users (somente editores podem se cadastrar)
create or replace function public.enforce_editor_whitelist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is null or not exists (
    select 1 from public.noticias_editores where email = new.email::citext
  ) then
    raise exception 'Este e-mail não está autorizado a acessar o painel de notícias.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

create trigger enforce_editor_whitelist_trg
before insert on auth.users
for each row execute function public.enforce_editor_whitelist();

-- Bucket de storage
insert into storage.buckets (id, name, public)
values ('noticias', 'noticias', true);

-- Políticas storage
create policy "leitura publica de capas"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'noticias');

create policy "editores fazem upload de capas"
on storage.objects for insert
to authenticated
with check (bucket_id = 'noticias' and public.is_editor((auth.jwt()->>'email')));

create policy "editores atualizam capas"
on storage.objects for update
to authenticated
using (bucket_id = 'noticias' and public.is_editor((auth.jwt()->>'email')));

create policy "editores excluem capas"
on storage.objects for delete
to authenticated
using (bucket_id = 'noticias' and public.is_editor((auth.jwt()->>'email')));
