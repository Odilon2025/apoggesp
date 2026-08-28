import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavChild = { label: string; path: string; desc?: string };

type NavItem = {
  label: string;
  path: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "A carreira",
    path: "/carreira",
    children: [
      { label: "Visão geral", path: "/carreira", desc: "História, perfil e atribuições do APPGG" },
      { label: "Marco legal", path: "/carreira#marco-legal", desc: "Lei, decretos e atos normativos da carreira" },
    ],
  },
  {
    label: "Atuação",
    path: "/atuacao",
    children: [
      { label: "Casos de atuação", path: "/atuacao", desc: "Contribuições em políticas e projetos municipais" },
      { label: "Planos de Atuação", path: "/planos-atuacao", desc: "PAI e frentes de trabalho por secretaria" },
    ],
  },
  {
    label: "Conhecimento",
    path: "/publicacoes",
    children: [
      { label: "Publicações", path: "/publicacoes", desc: "Notas técnicas, estudos e documentos" },
      { label: "Observatório das Evasões", path: "/observatorio-evasoes", desc: "Indicadores de saídas, LIP e afastamentos" },
      { label: "Observatório do Estágio Probatório", path: "/observatorio-estagio-probatorio", desc: "Avaliação, riscos psicossociais e garantias" },

      { label: "Links úteis", path: "/links-uteis", desc: "Sistemas, dados abertos e legislação" },
    ],
  },
  {
    label: "Pautas",
    path: "/campanha-salarial",
    children: [
      { label: "Valorização e remuneração", path: "/campanha-salarial", desc: "Dados e argumentos pela recomposição" },
      { label: "Nomeações", path: "/campanha-nomeacao", desc: "Reconhecimento institucional da nomeação dos aprovados" },
    ],
  },
  {
    label: "A associação",
    path: "/apogesp",
    children: [
      { label: "Sobre a APOGESP", path: "/apogesp", desc: "Missão, diretoria e estatuto" },
      { label: "Sustentabilidade", path: "/sustentabilidade", desc: "Compromissos ambientais e ESG público" },
      { label: "Contato", path: "/contato", desc: "Canais oficiais de comunicação" },
    ],
  },
  {
    label: "Área do associado",
    path: "/area-associado",
  },
];

const basePath = (p: string) => p.split("#")[0];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const isGroupActive = (item: NavItem) =>
    basePath(item.path) === location.pathname ||
    (item.children ?? []).some((c) => basePath(c.path) === location.pathname);

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
        <nav ref={navRef} aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isGroupActive(item);
            const expanded = openGroup === item.label;

            if (!item.children) {
              return (
                <div key={item.label} className="relative">
                  <Link
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className="flex items-center gap-1 py-2"
                  >
                    <span
                      className={`text-[13px] font-sans tracking-wide transition-colors duration-300 ${
                        active ? "text-foreground font-normal" : "text-text-body hover:text-foreground font-light"
                      }`}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </Link>
                </div>
              );
            }

            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGroup(expanded ? null : item.label)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpenGroup(item.label);
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={expanded}
                  className="flex items-center gap-1 py-2"
                >
                  <span
                    className={`text-[13px] font-sans tracking-wide transition-colors duration-300 ${
                      active ? "text-foreground font-normal" : "text-text-body hover:text-foreground font-light"
                    }`}
                  >
                    {item.label}
                  </span>
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={`text-text-caption transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  />
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute top-full pt-3 z-50 w-[320px] ${
                        item.label === "A associação" ? "right-0" : "left-0"
                      }`}
                    >
                      <div className="bg-card border border-luxury-border shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)] py-2">
                        <div className="px-5 pb-2 mb-1 border-b border-luxury-border/60">
                          <span className="text-[10px] font-sans uppercase tracking-luxury text-text-caption">
                            {item.label}
                          </span>
                        </div>
                        {item.children.map((child) => {
                          const childActive =
                            location.pathname === basePath(child.path) &&
                            (child.path.includes("#") ? location.hash === `#${child.path.split("#")[1]}` : !location.hash);
                          return (
                            <Link
                              key={child.path + child.label}
                              to={child.path}
                              onClick={() => setOpenGroup(null)}
                              aria-current={childActive ? "page" : undefined}
                              className={`group/item block px-5 py-2.5 transition-colors duration-200 border-l-2 ${
                                childActive
                                  ? "border-gold bg-secondary/60"
                                  : "border-transparent hover:border-gold/50 hover:bg-secondary focus-visible:border-gold/50 focus-visible:bg-secondary"
                              }`}
                            >
                              <span
                                className={`block text-[13px] font-sans font-normal tracking-wide ${
                                  childActive ? "text-foreground" : "text-text-body group-hover/item:text-foreground"
                                }`}
                              >
                                {child.label}
                              </span>
                              {child.desc && (
                                <span className="mt-0.5 block text-[11px] font-light leading-snug text-text-caption">
                                  {child.desc}
                                </span>
                              )}
                            </Link>
                          );
                        })}
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
          aria-controls="mobile-nav"
          className="lg:hidden p-2 text-text-body hover:text-foreground transition-colors duration-300"
        >
          {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navegação principal"
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
                        onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)}
                        aria-expanded={mobileGroup === item.label}
                        className={`w-full flex items-center justify-between py-3 text-sm tracking-wide transition-colors duration-300 ${
                          isGroupActive(item) ? "text-foreground font-normal" : "text-text-body font-light"
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
                            className="overflow-hidden pl-4 pb-2 border-l border-luxury-border/60 ml-1"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path + child.label}
                                to={child.path}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-2.5 transition-colors duration-300 ${
                                  location.pathname === basePath(child.path)
                                    ? "text-foreground"
                                    : "text-text-caption hover:text-foreground"
                                }`}
                              >
                                <span className="block text-sm font-light tracking-wide">{child.label}</span>
                                {child.desc && (
                                  <span className="mt-0.5 block text-[11px] font-light leading-snug text-text-caption/80">
                                    {child.desc}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-sm tracking-wide transition-colors duration-300 ${
                        location.pathname === item.path
                          ? "text-foreground font-normal"
                          : "text-text-body font-light hover:text-foreground"
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
