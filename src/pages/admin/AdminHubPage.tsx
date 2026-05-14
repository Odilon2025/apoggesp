import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { AdminGuard } from "./AdminGuard";

const Inner = () => {
  const { user, signOut } = useAuth();
  const links = [
    { to: "/admin/noticias", titulo: "Notícias", desc: "Criar, editar e publicar notícias do site." },
    { to: "/admin/conteudo", titulo: "Textos das páginas", desc: "Editar títulos, subtítulos e descrições de cada página." },
    { to: "/admin/dados/snapshot_carreira", titulo: "Snapshot da carreira", desc: "Atualizar números, indicadores e gráficos da carreira." },
    { to: "/admin/dados/cronologia_itens", titulo: "Cronologia", desc: "Marcos históricos da carreira." },
    { to: "/admin/dados/atos_normativos_itens", titulo: "Atos normativos", desc: "Lei principal, alterações, anexos e correlações." },
    { to: "/admin/dados/planos_itens", titulo: "Planos estratégicos", desc: "Planos de atuação por órgão." },
    { to: "/admin/dados/publicacoes_itens", titulo: "Publicações", desc: "Lista de publicações exibidas no site." },
    { to: "/admin/dados/atuacao_destaques", titulo: "Destaques de atuação", desc: "Cards de área de atuação na home." },
  ];
  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-normal text-foreground">Painel APOGESP</h1>
            <p className="text-xs font-light text-text-caption mt-1">{user?.email}</p>
          </div>
          <button onClick={signOut} className="text-sm font-light text-text-caption hover:text-foreground transition-colors">
            Sair
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block bg-card p-8 hover:bg-card-hover transition-colors">
              <h2 className="text-lg font-display text-foreground mb-2">{l.titulo}</h2>
              <p className="text-sm font-light text-text-body">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdminHubPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default AdminHubPage;
