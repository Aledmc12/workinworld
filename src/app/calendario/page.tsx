import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { CalendarioLaboral } from "@/components/calendario/CalendarioLaboral";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Calendario laboral 2026",
  description:
    "Fechas de prima, cesantías, dotación e intereses. Exporta a Google Calendar o descarga .ics.",
};

export default function CalendarioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        title="Calendario laboral"
        description="Fechas clave para trabajadores y empleadores en Colombia."
        backHref={routes.inicio}
        backLabel="Inicio"
      />
      <CalendarioLaboral />
      <div className="mt-8">
        <LegalDisclaimer />
      </div>
    </div>
  );
}
