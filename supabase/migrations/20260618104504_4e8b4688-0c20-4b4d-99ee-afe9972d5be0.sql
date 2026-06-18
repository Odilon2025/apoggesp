DROP POLICY IF EXISTS "publico atualiza mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "publico exclui mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "publico insere mapa nos" ON public.mapa_atores_nos;

CREATE POLICY "autenticados inserem mapa nos"
ON public.mapa_atores_nos
FOR INSERT
TO authenticated
WITH CHECK (
  criado_por IS NOT NULL
  AND length(trim(criado_por)) > 0
  AND criado_por = (auth.jwt() ->> 'email')
);

CREATE POLICY "autores atualizam mapa nos"
ON public.mapa_atores_nos
FOR UPDATE
TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'))
WITH CHECK (criado_por = (auth.jwt() ->> 'email'));

CREATE POLICY "autores excluem mapa nos"
ON public.mapa_atores_nos
FOR DELETE
TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'));