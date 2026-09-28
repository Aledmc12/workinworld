import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Hablar con un profesional",
};

export default function ProfesionalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Hablar con un profesional"
        description="Dónde buscar asesoría jurídica laboral gratuita o de bajo costo."
      />
      <ul className="space-y-3 text-[var(--muted)]">
        <li>Consultorios jurídicos de universidades públicas.</li>
        <li>Inspecciones del Ministerio de Trabajo (conciliación).</li>
        <li>Personerías municipales.</li>
        <li>Defensoría del Pueblo.</li>
      </ul>
    </div>
  );
}
