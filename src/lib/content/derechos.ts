export interface TemaDerecho {
  slug: string;
  title: string;
  summary: string;
  content: string[];
}

export const temasTrabajador: TemaDerecho[] = [
  {
    slug: "contrato",
    title: "Contrato de trabajo",
    summary: "Contrato por escrito, con copia para cada parte.",
    content: [
      "Sí. Te da los mismos derechos que uno escrito. Si hay un problema, sirven como prueba los pagos, los mensajes y los testimonios.",
      "Máximo dos meses, y debe estar por escrito. En contratos a término fijo de menos de un año, no puede pasar de la quinta parte del plazo.",
    ],
  },
  {
    slug: "periodo-de-prueba",
    title: "Periodo de prueba",
    summary: "Límites legales según el tipo de contrato.",
    content: [
      "El periodo de prueba no puede superar dos meses en contratos a término indefinido.",
    ],
  },
  {
    slug: "salario",
    title: "Salario y pago en especie",
    summary: "$1.750.905 al mes si trabajas tiempo completo (2026).",
    content: [
      "Sí, en proporción a las horas o días trabajados. Pero el valor de tu hora o de tu día no puede ser menor al del salario mínimo proporcional.",
      "No. Solo se descuentan los aportes de ley, como salud y pensión, y lo que autorices por escrito.",
    ],
  },
  {
    slug: "tiempo-parcial",
    title: "Tiempo parcial y por días",
    summary: "Derechos proporcionales en trabajo por días.",
    content: [
      "Sí. La prima se paga en proporción a los días trabajados, en cualquier tipo de trabajo, incluido el servicio doméstico.",
      "Cada casa es un empleador distinto y cada una debe pagarte y afiliarte por los días que trabajas allí.",
    ],
  },
  {
    slug: "jornada",
    title: "Jornada y descansos",
    summary: "Máximo 42 horas semanales desde julio 2026.",
    content: [
      "Tu jornada no puede pasar de 42 horas a la semana (Ley 2101 de 2021).",
    ],
  },
  {
    slug: "recargos",
    title: "Horas extra, noches y festivos",
    summary: "Recargo del 90 % en domingos y festivos (2026).",
    content: [
      "Si trabajas un domingo o festivo, esas horas se pagan con un recargo del 90 % (Ley 2466 de 2025).",
    ],
  },
  {
    slug: "auxilio-de-transporte",
    title: "Auxilio de transporte",
    summary: "$249.095 si ganas hasta dos salarios mínimos.",
    content: [
      "Te corresponde auxilio de transporte si ganas hasta dos salarios mínimos legales mensuales vigentes.",
    ],
  },
  {
    slug: "prima",
    title: "Prima de servicios",
    summary: "15 días por semestre, proporcional.",
    content: [
      "La prima se paga en junio y diciembre, en proporción a los días trabajados.",
    ],
  },
  {
    slug: "cesantias",
    title: "Cesantías e intereses",
    summary: "Consignación en febrero, intereses en enero.",
    content: [
      "Las cesantías se consignan antes del 14 de febrero. Los intereses del 12 % se pagan directamente antes del 31 de enero.",
    ],
  },
  {
    slug: "vacaciones",
    title: "Vacaciones",
    summary: "15 días hábiles por año trabajado.",
    content: [
      "Tienes derecho a 15 días hábiles de vacaciones por cada año de servicio.",
    ],
  },
  {
    slug: "dotacion",
    title: "Dotación",
    summary: "Tres entregas al año si ganas hasta 2 SMMLV.",
    content: [
      "Si ganas hasta dos salarios mínimos y llevas más de tres meses, te deben dotación en abril, agosto y diciembre.",
    ],
  },
  {
    slug: "seguridad-social",
    title: "Seguridad social",
    summary: "Afiliación obligatoria a salud, pensión y ARL.",
    content: [
      "El 4 % para salud y el 4 % para pensión. Sobre el salario mínimo son $70.036 cada uno. El resto de los aportes lo paga quien te contrata.",
    ],
  },
  {
    slug: "embarazo-e-incapacidad",
    title: "Embarazo, licencias e incapacidades",
    summary: "Protección especial por condición de salud.",
    content: [
      "No por esa razón. Quien tiene una incapacidad o una condición de salud tiene una protección especial: el empleador necesita autorización para terminar el contrato.",
    ],
  },
  {
    slug: "terminacion",
    title: "Terminación y liquidación",
    summary: "Liquidación siempre; indemnización según la causa.",
    content: [
      "El mismo día en que termina el contrato. Si se demora, el empleador puede deberte un día de salario por cada día de retraso.",
      "No. La liquidación se paga siempre, sin importar por qué terminó el contrato.",
    ],
  },
];
