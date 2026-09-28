import normas2026 from "../../config/normas/2026.json";

export type Normas = typeof normas2026;

export function getNormas(anio = 2026): Normas {
  if (anio !== 2026) {
    throw new Error(`Normas no disponibles para el año ${anio}`);
  }
  return normas2026;
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
