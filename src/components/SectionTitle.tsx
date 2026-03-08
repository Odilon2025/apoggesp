interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className = "" }: SectionTitleProps) => (
  <div className={`mb-8 ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
    <div className="mt-3 h-0.5 w-12 bg-accent rounded-full" />
  </div>
);

export default SectionTitle;
