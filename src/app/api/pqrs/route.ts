import { NextResponse } from "next/server";
import { enviarPqrs } from "@/lib/pqrs/send";

function texto(val: FormDataEntryValue | null): string {
  return typeof val === "string" ? val.trim() : "";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const nombre = texto(form.get("nombre"));
  const email = texto(form.get("email"));
  const tipo = texto(form.get("tipo"));
  const mensaje = texto(form.get("mensaje"));
  const consentimiento = form.get("consentimiento");

  if (!nombre || !email || !mensaje) {
    return NextResponse.redirect(new URL("/pqrs?error=campos", request.url), 303);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.redirect(new URL("/pqrs?error=email", request.url), 303);
  }

  if (consentimiento !== "on") {
    return NextResponse.redirect(
      new URL("/pqrs?error=consentimiento", request.url),
      303,
    );
  }

  const payload = {
    nombre,
    email,
    tipo: tipo || "peticion",
    mensaje,
    fecha: new Date().toISOString(),
  };

  try {
    await enviarPqrs(payload);
  } catch (err) {
    console.error("[PQRS] Error al enviar:", err);
    return NextResponse.redirect(new URL("/pqrs?error=envio", request.url), 303);
  }

  return NextResponse.redirect(new URL("/pqrs?enviado=1", request.url), 303);
}
