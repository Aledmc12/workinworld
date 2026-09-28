import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/Card";
import { recursosBiblioteca } from "@/lib/content/biblioteca";

export const metadata: Metadata = {
  title: "Biblioteca virtual",
  description:
    "¿Cómo enseñar el trabajo doméstico desde la academia? Recursos abiertos sobre cuidado y derecho laboral.",
};

export default function BibliotecaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        title="¿Cómo enseñar el trabajo doméstico desde la academia?"
        description="Biblioteca Virtual sobre trabajo doméstico y de cuidados. Fuentes abiertas y verificadas para docentes, estudiantes e investigadores."
      />
      <ul className="space-y-4">
        {recursosBiblioteca.map((r) => (
          <li
            key={r.slug}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  {r.tipo} · {r.anio}
                  {r.estado === "preparacion" && " · En preparación"}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold">
                  {r.titulo}
                </h2>
                <p className="mt-1 text-sm text-[var(--accent)]">{r.autor}</p>
              </div>
              {r.estado === "verificado" && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
                >
                  Ver recurso
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {r.corto}
            </p>
            {r.porQue && (
              <p className="mt-3 border-t border-[var(--border)] pt-3 text-sm italic text-[var(--muted)]">
                {r.porQue}
              </p>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[var(--muted)]">
        ¿Tienes un recurso para sugerir?{" "}
        <Link href="/pqrs" className="text-[var(--accent)] hover:underline">
          Escríbenos por PQRS
        </Link>
      </p>
    </div>
  );
}
