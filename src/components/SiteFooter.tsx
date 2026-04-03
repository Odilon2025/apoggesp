import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    {/* Thin gold line */}
    <div className="h-px bg-gold/30" />

    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <span className="text-xs font-sans font-medium tracking-luxury uppercase opacity-60">APOGESP</span>
          <p className="mt-6 text-sm font-light leading-relaxed opacity-70 max-w-sm">
            Associação dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo. Uma década fortalecendo a gestão pública da maior cidade da América Latina.
          </p>
          <p className="mt-4 text-xs font-light opacity-40">
            Onde a técnica encontra o compromisso público.
          </p>
        </div>

        {/* Navigation */}
        <div className="md:col-span-3">
          <span className="text-[10px] font-medium tracking-luxury uppercase opacity-40 block mb-6">Navegação</span>
          <ul className="space-y-3">
            {[
              { label: "A Carreira", path: "/carreira" },
              { label: "Atuação", path: "/atuacao" },
              { label: "Planos de Atuação", path: "/planos-atuacao" },
              { label: "Publicações", path: "/publicacoes" },
              { label: "Sustentabilidade", path: "/sustentabilidade" },
              { label: "A APOGESP", path: "/apogesp" },
              { label: "Área do Associado", path: "/area-associado" },
              { label: "Contato", path: "/contato" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <span className="text-[10px] font-medium tracking-luxury uppercase opacity-40 block mb-6">Contato</span>
          <p className="text-sm font-light opacity-60">contato@apogesp.org.br</p>
          <p className="text-sm font-light opacity-60 mt-2">São Paulo — SP, Brasil</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-light opacity-30">
          © {new Date().getFullYear()} APOGESP
        </span>
        <span className="text-[11px] font-light opacity-30">
          Políticas Públicas · Gestão Governamental · São Paulo
        </span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
