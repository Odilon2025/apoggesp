CREATE TABLE public.links_uteis_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT false,
  deletado boolean NOT NULL DEFAULT false,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by text
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.links_uteis_itens TO authenticated;
GRANT ALL ON public.links_uteis_itens TO service_role;
GRANT SELECT ON public.links_uteis_itens TO anon;

ALTER TABLE public.links_uteis_itens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published links" ON public.links_uteis_itens
  FOR SELECT TO anon, authenticated
  USING (publicado = true AND deletado = false);

CREATE POLICY "Editors can manage links" ON public.links_uteis_itens
  FOR ALL TO authenticated
  USING (public.is_editor((auth.jwt() ->> 'email')))
  WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));

CREATE TRIGGER trg_links_uteis_itens_updated
  BEFORE UPDATE ON public.links_uteis_itens
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.publish_cms_all(_table text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_editor((auth.jwt() ->> 'email')) THEN
    RAISE EXCEPTION 'acesso negado' USING ERRCODE = 'P0001';
  END IF;
  IF _table NOT IN (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes','links_uteis_itens'
  ) THEN
    RAISE EXCEPTION 'tabela invalida' USING ERRCODE = 'P0001';
  END IF;
  EXECUTE format($f$
    UPDATE public.%I
    SET dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    WHERE tem_rascunho = true
  $f$, _table);
END;
$$;

CREATE OR REPLACE FUNCTION public.publish_cms_item(_table text, _id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_editor((auth.jwt() ->> 'email')) THEN
    RAISE EXCEPTION 'acesso negado' USING ERRCODE = 'P0001';
  END IF;
  IF _table NOT IN (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes','links_uteis_itens'
  ) THEN
    RAISE EXCEPTION 'tabela invalida' USING ERRCODE = 'P0001';
  END IF;
  EXECUTE format($f$
    UPDATE public.%I
    SET dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    WHERE id = $1
  $f$, _table) USING _id;
END;
$$;