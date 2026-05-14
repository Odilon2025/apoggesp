import ReactMarkdown from "react-markdown";
import { PageFields } from "@/lib/cms";

interface Props {
  fields?: PageFields;
  fieldKey: string;
  fallback: string;
  className?: string;
  /** Se true, renderiza como markdown. Caso contrário renderiza como texto puro (sem parser). */
  markdown?: boolean;
}

/** Renderiza um campo longo (markdown) vindo do CMS, com fallback para texto hardcoded. */
export default function CMSMarkdown({ fields, fieldKey, fallback, className, markdown = true }: Props) {
  const value = fields?.[fieldKey]?.value || fallback;
  if (!markdown) return <p className={className}>{value}</p>;
  return (
    <div className={className}>
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  );
}
