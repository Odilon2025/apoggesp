
-- Allow public edit/delete on collaborative map
DROP POLICY IF EXISTS "associados atualizam proprios mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "associados excluem proprios mapa nos" ON public.mapa_atores_nos;
DROP POLICY IF EXISTS "associados atualizam proprias mapa conexoes" ON public.mapa_atores_conexoes;
DROP POLICY IF EXISTS "associados excluem proprias mapa conexoes" ON public.mapa_atores_conexoes;

CREATE POLICY "publico atualiza mapa nos" ON public.mapa_atores_nos
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "publico exclui mapa nos" ON public.mapa_atores_nos
  FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "publico atualiza mapa conexoes" ON public.mapa_atores_conexoes
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "publico exclui mapa conexoes" ON public.mapa_atores_conexoes
  FOR DELETE TO anon, authenticated USING (true);

GRANT UPDATE, DELETE ON public.mapa_atores_nos TO anon, authenticated;
GRANT UPDATE, DELETE ON public.mapa_atores_conexoes TO anon, authenticated;
