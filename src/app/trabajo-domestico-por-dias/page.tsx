import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/Card";
import { CalendarioLaboral } from "@/components/calendario/CalendarioLaboral";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { formatCOP, getNormas } from "@/lib/normas";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Trabajo doméstico por días",
  description:
    "Cuánto te deben pagar por día, tus prestaciones y tu seguridad social en servicio doméstico por días en Colombia.",
  openGraph: {
    title: "Trabajo doméstico por días · Work in World",
    description:
      "Orientación sobre salario, prestaciones y seguridad social para trabajo doméstico por días.",
  },
};

export default function TrabajoDomesticoPage() {
  const normas = getNormas();
  const salarioDiario = Math.round(normas.smmlv / 30);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <PageHeader
        title="Trabajo doméstico por días"
        description="Cuánto te deben pagar por día, tus prestaciones y tu seguridad social. Con modelo de contrato."
        backHref={routes.inicio}
        backLabel="Inicio"
      />

      <div className="prose-wiw mb-8 space-y-4 text-[var(--muted)]">
        <p>
          Si trabajas por días en servicio doméstico, tienes los mismos derechos
          laborales que cualquier trabajador formal. Cada casa donde trabajas es
          un empleador distinto y debe pagarte y afiliarte por los días que
          laboras allí.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
              Salario mínimo diario (2026)
            </p>
            <p className="mt-1 font-display text-2xl font-bold">
              {formatCOP(salarioDiario)}
            </p>
            <p className="mt-1 text-sm">Proporcional a un mes de {formatCOP(normas.smmlv)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--accent)]">
              Auxilio de transporte
            </p>
            <p className="mt-1 font-display text-2xl font-bold">
              {formatCOP(Math.round(normas.auxilioTransporte / 30))}
            </p>
            <p className="mt-1 text-sm">Por día, si ganas hasta 2 SMMLV</p>
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="font-display text-xl font-bold">Preguntas frecuentes</h2>
        <dl className="mt-4 space-y-4">
          {[
            {
              q: "¿Tengo derecho a prima si trabajo por días?",
              a: "Sí. La prima se paga en proporción a los días trabajados, en cualquier tipo de trabajo, incluido el servicio doméstico.",
            },
            {
              q: "¿Me pueden pagar menos del mínimo si trabajo medio tiempo?",
              a: "Sí, en proporción a las horas o días trabajados. Pero el valor de tu hora o de tu día no puede ser menor al del salario mínimo proporcional.",
            },
            {
              q: "¿Necesito contrato escrito?",
              a: "Sí. Te da los mismos derechos que uno escrito. Si hay un problema, sirven como prueba los pagos, los mensajes y los testimonios.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <dt className="font-semibold text-[var(--text)]">{item.q}</dt>
              <dd className="mt-2 text-sm text-[var(--muted)]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href={routes.contratoPorDias}
          className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white"
        >
          Ver modelo de contrato
        </Link>
        <Link
          href={routes.liquidacion}
          className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-medium"
        >
          Calcular liquidación
        </Link>
      </div>

      <CalendarioLaboral />
      <div className="mt-8">
        <LegalDisclaimer />
      </div>
    </div>
  );
}
