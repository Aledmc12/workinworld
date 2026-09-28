"use client";

import Link from "next/link";
import { routes } from "@/lib/routes";
import { useTheme } from "@/components/theme/ThemeProvider";

export function CookieBanner() {
  const { consent, acceptConsent } = useTheme();

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl"
    >
      <p className="text-sm text-[var(--text)]">
        Usamos almacenamiento local para recordar tu preferencia de tema y guardar
        tus resultados en tu dispositivo. No enviamos datos personales a servidores
        sin tu consentimiento.{" "}
        <Link href={routes.privacidad} className="text-[var(--accent)] underline">
          Política de privacidad
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={acceptConsent}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
        >
          Aceptar
        </button>
        <Link
          href={routes.privacidad}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]"
        >
          Más información
        </Link>
      </div>
    </div>
  );
}
