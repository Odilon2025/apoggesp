import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "list_publicacoes",
  title: "Listar publicações",
  description: "Lista as publicações institucionais da APOGESP (estudos, notas técnicas, boletins).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase
      .from("publicacoes_itens")
      .select("dados_publicado,ordem")
      .eq("publicado", true)
      .eq("deletado", false)
      .not("dados_publicado", "is", null)
      .order("ordem", { ascending: true });
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const items = (data ?? []).map((r: any) => r.dados_publicado);
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { publicacoes: items },
    };
  },
});
