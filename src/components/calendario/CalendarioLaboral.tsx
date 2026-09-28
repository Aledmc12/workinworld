"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Download, ExternalLink } from "lucide-react";
import { getEventosAnio, diasHasta } from "@/lib/calendario/events";
import { generarIcs, googleCalendarUrl } from "@/lib/calendario/ics";
import { routes } from "@/lib/routes";

type Rol = "trabajador" | "empleador";

export function CalendarioLaboral() {
  const anio = 2026;
  const eventos = useMemo(() => getEventosAnio(anio), []);
  const [rol, setRol] = useState<Rol>("trabajador");
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [feedback, setFeedback] = useState("");

  const proximo = eventos.find((e) => diasHasta(e.date) >= 0);
  const filtrados = eventos.filter((e) => +e.date.slice(5, 7) === mes);

  function descargarIcs() {
    const ics = generarIcs(eventos, rol);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calendario-laboral-${anio}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback("Calendario descargado. Ábrelo con tu app de calendario.");
    setTimeout(() => setFeedback(""), 4000);
  }

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  return (
    <section aria-labelledby="calendario-titulo">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="calendario-titulo" className="font-display text-2xl font-bold">
          Calendario laboral {anio}
        </h2>
        <div
          className="grid w-full grid-cols-2 gap-2 sm:w-auto"
          role="group"
          aria-label="Ver calendario como"
        >
          {(["trabajador", "empleador"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRol(r)}
              aria-pressed={rol === r}
              className={`min-h-11 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                rol === r
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-2)]"
              }`}
            >
              Soy {r === "trabajador" ? "trabajador" : "empleador"}
            </button>
          ))}
        </div>
      </div>

      {proximo && (
        <div className="mb-6 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Próximo evento
          </p>
          <p className="mt-1 font-display text-xl font-bold">{proximo.name}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {proximo.date} · en {diasHasta(proximo.date)} días
          </p>
          <p className="mt-2 text-sm">
            {rol === "trabajador" ? proximo.trabajador : proximo.empleador}
          </p>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {meses.map((m, i) => (
          <button
            key={m}
            type="button"
            onClick={() => setMes(i + 1)}
            aria-pressed={mes === i + 1}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              mes === i + 1
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--surface-2)] text-[var(--muted)]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {filtrados.map((ev) => (
          <li
            key={ev.date}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <time dateTime={ev.date} className="text-xs text-[var(--accent)]">
                  {ev.date}
                </time>
                <h3 className="font-display text-lg font-semibold">{ev.name}</h3>
                {ev.note && (
                  <p className="text-xs text-[var(--muted)]">{ev.note}</p>
                )}
              </div>
              <a
                href={googleCalendarUrl(ev)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--accent)] hover:bg-[var(--surface-2)]"
              >
                Google Calendar
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {rol === "trabajador" ? ev.trabajador : ev.empleador}
            </p>
            <Link
              href={routes[ev.herramienta[1]]}
              className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline"
            >
              → {ev.herramienta[0]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={descargarIcs}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          <Download size={18} />
          Agregar a mi calendario (.ics)
        </button>
        <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
          <Calendar size={14} />
          Compatible con Apple Calendar, Outlook y Google
        </span>
      </div>

      {feedback && (
        <p role="status" className="mt-3 text-sm text-green-600 dark:text-green-400">
          {feedback}
        </p>
      )}
    </section>
  );
}
