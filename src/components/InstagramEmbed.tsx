import { Instagram } from "lucide-react";

export const IG_USER = "apogesp.appggs";
export const IG_URL = `https://www.instagram.com/${IG_USER}/`;

/**
 * Embed oficial do perfil da APOGESP no Instagram.
 * O iframe usa o endpoint /embed/ do próprio Instagram, que não exige chave de API
 * e se atualiza sozinho quando a associação publica.
 */
const InstagramEmbed = ({ className = "" }: { className?: string }) => (
  <figure className={`border border-luxury-border bg-card ${className}`}>
    <div className="h-px bg-gold/40" />
    <iframe
      title="Perfil da APOGESP no Instagram"
      src={`https://www.instagram.com/${IG_USER}/embed/`}
      className="block w-full"
      style={{ height: 520, border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <figcaption className="flex items-center gap-2 border-t border-luxury-border px-4 py-3">
      <Instagram size={13} strokeWidth={1.5} className="text-gold shrink-0" />
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] font-light tracking-wide text-text-body transition-colors duration-300 hover:text-accent"
      >
        Ver perfil completo no Instagram
      </a>
    </figcaption>
  </figure>
);

export default InstagramEmbed;
