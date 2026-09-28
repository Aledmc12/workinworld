import Link from "next/link";
import { Info } from "lucide-react";
import { DISCLAIMER_SHORT } from "@/lib/legal-copy";
import { routes } from "@/lib/routes";

export function LegalNoticeBar() {
  return (
    <div
      role="note"
      aria-label="Aviso legal"
      className="border-b border-[var(--border)] bg-[var(--surface-2)]/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-2 sm:items-center sm:justify-center sm:text-center">
        <Info
          size={13}
          strokeWidth={2}
          className="mt-0.5 shrink-0 text-[var(--accent)] sm:mt-0"
          aria-hidden
        />
        <p className="text-[11px] leading-relaxed text-[var(--muted)] sm:text-xs">
          {DISCLAIMER_SHORT}{" "}
          <Link
            href={routes.aviso}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Aviso legal
          </Link>
        </p>
      </div>
    </div>
  );
}
