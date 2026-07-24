import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "get_snapshot_carreira",
  title: "Snapshot da carreira APPGG",
  description: "Retorna os números, indicadores e dados demográficos publicados da carreira de APPGG.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase
      .from("snapshot_carreira")
      .select("dados_publicado")
      .eq("id", "current")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data?.dados_publicado ?? null, null, 2) }],
      structuredContent: { snapshot: data?.dados_publicado ?? null },
    };
  },
});
