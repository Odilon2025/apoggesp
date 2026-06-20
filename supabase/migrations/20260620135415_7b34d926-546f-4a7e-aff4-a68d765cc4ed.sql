-- Lock down associate_whitelist: only editors may read; revoke any incidental public grants.
REVOKE ALL ON public.associate_whitelist FROM anon, authenticated;
GRANT SELECT ON public.associate_whitelist TO authenticated;
GRANT ALL ON public.associate_whitelist TO service_role;

ALTER TABLE public.associate_whitelist FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Editors can view associate whitelist" ON public.associate_whitelist;
CREATE POLICY "Editors can view associate whitelist"
ON public.associate_whitelist
FOR SELECT
TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')));

DROP POLICY IF EXISTS "Editors can manage associate whitelist" ON public.associate_whitelist;
CREATE POLICY "Editors can manage associate whitelist"
ON public.associate_whitelist
FOR ALL
TO authenticated
USING (public.is_editor((auth.jwt() ->> 'email')))
WITH CHECK (public.is_editor((auth.jwt() ->> 'email')));