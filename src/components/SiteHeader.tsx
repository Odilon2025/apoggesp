import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Carreira",
    path: "/carreira",
    children: [
      { label: "O que é a carreira", path: "/carreira" },
      { label: "Observatório de evasões", path: "/observatorio-evasoes" },
    ],
  },
  {
    label: "Atuação",
    path: "/atuacao",
    children: [
      { label: "Casos e órgãos", path: "/atuacao" },
      { label: "Planos de Atuação", path: "/planos-atuacao" },
      { label: "Planos ambientais", path: "/planos-ambientais" },
    ],
  },
  {
    label: "Conhecimento",
    path: "/publicacoes",
    children: [
      { label: "Publicações", path: "/publicacoes" },
      { label: "Notícias", path: "/noticias" },
      { label: "Links úteis", path: "/links-uteis" },
    ],
  },
  {
    label: "Pautas",
    path: "/campanha-salarial",
    children: [
      { label: "Campanha salarial", path: "/campanha-salarial" },
      { label: "Nomeação", path: "/campanha-nomeacao" },
      { label: "Diversidade", path: "/diversidade" },
      { label: "Sustentabilidade", path: "/sustentabilidade" },
    ],
  },
  {
    label: "APOGESP",
    path: "/apogesp",
    children: [
      { label: "Institucional", path: "/apogesp" },
      { label: "Contato", path: "/contato" },
    ],
  },
  { label: "Área do Associado", path: "/area-associado" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isGroupActive = (item: NavItem) =>
    item.path === location.pathname ||
    (item.children ?? []).some((c) => c.path === location.pathname);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-luxury-border shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="text-xs font-sans font-medium tracking-luxury uppercase text-foreground group-hover:text-gold transition-colors duration-300">
            APOGESP
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isGroupActive(item);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Link
                  to={item.path ?? "/"}
                  className="flex items-center gap-1 py-2 group"
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? openGroup === item.label : undefined}
                >
                  <span
                    className={`text-[13px] font-sans font-light tracking-wide transition-colors duration-300 ${
                      active ? "text-foreground" : "text-text-body hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.children && (
                    <ChevronDown
                      size={12}
                      strokeWidth={1.5}
                      className={`text-text-caption transition-transform duration-300 ${
                        openGroup === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-2 z-50 min-w-[220px]"
                    >
                      <div className="bg-card border border-luxury-border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setOpenGroup(null)}
                            className={`block px-5 py-2.5 text-[13px] font-light tracking-wide transition-colors duration-200 hover:bg-secondary ${
                              location.pathname === child.path
                                ? "text-foreground"
                                : "text-text-body hover:text-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 text-text-body hover:text-foreground transition-colors duration-300"
        >
          {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-luxury-border bg-card overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-luxury-border/50"
                >
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileGroup(mobileGroup === item.label ? null : item.label)
                        }
                        aria-expanded={mobileGroup === item.label}
                        className={`w-full flex items-center justify-between py-3 text-sm font-light tracking-wide transition-colors duration-300 ${
                          isGroupActive(item) ? "text-foreground" : "text-text-body"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${
                            mobileGroup === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileGroup === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 pb-2"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-2.5 text-sm font-light tracking-wide transition-colors duration-300 ${
                                  location.pathname === child.path
                                    ? "text-foreground"
                                    : "text-text-caption hover:text-foreground"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path ?? "/"}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-sm font-light tracking-wide transition-colors duration-300 ${
                        location.pathname === item.path
                          ? "text-foreground"
                          : "text-text-body hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
