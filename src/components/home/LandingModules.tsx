"use client";

import {
  BookOpen,
  Calculator,
  Calendar,
  Home,
  Scale,
  Shield,
} from "lucide-react";
import type { ReactNode } from "react";
import { ToolCard } from "@/components/ui/Card";
import { modulosPrincipales, pasosFlujo } from "@/lib/content/modulos";
import { routes } from "@/lib/routes";

const iconos: Record<string, ReactNode> = {
  porDias: <Home size={14} strokeWidth={2} />,
  liquidacion: <Calculator size={14} strokeWidth={2} />,
  indemnizacion: <Scale size={14} strokeWidth={2} />,
  calendario: <Calendar size={14} strokeWidth={2} />,
  biblioteca: <BookOpen size={14} strokeWidth={2} />,
  denuncia: <Shield size={14} strokeWidth={2} />,
};

export function LandingPasos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="animate-fade-in-up mb-8 max-w-lg">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Cada herramienta funciona igual, en cuatro pasos
        </h2>
        <p className="mt-2 text-[var(--muted)]">
          Respondes → Revisas → Entiendes → Actúas
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pasosFlujo.map((s, i) => (
          <div
            key={s.title}
            className="animate-fade-in-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-transform hover:-translate-y-0.5"
            style={{ animationDelay: `${100 + i * 70}ms` }}
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
              {i + 1}
            </span>
            <h3 className="mt-2 font-display text-sm font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingHerramientas() {
  return (
    <section
      id="herramientas"
      className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="animate-fade-in-up">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            ¿Qué necesitas resolver hoy?
          </h2>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Seis herramientas con los textos y tiempos estimados de la
            plataforma. Elige una para continuar.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modulosPrincipales.map((m, i) => (
            <div
              key={m.route}
              className="animate-fade-in-up"
              style={{ animationDelay: `${120 + i * 60}ms` }}
            >
              <ToolCard
                href={m.route === "biblioteca" ? "#biblioteca" : routes[m.route]}
                title={m.title}
                description={m.description}
                minutes={m.time}
                icon={iconos[m.route]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
