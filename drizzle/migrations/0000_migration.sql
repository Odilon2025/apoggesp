DROP POLICY IF EXISTS "publico le campos publicados" ON public.page_fields;
CREATE POLICY "publico le campos publicados" ON public.page_fields FOR SELECT TO anon USING (value_publicado IS NOT NULL);