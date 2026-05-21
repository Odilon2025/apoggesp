import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import {
  CmsNota,
  NotaEscopo,
  addNota,
  deleteNota,
  listNotas,
  reopenNota,
  resolveNota,
} from "@/lib/notas";

interface Props {
  escopo: NotaEscopo;
  alvo: string;
  alvoLabel?: string;
  campo?: string | null;
  /** Texto exibido no botão (ex.: nome do campo). */
  triggerLabel?: string;
  /** Render customizado do botão; recebe contagem de abertas. */
  renderTrigger?: (abertas: number) => React.ReactNode;
}

export default function NotasPanel({ escopo, alvo, alvoLabel, campo, triggerLabel, renderTrigger }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notas, setNotas] = useState<CmsNota[]>([]);
  const [novo, setNovo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const abertas = notas.filter((n) => n.status === "aberta").length;

  const carregar = async () => {
    setCarregando(true);
    try {
      const data = await listNotas(escopo, alvo, campo);
      setNotas(data);
    } catch (e: any) {
      toast({ title: "Erro ao carregar notas", description: e.message });
    } finally {
      setCarregando(false);
    }
  };

  // Carrega contagem ao montar para o badge
  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escopo, alvo, campo]);

  useEffect(() => {
    if (open) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const enviar = async () => {
    if (!novo.trim() || !user?.email) return;
    setSalvando(true);
    try {
      await addNota({
        escopo,
        alvo,
        alvo_label: alvoLabel ?? null,
        campo: campo ?? null,
        autor_email: user.email,
        texto: novo.trim(),
      });
      setNovo("");
      await carregar();
    } catch (e: any) {
      toast({ title: "Erro", description: e.message });
    } finally {
      setSalvando(false);
    }
  };

  const onResolve = async (n: CmsNota) => {
    if (!user?.email) return;
    await resolveNota(n.id, user.email);
    carregar();
  };
  const onReopen = async (n: CmsNota) => {
    await reopenNota(n.id);
    carregar();
  };
  const onDelete = async (n: CmsNota) => {
    if (!confirm("Excluir esta nota?")) return;
    await deleteNota(n.id);
    carregar();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {renderTrigger ? (
          <button type="button">{renderTrigger(abertas)}</button>
        ) : (
          <button
            type="button"
            className={`text-[10px] tracking-luxury uppercase px-2 py-1 border transition-colors ${
              abertas > 0
                ? "border-destructive text-destructive hover:bg-destructive/5"
                : "border-luxury-border text-text-caption hover:text-foreground"
            }`}
            title="Notas de revisão"
          >
            {abertas > 0 ? `${abertas} ${abertas === 1 ? "nota" : "notas"}` : "+ nota"}
            {triggerLabel ? ` · ${triggerLabel}` : ""}
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display font-normal">Notas de revisão</SheetTitle>
          <p className="text-[11px] text-text-caption font-light">
            {alvoLabel ?? alvo}
            {campo ? ` · ${campo}` : ""}
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <textarea
            value={novo}
            onChange={(e) => setNovo(e.target.value)}
            rows={3}
            placeholder="Escreva uma observação, sugestão de estilo ou dúvida…"
            className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
          />
          <button
            onClick={enviar}
            disabled={salvando || !novo.trim()}
            className="bg-foreground text-background px-4 py-2 text-xs font-light hover:bg-accent transition-colors disabled:opacity-50"
          >
            {salvando ? "Enviando…" : "Adicionar nota"}
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {carregando && <p className="text-xs text-text-caption">Carregando…</p>}
          {!carregando && notas.length === 0 && (
            <p className="text-xs text-text-caption font-light">Nenhuma nota ainda.</p>
          )}
          {notas.map((n) => (
            <div
              key={n.id}
              className={`border-l-2 pl-3 py-2 ${
                n.status === "aberta" ? "border-destructive" : "border-luxury-border opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] tracking-luxury uppercase text-text-caption">
                  {n.autor_email} · {new Date(n.created_at).toLocaleDateString("pt-BR")}
                </span>
                <span className="text-[10px] tracking-luxury uppercase">
                  {n.status === "aberta" ? "aberta" : "resolvida"}
                </span>
              </div>
              <p className="text-sm font-light whitespace-pre-wrap text-foreground">{n.texto}</p>
              <div className="flex gap-3 mt-2 text-[10px]">
                {n.status === "aberta" ? (
                  <button onClick={() => onResolve(n)} className="text-accent hover:text-foreground">
                    marcar como resolvida
                  </button>
                ) : (
                  <button onClick={() => onReopen(n)} className="text-accent hover:text-foreground">
                    reabrir
                  </button>
                )}
                <button onClick={() => onDelete(n)} className="text-destructive hover:opacity-70">
                  excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
