import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Aviso legal y fuentes",
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Aviso legal y fuentes" />
      <LegalDisclaimer />
      <article className="prose-wiw mt-6 space-y-4 text-[var(--muted)]">
        <p>
          Work in World es una herramienta de orientación. No reemplaza la asesoría
          de un abogado laboralista.
        </p>
        <h2 className="font-display text-lg font-bold text-[var(--text)]">
          Fuentes normativas
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Código Sustantivo del Trabajo (Colombia)</li>
          <li>Ley 1788 de 2016 — Servicio doméstico</li>
          <li>Ley 2101 de 2021 — Reducción jornada laboral</li>
          <li>Ley 2466 de 2025 — Recargo dominical y festivo</li>
          <li>Ley 1581 de 2012 — Protección de datos</li>
        </ul>
      </article>
    </div>
  );
}
