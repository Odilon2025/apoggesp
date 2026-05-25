import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { Plus, Link2, Trash2, X, Minus, Equal } from "lucide-react";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

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
  sentimento: number;
  criado_por: string;
};

const TIPOS: { value: string; label: string }[] = [
  { value: "prefeito", label: "Prefeito(a)" },
  { value: "secretario", label: "Secretário(a)" },
  { value: "vereador", label: "Vereador(a)" },
  { value: "parlamentar", label: "Parlamentar" },
  { value: "orgao", label: "Órgão / Instituição" },
  { value: "tecnico", label: "Técnico / APPGG" },
  { value: "midia", label: "Mídia" },
  { value: "sociedade", label: "Sociedade civil" },
  { value: "outro", label: "Outro" },
];

const tipoLabel = (tipo: string) => TIPOS.find((t) => t.value === tipo)?.label ?? tipo;

// Sentiment palette (HSL-friendly hex — graph canvas requires literal colors)
const COLOR_POS = "#5ec27a"; // green
const COLOR_NEU = "#e8c547"; // yellow
const COLOR_NEG = "#d65a5a"; // red
const COLOR_VOID = "#6b7280"; // neutral gray (no connections)

const sentimentColor = (sum: number, hasConn: boolean) => {
  if (!hasConn) return COLOR_VOID;
  if (sum > 0) return COLOR_POS;
  if (sum < 0) return COLOR_NEG;
  return COLOR_NEU;
};

const sentimentLinkColor = (s: number) => {
  if (s > 0) return "rgba(94, 194, 122, 0.7)";
  if (s < 0) return "rgba(214, 90, 90, 0.7)";
  return "rgba(232, 197, 71, 0.6)";
};

const sb = supabase as any;

