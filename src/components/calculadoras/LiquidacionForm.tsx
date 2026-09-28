"use client";

import { useState } from "react";
import { calcularLiquidacion } from "@/lib/calculos/liquidacion";
import { formatCOP, getNormas } from "@/lib/normas";
import { guardarResultado } from "@/lib/resultados";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { useTheme } from "@/components/theme/ThemeProvider";

export function LiquidacionForm() {
  const normas = getNormas();
  const { consent } = useTheme();
  const [salario, setSalario] = useState(String(normas.smmlv));
  const [ingreso, setIngreso] = useState("2025-01-01");
  const [retiro, setRetiro] = useState("2026-03-01");
  const [auxilio, setAuxilio] = useState(true);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<ReturnType<
    typeof calcularLiquidacion
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
    if (retiro <= ingreso) {
      setError("La fecha de retiro debe ser posterior al ingreso.");
      return;
    }
    setGuardado(false);
    setResultado(
      calcularLiquidacion({
        salarioMensual: s,
        fechaIngreso: ingreso,
        fechaRetiro: retiro,
        incluyeAuxilioTransporte: auxilio,
      }),
    );
  }

  function guardar() {
    if (!resultado || !consent) return;
    guardarResultado({
      tipo: "liquidacion",
      titulo: `Liquidación · ${ingreso} → ${retiro}`,
      total: resultado.total,
      resumen: `${resultado.diasTrabajados} días · salario ${formatCOP(Number(salario.replace(/\D/g, "")))}`,
    });
    setGuardado(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={calcular} className="space-y-4" noValidate>
        <div>
          <label htmlFor="salario" className="block text-sm font-medium">
            Salario mensual (COP)
          </label>
          <input
            id="salario"
            type="text"
            inputMode="numeric"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ingreso" className="block text-sm font-medium">
              Fecha de ingreso
            </label>
            <input
              id="ingreso"
              type="date"
              value={ingreso}
              onChange={(e) => setIngreso(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              required
            />
          </div>
          <div>
            <label htmlFor="retiro" className="block text-sm font-medium">
              Fecha de retiro
            </label>
            <input
              id="retiro"
              type="date"
              value={retiro}
              onChange={(e) => setRetiro(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              required
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={auxilio}
            onChange={(e) => setAuxilio(e.target.checked)}
            className="rounded"
          />
          Incluir auxilio de transporte (hasta 2 SMMLV)
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent)] py-3 font-medium text-white hover:opacity-90"
        >
          Calcular liquidación
        </button>
      </form>

      <div>
        {resultado ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="text-sm text-[var(--muted)]">Total estimado</p>
            <p className="font-display text-3xl font-bold text-[var(--accent)]">
              {formatCOP(resultado.total)}
            </p>
            <ul className="mt-4 space-y-2">
              {resultado.desglose.map((d) => (
                <li
                  key={d.concepto}
                  className="flex justify-between border-b border-[var(--border)] py-2 text-sm"
                >
                  <span>{d.concepto}</span>
                  <span className="font-medium">{formatCOP(d.valor)}</span>
                </li>
              ))}
            </ul>
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
            Completa el formulario para ver tu liquidación estimada.
          </div>
        )}
      </div>
    </div>
  );
}
