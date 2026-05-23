
-- 1. Tabela wiki_verbetes (mesmo padrão dos outros CMS)
CREATE TABLE public.wiki_verbetes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordem integer NOT NULL DEFAULT 0,
  publicado boolean NOT NULL DEFAULT true,
  deletado boolean NOT NULL DEFAULT false,
  tem_rascunho boolean NOT NULL DEFAULT false,
  dados_publicado jsonb,
  dados_rascunho jsonb,
  updated_by text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.wiki_verbetes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "publico le wiki_verbetes publicados"
  ON public.wiki_verbetes FOR SELECT
  TO anon, authenticated
  USING (publicado = true AND deletado = false AND dados_publicado IS NOT NULL);

CREATE POLICY "editores leem todos wiki_verbetes"
  ON public.wiki_verbetes FOR SELECT
  TO authenticated
  USING (is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores inserem wiki_verbetes"
  ON public.wiki_verbetes FOR INSERT
  TO authenticated
  WITH CHECK (is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores atualizam wiki_verbetes"
  ON public.wiki_verbetes FOR UPDATE
  TO authenticated
  USING (is_editor((auth.jwt() ->> 'email')))
  WITH CHECK (is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "editores excluem wiki_verbetes"
  ON public.wiki_verbetes FOR DELETE
  TO authenticated
  USING (is_editor((auth.jwt() ->> 'email')));

-- 2. Estender publish_cms_item / publish_cms_all para wiki_verbetes
CREATE OR REPLACE FUNCTION public.publish_cms_item(_table text, _id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes'
  ) then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where id = $1
  $f$, _table) using _id;
end; $function$;

CREATE OR REPLACE FUNCTION public.publish_cms_all(_table text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if not public.is_editor((auth.jwt() ->> 'email')) then
    raise exception 'acesso negado' using errcode = 'P0001';
  end if;
  if _table not in (
    'cronologia_itens','atos_normativos_itens','planos_itens','publicacoes_itens',
    'atuacao_destaques','casos_atuacao','observatorio_indicadores','observatorio_categorias',
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens',
    'wiki_verbetes'
  ) then
    raise exception 'tabela invalida' using errcode = 'P0001';
  end if;
  execute format($f$
    update public.%I
    set dados_publicado = coalesce(dados_rascunho, dados_publicado),
        dados_rascunho = null,
        tem_rascunho = false
    where tem_rascunho = true
  $f$, _table);
end; $function$;

-- 3. Policies de cms_notas para escopo 'wiki_secao' (associados autenticados na whitelist)
-- Associados autenticados leem todos os comentários da wiki
CREATE POLICY "associados leem comentarios wiki"
  ON public.cms_notas FOR SELECT
  TO authenticated
  USING (
    escopo = 'wiki_secao'
    AND EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = (auth.jwt() ->> 'email')::citext)
  );

-- Associados na whitelist inserem comentários em seu próprio nome
CREATE POLICY "associados inserem comentarios wiki"
  ON public.cms_notas FOR INSERT
  TO authenticated
  WITH CHECK (
    escopo = 'wiki_secao'
    AND autor_email = (auth.jwt() ->> 'email')
    AND EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = (auth.jwt() ->> 'email')::citext)
  );

-- Associados podem atualizar (resolver/reabrir) os próprios comentários
CREATE POLICY "associados atualizam proprios comentarios wiki"
  ON public.cms_notas FOR UPDATE
  TO authenticated
  USING (
    escopo = 'wiki_secao'
    AND autor_email = (auth.jwt() ->> 'email')
  )
  WITH CHECK (
    escopo = 'wiki_secao'
    AND autor_email = (auth.jwt() ->> 'email')
  );

-- Associados podem deletar os próprios comentários
CREATE POLICY "associados excluem proprios comentarios wiki"
  ON public.cms_notas FOR DELETE
  TO authenticated
  USING (
    escopo = 'wiki_secao'
    AND autor_email = (auth.jwt() ->> 'email')
  );

-- 4. Page fields da nova página
INSERT INTO public.page_fields (key, pagina, tipo, descricao, value_publicado, ordem) VALUES
  ('hero_label',    'associado_wiki', 'text',     'Rótulo do hero',    'Área do Associado', 10),
  ('hero_titulo',   'associado_wiki', 'text',     'Título do hero',    'Wiki da Carreira',  20),
  ('hero_subtitulo','associado_wiki', 'text',     'Subtítulo do hero', 'Conhecimento coletivo sobre a carreira APPGG, construído e debatido pelos associados.', 30),
  ('intro',         'associado_wiki', 'markdown', 'Texto de introdução exibido no topo do índice', 'Esta wiki é um espaço vivo de consolidação do conhecimento sobre a carreira. Cada verbete está dividido em seções — você pode comentar em qualquer uma delas para sugerir correções, trazer dúvidas ou aprofundar debates.', 40)
ON CONFLICT (key) DO NOTHING;
