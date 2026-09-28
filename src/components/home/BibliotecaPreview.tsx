"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { recursosBiblioteca } from "@/lib/content/biblioteca";
import { routes } from "@/lib/routes";

export function BibliotecaPreview() {
  const destacados = recursosBiblioteca.filter((r) => r.estado === "verificado");

  return (
    <section
      id="biblioteca"
      aria-labelledby="biblioteca-academia"
      className="mx-auto max-w-6xl px-4 py-16 md:py-24"
    >
      <div className="animate-fade-in-up">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <GraduationCap size={16} strokeWidth={2} aria-hidden />
          </span>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Biblioteca Virtual · Trabajo doméstico y de cuidados
            </p>
            <h2
              id="biblioteca-academia"
              className="mt-2 font-display text-2xl font-bold leading-tight text-[var(--text)] md:text-[2rem]"
            >
              ¿Cómo enseñar el trabajo doméstico desde la academia?
            </h2>
          </div>
        </div>

        <div className="mt-6 max-w-3xl space-y-4 text-[var(--muted)] leading-relaxed">
          <p>
            El trabajo doméstico remunerado es una de las fuentes de empleo más
            importantes para las mujeres en Colombia, pero rara vez aparece en los
            syllabus de derecho laboral con la profundidad que merece. Esta
            biblioteca reúne capítulos, libros y documentos abiertos para
            docentes, estudiantes e investigadores que quieren conectar el debate
            sobre el cuidado con el derecho laboral colombiano.
          </p>
          <p>
            Cada recurso incluye un resumen en lenguaje claro, ideas clave y una
            nota sobre por qué es útil en clase. Desde aquí puedes explorar los
            materiales; si necesitas la colección completa, continúa en la
            biblioteca.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {destacados.map((r, i) => (
          <article
            key={r.slug}
            className="animate-fade-in-up flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
            style={{ animationDelay: `${150 + i * 80}ms` }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
                <BookOpen size={12} strokeWidth={2} aria-hidden />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {r.tipo} · {r.anio}
              </span>
            </div>
            <h3 className="font-display text-sm font-semibold leading-snug text-[var(--text)]">
              {r.titulo}
            </h3>
            <p className="mt-1 text-xs text-[var(--accent)]">{r.autor}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
              {r.corto}
            </p>
            {r.porQue && (
              <p className="mt-3 border-t border-[var(--border)] pt-3 text-xs leading-relaxed text-[var(--muted)]">
                <span className="font-medium text-[var(--text)]">
                  Por qué en clase:{" "}
                </span>
                {r.porQue}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="animate-fade-in-up animation-delay-400 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-sm text-[var(--muted)]">
          Explora fichas completas, enlaces a fuentes abiertas y más materiales
          sobre economía del cuidado y derecho de familia.
        </p>
        <Link
          href={routes.biblioteca}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
        >
          Ir a la biblioteca completa
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
