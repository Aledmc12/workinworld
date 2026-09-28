import type { RouteKey } from "@/lib/routes";

export interface ModuloPrincipal {
  title: string;
  description: string;
  time: string;
  route: RouteKey;
}

/** Los 6 módulos principales de la plataforma (landing). */
export const modulosPrincipales: ModuloPrincipal[] = [
  {
    title: "Trabajo doméstico por días",
    description:
      "Cuánto te deben pagar por día, tus prestaciones y tu seguridad social. Con modelo de contrato.",
    time: "3 min",
    route: "porDias",
  },
  {
    title: "Calcular mi liquidación",
    description: "Cuánto te deben pagar al terminar el contrato.",
    time: "2 min",
    route: "liquidacion",
  },
  {
    title: "Calcular indemnización",
    description: "Si te despidieron sin justa causa, cuánto te corresponde.",
    time: "3 min",
    route: "indemnizacion",
  },
  {
    title: "Calendario laboral",
    description:
      "Fechas de prima, cesantías, dotación y más. Exporta a tu calendario.",
    time: "2 min",
    route: "calendario",
  },
  {
    title: "Biblioteca virtual",
    description:
      "Textos sobre derecho laboral, cuidado y economía del trabajo.",
    time: "5 min",
    route: "biblioteca",
  },
  {
    title: "Directorio de denuncia",
    description: "Ministerio de Trabajo, Defensoría, Procuraduría y más.",
    time: "2 min",
    route: "denuncia",
  },
];

export const pasosFlujo = [
  {
    title: "Respondes",
    description:
      "Preguntas cortas, una a la vez. Si no sabes algo, puedes decirlo.",
  },
  {
    title: "Revisas",
    description:
      "Ves todas tus respuestas juntas y cambias la que quieras antes de calcular.",
  },
  {
    title: "Entiendes",
    description:
      "Recibes el valor, de dónde sale cada peso y las fechas que importan.",
  },
  {
    title: "Actúas",
    description:
      "Guardas el resultado, copias el resumen o hablas con un profesional.",
  },
];
