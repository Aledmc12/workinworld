import type { RouteKey } from "@/lib/routes";

export interface CalendarioEvento {
  md: string;
  name: string;
  trabajador: string;
  empleador: string;
  quien: string;
  herramienta: [string, RouteKey];
  note?: string;
  soloAnio?: number;
}

export const eventosBase: CalendarioEvento[] = [
  {
    md: "01-31",
    name: "Intereses a las cesantías",
    trabajador:
      "Te deben pagar directamente los intereses del 12 % sobre tus cesantías del año anterior.",
    empleador:
      "Debes pagar a cada persona trabajadora los intereses del 12 % sobre sus cesantías del año anterior.",
    quien: "Todas las personas con contrato de trabajo, también por días.",
    herramienta: ["Calcular mi liquidación", "liquidacion"],
  },
  {
    md: "02-14",
    name: "Consignación de cesantías",
    trabajador:
      "Te deben consignar las cesantías del año anterior en el fondo que elegiste.",
    empleador:
      "Debes consignar las cesantías del año anterior en el fondo de cada persona trabajadora.",
    quien: "Todas las personas con contrato de trabajo, también por días.",
    herramienta: ["Calcular mi liquidación", "liquidacion"],
  },
  {
    md: "04-30",
    name: "Primera dotación",
    note: "Si ganas hasta dos salarios mínimos",
    trabajador:
      "Te deben entregar ropa y calzado de trabajo, si ganas hasta dos salarios mínimos y llevas más de tres meses.",
    empleador:
      "Debes entregar ropa y calzado de trabajo a quien gane hasta dos salarios mínimos y lleve más de tres meses.",
    quien: "Quien gana hasta dos salarios mínimos y lleva más de tres meses.",
    herramienta: ["Ver las obligaciones del empleador", "empleadores"],
  },
  {
    md: "06-30",
    name: "Primera mitad de la prima",
    trabajador:
      "Te deben pagar la mitad de la prima: 15 días de salario por el semestre, en proporción a lo trabajado.",
    empleador:
      "Debes pagar la primera mitad de la prima: 15 días de salario por el semestre, en proporción a lo trabajado.",
    quien:
      "Todas las personas con contrato de trabajo, incluido el servicio doméstico (Ley 1788 de 2016).",
    herramienta: ["Trabajo doméstico por días", "porDias"],
  },
  {
    md: "07-01",
    name: "El recargo dominical sube al 90 %",
    soloAnio: 2026,
    trabajador:
      "Si trabajas un domingo o festivo, esas horas se pagan con un recargo del 90 %.",
    empleador:
      "Las horas trabajadas en domingo o festivo se pagan con un recargo del 90 %.",
    quien: "Quien trabaja en domingo o festivo (Ley 2466 de 2025).",
    herramienta: ["Mis derechos como trabajador", "derechos"],
  },
  {
    md: "07-15",
    name: "La jornada máxima baja a 42 horas",
    soloAnio: 2026,
    trabajador: "Tu jornada no puede pasar de 42 horas a la semana.",
    empleador:
      "La jornada de tus trabajadores no puede pasar de 42 horas a la semana.",
    quien: "Todas las personas con contrato de trabajo (Ley 2101 de 2021).",
    herramienta: ["Mis derechos como trabajador", "derechos"],
  },
  {
    md: "08-31",
    name: "Segunda dotación",
    note: "Si ganas hasta dos salarios mínimos",
    trabajador: "Te deben entregar la segunda dotación del año.",
    empleador: "Debes entregar la segunda dotación del año.",
    quien: "Quien gana hasta dos salarios mínimos y lleva más de tres meses.",
    herramienta: ["Ver las obligaciones del empleador", "empleadores"],
  },
  {
    md: "12-20",
    name: "Segunda mitad de la prima y tercera dotación",
    note: "Dotación si ganas hasta dos salarios mínimos",
    trabajador:
      "Te deben pagar la segunda mitad de la prima y entregar la tercera dotación.",
    empleador:
      "Debes pagar la segunda mitad de la prima y entregar la tercera dotación.",
    quien:
      "Prima: todas las personas con contrato. Dotación: quien gana hasta dos salarios mínimos.",
    herramienta: ["Trabajo doméstico por días", "porDias"],
  },
];

export interface EventoConFecha extends CalendarioEvento {
  date: string;
}

export function getEventosAnio(anio: number): EventoConFecha[] {
  return eventosBase
    .filter((e) => !e.soloAnio || e.soloAnio === anio)
    .map((e) => ({ ...e, date: `${anio}-${e.md}` }));
}

export function diasHasta(fecha: string, desde = new Date()): number {
  const target = new Date(fecha + "T12:00:00");
  const base = new Date(
    desde.getFullYear(),
    desde.getMonth(),
    desde.getDate(),
    12,
  );
  return Math.ceil((target.getTime() - base.getTime()) / 86400000);
}
