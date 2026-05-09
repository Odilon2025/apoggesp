
create extension if not exists citext;

create table public.associate_whitelist (
  email citext primary key,
  added_at timestamptz not null default now(),
  note text
);

alter table public.associate_whitelist enable row level security;
-- Sem políticas: a tabela só é acessada via trigger SECURITY DEFINER e pelo painel admin.

create or replace function public.enforce_associate_whitelist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is null or not exists (
    select 1 from public.associate_whitelist w where w.email = new.email
  ) then
    raise exception 'Este e-mail não está autorizado a acessar a Área do Associado.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

create trigger enforce_associate_whitelist_before_insert
  before insert on auth.users
  for each row execute function public.enforce_associate_whitelist();
