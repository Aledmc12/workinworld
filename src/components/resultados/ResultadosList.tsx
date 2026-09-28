"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import {
  eliminarResultado,
  leerResultados,
  type ResultadoGuardado,
} from "@/lib/resultados";
import { formatCOP } from "@/lib/normas";
import { routes } from "@/lib/routes";
import { useTheme } from "@/components/theme/ThemeProvider";

const resultadosListeners = new Set<() => void>();

function emitResultadosChange() {
  resultadosListeners.forEach((listener) => listener());
}

function subscribeResultados(onStoreChange: () => void) {
  resultadosListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("wiw-resultados", onStoreChange);
  return () => {
    resultadosListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("wiw-resultados", onStoreChange);
  };
}

function borrar(id: string) {
  eliminarResultado(id);
  emitResultadosChange();
}

export function ResultadosList() {
  const { consent } = useTheme();
  const resultados = useSyncExternalStore(
    subscribeResultados,
    leerResultados,
    () => [] as ResultadoGuardado[],
  );

  if (!consent) {
    return (
      <p className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
        Acepta las cookies en el banner inferior para guardar y ver tus
        cálculos en este dispositivo.
      </p>
    );
  }

  if (resultados.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">
        <p className="text-sm">Aún no tienes cálculos guardados.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href={routes.liquidacion}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Calcular liquidación
          </Link>
          <Link
            href={routes.indemnizacion}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Calcular indemnización
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {resultados.map((r) => (
        <li
          key={r.id}
          className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
              {r.tipo === "liquidacion" ? "Liquidación" : "Indemnización"}
            </p>
            <p className="font-display text-lg font-semibold">{r.titulo}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{r.resumen}</p>
            <p className="mt-2 font-medium">{formatCOP(r.total)}</p>
            <time className="mt-1 block text-xs text-[var(--muted)]">
              {new Date(r.fecha).toLocaleString("es-CO")}
            </time>
          </div>
          <button
            type="button"
            onClick={() => borrar(r.id)}
            aria-label="Eliminar resultado"
            className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}
