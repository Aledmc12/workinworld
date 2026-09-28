export const routes = {
  inicio: "/",
  porDias: "/trabajo-domestico-por-dias",
  contratoPorDias: "/trabajo-domestico-por-dias/contrato",
  biblioteca: "/biblioteca",
  liquidacion: "/liquidacion",
  indemnizacion: "/indemnizacion",
  derechos: "/derechos",
  empleadores: "/empleadores",
  demanda: "/demanda",
  preguntas: "/preguntas",
  resultados: "/resultados",
  profesional: "/profesional",
  aviso: "/aviso-legal",
  privacidad: "/privacidad",
  pqrs: "/pqrs",
  calendario: "/calendario",
  denuncia: "/denuncia",
} as const;

export type RouteKey = keyof typeof routes;

export const navPrincipal = [
  { key: "porDias" as const, label: "Trabajo doméstico por días" },
  { key: "liquidacion" as const, label: "Calcular mi liquidación" },
  { key: "indemnizacion" as const, label: "Calcular indemnización" },
  { key: "resultados" as const, label: "Mis resultados" },
];

export const navSecundario = [
  { key: "biblioteca" as const, label: "Biblioteca Virtual" },
  { key: "derechos" as const, label: "Mis derechos como trabajador" },
  { key: "empleadores" as const, label: "Empleadores" },
  { key: "demanda" as const, label: "Me están demandando" },
  { key: "preguntas" as const, label: "Preguntas frecuentes" },
  { key: "profesional" as const, label: "Hablar con un profesional" },
  { key: "aviso" as const, label: "Aviso legal y fuentes" },
];
