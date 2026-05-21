import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "./AdminGuard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { clearCmsCache } from "@/lib/cms";
import NotasPanel from "@/components/admin/NotasPanel";

const Inner = () => {
  const { user } = useAuth();
  const [json, setJson] = useState("");
  const [original, setOriginal] = useState("");
  const [temRascunho, setTemRascunho] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = async () => {
    setCarregando(true);
    const { data } = await supabase
      .from("snapshot_carreira")
      .select("*")
      .eq("id", "current")
      .maybeSingle();
    const dados = (data?.dados_rascunho ?? data?.dados_publicado) ?? {};
    const txt = JSON.stringify(dados, null, 2);
    setJson(txt);
    setOriginal(JSON.stringify(data?.dados_publicado ?? {}, null, 2));
    setTemRascunho(Boolean(data?.tem_rascunho));
    setCarregando(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvarRascunho = async () => {
    setErro(null);
    let parsed: any;
    try {
      parsed = JSON.parse(json);
    } catch (e: any) {
      setErro("JSON inválido: " + e.message);
      return;
    }
    const { error } = await supabase
      .from("snapshot_carreira")
      .update({ dados_rascunho: parsed, tem_rascunho: true, updated_by: user?.email ?? null })
      .eq("id", "current");
    if (error) toast({ title: "Erro", description: error.message });
    else {
      toast({ title: "Rascunho salvo" });
      carregar();
    }
  };

  const publicar = async () => {
    if (!confirm("Publicar o snapshot atual?")) return;
    await salvarRascunho();
    const { error } = await supabase.rpc("publish_snapshot");
    if (error) toast({ title: "Erro", description: error.message });
    else {
      toast({ title: "Snapshot publicado" });
      clearCmsCache();
      carregar();
    }
  };

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-4xl">
        <Link to="/admin" className="text-xs text-text-caption hover:text-foreground">← Painel</Link>
        <div className="flex items-end justify-between mt-3 mb-2 flex-wrap gap-3">
          <h1 className="text-3xl font-display text-foreground">Snapshot da carreira</h1>
          <NotasPanel escopo="snapshot" alvo="current" alvoLabel="Snapshot da carreira" />
        </div>
        <p className="text-xs font-light text-text-caption mb-2">
          Edite o JSON do snapshot completo (números, indicadores, gráficos). Use cuidado: a estrutura precisa
          continuar a mesma para os gráficos funcionarem.
        </p>
        {temRascunho && (
          <div className="border-l-2 border-destructive bg-section-alt p-3 mb-6 text-sm font-light">
            Há um rascunho não publicado.
          </div>
        )}

        {carregando ? (
          <p className="text-sm">Carregando…</p>
        ) : (
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={32}
            className="w-full bg-section-alt border border-luxury-border p-4 text-xs font-mono"
          />
        )}
        {erro && <p className="text-sm text-destructive mt-3">{erro}</p>}

        <div className="mt-6 flex gap-3">
          <button onClick={salvarRascunho} className="border border-luxury-border px-5 py-2 text-sm">
            Salvar rascunho
          </button>
          <button onClick={publicar} className="bg-foreground text-background px-5 py-2 text-sm">
            Publicar
          </button>
        </div>
      </div>
    </section>
  );
};

const SnapshotEditorPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default SnapshotEditorPage;
