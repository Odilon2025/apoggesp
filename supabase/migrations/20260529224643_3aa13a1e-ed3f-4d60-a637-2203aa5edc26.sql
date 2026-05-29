GRANT SELECT, INSERT ON public.mapa_atores_nos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mapa_atores_nos TO authenticated;
GRANT ALL ON public.mapa_atores_nos TO service_role;

GRANT SELECT, INSERT ON public.mapa_atores_conexoes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mapa_atores_conexoes TO authenticated;
GRANT ALL ON public.mapa_atores_conexoes TO service_role;

DROP POLICY IF EXISTS "associados leem mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "associados inserem mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "associados leem mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "associados inserem mapa conexoes" ON public.mapa_atores_conexoes;

CREATE POLICY "publico le mapa nos"
ON public.mapa_atores_nos
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "publico insere mapa nos"
ON public.mapa_atores_nos
FOR INSERT
TO anon, authenticated
WITH CHECK (criado_por IS NOT NULL AND length(trim(criado_por)) > 0);

CREATE POLICY "publico le mapa conexoes"
ON public.mapa_atores_conexoes
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "publico insere mapa conexoes"
ON public.mapa_atores_conexoes
FOR INSERT
TO anon, authenticated
WITH CHECK (criado_por IS NOT NULL AND length(trim(criado_por)) > 0);