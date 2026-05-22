-- Helper macro replicada inline para cada tabela CMS padrão
DO $$
DECLARE
  t text;
  tables text[] := ARRAY['associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format($f$
      CREATE TABLE IF NOT EXISTS public.%I (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        ordem integer NOT NULL DEFAULT 0,
        publicado boolean NOT NULL DEFAULT true,
        deletado boolean NOT NULL DEFAULT false,
        dados_publicado jsonb,
        dados_rascunho jsonb,
        tem_rascunho boolean NOT NULL DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        updated_by text
      );
      ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "publico le %I publicados" ON public.%I
        FOR SELECT TO anon, authenticated
        USING (publicado = true AND deletado = false AND dados_publicado IS NOT NULL);
      CREATE POLICY "editores leem todos %I" ON public.%I
        FOR SELECT TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
      CREATE POLICY "editores inserem %I" ON public.%I
        FOR INSERT TO authenticated WITH CHECK (is_editor((auth.jwt() ->> 'email')));
      CREATE POLICY "editores atualizam %I" ON public.%I
        FOR UPDATE TO authenticated
        USING (is_editor((auth.jwt() ->> 'email')))
        WITH CHECK (is_editor((auth.jwt() ->> 'email')));
      CREATE POLICY "editores excluem %I" ON public.%I
        FOR DELETE TO authenticated USING (is_editor((auth.jwt() ->> 'email')));
      CREATE TRIGGER set_updated_at_%I BEFORE UPDATE ON public.%I
        FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    $f$, t, t, t, t, t, t, t, t, t, t, t, t, t, t);
  END LOOP;
END $$;

-- Atualiza funções de publicação com whitelist expandida
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
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens'
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
    'associado_avisos','biblioteca_itens','valorizacao_acoes','grupos_trabalho','transparencia_itens'
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

-- Seed dos page_fields
INSERT INTO public.page_fields (pagina, key, tipo, ordem, descricao, value_publicado) VALUES
-- Painel
('associado_painel','hero_label','text',10,'Rótulo do hero','Área do Associado'),
('associado_painel','hero_titulo','text',20,'Título do hero','Painel do Associado'),
('associado_painel','hero_subtitulo','text',30,'Subtítulo do hero','Espaço dedicado aos associados da APOGESP — acompanhe avisos, acesse materiais e participe das ações da entidade.'),
('associado_painel','intro','markdown',40,'Introdução em markdown','Bem-vindo. Este painel reúne acessos rápidos a tudo que organizamos para você: biblioteca da carreira, campanhas em curso, grupos de trabalho e prestação de contas da entidade.'),
-- Biblioteca
('associado_biblioteca','hero_label','text',10,'Rótulo do hero','Área do Associado'),
('associado_biblioteca','hero_titulo','text',20,'Título do hero','Biblioteca da Carreira'),
('associado_biblioteca','hero_subtitulo','text',30,'Subtítulo do hero','Documentos, materiais técnicos e referências organizados para consulta dos APPGGs.'),
('associado_biblioteca','intro','markdown',40,'Introdução em markdown','Reunimos aqui os principais documentos da carreira, materiais de formação, modelos institucionais e referências técnicas.'),
-- Valorização
('associado_valorizacao','hero_label','text',10,'Rótulo do hero','Área do Associado'),
('associado_valorizacao','hero_titulo','text',20,'Título do hero','Valorização e Advocacy'),
('associado_valorizacao','hero_subtitulo','text',30,'Subtítulo do hero','Acompanhe as ações da APOGESP pela valorização da carreira e pelo fortalecimento institucional dos APPGGs.'),
('associado_valorizacao','intro','markdown',40,'Introdução em markdown','Esta página reúne as ações estratégicas em curso, conquistas recentes e próximos passos.'),
-- Grupos
('associado_grupos','hero_label','text',10,'Rótulo do hero','Área do Associado'),
('associado_grupos','hero_titulo','text',20,'Título do hero','Grupos de Trabalho'),
('associado_grupos','hero_subtitulo','text',30,'Subtítulo do hero','Espaços colaborativos de produção técnica e construção coletiva entre associados.'),
('associado_grupos','intro','markdown',40,'Introdução em markdown','Os Grupos de Trabalho (GTs) são a forma principal de participação ativa dos associados. Conheça os GTs em funcionamento e como contribuir.'),
-- Transparência
('associado_transparencia','hero_label','text',10,'Rótulo do hero','Área do Associado'),
('associado_transparencia','hero_titulo','text',20,'Título do hero','Transparência APOGESP'),
('associado_transparencia','hero_subtitulo','text',30,'Subtítulo do hero','Prestação de contas, atas, documentos institucionais e relatórios de gestão.'),
('associado_transparencia','intro','markdown',40,'Introdução em markdown','A APOGESP mantém o compromisso de divulgar abertamente seus documentos, decisões e movimentações para os associados.')
ON CONFLICT (key) DO NOTHING;

