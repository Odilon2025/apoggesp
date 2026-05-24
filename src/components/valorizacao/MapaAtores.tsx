import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Link2, Trash2, X } from "lucide-react";

type No = {
  id: string;
  tipo: string;
  nome: string;
  descricao: string | null;
  criado_por: string;
};

type Conexao = {
  id: string;
  origem_id: string;
  destino_id: string;
  rotulo: string;
  descricao: string | null;
  criado_por: string;
};

const TIPOS: { value: string; label: string; color: string }[] = [
  { value: "prefeito", label: "Prefeito(a)", color: "#c9a84c" },
  { value: "secretario", label: "Secretário(a)", color: "#e8b84a" },
  { value: "vereador", label: "Vereador(a)", color: "#7dd3fc" },
  { value: "parlamentar", label: "Parlamentar", color: "#67e8f9" },
  { value: "orgao", label: "Órgão / Instituição", color: "#a78bfa" },
  { value: "tecnico", label: "Técnico / APPGG", color: "#73ffb8" },
  { value: "midia", label: "Mídia", color: "#fecaca" },
  { value: "sociedade", label: "Sociedade civil", color: "#f9a8a8" },
  { value: "outro", label: "Outro", color: "#94a3b8" },
];

const tipoColor = (tipo: string) => TIPOS.find((t) => t.value === tipo)?.color ?? "#94a3b8";
const tipoLabel = (tipo: string) => TIPOS.find((t) => t.value === tipo)?.label ?? tipo;

const sb = supabase as any;

