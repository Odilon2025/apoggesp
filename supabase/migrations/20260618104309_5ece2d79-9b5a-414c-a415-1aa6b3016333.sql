DROP POLICY IF EXISTS "publico atualiza mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "publico exclui mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "publico insere mapa conexoes" ON public.mapa_atores_conexoes;

CREATE POLICY "autenticados inserem mapa conexoes"
ON public.mapa_atores_conexoes
FOR INSERT
TO authenticated
WITH CHECK (
  criado_por IS NOT NULL
  AND length(trim(criado_por)) > 0
  AND criado_por = (auth.jwt() ->> 'email')
);

CREATE POLICY "autores atualizam mapa conexoes"
ON public.mapa_atores_conexoes
FOR UPDATE
TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'))
WITH CHECK (criado_por = (auth.jwt() ->> 'email'));

CREATE POLICY "autores excluem mapa conexoes"
ON public.mapa_atores_conexoes
FOR DELETE
TO authenticated
USING (criado_por = (auth.jwt() ->> 'email'));