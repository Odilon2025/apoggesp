import { useEffect, useState } from "react";
import { PageFields, getPageFields } from "@/lib/cms";

/** Hook para buscar campos de uma página. Retorna `undefined` enquanto carrega. */
export function usePageFields(pagina: string): PageFields | undefined {
  const [fields, setFields] = useState<PageFields | undefined>(undefined);
  useEffect(() => {
    let active = true;
    getPageFields(pagina).then((f) => {
      if (active) setFields(f);
    });
    return () => {
      active = false;
    };
  }, [pagina]);
  return fields;
}

/** Hook genérico para uma lista assíncrona com fallback. */
export function useCMSList<T>(loader: () => Promise<T[]>, fallback: T[]): T[] {
  const [items, setItems] = useState<T[]>(fallback);
  useEffect(() => {
    let active = true;
    loader().then((data) => {
      if (active && data && data.length > 0) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);
  return items;
}
