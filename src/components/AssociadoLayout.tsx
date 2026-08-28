import { ReactNode } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useAuth } from "@/hooks/useAuth";
import SEO from "@/components/SEO";

const subnav = [
  { to: "/area-associado", label: "Painel", end: true },
  { to: "/area-associado/biblioteca", label: "Biblioteca da Carreira" },
  { to: "/area-associado/wiki", label: "Wiki da Carreira" },
  { to: "/area-associado/valorizacao", label: "Valorização e Advocacy" },
  { to: "/area-associado/grupos", label: "Grupos de Trabalho" },
  { to: "/area-associado/votacoes", label: "Votações ao Vivo" },
  { to: "/area-associado/transparencia", label: "Transparência APOGESP" },
];

interface Props {
  label: string;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}

const AssociadoLayout = ({ label, titulo, subtitulo, children }: Props) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return (
      <PageLayout>
        <PageHero label="Associados" title="Carregando…" />
      </PageLayout>
    );
  }

  if (!user) return <Navigate to="/area-associado" replace />;

  return (
    <PageLayout>
      <SEO
        title={`${titulo} | APOGESP`}
        description={subtitulo || `${titulo} — espaço dos associados da APOGESP.`}
        path={pathname}
      />
      <PageHero label={label} title={titulo} subtitle={subtitulo} />
      <nav className="border-b border-luxury-border bg-card sticky top-0 z-30">
        <div className="container">
          <ul className="flex gap-8 overflow-x-auto py-4 -mx-2 px-2">
            {subnav.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `text-[11px] font-sans tracking-luxury uppercase transition-colors whitespace-nowrap ${
                      isActive ? "text-foreground border-b border-gold pb-1" : "text-text-caption hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {children}
    </PageLayout>
  );
};

export default AssociadoLayout;
