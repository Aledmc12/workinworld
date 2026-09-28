"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { routes, navPrincipal, navSecundario } from "@/lib/routes";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={routes.inicio}
          className="font-display text-lg font-bold tracking-tight text-[var(--text)]"
        >
          Work in World
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <Link
            href={routes.porDias}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive(routes.porDias)
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            Trabajo doméstico
          </Link>
          <Link
            href={routes.liquidacion}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive(routes.liquidacion) || isActive(routes.indemnizacion)
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            Calculadoras
          </Link>
          <Link
            href={pathname === "/" ? "#biblioteca" : routes.biblioteca}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive(routes.biblioteca)
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            Biblioteca
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] hover:bg-[var(--surface-2)]"
            aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menú"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-[var(--border)] px-4 py-3 lg:hidden"
          aria-label="Menú móvil"
        >
          {[...navPrincipal, ...navSecundario].map(({ key, label }) => (
            <Link
              key={key}
              href={routes[key]}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--surface-2)]"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
