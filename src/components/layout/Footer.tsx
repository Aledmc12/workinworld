import Link from "next/link";
import { DISCLAIMER_SHORT } from "@/lib/legal-copy";
import { routes } from "@/lib/routes";
import { getNormas } from "@/lib/normas";

export function Footer() {
  const normas = getNormas();

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Work in World</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Orientación laboral gratuita para quienes trabajan en Colombia y para
            quienes contratan.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={routes.aviso} className="hover:text-[var(--accent)]">
                Aviso legal y fuentes
              </Link>
            </li>
            <li>
              <Link href={routes.privacidad} className="hover:text-[var(--accent)]">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href={routes.pqrs} className="hover:text-[var(--accent)]">
                PQRS
              </Link>
            </li>
            <li>
              <Link href={routes.denuncia} className="hover:text-[var(--accent)]">
                Directorio de denuncia
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Normas vigentes
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Valores actualizados al {normas.actualizado}. SMMLV:{" "}
            {normas.smmlv.toLocaleString("es-CO")} COP.
          </p>
          <p className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3 text-xs leading-relaxed text-[var(--muted)]">
            {DISCLAIMER_SHORT}
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Work in World · Hecho en Colombia
      </div>
    </footer>
  );
}