-- Seeds das tabelas estruturadas
INSERT INTO public.associado_avisos (ordem, dados_publicado) VALUES
(10, '{"titulo":"Assembleia ordinária","texto":"Próxima assembleia será divulgada em breve com pauta e link de participação.","tipo":"info","data":""}'::jsonb),
(20, '{"titulo":"Atualização da Campanha Salarial","texto":"Acompanhe as ações em curso na seção Valorização e Advocacy.","tipo":"destaque","data":""}'::jsonb);

INSERT INTO public.biblioteca_itens (ordem, dados_publicado) VALUES
(10, '{"titulo":"Lei nº 17.026/2018","categoria":"Legislação","descricao":"Lei que dispõe sobre a carreira de APPGG.","tipo":"Link","url":"#","restrito":false}'::jsonb),
(20, '{"titulo":"Manual do APPGG","categoria":"Formação","descricao":"Guia introdutório sobre as atribuições e perfil da carreira.","tipo":"PDF","url":"#","restrito":true}'::jsonb),
(30, '{"titulo":"Modelo de PAI","categoria":"Templates","descricao":"Modelo institucional para Planos de Atuação Institucional.","tipo":"Planilha","url":"#","restrito":true}'::jsonb);

INSERT INTO public.valorizacao_acoes (ordem, dados_publicado) VALUES
(10, '{"titulo":"Recomposição salarial 2026","eixo":"Salarial","status":"Em curso","descricao":"Tratativas em andamento com a Secretaria de Gestão para recomposição de perdas inflacionárias.","proxima_etapa":"Reunião técnica em junho/2026"}'::jsonb),
(20, '{"titulo":"Nomeação dos aprovados no concurso 2024","eixo":"Nomeação","status":"Em curso","descricao":"Acompanhamento das nomeações pendentes do último concurso público.","proxima_etapa":"Audiência pública na Câmara"}'::jsonb),
(30, '{"titulo":"Reconhecimento da carreira como estratégica","eixo":"Institucional","status":"Conquista","descricao":"Inclusão formal da carreira no rol de carreiras estratégicas municipais.","proxima_etapa":"Monitoramento da regulamentação"}'::jsonb);

INSERT INTO public.grupos_trabalho (ordem, dados_publicado) VALUES
(10, '{"nome":"GT Carreira","tema":"Estrutura e desenvolvimento da carreira","coordenacao":"Diretoria de Carreira","descricao":"Discussão técnica sobre reformulação da carreira, planos de cargos e progressão.","frequencia":"Mensal","como_participar":"Envie um e-mail para apogesp@gmail.com com o assunto **GT Carreira**.","ativo":true}'::jsonb),
(20, '{"nome":"GT Sustentabilidade","tema":"Agenda ambiental municipal","coordenacao":"Diretoria Técnica","descricao":"Articulação de propostas técnicas para a agenda climática e ambiental do município.","frequencia":"Quinzenal","como_participar":"Inscrições abertas — solicite acesso via e-mail institucional.","ativo":true}'::jsonb),
(30, '{"nome":"GT Comunicação","tema":"Comunicação institucional e advocacy","coordenacao":"Diretoria de Comunicação","descricao":"Produção de conteúdo institucional, materiais de campanha e relacionamento com a imprensa.","frequencia":"Mensal","como_participar":"Aberto a associados com interesse em comunicação pública.","ativo":true}'::jsonb);

INSERT INTO public.transparencia_itens (ordem, dados_publicado) VALUES
(10, '{"titulo":"Estatuto da APOGESP","categoria":"Estatuto","periodo":"Vigente","descricao":"Estatuto social vigente da associação.","url":"#"}'::jsonb),
(20, '{"titulo":"Ata da Assembleia Geral 2025","categoria":"Atas","periodo":"2025","descricao":"Ata da assembleia geral ordinária de 2025.","url":"#"}'::jsonb),
(30, '{"titulo":"Relatório de Gestão 2024","categoria":"Relatórios","periodo":"2024","descricao":"Relatório anual de atividades e prestação de contas.","url":"#"}'::jsonb);