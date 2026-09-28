import Link from "next/link";
import { Info } from "lucide-react";
import { DISCLAIMER_EXTENDED, DISCLAIMER_SHORT } from "@/lib/legal-copy";
import { routes } from "@/lib/routes";

interface Props {
  compact?: boolean;
  /** Solo la frase corta (calculadoras, resultados). */
  short?: boolean;
}

export function LegalDisclaimer({ compact, short }: Props) {
  const text = short ? DISCLAIMER_SHORT : DISCLAIMER_EXTENDED;

  return (
    <aside
      className={`flex gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] ${
        compact ? "p-3 text-xs" : "p-4 text-sm"
      }`}
      role="note"
      aria-label="Aviso legal"
    >
      <Info
        className="mt-0.5 shrink-0 text-[var(--accent)]"
        size={compact ? 14 : 16}
        strokeWidth={2}
        aria-hidden
      />
      <p className="leading-relaxed text-[var(--muted)]">
        {text}{" "}
        {!short && (
          <Link
            href={routes.aviso}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Ver fuentes
          </Link>
        )}
      </p>
    </aside>
  );
}
