import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { LiquidacionForm } from "@/components/calculadoras/LiquidacionForm";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Calcular mi liquidación",
  description:
    "Calculadora de liquidación laboral en Colombia con valores 2026. Prima, cesantías, vacaciones e intereses.",
};

export default function LiquidacionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader
        title="Calcular mi liquidación"
        description="Cuánto te deben pagar al terminar el contrato. Estimación con valores 2026."
        backHref={routes.inicio}
        backLabel="Inicio"
      />
      <LegalDisclaimer />
      <div className="mt-8">
        <LiquidacionForm />
      </div>
    </div>
  );
}
