CREATE OR REPLACE FUNCTION public.is_editor(_email text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  select exists (
    select 1 from public.noticias_editores where email = _email::citext
  )
$function$;

CREATE OR REPLACE FUNCTION public.enforce_editor_whitelist()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
begin
  if new.email is null or not exists (
    select 1 from public.noticias_editores where email = new.email::citext
  ) then
    raise exception 'Este e-mail não está autorizado a acessar o painel de notícias.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.enforce_associate_whitelist()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
begin
  if new.email is null or not exists (
    select 1 from public.associate_whitelist w where w.email = new.email
  ) then
    raise exception 'Este e-mail não está autorizado a acessar a Área do Associado.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$function$;