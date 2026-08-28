import { useMemo, useState } from "react";
import { z } from "zod";
import FadeIn from "@/components/FadeIn";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields } from "@/hooks/useCMS";
import { field } from "@/lib/cms";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useVotacoes, type Votacao, type Voto, type Comentario } from "@/hooks/useVotacoes";
import { toast } from "@/hooks/use-toast";
import { Check, X, MinusCircle, Lock, Unlock, MessageSquare, Trash2 } from "lucide-react";

const OPCOES = [
  { key: "sim", label: "Sim", icon: Check },
  { key: "nao", label: "Não", icon: X },
  { key: "abstencao", label: "Abstenção", icon: MinusCircle },
] as const;

const novaSchema = z.object({
  titulo: z.string().trim().min(3, "Informe um tema com ao menos 3 caracteres.").max(160, "Máximo de 160 caracteres."),
  descricao: z.string().trim().max(1000, "Máximo de 1000 caracteres.").optional(),
});

const comentarioSchema = z.string().trim().min(1, "Escreva um comentário.").max(1000, "Máximo de 1000 caracteres.");

const nomeDe = (email: string) => email.split("@")[0].replace(/[._]/g, " ");

const hora = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const VotacoesPage = () => {
  const fields = usePageFields("associado_votacoes");
  const { user } = useAuth();
  const email = user?.email ?? "";
  const { votacoes, votos, comentarios, loading } = useVotacoes();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const abertas = useMemo(() => votacoes.filter((v) => v.status === "aberta"), [votacoes]);
  const encerradas = useMemo(() => votacoes.filter((v) => v.status !== "aberta"), [votacoes]);

  const criar = async () => {
    const parsed = novaSchema.safeParse({ titulo, descricao });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setEnviando(true);
    const { error } = await supabase.from("votacoes").insert({
      titulo: parsed.data.titulo,
      descricao: parsed.data.descricao || null,
      criado_por: email,
    });
    setEnviando(false);
    if (error) {
      toast({ title: "Não foi possível abrir a pauta.", description: error.message, variant: "destructive" });
      return;
    }
    setTitulo("");
    setDescricao("");
  };

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Votações ao Vivo")}
      subtitulo={field(
        fields,
        "hero_subtitulo",
        "Deliberações abertas em reuniões: qualquer associado propõe um tema, o voto é nominal e o resultado atualiza em tempo real.",
      )}
    >
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="border border-luxury-border p-6 md:p-8 mb-16">
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">Abrir nova pauta</h2>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                maxLength={160}
                placeholder="Tema da votação"
                className="w-full bg-transparent border-b border-luxury-border py-2 text-lg font-display text-foreground placeholder:text-text-caption focus:outline-none focus:border-gold transition-colors"
              />
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={1000}
                rows={2}
                placeholder="Contexto (opcional)"
                className="mt-4 w-full bg-transparent border-b border-luxury-border py-2 text-sm font-light text-text-body placeholder:text-text-caption focus:outline-none focus:border-gold transition-colors resize-none"
              />
              <button
                onClick={criar}
                disabled={enviando}
                className="mt-6 text-[11px] font-sans tracking-luxury uppercase text-foreground border-b border-gold pb-1 hover:text-gold transition-colors disabled:opacity-50"
              >
                {enviando ? "Abrindo…" : "Abrir votação"}
              </button>
            </div>
          </FadeIn>

          {loading && <p className="text-sm font-light text-text-caption">Carregando…</p>}

          {!loading && votacoes.length === 0 && (
            <p className="text-sm font-light text-text-caption">Nenhuma votação registrada ainda.</p>
          )}

          {abertas.length > 0 && (
            <>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-gold mb-6">Em votação</h2>
              <div className="space-y-10 mb-20">
                {abertas.map((v) => (
                  <CardVotacao key={v.id} votacao={v} votos={votos} comentarios={comentarios} email={email} />
                ))}
              </div>
            </>
          )}

          {encerradas.length > 0 && (
            <>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">Encerradas</h2>
              <div className="space-y-10">
                {encerradas.map((v) => (
                  <CardVotacao key={v.id} votacao={v} votos={votos} comentarios={comentarios} email={email} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </AssociadoLayout>
  );
};

interface CardProps {
  votacao: Votacao;
  votos: Voto[];
  comentarios: Comentario[];
  email: string;
}

const CardVotacao = ({ votacao, votos, comentarios, email }: CardProps) => {
  const [comentario, setComentario] = useState("");
  const meus = votos.filter((v) => v.votacao_id === votacao.id);
  const meuVoto = meus.find((v) => v.votante_email === email);
  const total = meus.length;
  const aberta = votacao.status === "aberta";
  const dono = votacao.criado_por === email;
  const thread = comentarios.filter((c) => c.votacao_id === votacao.id);

  const votar = async (opcao: string) => {
    if (!aberta) return;
    const { error } = await supabase
      .from("votacao_votos")
      .upsert(
        { votacao_id: votacao.id, votante_email: email, votante_nome: nomeDe(email), voto: opcao },
        { onConflict: "votacao_id,votante_email" },
      );
    if (error) toast({ title: "Não foi possível registrar o voto.", description: error.message, variant: "destructive" });
  };

  const alternarStatus = async () => {
    const { error } = await supabase
      .from("votacoes")
      .update({ status: aberta ? "encerrada" : "aberta", closed_at: aberta ? new Date().toISOString() : null })
      .eq("id", votacao.id);
    if (error) toast({ title: "Ação não permitida.", description: error.message, variant: "destructive" });
  };

  const comentar = async () => {
    const parsed = comentarioSchema.safeParse(comentario);
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    const { error } = await supabase
      .from("votacao_comentarios")
      .insert({ votacao_id: votacao.id, autor_email: email, texto: parsed.data });
    if (error) {
      toast({ title: "Não foi possível comentar.", description: error.message, variant: "destructive" });
      return;
    }
    setComentario("");
  };

  const excluirComentario = async (id: string) => {
    await supabase.from("votacao_comentarios").delete().eq("id", id);
  };

  return (
    <article className="border border-luxury-border bg-card">
      <header className="p-6 md:p-8 border-b border-luxury-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-display text-foreground">{votacao.titulo}</h3>
            {votacao.descricao && (
              <p className="mt-2 text-sm font-light text-text-body leading-relaxed">{votacao.descricao}</p>
            )}
            <p className="mt-3 text-[10px] font-sans tracking-luxury uppercase text-text-caption">
              {nomeDe(votacao.criado_por)} · {hora(votacao.created_at)} · {aberta ? "Aberta" : "Encerrada"}
            </p>
          </div>
          {dono && (
            <button
              onClick={alternarStatus}
              className="shrink-0 inline-flex items-center gap-2 text-[10px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground transition-colors"
            >
              {aberta ? <Lock size={13} strokeWidth={1.5} /> : <Unlock size={13} strokeWidth={1.5} />}
              {aberta ? "Encerrar" : "Reabrir"}
            </button>
          )}
        </div>
      </header>

      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-3 gap-px bg-luxury-border">
          {OPCOES.map(({ key, label, icon: Icon }) => {
            const n = meus.filter((v) => v.voto === key).length;
            const pct = total ? Math.round((n / total) * 100) : 0;
            const ativo = meuVoto?.voto === key;
            return (
              <button
                key={key}
                onClick={() => votar(key)}
                disabled={!aberta}
                className={`bg-card p-4 text-left transition-colors disabled:cursor-not-allowed ${
                  ativo ? "ring-1 ring-inset ring-gold" : "hover:bg-luxury-border/30"
                }`}
              >
                <span className="flex items-center gap-2 text-[10px] font-sans tracking-luxury uppercase text-text-caption">
                  <Icon size={13} strokeWidth={1.5} /> {label}
                </span>
                <span className="mt-2 block text-2xl font-display text-foreground">{n}</span>
                <span className="block h-px bg-gold mt-2 transition-all" style={{ width: `${pct}%` }} />
              </button>
            );
          })}
        </div>
        <p className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">
          {total} {total === 1 ? "voto registrado" : "votos registrados"} · voto aberto
        </p>

        {total > 0 && (
          <div className="border-t border-luxury-border pt-6 space-y-2">
            <h4 className="text-[10px] font-sans tracking-luxury uppercase text-text-caption mb-3">Registro de votos</h4>
            {OPCOES.map(({ key, label }) => {
              const lista = meus.filter((v) => v.voto === key);
              if (!lista.length) return null;
              return (
                <div key={key} className="flex gap-3 text-xs font-light">
                  <span className="w-24 shrink-0 uppercase tracking-luxury text-[10px] text-gold">{label}</span>
                  <span className="text-text-body">
                    {lista.map((v) => `${v.votante_nome || nomeDe(v.votante_email)} (${hora(v.updated_at)})`).join(" · ")}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-luxury-border pt-6">
          <h4 className="flex items-center gap-2 text-[10px] font-sans tracking-luxury uppercase text-text-caption mb-4">
            <MessageSquare size={13} strokeWidth={1.5} /> Comentários ({thread.length})
          </h4>
          <ul className="space-y-4 mb-4">
            {thread.map((c) => (
              <li key={c.id} className="text-sm font-light text-text-body">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">
                    {nomeDe(c.autor_email)} · {hora(c.created_at)}
                  </span>
                  {c.autor_email === email && (
                    <button
                      onClick={() => excluirComentario(c.id)}
                      aria-label="Excluir comentário"
                      className="text-text-caption hover:text-destructive transition-colors"
                    >
                      <Trash2 size={12} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-wrap leading-relaxed">{c.texto}</p>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 items-end">
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={1000}
              rows={1}
              placeholder="Escreva um comentário"
              className="flex-1 bg-transparent border-b border-luxury-border py-2 text-sm font-light text-text-body placeholder:text-text-caption focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              onClick={comentar}
              className="text-[10px] font-sans tracking-luxury uppercase text-foreground border-b border-gold pb-1 hover:text-gold transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VotacoesPage;
