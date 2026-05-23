import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import CMSMarkdown from "@/components/CMSMarkdown";
import AssociadoLayout from "@/components/AssociadoLayout";
import { usePageFields, useCMSList } from "@/hooks/useCMS";
import { field, getAssociadoAvisos } from "@/lib/cms";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, Megaphone, Users, FileSearch, LogOut, Library } from "lucide-react";

const tipoAccent: Record<string, string> = {
  info: "border-luxury-border",
  alerta: "border-destructive",
  destaque: "border-gold",
};

const cards = [
  { to: "/area-associado/biblioteca", titulo: "Biblioteca da Carreira", desc: "Documentos, materiais e referências.", icon: BookOpen },
  { to: "/area-associado/wiki", titulo: "Wiki da Carreira", desc: "Verbetes comentáveis sobre a carreira APPGG.", icon: Library },
  { to: "/area-associado/valorizacao", titulo: "Valorização e Advocacy", desc: "Campanhas e ações estratégicas em curso.", icon: Megaphone },
  { to: "/area-associado/grupos", titulo: "Grupos de Trabalho", desc: "Espaços colaborativos de construção coletiva.", icon: Users },
  { to: "/area-associado/transparencia", titulo: "Transparência APOGESP", desc: "Atas, prestação de contas e documentos.", icon: FileSearch },
];

const PainelAssociadoPage = () => {
  const { user, signOut } = useAuth();
  const fields = usePageFields("associado_painel");
  const avisos = useCMSList(getAssociadoAvisos, []);

  return (
    <AssociadoLayout
      label={field(fields, "hero_label", "Área do Associado")}
      titulo={field(fields, "hero_titulo", "Painel do Associado")}
      subtitulo={field(fields, "hero_subtitulo", "")}
    >
      <section className="py-20 md:py-28 bg-card">
        <div className="container max-w-5xl">
          <FadeIn>
            <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
              <p className="text-xs font-light text-text-caption">
                Conectado como <span className="text-foreground">{user?.email}</span>
              </p>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 text-[11px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground transition-colors"
              >
                <LogOut size={14} strokeWidth={1.5} /> Sair
              </button>
            </div>
            <CMSMarkdown
              fields={fields}
              fieldKey="intro"
              fallback=""
              className="prose prose-sm prose-neutral max-w-2xl font-light text-text-body leading-relaxed mb-16"
            />
          </FadeIn>

          {avisos.length > 0 && (
            <FadeIn>
              <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">Avisos</h2>
              <div className="space-y-px bg-luxury-border mb-16">
                {avisos.map((a, i) => (
                  <article key={i} className={`bg-card p-6 border-l-2 ${tipoAccent[a.tipo] ?? "border-luxury-border"}`}>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-base font-display text-foreground">{a.titulo}</h3>
                      {a.data && <span className="text-[10px] text-text-caption">{a.data}</span>}
                    </div>
                    <p className="text-sm font-light text-text-body leading-relaxed">{a.texto}</p>
                  </article>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <h2 className="text-[11px] font-sans tracking-luxury uppercase text-text-caption mb-6">Acessar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury-border">
              {cards.map(({ to, titulo, desc, icon: Icon }) => (
                <Link key={to} to={to} className="block bg-card p-8 hover:bg-card-hover transition-colors group">
                  <Icon size={22} strokeWidth={1.25} className="text-gold mb-4" />
                  <h3 className="text-lg font-display text-foreground mb-2 group-hover:text-gold transition-colors">{titulo}</h3>
                  <p className="text-sm font-light text-text-body leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </AssociadoLayout>
  );
};

export default PainelAssociadoPage;
