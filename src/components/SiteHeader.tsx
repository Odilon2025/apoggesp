import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "A Carreira", path: "/carreira" },
  { label: "Atuação", path: "/atuacao" },
  { label: "Publicações", path: "/publicacoes" },
  { label: "Diversidade", path: "/diversidade" },
  { label: "A APOGESP", path: "/apogesp" },
  { label: "Área do Associado", path: "/area-associado" },
  { label: "Contato", path: "/contato" },
];

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
            >
              <span
                className={`text-[13px] font-sans font-light tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-text-caption hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-caption hover:text-foreground transition-colors duration-300"
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
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-sm font-light tracking-wide border-b border-luxury-border/50 transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-foreground"
                        : "text-text-caption hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
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
