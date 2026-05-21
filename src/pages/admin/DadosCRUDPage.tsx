import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { AdminGuard } from "./AdminGuard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { TABELAS } from "./cmsSchemas";
import { clearCmsCache } from "@/lib/cms";
import NotasPanel from "@/components/admin/NotasPanel";

interface Row {
  id: string;
  ordem: number;
  publicado: boolean;
  dados_publicado: any;
  dados_rascunho: any;
  tem_rascunho: boolean;
  deletado: boolean;
}

const Inner = () => {
  const { tabela = "" } = useParams();
  const schema = TABELAS[tabela];
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [editando, setEditando] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>({});
  const [novaOrdem, setNovaOrdem] = useState<number>(0);
  const [carregando, setCarregando] = useState(true);

  if (!schema) {
    return (
      <section className="py-16 bg-card min-h-screen">
        <div className="container max-w-3xl">
          <p className="text-sm text-destructive">Tabela "{tabela}" não reconhecida.</p>
          <Link to="/admin" className="text-sm text-accent">← Voltar</Link>
        </div>
      </section>
    );
  }

  const carregar = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from(schema.table as any)
      .select("*")
      .eq("deletado", false)
      .order("ordem", { ascending: true });
    if (error) toast({ title: "Erro", description: error.message });
    setRows(((data ?? []) as unknown) as Row[]);
    setCarregando(false);
  };

  useEffect(() => {
    carregar();
    setEditando(null);
  }, [tabela]);

  const iniciarEdicao = (r: Row) => {
    setEditando(r.id);
    setDraft(r.dados_rascunho ?? r.dados_publicado ?? {});
  };

  const salvarRascunho = async (id: string) => {
    const { error } = await supabase
      .from(schema.table as any)
      .update({
        dados_rascunho: draft,
        tem_rascunho: true,
        updated_by: user?.email ?? null,
      })
      .eq("id", id);
    if (error) toast({ title: "Erro", description: error.message });
    else {
      toast({ title: "Rascunho salvo" });
      setEditando(null);
      carregar();
    }
  };

  const publicarItem = async (id: string) => {
    const { error } = await supabase.rpc("publish_cms_item", { _table: schema.table, _id: id });
    if (error) toast({ title: "Erro", description: error.message });
    else {
      toast({ title: "Item publicado" });
      clearCmsCache();
      carregar();
    }
  };

  const publicarTudo = async () => {
    if (!confirm("Publicar todos os rascunhos desta tabela?")) return;
    const { error } = await supabase.rpc("publish_cms_all", { _table: schema.table });
    if (error) toast({ title: "Erro", description: error.message });
    else {
      toast({ title: "Todos os rascunhos foram publicados" });
      clearCmsCache();
      carregar();
    }
  };

  const togglePublicado = async (r: Row) => {
    await supabase.from(schema.table as any).update({ publicado: !r.publicado }).eq("id", r.id);
    clearCmsCache();
    carregar();
  };

  const excluir = async (r: Row) => {
    if (!confirm("Excluir este item? Esta ação é permanente.")) return;
    await supabase.from(schema.table as any).delete().eq("id", r.id);
    clearCmsCache();
    carregar();
  };

  const criarNovo = async () => {
    const ordem = novaOrdem || (rows.length ? rows[rows.length - 1].ordem + 10 : 10);
    const dados: any = {};
    for (const c of schema.campos) {
      if (c.type === "number") dados[c.key] = 0;
      else if (c.type === "boolean") dados[c.key] = false;
      else if (c.type === "json") dados[c.key] = [];
      else dados[c.key] = "";
    }
    const { data, error } = await supabase
      .from(schema.table as any)
      .insert({
        ordem,
        publicado: false,
        dados_rascunho: dados,
        tem_rascunho: true,
        updated_by: user?.email ?? null,
      })
      .select()
      .single();
    if (error) toast({ title: "Erro", description: error.message });
    else {
      await carregar();
      iniciarEdicao(data as unknown as Row);
    }
  };

  const renderField = (campo: any) => {
    const val = draft[campo.key] ?? "";
    if (campo.type === "select") {
      return (
        <select
          value={val}
          onChange={(e) => setDraft({ ...draft, [campo.key]: e.target.value })}
          className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light"
        >
          <option value="">—</option>
          {campo.options.map((o: string) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );
    }
    if (campo.type === "boolean") {
      return (
        <label className="flex items-center gap-2 text-sm font-light">
          <input
            type="checkbox"
            checked={!!val}
            onChange={(e) => setDraft({ ...draft, [campo.key]: e.target.checked })}
          />
          Sim
        </label>
      );
    }
    if (campo.type === "json") {
      const text = typeof val === "string" ? val : JSON.stringify(val ?? [], null, 2);
      return (
        <textarea
          value={text}
          rows={campo.rows ?? 6}
          onChange={(e) => {
            const raw = e.target.value;
            try {
              const parsed = JSON.parse(raw);
              setDraft({ ...draft, [campo.key]: parsed });
            } catch {
              setDraft({ ...draft, [campo.key]: raw });
            }
          }}
          className="w-full bg-transparent border border-luxury-border px-3 py-2 text-xs font-mono"
        />
      );
    }
    if (campo.type === "textarea") {
      return (
        <textarea
          value={val}
          rows={campo.rows ?? 3}
          onChange={(e) => setDraft({ ...draft, [campo.key]: e.target.value })}
          className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light"
        />
      );
    }
    if (campo.type === "number") {
      return (
        <input
          type="number"
          value={val}
          onChange={(e) => setDraft({ ...draft, [campo.key]: Number(e.target.value) })}
          className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light"
        />
      );
    }
    return (
      <input
        type={campo.type === "url" ? "url" : "text"}
        value={val}
        onChange={(e) => setDraft({ ...draft, [campo.key]: e.target.value })}
        className="w-full bg-transparent border border-luxury-border px-3 py-2 text-sm font-light"
      />
    );
  };

  const totalRascunhos = rows.filter((r) => r.tem_rascunho).length;

  return (
    <section className="py-16 bg-card min-h-screen">
      <div className="container max-w-4xl">
        <Link to="/admin" className="text-xs text-text-caption hover:text-foreground">← Painel</Link>
        <div className="flex items-end justify-between mt-3 mb-2 flex-wrap gap-3">
          <h1 className="text-3xl font-display text-foreground">{schema.titulo}</h1>
          <div className="flex gap-3">
            {totalRascunhos > 0 && (
              <button onClick={publicarTudo} className="bg-foreground text-background px-4 py-2 text-sm">
                Publicar todos os rascunhos ({totalRascunhos})
              </button>
            )}
          </div>
        </div>
        <p className="text-xs font-light text-text-caption mb-8">{schema.descricao}</p>

        {carregando && <p className="text-sm font-light text-text-body">Carregando…</p>}

        <div className="space-y-px bg-luxury-border">
          {rows.map((r) => {
            const dadosAtuais = r.dados_rascunho ?? r.dados_publicado ?? {};
            const editandoEste = editando === r.id;
            return (
              <div key={r.id} className="bg-card p-5">
                {!editandoEste ? (
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] text-text-caption">#{r.ordem}</span>
                        <span className={`text-[9px] uppercase tracking-luxury ${r.publicado ? "text-accent" : "text-text-caption"}`}>
                          {r.publicado ? "Publicado" : "Oculto"}
                        </span>
                        {r.tem_rascunho && (
                          <span className="text-[9px] uppercase tracking-luxury text-destructive">Rascunho</span>
                        )}
                      </div>
                      <p className="text-sm font-light text-foreground">{schema.resumo(dadosAtuais)}</p>
                    </div>
                    <div className="flex gap-3 text-xs items-center">
                      <NotasPanel
                        escopo="cms_item"
                        alvo={`${schema.table}:${r.id}`}
                        alvoLabel={`${schema.titulo} · ${schema.resumo(dadosAtuais).slice(0, 60)}`}
                      />
                      <button onClick={() => iniciarEdicao(r)} className="text-accent hover:text-foreground">Editar</button>
                      {r.tem_rascunho && (
                        <button onClick={() => publicarItem(r.id)} className="text-accent hover:text-foreground">Publicar</button>
                      )}
                      <button onClick={() => togglePublicado(r)} className="text-text-caption hover:text-foreground">
                        {r.publicado ? "Ocultar" : "Mostrar"}
                      </button>
                      <button onClick={() => excluir(r)} className="text-destructive hover:opacity-70">Excluir</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {schema.campos.map((c) => (
                      <div key={c.key}>
                        <label className="text-[10px] uppercase tracking-luxury text-text-caption block mb-1">
                          {c.label}
                        </label>
                        {renderField(c)}
                      </div>
                    ))}
                    <div className="flex items-center gap-3">
                      <label className="text-[10px] uppercase tracking-luxury text-text-caption">Ordem</label>
                      <input
                        type="number"
                        value={r.ordem}
                        onChange={async (e) => {
                          await supabase.from(schema.table as any).update({ ordem: Number(e.target.value) }).eq("id", r.id);
                          carregar();
                        }}
                        className="w-24 bg-transparent border border-luxury-border px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => salvarRascunho(r.id)} className="bg-foreground text-background px-4 py-2 text-sm">
                        Salvar rascunho
                      </button>
                      <button onClick={() => setEditando(null)} className="text-sm text-text-caption">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-luxury-border pt-8">
          <button onClick={criarNovo} className="bg-foreground text-background px-5 py-2 text-sm">
            + Adicionar item
          </button>
        </div>
      </div>
    </section>
  );
};

const DadosCRUDPage = () => (
  <PageLayout>
    <AdminGuard>
      <Inner />
    </AdminGuard>
  </PageLayout>
);

export default DadosCRUDPage;
