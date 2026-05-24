-- Tabela de nós (atores)
CREATE TABLE public.mapa_atores_nos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  posicao_x DOUBLE PRECISION,
  posicao_y DOUBLE PRECISION,
  criado_por TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT mapa_atores_nos_tipo_check CHECK (tipo IN ('prefeito','secretario','vereador','orgao','parlamentar','tecnico','midia','sociedade','outro'))
);

CREATE INDEX idx_mapa_atores_nos_tipo ON public.mapa_atores_nos(tipo);

-- Tabela de conexões
CREATE TABLE public.mapa_atores_conexoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  origem_id UUID NOT NULL REFERENCES public.mapa_atores_nos(id) ON DELETE CASCADE,
  destino_id UUID NOT NULL REFERENCES public.mapa_atores_nos(id) ON DELETE CASCADE,
  rotulo TEXT NOT NULL,
  descricao TEXT,
  criado_por TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT mapa_atores_conexoes_nao_loop CHECK (origem_id <> destino_id)
);

CREATE INDEX idx_mapa_atores_conexoes_origem ON public.mapa_atores_conexoes(origem_id);
CREATE INDEX idx_mapa_atores_conexoes_destino ON public.mapa_atores_conexoes(destino_id);

-- Triggers updated_at
CREATE TRIGGER trg_mapa_atores_nos_updated
  BEFORE UPDATE ON public.mapa_atores_nos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_mapa_atores_conexoes_updated
  BEFORE UPDATE ON public.mapa_atores_conexoes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.mapa_atores_nos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mapa_atores_conexoes ENABLE ROW LEVEL SECURITY;

-- Nós: associados leem
CREATE POLICY "associados leem mapa nos"
  ON public.mapa_atores_nos FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = ((auth.jwt() ->> 'email'))::extensions.citext));

-- Nós: associados inserem
CREATE POLICY "associados inserem mapa nos"
  ON public.mapa_atores_nos FOR INSERT TO authenticated
  WITH CHECK (
    criado_por = (auth.jwt() ->> 'email')
    AND EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = ((auth.jwt() ->> 'email'))::extensions.citext)
  );

-- Nós: dono ou editor atualiza
CREATE POLICY "associados atualizam proprios mapa nos"
  ON public.mapa_atores_nos FOR UPDATE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')))
  WITH CHECK (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')));

-- Nós: dono ou editor exclui
CREATE POLICY "associados excluem proprios mapa nos"
  ON public.mapa_atores_nos FOR DELETE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')));

-- Conexões: mesmas regras
CREATE POLICY "associados leem mapa conexoes"
  ON public.mapa_atores_conexoes FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = ((auth.jwt() ->> 'email'))::extensions.citext));

CREATE POLICY "associados inserem mapa conexoes"
  ON public.mapa_atores_conexoes FOR INSERT TO authenticated
  WITH CHECK (
    criado_por = (auth.jwt() ->> 'email')
    AND EXISTS (SELECT 1 FROM public.associate_whitelist w WHERE w.email = ((auth.jwt() ->> 'email'))::extensions.citext)
  );

CREATE POLICY "associados atualizam proprias mapa conexoes"
  ON public.mapa_atores_conexoes FOR UPDATE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')))
  WITH CHECK (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')));

CREATE POLICY "associados excluem proprias mapa conexoes"
  ON public.mapa_atores_conexoes FOR DELETE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor((auth.jwt() ->> 'email')));

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.mapa_atores_nos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mapa_atores_conexoes;
ALTER TABLE public.mapa_atores_nos REPLICA IDENTITY FULL;
ALTER TABLE public.mapa_atores_conexoes REPLICA IDENTITY FULL;