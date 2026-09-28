"use client";

import { useState } from "react";
import {
  calcularIndemnizacion,
  type TipoContrato,
} from "@/lib/calculos/indemnizacion";
import { formatCOP, getNormas } from "@/lib/normas";
import { guardarResultado } from "@/lib/resultados";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { useTheme } from "@/components/theme/ThemeProvider";

export function IndemnizacionForm() {
  const normas = getNormas();
  const { consent } = useTheme();
  const [salario, setSalario] = useState(String(normas.smmlv));
  const [ingreso, setIngreso] = useState("2024-01-01");
  const [despido, setDespido] = useState("2026-03-01");
  const [tipo, setTipo] = useState<TipoContrato>("indefinido");
  const [finContrato, setFinContrato] = useState("2026-12-31");
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<ReturnType<
    typeof calcularIndemnizacion
  > | null>(null);
  const [guardado, setGuardado] = useState(false);

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const s = Number(salario.replace(/\D/g, ""));
    if (!s || s <= 0) {
      setError("Ingresa un salario válido.");
      return;
    }
    setGuardado(false);
    setResultado(
      calcularIndemnizacion({
        salarioMensual: s,
        fechaIngreso: ingreso,
        fechaDespido: despido,
        tipoContrato: tipo,
        fechaFinContrato: tipo === "fijo" ? finContrato : undefined,
        salarioAlto: s > normas.smmlv * 10,
      }),
    );
  }

  function guardar() {
    if (!resultado || !consent) return;
    guardarResultado({
      tipo: "indemnizacion",
      titulo: `Indemnización · ${tipo}`,
      total: resultado.valorIndemnizacion,
      resumen: `${resultado.diasIndemnizacion} días · ${resultado.antiguedadAnios} años`,
    });
    setGuardado(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={calcular} className="space-y-4" noValidate>
        <div>
          <label htmlFor="salario-ind" className="block text-sm font-medium">
            Salario mensual (COP)
          </label>
          <input
            id="salario-ind"
            type="text"
            inputMode="numeric"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium">
            Tipo de contrato
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoContrato)}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <option value="indefinido">Término indefinido</option>
            <option value="fijo">Término fijo</option>
            <option value="obra">Obra o labor</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ingreso-ind" className="block text-sm font-medium">
              Fecha de ingreso
            </label>
            <input
              id="ingreso-ind"
              type="date"
              value={ingreso}
              onChange={(e) => setIngreso(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            />
          </div>
          <div>
            <label htmlFor="despido" className="block text-sm font-medium">
              Fecha de despido
            </label>
            <input
              id="despido"
              type="date"
              value={despido}
              onChange={(e) => setDespido(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            />
          </div>
        </div>
        {tipo === "fijo" && (
          <div>
            <label htmlFor="fin" className="block text-sm font-medium">
              Fecha fin del contrato
            </label>
            <input
              id="fin"
              type="date"
              value={finContrato}
              onChange={(e) => setFinContrato(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            />
          </div>
        )}
        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent)] py-3 font-medium text-white"
        >
          Calcular indemnización
        </button>
      </form>

      <div>
        {resultado ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm text-[var(--muted)]">Indemnización estimada</p>
            <p className="font-display text-3xl font-bold text-[var(--accent)]">
              {formatCOP(resultado.valorIndemnizacion)}
            </p>
            <p className="mt-2 text-sm">
              {resultado.diasIndemnizacion} días de salario ·{" "}
              {resultado.antiguedadAnios} años de antigüedad
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {resultado.explicacion}
            </p>
            {consent && (
              <button
                type="button"
                onClick={guardar}
                className="mt-4 w-full rounded-xl border border-[var(--border)] py-2.5 text-sm font-medium hover:bg-[var(--surface-2)]"
              >
                {guardado ? "Guardado en este dispositivo" : "Guardar en este dispositivo"}
              </button>
            )}
            <div className="mt-4">
              <LegalDisclaimer compact short />
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)] p-6 text-center text-[var(--muted)]">
            Completa el formulario para ver tu indemnización estimada.
          </div>
        )}
      </div>
    </div>
  );
}
