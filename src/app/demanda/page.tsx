import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Me están demandando",
};

export default function DemandaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Me están demandando"
        description="Qué hacer si recibes una demanda laboral."
      />
      <ol className="list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Reúne el contrato firmado, desprendibles de pago y comunicaciones.</li>
        <li>No ignores la notificación: hay plazos legales para responder.</li>
        <li>Busca asesoría de un abogado laboralista.</li>
        <li>Si eres empleador, revisa la sección de empleadores.</li>
      </ol>
      <Link
        href={`${routes.empleadores}/demanda`}
        className="mt-6 inline-block text-[var(--accent)] hover:underline"
      >
        Ver orientación para empleadores →
      </Link>
    </div>
  );
}
