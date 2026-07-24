
DROP POLICY IF EXISTS "autenticados inserem mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "autores atualizam mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "autores excluem mapa nos" ON public.mapa_atores_nos;

CREATE POLICY "autenticados inserem mapa nos"
ON public.mapa_atores_nos FOR INSERT TO authenticated
WITH CHECK (
  criado_por IS NOT NULL
  AND length(btrim(criado_por)) > 0
  AND criado_por = (auth.jwt() ->> 'email')
);

CREATE POLICY "autores atualizam mapa nos"
ON public.mapa_atores_nos FOR UPDATE TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'))
WITH CHECK (criado_por = (auth.jwt() ->> 'email'));

CREATE POLICY "autores excluem mapa nos"
ON public.mapa_atores_nos FOR DELETE TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "autenticados inserem mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "autores atualizam mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "autores excluem mapa conexoes" ON public.mapa_atores_conexoes;

CREATE POLICY "autenticados inserem mapa conexoes"
ON public.mapa_atores_conexoes FOR INSERT TO authenticated
WITH CHECK (
  criado_por IS NOT NULL
  AND length(btrim(criado_por)) > 0
  AND criado_por = (auth.jwt() ->> 'email')
);

CREATE POLICY "autores atualizam mapa conexoes"
ON public.mapa_atores_conexoes FOR UPDATE TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'))
WITH CHECK (criado_por = (auth.jwt() ->> 'email'));

CREATE POLICY "autores excluem mapa conexoes"
ON public.mapa_atores_conexoes FOR DELETE TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'));

REVOKE INSERT, UPDATE, DELETE ON public.mapa_atores_nos FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.mapa_atores_conexoes FROM anon;

DROP POLICY IF EXISTS "publico le campos publicados" ON public.page_fields;

CREATE OR REPLACE VIEW public.page_fields_publicos
WITH (security_invoker = true) AS
SELECT key, pagina, tipo, value_publicado, ordem
FROM public.page_fields
WHERE value_publicado IS NOT NULL;

GRANT SELECT ON public.page_fields_publicos TO anon, authenticated;

REVOKE SELECT ON public.page_fields FROM anon;
