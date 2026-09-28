"use client";

import { useSearchParams } from "next/navigation";

export function PqrsSuccessBanner() {
  const params = useSearchParams();
  if (params.get("enviado") !== "1") return null;

  return (
    <div
      role="status"
      className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300"
    >
      Su mensaje fue recibido. Le responderemos al correo indicado en un plazo
      máximo de 15 días hábiles.
    </div>
  );
}
