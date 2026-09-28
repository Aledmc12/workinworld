import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { ResultadosList } from "@/components/resultados/ResultadosList";

export const metadata: Metadata = {
  title: "Mis resultados",
};

export default function ResultadosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Mis resultados"
        description="Tus cálculos guardados en este dispositivo."
      />
      <p className="text-[var(--muted)]">
        Los resultados se guardan localmente en tu navegador cuando aceptas las
        cookies. No se envían a servidores externos.
      </p>
      <ResultadosList />
    </div>
  );
}
