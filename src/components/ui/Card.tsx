import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  minutes?: string;
  icon?: React.ReactNode;
}

export function ToolCard({
  href,
  title,
  description,
  minutes,
  icon,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/35 hover:shadow-md hover:shadow-[var(--accent)]/5"
    >
      {icon && (
        <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
          {icon}
        </div>
      )}
      <h3 className="font-display text-base font-semibold leading-snug text-[var(--text)] group-hover:text-[var(--accent)]">
        {title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {description}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs">
        {minutes && (
          <span className="flex items-center gap-1 text-[var(--muted)]">
            <Clock size={12} aria-hidden />
            {minutes}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 font-medium text-[var(--accent)]">
          Empezar
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-8">
      {backHref && backLabel && (
        <Link
          href={backHref}
          className="mb-4 inline-flex text-sm text-[var(--accent)] hover:underline"
        >
          ← {backLabel}
        </Link>
      )}
      <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">{description}</p>
      )}
    </header>
  );
}
