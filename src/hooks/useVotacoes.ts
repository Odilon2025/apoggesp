import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Votacao {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string;
  criado_por: string;
  closed_at: string | null;
  created_at: string;
}

export interface Voto {
  id: string;
  votacao_id: string;
  votante_email: string;
  votante_nome: string | null;
  voto: "sim" | "nao" | "abstencao" | string;
  created_at: string;
  updated_at: string;
}

export interface Comentario {
  id: string;
  votacao_id: string;
  autor_email: string;
  texto: string;
  created_at: string;
}

export const useVotacoes = () => {
  const [votacoes, setVotacoes] = useState<Votacao[]>([]);
  const [votos, setVotos] = useState<Voto[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    const [v, vo, c] = await Promise.all([
      supabase.from("votacoes").select("*").order("created_at", { ascending: false }),
      supabase.from("votacao_votos").select("*").order("created_at", { ascending: true }),
      supabase.from("votacao_comentarios").select("*").order("created_at", { ascending: true }),
    ]);
    setVotacoes((v.data as Votacao[]) || []);
    setVotos((vo.data as Voto[]) || []);
    setComentarios((c.data as Comentario[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
    const channel = supabase
      .channel("votacoes-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "votacoes" }, () => carregar())
      .on("postgres_changes", { event: "*", schema: "public", table: "votacao_votos" }, () => carregar())
      .on("postgres_changes", { event: "*", schema: "public", table: "votacao_comentarios" }, () => carregar())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [carregar]);

  return { votacoes, votos, comentarios, loading, recarregar: carregar };
};
