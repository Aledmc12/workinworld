export type TipoResultado = "liquidacion" | "indemnizacion";

export interface ResultadoGuardado {
  id: string;
  tipo: TipoResultado;
  fecha: string;
  titulo: string;
  total: number;
  resumen: string;
}

const STORAGE_KEY = "wiw.resultados";
const MAX_RESULTADOS = 20;

export function leerResultados(): ResultadoGuardado[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ResultadoGuardado[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function guardarResultado(
  entry: Omit<ResultadoGuardado, "id" | "fecha">,
): ResultadoGuardado {
  const nuevo: ResultadoGuardado = {
    ...entry,
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
  };
  const actualizados = [nuevo, ...leerResultados()].slice(0, MAX_RESULTADOS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
  window.dispatchEvent(new Event("wiw-resultados"));
  return nuevo;
}

export function eliminarResultado(id: string): void {
  const filtrados = leerResultados().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
  window.dispatchEvent(new Event("wiw-resultados"));
}
