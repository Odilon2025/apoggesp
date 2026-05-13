import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Noticia, formatDate } from "@/lib/noticias";

interface Props {
  noticia: Noticia;
}

const NoticiaCard = ({ noticia }: Props) => (
  <Link
    to={`/noticias/${noticia.slug}`}
    className="group block py-6 border-b border-luxury-border"
  >
    <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-3">
      {formatDate(noticia.publicado_em)}
    </span>
    <h3 className="text-lg md:text-xl font-display font-normal text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
      {noticia.titulo}
    </h3>
    <p className="text-sm font-light text-text-body leading-relaxed mt-3 line-clamp-3">
      {noticia.resumo}
    </p>
    <span className="inline-flex items-center gap-2 text-xs font-light text-accent mt-4 group-hover:text-foreground transition-colors duration-300">
      Ler <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
    </span>
  </Link>
);

export default NoticiaCard;
