import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { CmsNota, addNota, deleteNota, listNotas, resolveNota } from "@/lib/notas";

interface Props {
  slug: string;
  secaoId: string | null; // null = verbete inteiro
  secaoTitulo: string;
  verbeteTitulo: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange?: () => void;
}

export default function WikiCommentsDrawer({
  slug,
  secaoId,
  secaoTitulo,
  verbeteTitulo,
  open,
  onOpenChange,
  onChange,
}: Props) {
  const { user } = useAuth();
  const [notas, setNotas] = useState<CmsNota[]>([]);
  const [novo, setNovo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    setCarregando(true);
    try {
      const data = await listNotas("wiki_secao", slug, secaoId);
      setNotas(data);
    } catch (e: any) {
      toast({ title: "Erro ao carregar comentários", description: e.message });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (open) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, slug, secaoId]);

  const enviar = async () => {
    if (!novo.trim() || !user?.email) return;
    if (novo.length > 2000) {
      toast({ title: "Comentário muito longo", description: "Máx. 2000 caracteres." });
      return;
    }
    setSalvando(true);
    try {
      await addNota({
        escopo: "wiki_secao",
        alvo: slug,
        alvo_label: verbeteTitulo,
        campo: secaoId,
        autor_email: user.email,
        texto: novo.trim(),
      });
      setNovo("");
      await carregar();
      onChange?.();
    } catch (e: any) {
      toast({ title: "Erro ao enviar comentário", description: e.message });
    } finally {
      setSalvando(false);
    }
  };

  const onResolve = async (n: CmsNota) => {
    if (!user?.email) return;
    try {
      await resolveNota(n.id, user.email);
      await carregar();
      onChange?.();
    } catch (e: any) {
      toast({ title: "Sem permissão", description: e.message });
    }
  };

  const onDelete = async (n: CmsNota) => {
    if (!confirm("Excluir este comentário?")) return;
    try {
      await deleteNota(n.id);
      await carregar();
      onChange?.();
    } catch (e: any) {
      toast({ title: "Sem permissão", description: e.message });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display font-normal flex items-center gap-2">
            <MessageCircle size={16} strokeWidth={1.5} />
            Comentários
          </SheetTitle>
          <p className="text-[11px] text-text-caption font-light">
            {verbeteTitulo}
            {secaoId ? ` · ${secaoTitulo}` : " · verbete inteiro"}
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          <textarea
            value={novo}
            onChange={(e) => setNovo(e.target.value)}
            rows={3}
            maxLength={2000}
            placeholder="Comente esta seção: traga uma dúvida, correção ou aprofundamento…"
            className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-caption">{novo.length}/2000</span>
            <button
              onClick={enviar}
              disabled={salvando || !novo.trim()}
              className="bg-foreground text-background px-4 py-2 text-xs font-light hover:bg-accent transition-colors disabled:opacity-50"
            >
              {salvando ? "Enviando…" : "Comentar"}
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {carregando && <p className="text-xs text-text-caption">Carregando…</p>}
          {!carregando && notas.length === 0 && (
            <p className="text-xs text-text-caption font-light">
              Nenhum comentário ainda. Seja o primeiro a iniciar a discussão.
            </p>
          )}
          {notas.map((n) => {
            const ehMeu = n.autor_email === user?.email;
            return (
              <div
                key={n.id}
                className={`border-l-2 pl-3 py-2 ${
                  n.status === "aberta" ? "border-gold" : "border-luxury-border opacity-60"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] tracking-luxury uppercase text-text-caption">
                    {n.autor_email} · {new Date(n.created_at).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="text-[10px] tracking-luxury uppercase">
                    {n.status === "aberta" ? "aberto" : "resolvido"}
                  </span>
                </div>
                <p className="text-sm font-light whitespace-pre-wrap text-foreground">{n.texto}</p>
                <div className="flex gap-3 mt-2 text-[10px]">
                  {n.status === "aberta" && (
                    <button onClick={() => onResolve(n)} className="text-accent hover:text-foreground">
                      marcar como resolvido
                    </button>
                  )}
                  {ehMeu && (
                    <button onClick={() => onDelete(n)} className="text-destructive hover:opacity-70">
                      excluir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
