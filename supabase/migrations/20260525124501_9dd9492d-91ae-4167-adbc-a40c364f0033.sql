ALTER TABLE public.mapa_atores_conexoes
ADD COLUMN IF NOT EXISTS sentimento smallint NOT NULL DEFAULT 0
CHECK (sentimento IN (-1, 0, 1));