import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "./AdminGuard";

interface PaginaInfo {
  pagina: string;
  total: number;
  rascunhos: number;
}

const Inner = () => {
  const [paginas, setPaginas] = useState<PaginaInfo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("page_fields")
        .select("pagina,tem_rascunho");
      const map = new Map<string, PaginaInfo>();
      for (const r of data ?? []) {
        const cur = map.get(r.pagina) ?? { pagina: r.pagina, total: 0, rascunhos: 0 };
        cur.total++;
        if (r.tem_rascunho) cur.rascunhos++;
        map.set(r.pagina, cur);
      }
      setPaginas([...map.values()].sort((a, b) => a.pagina.localeCompare(b.pagina)));
      setCarregando(false);
    })();
  }, []);

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-4xl">
        <Link to="/admin" className="text-xs text-text-caption hover:text-foreground">← Painel</Link>
        <h1 className="text-3xl font-display text-foreground mt-3 mb-10">Textos das páginas</h1>
        {carregando && <p className="text-sm font-light text-text-body">Carregando…</p>}
        <div className="space-y-px bg-luxury-border">
          {paginas.map((p) => (
            <Link
              key={p.pagina}
              to={`/admin/conteudo/${encodeURIComponent(p.pagina)}`}
              className="block bg-card p-5 hover:bg-card-hover transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-display text-foreground">{p.pagina}</h2>
                  <p className="text-xs font-light text-text-caption mt-1">
                    {p.total} {p.total === 1 ? "campo" : "campos"}
                  </p>
                </div>
                {p.rascunhos > 0 && (
                  <span className="text-[10px] font-medium tracking-luxury uppercase text-destructive">
                    {p.rascunhos} rascunho{p.rascunhos > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConteudoListPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default ConteudoListPage;
