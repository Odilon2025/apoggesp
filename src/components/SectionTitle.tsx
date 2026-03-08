import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  center?: boolean;
}

const SectionTitle = ({ title, subtitle, label, className = "", center = false }: SectionTitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`mb-12 ${center ? "text-center" : ""} ${className}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={`text-[10px] font-sans font-medium tracking-luxury uppercase text-text-caption block mb-4 ${center ? "mx-auto" : ""}`}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl md:text-3xl lg:text-4xl font-display font-normal text-text-display leading-tight text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-3 text-sm text-text-body font-light max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "2rem" } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={`mt-5 h-px bg-gold ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
};

export default SectionTitle;
