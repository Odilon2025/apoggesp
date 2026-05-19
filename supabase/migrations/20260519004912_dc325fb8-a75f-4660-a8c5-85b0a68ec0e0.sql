
-- =========================
-- casos_atuacao
-- =========================
CREATE TABLE public.casos_atuacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT true,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean NOT NULL DEFAULT false,
  deletado boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);
ALTER TABLE public.casos_atuacao ENABLE ROW LEVEL SECURITY;
CREATE POLICY "publico le casos_atuacao publicados" ON public.casos_atuacao
  FOR SELECT TO anon, authenticated
  USING (publicado = true AND deletado = false AND dados_publicado IS NOT NULL);
CREATE POLICY "editores leem todos casos_atuacao" ON public.casos_atuacao
  FOR SELECT TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores inserem casos_atuacao" ON public.casos_atuacao
  FOR INSERT TO authenticated WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores atualizam casos_atuacao" ON public.casos_atuacao
  FOR UPDATE TO authenticated USING (is_editor((auth.jwt() ->> 'email'))) WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores excluem casos_atuacao" ON public.casos_atuacao
  FOR DELETE TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE TRIGGER set_updated_at_casos_atuacao BEFORE UPDATE ON public.casos_atuacao
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- observatorio_indicadores
-- =========================
CREATE TABLE public.observatorio_indicadores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT true,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean NOT NULL DEFAULT false,
  deletado boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);
ALTER TABLE public.observatorio_indicadores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "publico le observatorio_indicadores publicados" ON public.observatorio_indicadores
  FOR SELECT TO anon, authenticated
  USING (publicado = true AND deletado = false AND dados_publicado IS NOT NULL);
CREATE POLICY "editores leem todos observatorio_indicadores" ON public.observatorio_indicadores
  FOR SELECT TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores inserem observatorio_indicadores" ON public.observatorio_indicadores
  FOR INSERT TO authenticated WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores atualizam observatorio_indicadores" ON public.observatorio_indicadores
  FOR UPDATE TO authenticated USING (is_editor((auth.jwt() ->> 'email'))) WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores excluem observatorio_indicadores" ON public.observatorio_indicadores
  FOR DELETE TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE TRIGGER set_updated_at_observatorio_indicadores BEFORE UPDATE ON public.observatorio_indicadores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- observatorio_categorias
-- =========================
CREATE TABLE public.observatorio_categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT true,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean NOT NULL DEFAULT false,
  deletado boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);
ALTER TABLE public.observatorio_categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "publico le observatorio_categorias publicados" ON public.observatorio_categorias
  FOR SELECT TO anon, authenticated
  USING (publicado = true AND deletado = false AND dados_publicado IS NOT NULL);
CREATE POLICY "editores leem todos observatorio_categorias" ON public.observatorio_categorias
  FOR SELECT TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores inserem observatorio_categorias" ON public.observatorio_categorias
  FOR INSERT TO authenticated WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores atualizam observatorio_categorias" ON public.observatorio_categorias
  FOR UPDATE TO authenticated USING (is_editor((auth.jwt() ->> 'email'))) WITH CHECK (is_editor((auth.jwt() ->> 'email')));
CREATE POLICY "editores excluem observatorio_categorias" ON public.observatorio_categorias
  FOR DELETE TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
CREATE TRIGGER set_updated_at_observatorio_categorias BEFORE UPDATE ON public.observatorio_categorias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- Atualiza funções de publicação para incluir as novas tabelas
-- =========================
CREATE OR REPLACE FUNCTION public.publish_cms_item(_table text, _id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in ('cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens','atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias') then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where id = $1
  $f$, _table) using _id;
end; $function$;

CREATE OR REPLACE FUNCTION public.publish_cms_all(_table text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in ('cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens','atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias') then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where tem_rascunho = true
  $f$, _table);
end; $function$;
