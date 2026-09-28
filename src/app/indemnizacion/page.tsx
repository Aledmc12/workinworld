import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { IndemnizacionForm } from "@/components/calculadoras/IndemnizacionForm";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Calcular indemnización",
  description:
    "Calculadora de indemnización por despido sin justa causa en Colombia. Valores 2026.",
};

export default function IndemnizacionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader
        title="Calcular indemnización"
        description="Si te despidieron sin justa causa, cuánto te corresponde."
        backHref={routes.inicio}
        backLabel="Inicio"
      />
      <LegalDisclaimer />
      <div className="mt-8">
        <IndemnizacionForm />
      </div>
    </div>
  );
}
