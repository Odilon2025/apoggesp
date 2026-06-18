import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import { Noticia, formatDate, getBySlug } from "@/lib/noticias";

const NoticiaDetalhePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [noticia, setNoticia] = useState<Noticia | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    getBySlug(slug).then((n) => setNoticia(n));
  }, [slug]);

  if (noticia === undefined) {
    return (
      <PageLayout>
        <div className="container py-32 text-center text-sm font-light text-text-caption">Carregando…</div>
      </PageLayout>
    );
  }

  if (noticia === null) {
    return (
      <PageLayout>
        <div className="container py-32 text-center">
          <p className="text-sm font-light text-text-body">Notícia não encontrada.</p>
          <Link to="/noticias" className="inline-flex items-center gap-2 text-sm text-accent mt-6 hover:text-foreground transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} /> Voltar para Notícias
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO
        title={`${noticia.titulo} — APOGESP`}
        description={noticia.resumo.slice(0, 160)}
        path={`/noticias/${noticia.slug ?? slug}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: noticia.titulo,
          description: noticia.resumo,
          datePublished: noticia.publicado_em,
          author: { "@type": "Person", name: noticia.autor },
          image: noticia.capa_url ? [noticia.capa_url] : undefined,
        }}
      />
      <article className="bg-card">
        {noticia.capa_url && (
          <div className="w-full max-h-[500px] overflow-hidden">
            <img src={noticia.capa_url} alt={noticia.titulo} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container py-20 md:py-28 max-w-3xl">
          <FadeIn>
            <Link to="/noticias" className="inline-flex items-center gap-2 text-xs font-light text-text-caption hover:text-foreground transition-colors mb-10">
              <ArrowLeft size={12} strokeWidth={1.5} /> Notícias
            </Link>
            <span className="text-[10px] font-medium tracking-luxury uppercase text-gold block mb-5">
              {formatDate(noticia.publicado_em)}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-normal text-foreground leading-[1.1] text-balance">
              {noticia.titulo}
            </h1>
            <p className="mt-6 text-base md:text-lg font-light text-text-body leading-relaxed">
              {noticia.resumo}
            </p>
            <p className="text-xs font-light text-text-caption mt-4 tracking-wide">
              Por {noticia.autor}
            </p>
            <div className="luxury-divider mt-10 mb-10" />
            <div className="prose-noticia text-base font-light text-text-body leading-relaxed space-y-5">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-display font-normal text-foreground mt-10 mb-4" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-display font-normal text-foreground mt-8 mb-3" {...props} />,
                  p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
                  a: ({ node, ...props }) => <a className="text-accent underline hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-gold pl-5 italic text-text-body" {...props} />,
                }}
              >
                {noticia.conteudo}
              </ReactMarkdown>
            </div>
          </FadeIn>
        </div>
      </article>
    </PageLayout>
  );
};

export default NoticiaDetalhePage;
