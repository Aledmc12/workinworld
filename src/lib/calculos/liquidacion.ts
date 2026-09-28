import { getNormas } from "@/lib/normas";

export interface LiquidacionInput {
  salarioMensual: number;
  fechaIngreso: string;
  fechaRetiro: string;
  incluyeAuxilioTransporte?: boolean;
  diasTrabajadosMes?: number;
}

export interface LiquidacionResultado {
  diasTrabajados: number;
  salarioProporcional: number;
  prima: number;
  cesantias: number;
  interesesCesantias: number;
  vacaciones: number;
  auxilioTransporte: number;
  total: number;
  desglose: { concepto: string; valor: number }[];
}

function diasEntre(inicio: string, fin: string): number {
  const a = new Date(inicio + "T12:00:00");
  const b = new Date(fin + "T12:00:00");
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));
}

function mesesCompletos(inicio: string, fin: string): number {
  const a = new Date(inicio + "T12:00:00");
  const b = new Date(fin + "T12:00:00");
  let meses =
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) meses -= 1;
  return Math.max(0, meses);
}

/** Cálculo estimativo según práctica laboral colombiana (30 días/mes). */
export function calcularLiquidacion(input: LiquidacionInput): LiquidacionResultado {
  const normas = getNormas();
  const dias = diasEntre(input.fechaIngreso, input.fechaRetiro);
  const meses = mesesCompletos(input.fechaIngreso, input.fechaRetiro);
  const salario = input.salarioMensual;
  const salarioDiario = salario / 30;

  const diasMes = input.diasTrabajadosMes ?? Math.min(30, dias % 30 || 30);
  const salarioProporcional = salarioDiario * diasMes;

  const prima = (salario / 2) * (meses / 12 + (diasMes / 30) / 2);
  const cesantias = salario * (meses / 12 + diasMes / 360);
  const interesesCesantias = cesantias * normas.interesesCesantias;
  const vacaciones = salarioDiario * (dias / 360) * 15;

  const auxilio =
    input.incluyeAuxilioTransporte &&
    salario <= normas.smmlv * 2
      ? (normas.auxilioTransporte / 30) * diasMes
      : 0;

  const desglose = [
    { concepto: "Salario proporcional", valor: Math.round(salarioProporcional) },
    { concepto: "Prima de servicios", valor: Math.round(prima) },
    { concepto: "Cesantías", valor: Math.round(cesantias) },
    { concepto: "Intereses cesantías", valor: Math.round(interesesCesantias) },
    { concepto: "Vacaciones", valor: Math.round(vacaciones) },
  ];

  if (auxilio > 0) {
    desglose.push({ concepto: "Auxilio de transporte", valor: Math.round(auxilio) });
  }

  const total = desglose.reduce((s, d) => s + d.valor, 0);

  return {
    diasTrabajados: dias,
    salarioProporcional: Math.round(salarioProporcional),
    prima: Math.round(prima),
    cesantias: Math.round(cesantias),
    interesesCesantias: Math.round(interesesCesantias),
    vacaciones: Math.round(vacaciones),
    auxilioTransporte: Math.round(auxilio),
    total,
    desglose,
  };
}
