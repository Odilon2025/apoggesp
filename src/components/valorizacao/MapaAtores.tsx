import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3-force";
import { select } from "d3-selection";
import { drag } from "d3-drag";
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
  sentimento: number;
  criado_por: string;
};

type SimNode = d3.SimulationNodeDatum & {
  id: string;
  name: string;
  tipo: string;
  color: string;
  sentSum: number;
  radius: number;
};

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  id: string;
  label: string;
  sentimento: number;
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

const COLOR_POS = "#5ec27a";
const COLOR_NEU = "#e8c547";
const COLOR_NEG = "#d65a5a";
const COLOR_VOID = "#6b7280";

const sentimentColor = (sum: number, hasConn: boolean) => {
  if (!hasConn) return COLOR_VOID;
  if (sum > 0) return COLOR_POS;
  if (sum < 0) return COLOR_NEG;
  return COLOR_NEU;
};

const linkStroke = (s: number) => {
  if (s > 0) return "rgba(94, 194, 122, 0.7)";
  if (s < 0) return "rgba(214, 90, 90, 0.7)";
  return "rgba(232, 197, 71, 0.6)";
};

const sb = supabase as any;

const MapaAtores = () => {
  const { user } = useAuth();
  const email = user?.email ?? "";
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 560 });

  const [nos, setNos] = useState<No[]>([]);
  const [conexoes, setConexoes] = useState<Conexao[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterTipo, setFilterTipo] = useState<string>("all");

  const [openNo, setOpenNo] = useState(false);
  const [openConn, setOpenConn] = useState(false);
  const [connFrom, setConnFrom] = useState<No | null>(null);

  const [fNome, setFNome] = useState("");
  const [fTipo, setFTipo] = useState("prefeito");
  const [fDesc, setFDesc] = useState("");
  const [cDestino, setCDestino] = useState<string>("");
  const [cRotulo, setCRotulo] = useState("");
  const [cDesc, setCDesc] = useState("");
  const [cSent, setCSent] = useState<number>(0);

  // Responsive dims
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => {
      const w = el.clientWidth || 600;
      setDims({ w, h: Math.max(480, Math.min(720, w * 0.7)) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fetch + realtime
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

  // Sentiment aggregation
  const sentimentByNode = useMemo(() => {
    const map = new Map<string, { sum: number; count: number }>();
    for (const n of nos) map.set(n.id, { sum: 0, count: 0 });
    for (const c of conexoes) {
      const s = Number(c.sentimento ?? 0);
      const a = map.get(c.origem_id);
      const b = map.get(c.destino_id);
      if (a) { a.sum += s; a.count += 1; }
      if (b) { b.sum += s; b.count += 1; }
    }
    return map;
  }, [nos, conexoes]);

  // Build sim data (filtered)
  const { simNodes, simLinks } = useMemo(() => {
    const visible = filterTipo === "all" ? nos : nos.filter((n) => n.tipo === filterTipo);
    const ids = new Set(visible.map((n) => n.id));
    const nodes: SimNode[] = visible.map((n) => {
      const s = sentimentByNode.get(n.id) ?? { sum: 0, count: 0 };
      return {
        id: n.id,
        name: n.nome,
        tipo: n.tipo,
        color: sentimentColor(s.sum, s.count > 0),
        sentSum: s.sum,
        radius: 8 + Math.min(14, s.count * 2),
      };
    });
    const links: SimLink[] = conexoes
      .filter((c) => ids.has(c.origem_id) && ids.has(c.destino_id))
      .map((c) => ({
        id: c.id,
        source: c.origem_id,
        target: c.destino_id,
        label: c.rotulo,
        sentimento: Number(c.sentimento ?? 0),
      }));
    return { simNodes: nodes, simLinks: links };
  }, [nos, conexoes, filterTipo, sentimentByNode]);

  // Simulation
  const simRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const nodesStateRef = useRef<SimNode[]>([]);
  const linksStateRef = useRef<SimLink[]>([]);
  const [, force] = useState(0);
  const tick = useCallback(() => force((x) => (x + 1) % 1000000), []);

  // Preserve positions across data updates
  useEffect(() => {
    const prev = new Map(nodesStateRef.current.map((n) => [n.id, n]));
    const next = simNodes.map((n) => {
      const p = prev.get(n.id);
      return p
        ? { ...n, x: p.x, y: p.y, vx: p.vx, vy: p.vy, fx: p.fx, fy: p.fy }
        : { ...n, x: dims.w / 2 + (Math.random() - 0.5) * 120, y: dims.h / 2 + (Math.random() - 0.5) * 120 };
    });
    nodesStateRef.current = next;
    linksStateRef.current = simLinks.map((l) => ({ ...l }));

    if (simRef.current) simRef.current.stop();

    const sim = d3
      .forceSimulation<SimNode>(nodesStateRef.current)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(linksStateRef.current)
          .id((d) => d.id)
          .distance(110)
          .strength(0.4),
      )
      .force("charge", d3.forceManyBody<SimNode>().strength(-260))
      .force("center", d3.forceCenter(dims.w / 2, dims.h / 2))
      .force("collide", d3.forceCollide<SimNode>((d) => d.radius + 6))
      .alpha(0.8)
      .alphaDecay(0.04)
      .on("tick", tick);

    simRef.current = sim;
    return () => {
      sim.stop();
    };
  }, [simNodes, simLinks, dims.w, dims.h, tick]);

  // Drag behavior
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    const dragBehavior = drag<SVGGElement, SimNode>()
      .on("start", (event, d) => {
        if (!event.active) simRef.current?.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simRef.current?.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    svg.selectAll<SVGGElement, SimNode>("g.node").call(dragBehavior as any);
  });

  const handleAddNo = async () => {
    if (!fNome.trim() || !email) return;
    const { error } = await sb.from("mapa_atores_nos").insert({
      nome: fNome.trim(),
      tipo: fTipo,
      descricao: fDesc.trim() || null,
      criado_por: email,
    });
    if (error) return toast.error("Erro ao adicionar ator", { description: error.message });
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
    if (error) return toast.error("Erro ao criar conexão", { description: error.message });
    toast.success("Conexão criada");
    setCRotulo("");
    setCDesc("");
    setCDestino("");
    setCSent(0);
    setOpenConn(false);
  };

  const handleDeleteNo = async (id: string) => {
    if (!confirm("Remover este ator e todas as suas conexões?")) return;
    await sb.from("mapa_atores_conexoes").delete().or(`origem_id.eq.${id},destino_id.eq.${id}`);
    const { error } = await sb.from("mapa_atores_nos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setSelectedId(null);
    toast.success("Ator removido");
  };

  const handleDeleteConn = async (id: string) => {
    const { error } = await sb.from("mapa_atores_conexoes").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Conexão removida");
  };

  const selected = useMemo(() => nos.find((n) => n.id === selectedId) ?? null, [nos, selectedId]);
  const selectedSent = selected ? sentimentByNode.get(selected.id) ?? { sum: 0, count: 0 } : null;
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

  const renderNodes = nodesStateRef.current;
  const renderLinks = linksStateRef.current;

  return (
    <div className="space-y-6">
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
        <div
          ref={containerRef}
          className="relative bg-[#0a0a0a] border border-luxury-border rounded-sm overflow-hidden"
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
            <svg
              ref={svgRef}
              width={dims.w}
              height={dims.h}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedId(null);
              }}
              style={{ display: "block", cursor: "grab" }}
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 -5 10 10"
                  refX="14"
                  refY="0"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,-5L10,0L0,5" fill="#999" />
                </marker>
              </defs>
              <g>
                {renderLinks.map((l) => {
                  const s = l.source as SimNode;
                  const t = l.target as SimNode;
                  if (!s || !t || s.x == null || t.x == null) return null;
                  const mx = (s.x + t.x) / 2;
                  const my = (s.y! + t.y!) / 2;
                  return (
                    <g key={l.id}>
                      <line
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={linkStroke(l.sentimento)}
                        strokeWidth={1.4}
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x={mx}
                        y={my - 2}
                        textAnchor="middle"
                        fill="#a3a3a3"
                        fontSize={9}
                        style={{ pointerEvents: "none", fontFamily: "Inter, sans-serif" }}
                      >
                        {l.label}
                      </text>
                    </g>
                  );
                })}
              </g>
              <g>
                {renderNodes.map((n) => {
                  if (n.x == null || n.y == null) return null;
                  const isSel = selectedId === n.id;
                  return (
                    <g
                      key={n.id}
                      className="node"
                      transform={`translate(${n.x},${n.y})`}
                      style={{ cursor: "pointer", opacity: selectedId && !isSel ? 0.4 : 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(n.id);
                      }}
                    >
                      <circle
                        r={n.radius}
                        fill={n.color}
                        stroke={isSel ? "#ffffff" : "rgba(255,255,255,0.15)"}
                        strokeWidth={isSel ? 2 : 1}
                      />
                      <text
                        y={n.radius + 12}
                        textAnchor="middle"
                        fill="#e5e5e5"
                        fontSize={11}
                        style={{ pointerEvents: "none", fontFamily: "Inter, sans-serif" }}
                      >
                        {n.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          )}
        </div>

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
                <button onClick={() => setSelectedId(null)} className="text-text-caption hover:text-foreground">
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

              <div className="pt-3 border-t border-luxury-border space-y-2">
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
                {(selected.criado_por === email) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteNo(selected.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remover ator
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-sans tracking-luxury uppercase text-gold">
                  Conexões ({selectedConns.length})
                </p>
                {selectedConns.length === 0 && (
                  <p className="text-[11px] font-light text-text-caption">Nenhuma conexão registrada.</p>
                )}
                {selectedConns.map(({ c, outro, direcao }) => (
                  <div key={c.id} className="border border-luxury-border p-2 text-[11px] space-y-1"
                    style={{ borderLeft: `3px solid ${linkStroke(c.sentimento).replace("0.7", "1").replace("0.6", "1")}` }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-foreground">{direcao} {outro?.nome ?? "—"}</span>
                        <div className="text-text-caption mt-0.5">{c.rotulo}</div>
                      </div>
                      {c.criado_por === email && (
                        <button
                          onClick={() => handleDeleteConn(c.id)}
                          className="text-text-caption hover:text-destructive"
                          aria-label="Remover conexão"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Dialog: novo ator */}
      <Dialog open={openNo} onOpenChange={setOpenNo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar ator</DialogTitle>
            <DialogDescription>
              Cadastre um ator estratégico — pessoa, órgão ou instituição relevante para a carreira.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs">Nome</Label>
              <Input value={fNome} onChange={(e) => setFNome(e.target.value)} placeholder="Ex.: Prefeito Ricardo Nunes" />
            </div>
            <div>
              <Label className="text-xs">Tipo</Label>
              <Select value={fTipo} onValueChange={setFTipo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIPOS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Descrição (opcional)</Label>
              <Textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNo(false)}>Cancelar</Button>
            <Button onClick={handleAddNo} disabled={!fNome.trim() || !email}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: nova conexão */}
      <Dialog open={openConn} onOpenChange={setOpenConn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova conexão</DialogTitle>
            <DialogDescription>
              {connFrom ? <>De <strong>{connFrom.nome}</strong> → escolha o destino e a ação.</> : "Escolha origem e destino."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs">Destino</Label>
              <Select value={cDestino} onValueChange={setCDestino}>
                <SelectTrigger><SelectValue placeholder="Selecione um ator" /></SelectTrigger>
                <SelectContent>
                  {nos.filter((n) => n.id !== connFrom?.id).map((n) => (
                    <SelectItem key={n.id} value={n.id}>{n.nome} — {tipoLabel(n.tipo)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Ação / rótulo</Label>
              <Input value={cRotulo} onChange={(e) => setCRotulo(e.target.value)} placeholder="Ex.: nomeia, articula com, resiste a" />
            </div>
            <div>
              <Label className="text-xs">Sentimento</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setCSent(1)}
                  className={`text-xs py-2 border rounded-sm ${cSent === 1 ? "border-foreground" : "border-luxury-border"}`}
                  style={{ background: cSent === 1 ? COLOR_POS : "transparent", color: cSent === 1 ? "#000" : undefined }}
                >
                  +1 Positiva
                </button>
                <button
                  type="button"
                  onClick={() => setCSent(0)}
                  className={`text-xs py-2 border rounded-sm ${cSent === 0 ? "border-foreground" : "border-luxury-border"}`}
                  style={{ background: cSent === 0 ? COLOR_NEU : "transparent", color: cSent === 0 ? "#000" : undefined }}
                >
                  0 Neutra
                </button>
                <button
                  type="button"
                  onClick={() => setCSent(-1)}
                  className={`text-xs py-2 border rounded-sm ${cSent === -1 ? "border-foreground" : "border-luxury-border"}`}
                  style={{ background: cSent === -1 ? COLOR_NEG : "transparent", color: cSent === -1 ? "#fff" : undefined }}
                >
                  −1 Negativa
                </button>
              </div>
            </div>
            <div>
              <Label className="text-xs">Descrição (opcional)</Label>
              <Textarea value={cDesc} onChange={(e) => setCDesc(e.target.value)} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenConn(false)}>Cancelar</Button>
            <Button onClick={handleAddConn} disabled={!cDestino || !cRotulo.trim() || !email}>Criar conexão</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapaAtores;
