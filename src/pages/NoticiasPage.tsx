import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import NoticiaCard from "@/components/NoticiaCard";
import { Noticia, listPublicadas } from "@/lib/noticias";

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState<Noticia[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Notícias — APOGESP";
    listPublicadas(50)
      .then(setNoticias)
      .catch((e) => setErro(e.message));
  }, []);

  return (
    <PageLayout>
      <PageHero
        label="Comunicados"
        title="Notícias"
        subtitle="Acompanhe as comunicações institucionais da APOGESP."
      />
      <section className="py-20 md:py-24 bg-card">
        <div className="container">
          {erro && (
            <p className="text-sm text-destructive font-light">Erro ao carregar: {erro}</p>
          )}
          {noticias && noticias.length === 0 && (
            <p className="text-sm font-light text-text-body">Nenhuma notícia publicada até o momento.</p>
          )}
          {noticias && noticias.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 max-w-5xl">
              {noticias.map((n, i) => (
                <FadeIn key={n.id} delay={i * 0.04}>
                  <NoticiaCard noticia={n} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default NoticiasPage;
