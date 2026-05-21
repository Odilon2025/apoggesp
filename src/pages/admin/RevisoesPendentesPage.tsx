import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { AdminGuard } from "./AdminGuard";
import { CmsNota, listAbertas } from "@/lib/notas";

function linkFor(n: CmsNota): { to: string; label: string } {
  if (n.escopo === "page_field") {
    // alvo é a key do campo; pagina é o prefixo antes do primeiro "."
    const pagina = n.alvo.split(".")[0] || n.alvo;
    return { to: `/admin/conteudo/${encodeURIComponent(pagina)}`, label: `Textos · ${pagina} · ${n.alvo}` };
  }
  if (n.escopo === "cms_item") {
    const [tabela] = n.alvo.split(":");
    return { to: `/admin/dados/${tabela}`, label: `${tabela}${n.campo ? ` · ${n.campo}` : ""}` };
  }
  if (n.escopo === "snapshot") {
    return { to: `/admin/dados/snapshot_carreira`, label: "Snapshot da carreira" };
  }
  if (n.escopo === "noticia") {
    return { to: `/admin/noticias/${n.alvo}`, label: `Notícia · ${n.alvo_label ?? n.alvo}` };
  }
  return { to: "/admin", label: n.alvo };
}

const Inner = () => {
  const [notas, setNotas] = useState<CmsNota[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listAbertas()
      .then(setNotas)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-3xl">
        <Link to="/admin" className="text-xs text-text-caption hover:text-foreground">← Painel</Link>
        <h1 className="text-3xl font-display text-foreground mt-3 mb-2">Revisões pendentes</h1>
        <p className="text-xs font-light text-text-caption mb-10">
          Notas de revisão abertas em qualquer conteúdo do site. Clique para abrir o editor correspondente.
        </p>

        {carregando && <p className="text-sm font-light text-text-body">Carregando…</p>}
        {!carregando && notas.length === 0 && (
          <p className="text-sm font-light text-text-caption">Nenhuma nota aberta. Tudo limpo.</p>
        )}

        <div className="space-y-px bg-luxury-border">
          {notas.map((n) => {
            const link = linkFor(n);
            return (
              <Link
                key={n.id}
                to={link.to}
                className="block bg-card p-5 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-luxury text-text-caption">
                    {link.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-luxury text-text-caption">
                    {n.autor_email} · {new Date(n.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-sm font-light text-foreground whitespace-pre-wrap">{n.texto}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RevisoesPendentesPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default RevisoesPendentesPage;
