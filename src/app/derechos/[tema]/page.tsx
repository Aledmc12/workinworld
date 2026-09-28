import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Card";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { temasTrabajador } from "@/lib/content/derechos";
import { routes } from "@/lib/routes";

interface Props {
  params: Promise<{ tema: string }>;
}

export function generateStaticParams() {
  return temasTrabajador.map((t) => ({ tema: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tema } = await params;
  const item = temasTrabajador.find((t) => t.slug === tema);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: `${item.title} · Work in World` },
  };
}

export default async function DerechoTemaPage({ params }: Props) {
  const { tema } = await params;
  const item = temasTrabajador.find((t) => t.slug === tema);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav
          className="hidden lg:block"
          aria-label="Temas de derechos laborales"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Mis derechos
          </p>
          <ul className="mt-3 space-y-1">
            {temasTrabajador.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`${routes.derechos}/${t.slug}`}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    t.slug === tema
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <PageHeader
            title={item.title}
            description={item.summary}
            backHref={routes.inicio}
            backLabel="Inicio"
          />
          <article className="prose-wiw space-y-4 text-[var(--muted)]">
            {item.content.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </article>
          <div className="mt-8">
            <LegalDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}
