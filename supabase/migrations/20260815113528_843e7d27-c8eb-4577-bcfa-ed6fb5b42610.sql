create or replace function public.is_associate(_email text)
returns boolean
language sql
stable
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1 from public.associate_whitelist w
    where w.email = _email::extensions.citext
  ) or public.is_editor(_email);
$$;

drop policy if exists "publico le biblioteca_itens publicados" on public.biblioteca_itens;

create policy "publico le biblioteca_itens publicos nao restritos"
on public.biblioteca_itens
for select
to anon
using (
  publicado = true
  and deletado = false
  and dados_publicado is not null
  and coalesce((dados_publicado ->> 'restrito')::boolean, false) = false
);

create policy "associados leem biblioteca_itens publicados"
on public.biblioteca_itens
for select
to authenticated
using (
  publicado = true
  and deletado = false
  and dados_publicado is not null
  and (
    coalesce((dados_publicado ->> 'restrito')::boolean, false) = false
    or public.is_associate(auth.jwt() ->> 'email')
  )
);