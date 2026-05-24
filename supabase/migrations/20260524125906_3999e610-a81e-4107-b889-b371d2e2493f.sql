-- Remove a constraint antiga que não inclui 'wiki_secao'
ALTER TABLE public.cms_notas DROP CONSTRAINT IF EXISTS cms_notas_escopo_check;

-- Recria a constraint com todos os escopos permitidos, incluindo 'wiki_secao'
ALTER TABLE public.cms_notas ADD CONSTRAINT cms_notas_escopo_check CHECK (escopo IN ('page_field','cms_item','snapshot','noticia','wiki_secao'));