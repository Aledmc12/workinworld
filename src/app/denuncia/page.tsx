import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Directorio de entidades de denuncia",
  description:
    "Ministerio de Trabajo, Defensoría del Pueblo, Procuraduría y más.",
};

const entidades = [
  {
    name: "Ministerio del Trabajo",
    desc: "Inspecciones, conciliación y denuncias laborales.",
    url: "https://www.mintrabajo.gov.co",
    tel: "018000910270",
  },
  {
    name: "Defensoría del Pueblo",
    desc: "Protección de derechos fundamentales.",
    url: "https://www.defensoria.gov.co",
    tel: "018000910080",
  },
  {
    name: "Procuraduría General de la Nación",
    desc: "Investigación de conductas de servidores públicos.",
    url: "https://www.procuraduria.gov.co",
    tel: "018000910091",
  },
  {
    name: "Superintendencia de Industria y Comercio",
    desc: "Protección de datos personales (Habeas Data).",
    url: "https://www.sic.gov.co",
    tel: "5920400",
  },
  {
    name: "Línea 123 — Acoso laboral",
    desc: "Ley 1010 de 2006. Denuncias de acoso en el trabajo.",
    url: "https://www.mintrabajo.gov.co/atencion-ciudadano",
    tel: "123",
  },
];

export default function DenunciaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageHeader
        title="Directorio de entidades de denuncia"
        description="Conecta la orientación con la acción real. Estas entidades pueden ayudarte."
      />
      <ul className="space-y-4">
        {entidades.map((e) => (
          <li
            key={e.name}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <h2 className="font-display text-lg font-semibold">{e.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{e.desc}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)]"
              >
                Sitio web <ExternalLink size={14} />
              </a>
              <span className="text-[var(--muted)]">Tel: {e.tel}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
