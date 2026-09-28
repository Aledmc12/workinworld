import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Card";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { temasEmpleador } from "@/lib/content/empleadores";
import { routes } from "@/lib/routes";

interface Props {
  params: Promise<{ tema: string }>;
}

export function generateStaticParams() {
  return temasEmpleador.map((t) => ({ tema: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tema } = await params;
  const item = temasEmpleador.find((t) => t.slug === tema);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function EmpleadorTemaPage({ params }: Props) {
  const { tema } = await params;
  const item = temasEmpleador.find((t) => t.slug === tema);
  if (!item) notFound();

  if (item.slug === "calendario") {
    const { CalendarioLaboral } = await import(
      "@/components/calendario/CalendarioLaboral"
    );
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <PageHeader
          title={item.title}
          description={item.summary}
          backHref={routes.inicio}
          backLabel="Inicio"
        />
        <CalendarioLaboral />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        title={item.title}
        description={item.summary}
        backHref={routes.inicio}
        backLabel="Inicio"
      />
      <nav className="mb-6 flex flex-wrap gap-2">
        {temasEmpleador.map((t) => (
          <Link
            key={t.slug}
            href={`${routes.empleadores}/${t.slug}`}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              t.slug === tema
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--surface-2)] text-[var(--muted)]"
            }`}
          >
            {t.title}
          </Link>
        ))}
      </nav>
      <article className="prose-wiw space-y-4 text-[var(--muted)]">
        {item.content.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </article>
      <div className="mt-8">
        <LegalDisclaimer />
      </div>
    </div>
  );
}
