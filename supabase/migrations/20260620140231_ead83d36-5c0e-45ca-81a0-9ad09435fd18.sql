-- Remove a visão criada na migração anterior; usaremos GRANT por coluna.
DROP VIEW IF EXISTS public.page_fields_public;

-- Restaura leitura pública (filtrada por valor publicado) na tabela.
DROP POLICY IF EXISTS "publico le campos publicados" ON public.page_fields;
CREATE POLICY "publico le campos publicados"
ON public.page_fields
FOR SELECT
TO anon, authenticated
USING (value_publicado IS NOT NULL);

-- Restringe o acesso de coluna para anon: apenas colunas seguras.
REVOKE SELECT ON public.page_fields FROM anon;
GRANT SELECT (key, pagina, tipo, value_publicado, ordem, descricao)
  ON public.page_fields TO anon;

-- authenticated mantém SELECT completo na tabela (necessário para editores via RLS).
GRANT SELECT ON public.page_fields TO authenticated;