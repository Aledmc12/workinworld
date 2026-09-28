"use client";

import { usePathname } from "next/navigation";
import { LegalNoticeBar } from "@/components/legal/LegalNoticeBar";

/** En inicio el aviso va integrado al hero; en el resto de páginas, bajo el header. */
export function LegalNoticeGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <LegalNoticeBar />;
}
