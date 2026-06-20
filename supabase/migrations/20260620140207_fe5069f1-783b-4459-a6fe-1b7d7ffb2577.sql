-- 1) page_fields: substituir leitura pública direta por uma visão restrita
DROP POLICY IF EXISTS "publico le campos publicados" ON public.page_fields;

REVOKE SELECT ON public.page_fields FROM anon;

CREATE OR REPLACE VIEW public.page_fields_public
WITH (security_invoker = false) AS
SELECT key, pagina, tipo, value_publicado, ordem, descricao
FROM public.page_fields
WHERE value_publicado IS NOT NULL;

GRANT SELECT ON public.page_fields_public TO anon, authenticated;

-- 2) Restringir EXECUTE das funções SECURITY DEFINER (anon perde acesso)
REVOKE EXECUTE ON FUNCTION public.publish_field(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.publish_page(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.publish_snapshot() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.publish_cms_item(text, uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.publish_cms_all(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.discard_field_draft(text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.publish_field(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_page(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_snapshot() TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_cms_item(text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.publish_cms_all(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.discard_field_draft(text) TO authenticated;

-- 3) noticias_editores: garantir bloqueio defensivo
REVOKE ALL ON public.noticias_editores FROM anon;
GRANT SELECT ON public.noticias_editores TO authenticated;
GRANT ALL ON public.noticias_editores TO service_role;
ALTER TABLE public.noticias_editores FORCE ROW LEVEL SECURITY;