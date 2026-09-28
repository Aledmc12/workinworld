import { getNormas } from "@/lib/normas";

export type TipoContrato = "indefinido" | "fijo" | "obra";

export interface IndemnizacionInput {
  salarioMensual: number;
  fechaIngreso: string;
  fechaDespido: string;
  tipoContrato: TipoContrato;
  fechaFinContrato?: string;
  salarioAlto?: boolean;
}

export interface IndemnizacionResultado {
  diasIndemnizacion: number;
  valorIndemnizacion: number;
  antiguedadDias: number;
  antiguedadAnios: number;
  explicacion: string;
}

function diasEntre(a: string, b: string): number {
  const d1 = new Date(a + "T12:00:00");
  const d2 = new Date(b + "T12:00:00");
  return Math.max(0, Math.round((d2.getTime() - d1.getTime()) / 86400000));
}

export function calcularIndemnizacion(
  input: IndemnizacionInput,
): IndemnizacionResultado {
  const normas = getNormas();
  const antiguedadDias = diasEntre(input.fechaIngreso, input.fechaDespido);
  const antiguedadAnios = antiguedadDias / 360;
  const salarioDiario = input.salarioMensual / 30;

  let dias = 0;
  let explicacion = "";

  if (input.tipoContrato === "fijo" && input.fechaFinContrato) {
    const diasRestantes = diasEntre(input.fechaDespido, input.fechaFinContrato);
    dias = Math.max(normas.indemnizacion.minimoDias, diasRestantes);
    explicacion =
      "Contrato a término fijo: salario de los días que faltaban para terminar, con mínimo de 15 días.";
  } else {
    const tabla = input.salarioAlto
      ? normas.indemnizacion.altoSalario
      : normas.indemnizacion.bajoSalario;

    if (antiguedadAnios <= 1) {
      dias = tabla.primerAnio;
    } else {
      dias =
        tabla.primerAnio +
        Math.ceil(antiguedadAnios - 1) * tabla.adicional;
    }
    explicacion =
      "Contrato a término indefinido: 30 días de salario por el primer año y 20 días adicionales por cada año siguiente (hasta 2 SMMLV).";
  }

  return {
    diasIndemnizacion: dias,
    valorIndemnizacion: Math.round(salarioDiario * dias),
    antiguedadDias,
    antiguedadAnios: Math.round(antiguedadAnios * 10) / 10,
    explicacion,
  };
}
