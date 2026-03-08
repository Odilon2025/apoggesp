import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
}

const PageHero = ({ title, subtitle, label }: PageHeroProps) => (
  <section className="relative py-24 md:py-32 grain overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
    <div className="container relative z-10">
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-sans font-medium tracking-luxury uppercase text-primary-foreground/40 block mb-6"
        >
          {label}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-5xl lg:text-6xl font-display font-normal text-primary-foreground leading-[1.1] max-w-3xl text-balance"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-base md:text-lg text-primary-foreground/60 font-light max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "2rem" }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-8 h-px bg-gold/60"
      />
    </div>
  </section>
);

export default PageHero;
