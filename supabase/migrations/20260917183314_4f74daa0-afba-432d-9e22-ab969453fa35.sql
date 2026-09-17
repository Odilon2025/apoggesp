CREATE TABLE public.atlas_carreiras (
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

GRANT SELECT ON public.atlas_carreiras TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.atlas_carreiras TO authenticated;
GRANT ALL ON public.atlas_carreiras TO service_role;

ALTER TABLE public.atlas_carreiras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Atlas publicado visivel ao publico"
ON public.atlas_carreiras
FOR SELECT
TO anon, authenticated
USING ((publicado = true AND deletado = false) OR public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "Editores criam fichas do atlas"
ON public.atlas_carreiras
FOR INSERT
TO authenticated
WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "Editores atualizam fichas do atlas"
ON public.atlas_carreiras
FOR UPDATE
TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')))
WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "Editores removem fichas do atlas"
ON public.atlas_carreiras
FOR DELETE
TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')));

CREATE TRIGGER trg_atlas_carreiras_updated
BEFORE UPDATE ON public.atlas_carreiras
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.publish_cms_all(_table text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.is_editor((auth.jwt() ->> 'email')) THEN
    RAISE EXCEPTION 'acesso negado' USING ERRCODE = 'P0001';
  END IF;
  IF _table NOT IN (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes','links_uteis_itens','jurisprudencia_itens','atlas_carreiras'
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
$function$;

CREATE OR REPLACE FUNCTION public.publish_cms_item(_table text, _id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT public.is_editor((auth.jwt() ->> 'email')) THEN
    RAISE EXCEPTION 'acesso negado' USING ERRCODE = 'P0001';
  END IF;
  IF _table NOT IN (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes','links_uteis_itens','jurisprudencia_itens','atlas_carreiras'
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
$function$;