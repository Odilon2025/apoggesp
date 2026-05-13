
-- search_path fixo
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Revoga execute de funções internas
revoke execute on function public.is_editor(text) from public, anon, authenticated;
revoke execute on function public.enforce_editor_whitelist() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Remove política de listagem pública (capas continuam acessíveis via URL direta)
drop policy if exists "leitura publica de capas" on storage.objects;
