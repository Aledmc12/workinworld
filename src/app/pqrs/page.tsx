import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/Card";
import { PqrsSuccessBanner } from "@/components/pqrs/PqrsSuccessBanner";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "PQRS",
  description: "Peticiones, quejas, reclamos y sugerencias.",
};

const errores: Record<string, string> = {
  campos: "Complete todos los campos obligatorios.",
  email: "Ingrese un correo electrónico válido.",
  consentimiento: "Debe autorizar el tratamiento de sus datos personales.",
  envio:
    "No pudimos enviar su mensaje en este momento. Intente de nuevo o escríbanos directamente.",
};

export default async function PqrsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMsg = params.error ? errores[params.error] : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <PageHeader
        title="PQRS"
        description="Peticiones, quejas, reclamos y sugerencias."
      />

      <Suspense fallback={null}>
        <PqrsSuccessBanner />
      </Suspense>

      {errorMsg && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          {errorMsg}
        </div>
      )}

      <form className="space-y-4" action="/api/pqrs" method="post">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium">
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <option value="peticion">Petición</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            required
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          />
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="consentimiento"
            required
            className="mt-1 rounded"
          />
          <span>
            Autorizo el tratamiento de mis datos conforme a la{" "}
            <Link href={routes.privacidad} className="text-[var(--accent)] underline">
              política de privacidad
            </Link>{" "}
            (Ley 1581 de 2012).
          </span>
        </label>
        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent)] py-3 font-medium text-white"
        >
          Enviar
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--muted)]">
        También puede escribir a contacto@workinworld.co. Respondemos en un plazo
        máximo de 15 días hábiles.
      </p>
    </div>
  );
}
