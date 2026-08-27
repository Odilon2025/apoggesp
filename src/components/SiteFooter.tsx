import { Link } from "react-router-dom";
import { navItems } from "./SiteHeader";

const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    {/* Thin gold line */}
    <div className="h-px bg-gold/30" />

    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <span className="text-xs font-sans font-medium tracking-luxury uppercase opacity-60">APOGESP</span>
          <p className="mt-6 text-sm font-light leading-relaxed opacity-70 max-w-sm">
            Associação dos Analistas de Políticas Públicas e Gestão Governamental do Município de São Paulo. Uma década fortalecendo a gestão pública da maior cidade da América Latina.
          </p>
          <p className="mt-4 text-xs font-light opacity-40">
            Onde a técnica encontra o compromisso público.
          </p>
        </div>

        {/* Navigation mirroring main menu */}
        <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {navItems
            .filter((item) => item.children)
            .map((item) => (
              <div key={item.label}>
                <span className="text-[10px] font-medium tracking-luxury uppercase opacity-40 block mb-4">
                  {item.label}
                </span>
                <ul className="space-y-3">
                  {item.children!.map((child) => (
                    <li key={child.path + child.label}>
                      <Link
                        to={child.path}
                        className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Associado + Contact */}
        <div className="md:col-span-3">
          <span className="text-[10px] font-medium tracking-luxury uppercase opacity-40 block mb-4">Associados</span>
          <Link
            to="/area-associado"
            className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            Área do associado
          </Link>
          <span className="text-[10px] font-medium tracking-luxury uppercase opacity-40 block mt-8 mb-4">Contato</span>
          <p className="text-sm font-light opacity-60">apogesp@gmail.com</p>
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
