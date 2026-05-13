import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageLayout from "@/components/PageLayout";
import { AdminGuard } from "./AdminGuard";
import { Noticia, listAll, formatDate } from "@/lib/noticias";

const Inner = () => {
  const { signOut, user } = useAuth();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState(true);

  const recarregar = async () => {
    setCarregando(true);
    try {
      setNoticias(await listAll());
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    recarregar();
  }, []);

  const togglePublicado = async (n: Noticia) => {
    await supabase.from("noticias").update({ publicado: !n.publicado }).eq("id", n.id);
    recarregar();
  };

  const excluir = async (n: Noticia) => {
    if (!confirm(`Excluir "${n.titulo}"?`)) return;
    await supabase.from("noticias").delete().eq("id", n.id);
    recarregar();
  };

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-normal text-foreground">Notícias — Admin</h1>
            <p className="text-xs font-light text-text-caption mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/noticias/nova"
              className="bg-foreground text-background px-5 py-2 text-sm font-light hover:bg-accent transition-colors"
            >
              Nova notícia
            </Link>
            <button onClick={signOut} className="text-sm font-light text-text-caption hover:text-foreground transition-colors">
              Sair
            </button>
          </div>
        </div>

        {carregando && <p className="text-sm font-light text-text-body">Carregando…</p>}
        {!carregando && noticias.length === 0 && (
          <p className="text-sm font-light text-text-body">Nenhuma notícia ainda.</p>
        )}

        <div className="space-y-px bg-luxury-border">
          {noticias.map((n) => (
            <div key={n.id} className="bg-card p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-[9px] font-medium tracking-luxury uppercase ${n.publicado ? "text-accent" : "text-text-caption"}`}>
                    {n.publicado ? "Publicado" : "Rascunho"}
                  </span>
                  <span className="text-[10px] font-light text-text-caption">{formatDate(n.publicado_em)}</span>
                </div>
                <p className="text-sm font-light text-foreground">{n.titulo}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-light">
                <button onClick={() => togglePublicado(n)} className="text-text-caption hover:text-foreground transition-colors">
                  {n.publicado ? "Despublicar" : "Publicar"}
                </button>
                <Link to={`/admin/noticias/${n.id}`} className="text-accent hover:text-foreground transition-colors">
                  Editar
                </Link>
                <button onClick={() => excluir(n)} className="text-destructive hover:opacity-70 transition-opacity">
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NoticiasAdminPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default NoticiasAdminPage;
