import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setErro(error.message);
    else {
      setOk(true);
      setTimeout(() => navigate("/admin/noticias"), 1500);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center py-20 bg-section-alt">
        <form onSubmit={submit} className="w-full max-w-sm bg-card p-10 border border-luxury-border space-y-5">
          <h1 className="text-2xl font-display font-normal text-foreground">Nova senha</h1>
          <div>
            <label className="text-[10px] font-medium tracking-luxury uppercase text-text-caption block mb-2">Senha</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light focus:outline-none focus:border-gold"
            />
          </div>
          {erro && <p className="text-xs font-light text-destructive">{erro}</p>}
          {ok && <p className="text-xs font-light text-accent">Senha atualizada. Redirecionando…</p>}
          <button
            type="submit"
            className="w-full bg-foreground text-background py-2.5 text-sm font-light hover:bg-accent transition-colors duration-300"
          >
            Atualizar senha
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default ResetPasswordPage;
