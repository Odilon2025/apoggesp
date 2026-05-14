import { ReactNode } from "react";
import { PageFields } from "@/lib/cms";

interface Props {
  fields?: PageFields;
  fieldKey: string;
  fallback: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: (value: string) => ReactNode;
}

/** Renderiza um campo de texto curto vindo do CMS, com fallback para texto hardcoded. */
export default function CMSText({ fields, fieldKey, fallback, as: Tag = "span", className, children }: Props) {
  const value = fields?.[fieldKey]?.value || fallback;
  if (children) return <>{children(value)}</>;
  return <Tag className={className}>{value}</Tag>;
}
