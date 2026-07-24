import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, ShieldAlert } from "lucide-react";

// Typed wrapper for the beta supabase.auth.oauth namespace.
interface OAuthDetails {
  client?: { name?: string; client_name?: string; redirect_uri?: string } | null;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
}

interface OAuthResult {
  redirect_url?: string;
  redirect_to?: string;
}

const oauth = (supabase.auth as any).oauth as {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthResult | null; error: { message: string } | null }>;
};

const OAuthConsentPage = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Parâmetro authorization_id ausente.");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user.email ?? null);
      if (!oauth?.getAuthorizationDetails) {
        setError("Cliente OAuth indisponível. Atualize a página ou tente novamente mais tarde.");
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => { active = false; };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("O servidor de autorização não retornou uma URL de retorno.");
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "aplicativo externo";
  const scopeString = details?.scope ?? "openid email profile";

  return (
    <PageLayout>
      <PageHero label="Autorização" title="Conectar aplicativo" />
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-xl">
          <div className="p-10 md:p-14 border border-luxury-border">
            {error ? (
              <div className="text-center">
                <ShieldAlert size={24} strokeWidth={1.5} className="text-destructive mx-auto mb-6" />
                <h2 className="text-xl font-display font-normal text-foreground mb-2">Não foi possível continuar</h2>
                <div className="luxury-divider my-6" />
                <p className="text-sm font-light text-text-body">{error}</p>
              </div>
            ) : !details ? (
              <p className="text-sm font-light text-text-body text-center">Carregando pedido de autorização…</p>
            ) : (
              <>
                <CheckCircle2 size={24} strokeWidth={1.5} className="text-gold mx-auto mb-6" />
                <h2 className="text-xl font-display font-normal text-foreground mb-2 text-center">
                  Conectar <span className="text-gold">{clientName}</span> à APOGESP
                </h2>
                <div className="luxury-divider my-6" />
                <p className="text-sm font-light text-text-body leading-relaxed text-center">
                  Isto permite que <strong>{clientName}</strong> use este site como você
                  {userEmail ? <> (<span className="text-foreground">{userEmail}</span>)</> : null}
                  , acessando as ferramentas habilitadas da APOGESP.
                </p>
                <div className="mt-8 text-[11px] font-sans tracking-luxury uppercase text-text-caption text-center">
                  Permissões solicitadas
                </div>
                <p className="text-sm font-light text-text-body text-center mt-2">
                  Compartilhar seu perfil básico e e-mail
                  <br />
                  <span className="text-[11px] text-text-caption">({scopeString})</span>
                </p>
                <p className="text-[11px] font-light text-text-caption text-center mt-6">
                  Isto não contorna as políticas de acesso da APOGESP. O aplicativo só verá o que suas permissões permitirem.
                </p>
                <div className="mt-10 flex flex-col md:flex-row gap-3">
                  <button
                    disabled={busy}
                    onClick={() => decide(true)}
                    className="flex-1 border border-foreground bg-foreground text-background py-3 text-[11px] font-sans tracking-luxury uppercase hover:bg-transparent hover:text-foreground transition-colors duration-300 disabled:opacity-50"
                  >
                    {busy ? "Processando…" : "Aprovar"}
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => decide(false)}
                    className="flex-1 border border-luxury-border py-3 text-[11px] font-sans tracking-luxury uppercase text-text-caption hover:text-foreground hover:border-foreground transition-colors duration-300 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OAuthConsentPage;
