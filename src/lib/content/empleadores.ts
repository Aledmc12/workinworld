import type { TemaDerecho } from "./derechos";

export const temasEmpleador: TemaDerecho[] = [
  {
    slug: "contratar",
    title: "Contratar legalmente",
    summary: "Pasos para contratar sin riesgos legales.",
    content: [
      "Contrato por escrito con copia para cada parte. Afiliación inmediata a seguridad social.",
    ],
  },
  {
    slug: "costo",
    title: "Costo mensual real",
    summary: "Salario + prestaciones + aportes patronales.",
    content: [
      "Incluye salario, prima, cesantías, vacaciones, dotación (si aplica), aportes a salud, pensión, ARL y parafiscales.",
    ],
  },
  {
    slug: "afiliaciones",
    title: "Afiliaciones y planilla PILA",
    summary: "Obligación mensual de pago.",
    content: [
      "Debes afiliar y pagar la planilla PILA cada mes por cada trabajador.",
    ],
  },
  {
    slug: "tiempo-parcial",
    title: "Tiempo parcial y por días",
    summary: "Obligaciones proporcionales por días trabajados.",
    content: [
      "Cada día trabajado genera obligaciones proporcionales de prestaciones y seguridad social.",
    ],
  },
  {
    slug: "calendario",
    title: "Calendario de pagos",
    summary: "Fechas clave de prima, cesantías y dotación.",
    content: [
      "Consulta el calendario laboral para no perder fechas de prima, cesantías, dotación e intereses.",
    ],
  },
  {
    slug: "terminar",
    title: "Terminar el contrato",
    summary: "Liquidación e indemnización según el caso.",
    content: [
      "La liquidación se paga el mismo día de la terminación. La indemnización depende de la causa y tipo de contrato.",
    ],
  },
  {
    slug: "sin-afiliar",
    title: "Si no afilié a la persona",
    summary: "Riesgos legales y cómo regularizar.",
    content: [
      "Puedes ser sancionado por el Ministerio de Trabajo y responsable de las prestaciones no pagadas.",
    ],
  },
  {
    slug: "demanda",
    title: "Si me demandan",
    summary: "Qué hacer ante una demanda laboral.",
    content: [
      "Reúne contratos, desprendibles de pago y comunicaciones. Busca asesoría jurídica profesional.",
    ],
  },
];
