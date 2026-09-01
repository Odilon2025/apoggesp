drop trigger if exists enforce_editor_whitelist_trg on auth.users;
drop trigger if exists enforce_associate_whitelist_before_insert on auth.users;

create or replace function public.enforce_apogesp_whitelist()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'extensions'
as $function$
declare
  _email text := lower(btrim(coalesce(new.email, '')));
begin
  if _email = '' or not public.is_associate(_email) then
    raise exception 'Este e-mail não está autorizado a acessar a área restrita da APOGESP.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$function$;

create trigger enforce_apogesp_whitelist_before_insert
before insert on auth.users
for each row execute function public.enforce_apogesp_whitelist();

create or replace function public.is_editor(_email text)
returns boolean
language sql
stable security definer
set search_path to 'public', 'extensions'
as $function$
  select exists (
    select 1 from public.noticias_editores
    where email = lower(btrim(coalesce(_email, '')))::extensions.citext
  )
$function$;

create or replace function public.is_associate(_email text)
returns boolean
language sql
stable security definer
set search_path to 'public', 'extensions'
as $function$
  select exists (
    select 1 from public.associate_whitelist w
    where w.email = lower(btrim(coalesce(_email, '')))::extensions.citext
  ) or public.is_editor(_email);
$function$;