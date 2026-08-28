CREATE TABLE public.votacoes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo text NOT NULL,
  descricao text,
  status text NOT NULL DEFAULT 'aberta',
  criado_por text NOT NULL,
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT votacoes_status_check CHECK (status IN ('aberta','encerrada')),
  CONSTRAINT votacoes_titulo_len CHECK (char_length(titulo) BETWEEN 1 AND 200),
  CONSTRAINT votacoes_desc_len CHECK (descricao IS NULL OR char_length(descricao) <= 2000)
);

CREATE TABLE public.votacao_votos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  votacao_id uuid NOT NULL REFERENCES public.votacoes(id) ON DELETE CASCADE,
  votante_email text NOT NULL,
  votante_nome text,
  voto text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT votacao_votos_voto_check CHECK (voto IN ('sim','nao','abstencao')),
  CONSTRAINT votacao_votos_unico UNIQUE (votacao_id, votante_email)
);

CREATE TABLE public.votacao_comentarios (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  votacao_id uuid NOT NULL REFERENCES public.votacoes(id) ON DELETE CASCADE,
  autor_email text NOT NULL,
  texto text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT votacao_comentarios_texto_len CHECK (char_length(texto) BETWEEN 1 AND 2000)
);

CREATE INDEX idx_votacao_votos_votacao ON public.votacao_votos(votacao_id);
CREATE INDEX idx_votacao_comentarios_votacao ON public.votacao_comentarios(votacao_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.votacoes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.votacao_votos TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.votacao_comentarios TO authenticated;
GRANT ALL ON public.votacoes TO service_role;
GRANT ALL ON public.votacao_votos TO service_role;
GRANT ALL ON public.votacao_comentarios TO service_role;

ALTER TABLE public.votacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votacao_votos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votacao_comentarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assoc_select_votacoes" ON public.votacoes FOR SELECT TO authenticated
  USING (public.is_associate(auth.jwt() ->> 'email'));
CREATE POLICY "assoc_insert_votacoes" ON public.votacoes FOR INSERT TO authenticated
  WITH CHECK (public.is_associate(auth.jwt() ->> 'email') AND criado_por = (auth.jwt() ->> 'email'));
CREATE POLICY "owner_update_votacoes" ON public.votacoes FOR UPDATE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor(auth.jwt() ->> 'email'))
  WITH CHECK (criado_por = (auth.jwt() ->> 'email') OR public.is_editor(auth.jwt() ->> 'email'));
CREATE POLICY "owner_delete_votacoes" ON public.votacoes FOR DELETE TO authenticated
  USING (criado_por = (auth.jwt() ->> 'email') OR public.is_editor(auth.jwt() ->> 'email'));

CREATE POLICY "assoc_select_votos" ON public.votacao_votos FOR SELECT TO authenticated
  USING (public.is_associate(auth.jwt() ->> 'email'));
CREATE POLICY "assoc_insert_votos" ON public.votacao_votos FOR INSERT TO authenticated
  WITH CHECK (public.is_associate(auth.jwt() ->> 'email') AND votante_email = (auth.jwt() ->> 'email'));
CREATE POLICY "owner_update_votos" ON public.votacao_votos FOR UPDATE TO authenticated
  USING (votante_email = (auth.jwt() ->> 'email'))
  WITH CHECK (votante_email = (auth.jwt() ->> 'email'));
CREATE POLICY "owner_delete_votos" ON public.votacao_votos FOR DELETE TO authenticated
  USING (votante_email = (auth.jwt() ->> 'email'));

CREATE POLICY "assoc_select_coment" ON public.votacao_comentarios FOR SELECT TO authenticated
  USING (public.is_associate(auth.jwt() ->> 'email'));
CREATE POLICY "assoc_insert_coment" ON public.votacao_comentarios FOR INSERT TO authenticated
  WITH CHECK (public.is_associate(auth.jwt() ->> 'email') AND autor_email = (auth.jwt() ->> 'email'));
CREATE POLICY "owner_update_coment" ON public.votacao_comentarios FOR UPDATE TO authenticated
  USING (autor_email = (auth.jwt() ->> 'email'))
  WITH CHECK (autor_email = (auth.jwt() ->> 'email'));
CREATE POLICY "owner_delete_coment" ON public.votacao_comentarios FOR DELETE TO authenticated
  USING (autor_email = (auth.jwt() ->> 'email') OR public.is_editor(auth.jwt() ->> 'email'));

CREATE OR REPLACE FUNCTION public.votacao_aberta_check()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.votacoes v WHERE v.id = NEW.votacao_id AND v.status = 'aberta') THEN
    RAISE EXCEPTION 'Esta votação está encerrada.' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_votos_votacao_aberta BEFORE INSERT OR UPDATE ON public.votacao_votos
  FOR EACH ROW EXECUTE FUNCTION public.votacao_aberta_check();

CREATE TRIGGER trg_votacoes_updated BEFORE UPDATE ON public.votacoes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_votacao_votos_updated BEFORE UPDATE ON public.votacao_votos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_votacao_comentarios_updated BEFORE UPDATE ON public.votacao_comentarios
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.votacoes REPLICA IDENTITY FULL;
ALTER TABLE public.votacao_votos REPLICA IDENTITY FULL;
ALTER TABLE public.votacao_comentarios REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votacoes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votacao_votos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votacao_comentarios;