const MapaAtores = () => {
  const { user } = useAuth();
  const email = user?.email ?? "";
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
  const [cSent, setCSent] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => {
      const w = el.clientWidth || 600;
      setDims({ w, h: Math.max(480, Math.min(720, w * 0.65)) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fetchAll = useCallback(async () => {
    const [{ data: n, error: en }, { data: c, error: ec }] = await Promise.all([
      sb.from("mapa_atores_nos").select("*").order("created_at", { ascending: true }),
      sb.from("mapa_atores_conexoes").select("*").order("created_at", { ascending: true }),
    ]);
    if (en) toast.error("Erro ao carregar atores", { description: en.message });
    if (ec) toast.error("Erro ao carregar conexões", { description: ec.message });
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

  // Compute sentiment sum per node (sum of sentiments across all connections involving it)
  const sentimentByNode = useMemo(() => {
    const map = new Map<string, { sum: number; count: number }>();
    for (const n of nos) map.set(n.id, { sum: 0, count: 0 });
    for (const c of conexoes) {
      const a = map.get(c.origem_id);
      const b = map.get(c.destino_id);
      const s = Number(c.sentimento ?? 0);
      if (a) { a.sum += s; a.count += 1; }
      if (b) { b.sum += s; b.count += 1; }
    }
    return map;
  }, [nos, conexoes]);

  const graphData = useMemo(() => {
    const visible = filterTipo === "all" ? nos : nos.filter((n) => n.tipo === filterTipo);
    const ids = new Set(visible.map((n) => n.id));
    return {
      nodes: visible.map((n) => {
        const sb_ = sentimentByNode.get(n.id) ?? { sum: 0, count: 0 };
        return {
          id: n.id,
          name: n.nome,
          tipo: n.tipo,
          color: sentimentColor(sb_.sum, sb_.count > 0),
          sentSum: sb_.sum,
          val: 4 + sb_.count * 1.5,
        };
      }),
      links: conexoes
        .filter((c) => ids.has(c.origem_id) && ids.has(c.destino_id))
        .map((c) => ({
          source: c.origem_id,
          target: c.destino_id,
          label: c.rotulo,
          sentimento: Number(c.sentimento ?? 0),
          id: c.id,
        })),
    };
  }, [nos, conexoes, filterTipo, sentimentByNode]);

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
      sentimento: cSent,
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
    setCSent(0);
    setOpenConn(false);
  };

  const handleDeleteNo = async (id: string) => {
    if (!confirm("Remover este ator e todas as suas conexões?")) return;
    // delete connections first (no FK cascade defined)
    await sb.from("mapa_atores_conexoes").delete().or(`origem_id.eq.${id},destino_id.eq.${id}`);
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

  const selectedSent = selected ? sentimentByNode.get(selected.id) ?? { sum: 0, count: 0 } : null;

  return (
    <div className="space-y-6">
      {/* Header / actions */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-luxury-border pb-6">
        <div>
          <p className="text-[10px] font-sans tracking-luxury uppercase text-gold mb-2">Inteligência coletiva</p>
          <h3 className="text-2xl font-display text-foreground">Mapa de atores</h3>
          <p className="text-sm font-light text-text-caption mt-2 max-w-xl">
            Construa coletivamente a teia de atores, ações e relações estratégicas para a valorização da carreira.
            Cada conexão recebe um sinal — positivo, neutro ou negativo — e a cor de cada ator reflete a somatória das
            ações em torno dele.
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

      {/* Legenda sentimento */}
      <div className="flex flex-wrap gap-4 text-[11px] font-light text-text-caption">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLOR_POS }} /> Saldo positivo (aliado)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLOR_NEU }} /> Neutro / ambivalente
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLOR_NEG }} /> Saldo negativo (resistência)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLOR_VOID }} /> Sem ações registradas
        </div>
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
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-xs text-text-caption">
                  Carregando mapa…
                </div>
              }
            >
              <ForceGraph2D
                graphData={graphData}
                width={dims.w}
                height={dims.h}
                backgroundColor="#0a0a0a"
                nodeRelSize={5}
                nodeLabel={(n: any) =>
                  `${n.name} — ${tipoLabel(n.tipo)} (saldo ${n.sentSum > 0 ? "+" : ""}${n.sentSum})`
                }
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                  const label = node.name as string;
                  const fontSize = 11 / globalScale;
                  const r = Math.sqrt(node.val) * 2.4;
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
                  ctx.fillStyle = "#e5e5e5";
                  ctx.fillText(label, node.x, node.y + r + 2);
                }}
                linkColor={(l: any) => sentimentLinkColor(l.sentimento ?? 0)}
                linkWidth={1.4}
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
                  ctx.fillStyle = "#a3a3a3";
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
            </Suspense>
          )}
        </div>

        {/* Painel lateral */}
        <aside className="bg-background border border-luxury-border rounded-sm p-5 min-h-[480px]">
          {!selected ? (
            <div className="text-xs font-light text-text-caption space-y-3">
              <p className="text-[10px] font-sans tracking-luxury uppercase text-gold">Painel</p>
              <p>Selecione um ator no grafo para ver detalhes, ações e conexões.</p>
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

              {selectedSent && (
                <div
                  className="flex items-center justify-between border border-luxury-border px-3 py-2 text-xs"
                  style={{ borderLeft: `3px solid ${sentimentColor(selectedSent.sum, selectedSent.count > 0)}` }}
                >
                  <span className="font-light text-text-caption">Saldo de ações</span>
                  <span className="font-display text-base text-foreground">
                    {selectedSent.sum > 0 ? "+" : ""}{selectedSent.sum}
                  </span>
                </div>
              )}

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
                  <div
                    key={c.id}
                    className="border border-luxury-border p-2.5 text-xs space-y-1"
                    style={{ borderLeft: `3px solid ${sentimentLinkColor(c.sentimento ?? 0).replace(/[\d.]+\)$/, "1)")}` }}
                  >
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
                    <p className="text-[10px] tracking-luxury uppercase text-gold flex items-center gap-1">
                      {c.sentimento > 0 && <Plus className="w-3 h-3" />}
                      {c.sentimento < 0 && <Minus className="w-3 h-3" />}
                      {c.sentimento === 0 && <Equal className="w-3 h-3" />}
                      {c.rotulo}
                    </p>
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
            <DialogTitle className="font-display">Nova ação / conexão</DialogTitle>
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
                placeholder="Ex.: nomeia, articula com, é aliado, vetou, financia…"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-luxury">Tipo da ação</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: 1, label: "Positiva", color: COLOR_POS, icon: Plus },
                  { v: 0, label: "Neutra", color: COLOR_NEU, icon: Equal },
                  { v: -1, label: "Negativa", color: COLOR_NEG, icon: Minus },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const active = cSent === opt.v;
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setCSent(opt.v)}
                      className={`flex flex-col items-center gap-1 border py-3 text-[11px] tracking-luxury uppercase transition-colors ${
                        active
                          ? "border-foreground text-foreground"
                          : "border-luxury-border text-text-caption hover:border-foreground/40"
                      }`}
                      style={active ? { borderColor: opt.color, color: opt.color } : undefined}
                    >
                      <Icon className="w-4 h-4" style={{ color: opt.color }} />
                      {opt.label}
                      <span className="text-[9px] opacity-60">
                        {opt.v > 0 ? "+1" : opt.v < 0 ? "-1" : "0"}
                      </span>
                    </button>
                  );
                })}
              </div>
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
            <Button onClick={handleAddConn} disabled={!cDestino || !cRotulo.trim()}>Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapaAtores;
