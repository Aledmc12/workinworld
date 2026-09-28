import Link from "next/link";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-6xl font-bold text-[var(--accent)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">
        Página no encontrada
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        href={routes.inicio}
        className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-6 py-3 text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
