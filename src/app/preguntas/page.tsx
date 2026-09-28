import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
};

const faqs = [
  {
    q: "¿Cuánto es el salario mínimo en 2026?",
    a: "$1.750.905 al mes si trabajas tiempo completo, más $249.095 de auxilio de transporte si ganas hasta dos salarios mínimos.",
  },
  {
    q: "¿Cuánto me descuentan para salud y pensión?",
    a: "El 4 % para salud y el 4 % para pensión. Sobre el salario mínimo son $70.036 cada uno.",
  },
  {
    q: "¿Cuánto tiempo tengo para reclamar?",
    a: "En general, 3 años desde que te debían pagar. Si reclamas por escrito, ese plazo vuelve a empezar.",
  },
];

export default function PreguntasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader title="Preguntas frecuentes" />
      <dl className="space-y-4">
        {faqs.map((f) => (
          <div
            key={f.q}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <dt className="font-semibold">{f.q}</dt>
            <dd className="mt-2 text-sm text-[var(--muted)]">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
