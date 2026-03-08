interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => (
  <section className="py-16 md:py-20" style={{ background: "var(--hero-gradient)" }}>
    <div className="container">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageHero;
