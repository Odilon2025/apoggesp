-- =========================================
-- CMS: page_fields (textos por chave)
-- =========================================
create table public.page_fields (
  key text primary key,
  pagina text not null,
  ordem int not null default 0,
  tipo text not null default 'text' check (tipo in ('text','markdown')),
  descricao text,
  value_publicado text,
  value_rascunho text,
  tem_rascunho boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.page_fields enable row level security;

create policy "publico le campos publicados"
  on public.page_fields for select
  to anon, authenticated
  using (value_publicado is not null);

create policy "editores leem todos os campos"
  on public.page_fields for select
  to authenticated
  using (public.is_editor((auth.jwt() ->> 'email')));

create policy "editores inserem campos"
  on public.page_fields for insert
  to authenticated
  with check (public.is_editor((auth.jwt() ->> 'email')));

create policy "editores atualizam campos"
  on public.page_fields for update
  to authenticated
  using (public.is_editor((auth.jwt() ->> 'email')))
  with check (public.is_editor((auth.jwt() ->> 'email')));

create policy "editores excluem campos"
  on public.page_fields for delete
  to authenticated
  using (public.is_editor((auth.jwt() ->> 'email')));

create trigger trg_page_fields_updated
  before update on public.page_fields
  for each row execute function public.set_updated_at();

-- =========================================
-- CMS: snapshot_carreira (singleton)
-- =========================================
create table public.snapshot_carreira (
  id text primary key default 'current',
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.snapshot_carreira enable row level security;

create policy "publico le snapshot publicado"
  on public.snapshot_carreira for select
  to anon, authenticated
  using (dados_publicado is not null);

create policy "editores leem snapshot"
  on public.snapshot_carreira for select
  to authenticated
  using (public.is_editor((auth.jwt() ->> 'email')));

create policy "editores inserem snapshot"
  on public.snapshot_carreira for insert
  to authenticated
  with check (public.is_editor((auth.jwt() ->> 'email')));

create policy "editores atualizam snapshot"
  on public.snapshot_carreira for update
  to authenticated
  using (public.is_editor((auth.jwt() ->> 'email')))
  with check (public.is_editor((auth.jwt() ->> 'email')));

create trigger trg_snapshot_updated
  before update on public.snapshot_carreira
  for each row execute function public.set_updated_at();

-- =========================================
-- Função genérica para CRUDs estruturados
-- =========================================
-- Padrão: cada tabela tem dados_publicado jsonb, dados_rascunho jsonb,
-- ordem int, publicado bool, tem_rascunho bool, deletado bool

-- helper: cria tabela CMS no padrão JSONB + RLS
create or replace function public._cms_create_table(_name text)
returns void language plpgsql as $$
declare
  q text;
begin
  q := format($f$
    create table if not exists public.%1$I (
      id uuid primary key default gen_random_uuid(),
      ordem int not null default 0,
      publicado boolean not null default true,
      dados_publicado jsonb,
      dados_rascunho jsonb,
      tem_rascunho boolean not null default false,
      deletado boolean not null default false,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      updated_by text
    );
    alter table public.%1$I enable row level security;

    create policy "publico le %1$s publicados"
      on public.%1$I for select
      to anon, authenticated
      using (publicado = true and deletado = false and dados_publicado is not null);

    create policy "editores leem todos %1$s"
      on public.%1$I for select
      to authenticated
      using (public.is_editor((auth.jwt() ->> 'email')));

    create policy "editores inserem %1$s"
      on public.%1$I for insert
      to authenticated
      with check (public.is_editor((auth.jwt() ->> 'email')));

    create policy "editores atualizam %1$s"
      on public.%1$I for update
      to authenticated
      using (public.is_editor((auth.jwt() ->> 'email')))
      with check (public.is_editor((auth.jwt() ->> 'email')));

    create policy "editores excluem %1$s"
      on public.%1$I for delete
      to authenticated
      using (public.is_editor((auth.jwt() ->> 'email')));

    create trigger trg_%1$s_updated
      before update on public.%1$I
      for each row execute function public.set_updated_at();
  $f$, _name);
  execute q;
end;
$$;

select public._cms_create_table('cronologia_itens');
select public._cms_create_table('atos_normativos_itens');
select public._cms_create_table('planos_itens');
select public._cms_create_table('publicacoes_itens');
select public._cms_create_table('atuacao_destaques');

drop function public._cms_create_table(text);

-- =========================================
-- Funções de publicação
-- =========================================

-- Publica rascunho de um campo
create or replace function public.publish_field(_key text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  update public.page_fields
  set value_publicado = coalesce(value_rascunho, value_publicado),
      value_rascunho = null,
      tem_rascunho = false
  where key = _key;
end; $$;

-- Publica todos os rascunhos de uma página
create or replace function public.publish_page(_pagina text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  update public.page_fields
  set value_publicado = coalesce(value_rascunho, value_publicado),
      value_rascunho = null,
      tem_rascunho = false
  where pagina = _pagina and tem_rascunho = true;
end; $$;

-- Descarta rascunho de um campo
create or replace function public.discard_field_draft(_key text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  update public.page_fields
  set value_rascunho = null, tem_rascunho = false
  where key = _key;
end; $$;

-- Publica snapshot
create or replace function public.publish_snapshot()
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  update public.snapshot_carreira
  set dados_publicado = coalesce(dados_rascunho, dados_publicado),
      dados_rascunho = null,
      tem_rascunho = false
  where id = 'current';
end; $$;

-- Publica rascunho de um item de tabela CMS estruturada
create or replace function public.publish_cms_item(_table text, _id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in ('cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens','atuacao_destaques') then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where id = $1
  $f$, _table) using _id;
end; $$;

-- Publica todos os rascunhos de uma tabela CMS
create or replace function public.publish_cms_all(_table text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in ('cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens','atuacao_destaques') then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where tem_rascunho = true
  $f$, _table);
end; $$;