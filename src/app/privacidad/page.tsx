import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de tratamiento de datos personales según Ley 1581 de 2012.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader title="Política de privacidad" />
      <article className="prose-wiw space-y-4 text-[var(--muted)]">
        <p>
          <strong>Responsable del tratamiento:</strong> ZomiDev SAS, NIT 901.XXX.XXX-X,
          contacto@workinworld.co, Bogotá, Colombia.
        </p>
        <h2 className="font-display text-lg font-bold text-[var(--text)]">
          Finalidades
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Prestar orientación laboral informativa.</li>
          <li>Recordar preferencias de tema en su dispositivo.</li>
          <li>Guardar resultados de calculadoras localmente (opcional).</li>
          <li>Atender PQRS y solicitudes de titulares de datos.</li>
        </ul>
        <h2 className="font-display text-lg font-bold text-[var(--text)]">
          Derechos del titular
        </h2>
        <p>
          Puede conocer, actualizar, rectificar y suprimir sus datos, y revocar
          la autorización escribiendo a contacto@workinworld.co o mediante el
          formulario PQRS.
        </p>
        <h2 className="font-display text-lg font-bold text-[var(--text)]">
          Transferencia a terceros
        </h2>
        <p>
          No vendemos datos personales. Los cálculos se procesan en el navegador
          del usuario; no enviamos salarios ni fechas a servidores externos.
        </p>
      </article>
    </div>
  );
}
