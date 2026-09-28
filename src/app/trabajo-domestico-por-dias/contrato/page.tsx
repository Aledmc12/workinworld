import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Modelo de contrato por días",
  description: "Modelo orientativo de contrato de trabajo doméstico por días en Colombia.",
};

export default function ContratoPorDiasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Contrato por escrito, con copia para cada parte"
        description="Modelo orientativo. Adáptalo con un profesional del derecho."
        backHref={routes.porDias}
        backLabel="Trabajo doméstico por días"
      />
      <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 font-mono text-sm leading-relaxed text-[var(--muted)]">
        <p>CONTRATO DE TRABAJO POR DÍAS — SERVICIO DOMÉSTICO</p>
        <p className="mt-4">
          Entre [NOMBRE EMPLEADOR], identificado(a) con [DOCUMENTO], y
          [NOMBRE TRABAJADOR(A)], identificado(a) con [DOCUMENTO], se acuerda:
        </p>
        <p className="mt-4">
          1. El(La) trabajador(a) prestará servicios de [DESCRIPCIÓN] los días
          [DÍAS DE LA SEMANA], con jornada de [HORAS] horas por día.
        </p>
        <p className="mt-4">
          2. Remuneración: $[VALOR] por día, no inferior al salario mínimo
          proporcional vigente.
        </p>
        <p className="mt-4">
          3. El empleador afiliará al trabajador a salud, pensión y ARL, y pagará
          las prestaciones sociales proporcionales.
        </p>
        <p className="mt-4">
          Firmas: _________________ · _________________
        </p>
      </article>
      <div className="mt-6">
        <LegalDisclaimer />
      </div>
    </div>
  );
}
