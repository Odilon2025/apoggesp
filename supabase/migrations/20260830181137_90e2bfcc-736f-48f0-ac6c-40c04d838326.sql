CREATE TABLE public.jurisprudencia_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT true,
  deletado boolean NOT NULL DEFAULT false,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  tem_rascunho boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);

GRANT SELECT ON public.jurisprudencia_itens TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jurisprudencia_itens TO authenticated;
GRANT ALL ON public.jurisprudencia_itens TO service_role;

ALTER TABLE public.jurisprudencia_itens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jurisprudencia publica leitura"
ON public.jurisprudencia_itens FOR SELECT TO anon, authenticated
USING (publicado = true AND deletado = false);

CREATE POLICY "editores leem tudo"
ON public.jurisprudencia_itens FOR SELECT TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores inserem"
ON public.jurisprudencia_itens FOR INSERT TO authenticated
WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores atualizam"
ON public.jurisprudencia_itens FOR UPDATE TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')))
WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores excluem"
ON public.jurisprudencia_itens FOR DELETE TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')));

CREATE TRIGGER trg_jurisprudencia_itens_updated
BEFORE UPDATE ON public.jurisprudencia_itens
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
    'wiki_verbetes','links_uteis_itens','jurisprudencia_itens'
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
    'wiki_verbetes','links_uteis_itens','jurisprudencia_itens'
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