const MapaAtores = () => {
  const { user } = useAuth();
  const email = user?.email ?? "";
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 560 });

  const [nos, setNos] = useState<No[]>([]);
  const [conexoes, setConexoes] = useState<Conexao[]>([]);
  const [selected, setSelected] = useState<No | null>(null);
  const [filterTipo, setFilterTipo] = useState<string>("all");

  const [openNo, setOpenNo] = useState(false);
  const [openConn, setOpenConn] = useState(false);
  const [connFrom, setConnFrom] = useState<No | null>(null);

  // Form states
  const [fNome, setFNome] = useState("");
  const [fTipo, setFTipo] = useState("prefeito");
  const [fDesc, setFDesc] = useState("");
  const [cDestino, setCDestino] = useState<string>("");
  const [cRotulo, setCRotulo] = useState("");
  const [cDesc, setCDesc] = useState("");

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.clientWidth, h: Math.max(480, Math.min(720, el.clientWidth * 0.6)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fetchAll = useCallback(async () => {
    const [{ data: n }, { data: c }] = await Promise.all([
      sb.from("mapa_atores_nos").select("*").order("created_at", { ascending: true }),
      sb.from("mapa_atores_conexoes").select("*").order("created_at", { ascending: true }),
    ]);
    setNos((n ?? []) as No[]);
    setConexoes((c ?? []) as Conexao[]);
  }, []);

  useEffect(() => {
    fetchAll();
    const ch = supabase
      .channel("mapa-atores")
      .on("postgres_changes", { event: "*", schema: "public", table: "mapa_atores_nos" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "mapa_atores_conexoes" }, fetchAll)
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [fetchAll]);

  const graphData = useMemo(() => {
    const visible = filterTipo === "all" ? nos : nos.filter((n) => n.tipo === filterTipo);
    const ids = new Set(visible.map((n) => n.id));
    return {
      nodes: visible.map((n) => ({
        id: n.id,
        name: n.nome,
        tipo: n.tipo,
        color: tipoColor(n.tipo),
        val: 4 + conexoes.filter((c) => c.origem_id === n.id || c.destino_id === n.id).length * 1.5,
      })),
      links: conexoes
        .filter((c) => ids.has(c.origem_id) && ids.has(c.destino_id))
        .map((c) => ({ source: c.origem_id, target: c.destino_id, label: c.rotulo, id: c.id })),
    };
  }, [nos, conexoes, filterTipo]);

  const handleAddNo = async () => {
    if (!fNome.trim() || !email) return;
    const { error } = await sb.from("mapa_atores_nos").insert({
      nome: fNome.trim(),
      tipo: fTipo,
      descricao: fDesc.trim() || null,
      criado_por: email,
    });
    if (error) {
      toast.error("Erro ao adicionar ator", { description: error.message });
      return;
    }
    toast.success("Ator adicionado");
    setFNome("");
    setFDesc("");
    setOpenNo(false);
  };

  const handleAddConn = async () => {
    if (!connFrom || !cDestino || !cRotulo.trim() || !email) return;
    const { error } = await sb.from("mapa_atores_conexoes").insert({
      origem_id: connFrom.id,
      destino_id: cDestino,
      rotulo: cRotulo.trim(),
      descricao: cDesc.trim() || null,
      criado_por: email,
    });
    if (error) {
      toast.error("Erro ao criar conexão", { description: error.message });
      return;
    }
    toast.success("Conexão criada");
    setCRotulo("");
    setCDesc("");
    setCDestino("");
    setOpenConn(false);
  };

  const handleDeleteNo = async (id: string) => {
    if (!confirm("Remover este ator e todas as suas conexões?")) return;
    const { error } = await sb.from("mapa_atores_nos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setSelected(null);
    toast.success("Ator removido");
  };

  const handleDeleteConn = async (id: string) => {
    const { error } = await sb.from("mapa_atores_conexoes").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Conexão removida");
  };

  const selectedConns = useMemo(
    () =>
      selected
        ? conexoes
            .filter((c) => c.origem_id === selected.id || c.destino_id === selected.id)
            .map((c) => {
              const outroId = c.origem_id === selected.id ? c.destino_id : c.origem_id;
              const outro = nos.find((n) => n.id === outroId);
              const direcao = c.origem_id === selected.id ? "→" : "←";
              return { c, outro, direcao };
            })
        : [],
    [selected, conexoes, nos],
  );

  return (
    <div className="space-y-6">
      {/* Header / actions */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-luxury-border pb-6">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gold mb-2">Inteligência coletiva</p>
          <h3 className="text-2xl font-display text-foreground">Mapa de atores</h3>
          <p className="text-sm font-light text-text-caption mt-2 max-w-xl">
            Construa coletivamente a teia de atores, decisões e relações estratégicas para a valorização da carreira.
            Clique em qualquer nó para inspecionar; arraste para reorganizar; conecte com clique direito ou pelo painel lateral.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger className="w-44 h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {TIPOS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={() => setOpenNo(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Adicionar ator
          </Button>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-3">
        {TIPOS.map((t) => (
          <div key={t.value} className="flex items-center gap-2 text-[11px] font-light text-text-caption">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
            {t.label}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Grafo */}
        <div
          ref={containerRef}
          className="relative bg-background border border-luxury-border rounded-sm overflow-hidden"
          style={{ minHeight: 480 }}
        >
          {nos.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="text-sm font-light text-text-caption max-w-sm">
                O mapa está vazio. Comece adicionando atores-chave (prefeito, secretários, parlamentares, órgãos).
              </p>
              <Button onClick={() => setOpenNo(true)} className="mt-4 gap-2" size="sm">
                <Plus className="w-4 h-4" /> Primeiro ator
              </Button>
            </div>
          ) : (
            <ForceGraph2D
              ref={fgRef as any}
              graphData={graphData}
              width={dims.w}
              height={dims.h}
              backgroundColor="hsl(var(--background))"
              nodeRelSize={5}
              nodeLabel={(n: any) => `${n.name} — ${tipoLabel(n.tipo)}`}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name as string;
                const fontSize = 11 / globalScale;
                const r = Math.sqrt(node.val) * 2.2;
                ctx.beginPath();
                ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color;
                ctx.globalAlpha = selected && selected.id !== node.id ? 0.35 : 1;
                ctx.fill();
                if (selected?.id === node.id) {
                  ctx.lineWidth = 2 / globalScale;
                  ctx.strokeStyle = "#ffffff";
                  ctx.stroke();
                }
                ctx.globalAlpha = 1;
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillStyle = "hsl(var(--foreground))";
                ctx.fillText(label, node.x, node.y + r + 2);
              }}
              linkColor={() => "rgba(201, 168, 76, 0.45)"}
              linkWidth={1.2}
              linkDirectionalArrowLength={4}
              linkDirectionalArrowRelPos={1}
              linkLabel={(l: any) => l.label}
              linkCanvasObjectMode={() => "after"}
              linkCanvasObject={(link: any, ctx, globalScale) => {
                if (globalScale < 1.5) return;
                const start = link.source;
                const end = link.target;
                if (typeof start !== "object" || typeof end !== "object") return;
                const mx = (start.x + end.x) / 2;
                const my = (start.y + end.y) / 2;
                const fontSize = 9 / globalScale;
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = "hsl(var(--muted-foreground))";
                ctx.textAlign = "center";
                ctx.fillText(link.label, mx, my);
              }}
              cooldownTicks={120}
              onNodeClick={(node: any) => {
                const real = nos.find((n) => n.id === node.id) ?? null;
                setSelected(real);
              }}
              onBackgroundClick={() => setSelected(null)}
            />
          )}
        </div>

        {/* Painel lateral */}
        <aside className="bg-background border border-luxury-border rounded-sm p-5 min-h-[480px]">
          {!selected ? (
            <div className="text-xs font-light text-text-caption space-y-3">
              <p className="text-[10px] font-sans tracking-luxury uppercase text-gold">Painel</p>
              <p>Selecione um ator no grafo para ver detalhes e conexões.</p>
              <div className="pt-4 border-t border-luxury-border text-[11px] space-y-1">
                <div className="flex justify-between"><span>Atores</span><span className="text-foreground">{nos.length}</span></div>
                <div className="flex justify-between"><span>Conexões</span><span className="text-foreground">{conexoes.length}</span></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">
                    {tipoLabel(selected.tipo)}
                  </p>
                  <h4 className="text-lg font-display text-foreground leading-tight mt-1">{selected.nome}</h4>
                </div>
                <button onClick={() => setSelected(null)} className="text-text-caption hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {selected.descricao && (
                <p className="text-xs font-light text-text-body leading-relaxed">{selected.descricao}</p>
              )}
              <p className="text-[10px] font-sans tracking-luxury uppercase text-text-caption">
                por {selected.criado_por}
              </p>

              <div className="pt-3 border-t border-luxury-border">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setConnFrom(selected);
                    setOpenConn(true);
                  }}
                >
                  <Link2 className="w-3.5 h-3.5" /> Conectar a outro ator
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-sans tracking-luxury uppercase text-gold">
                  Conexões ({selectedConns.length})
                </p>
                {selectedConns.length === 0 && (
                  <p className="text-xs font-light text-text-caption">Nenhuma conexão ainda.</p>
                )}
                {selectedConns.map(({ c, outro, direcao }) => (
                  <div key={c.id} className="border border-luxury-border p-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-light text-foreground">
                        {direcao} {outro?.nome ?? "—"}
                      </span>
                      {c.criado_por === email && (
                        <button
                          onClick={() => handleDeleteConn(c.id)}
                          className="text-text-caption hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] tracking-luxury uppercase text-gold">{c.rotulo}</p>
                    {c.descricao && <p className="text-text-caption font-light">{c.descricao}</p>}
                  </div>
                ))}
              </div>

              {selected.criado_por === email && (
                <button
                  onClick={() => handleDeleteNo(selected.id)}
                  className="w-full text-[10px] tracking-luxury uppercase text-destructive/80 hover:text-destructive border border-destructive/30 hover:border-destructive py-2 transition-colors"
                >
                  Remover ator
                </button>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Dialog: novo ator */}
      <Dialog open={openNo} onOpenChange={setOpenNo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Novo ator</DialogTitle>
            <DialogDescription>Adicione um ator-chave ao mapa colaborativo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Nome</Label>
              <Input value={fNome} onChange={(e) => setFNome(e.target.value)} placeholder="Ex.: Ricardo Nunes" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Tipo</Label>
              <Select value={fTipo} onValueChange={setFTipo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIPOS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Descrição (opcional)</Label>
              <Textarea
                value={fDesc}
                onChange={(e) => setFDesc(e.target.value)}
                placeholder="Cargo, contexto, posicionamento conhecido…"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenNo(false)}>Cancelar</Button>
            <Button onClick={handleAddNo} disabled={!fNome.trim()}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: nova conexão */}
      <Dialog open={openConn} onOpenChange={setOpenConn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Nova conexão</DialogTitle>
            <DialogDescription>
              {connFrom ? <>De <strong className="text-foreground">{connFrom.nome}</strong> para…</> : null}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Para qual ator</Label>
              <Select value={cDestino} onValueChange={setCDestino}>
                <SelectTrigger><SelectValue placeholder="Selecione…" /></SelectTrigger>
                <SelectContent>
                  {nos
                    .filter((n) => n.id !== connFrom?.id)
                    .map((n) => (
                      <SelectItem key={n.id} value={n.id}>{n.nome} ({tipoLabel(n.tipo)})</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Ação / relação</Label>
              <Input
                value={cRotulo}
                onChange={(e) => setCRotulo(e.target.value)}
                placeholder="Ex.: nomeia, articula com, é aliado, financia…"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Detalhes (opcional)</Label>
              <Textarea
                value={cDesc}
                onChange={(e) => setCDesc(e.target.value)}
                placeholder="Contexto, datas, fonte…"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenConn(false)}>Cancelar</Button>
            <Button onClick={handleAddConn} disabled={!cDestino || !cRotulo.trim()}>Conectar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapaAtores;
