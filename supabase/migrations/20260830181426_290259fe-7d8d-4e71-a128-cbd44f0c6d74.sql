GRANT SELECT (key, pagina, ordem, tipo, descricao, value_publicado) ON public.page_fields TO anon;

DROP POLICY IF EXISTS "publico le campos publicados" ON public.page_fields;
CREATE POLICY "publico le campos publicados"
ON public.page_fields
FOR SELECT
TO anon
USING (true);