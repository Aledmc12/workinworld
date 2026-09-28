export interface PqrsPayload {
  nombre: string;
  email: string;
  tipo: string;
  mensaje: string;
  fecha: string;
}

export async function enviarPqrs(payload: PqrsPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PQRS_NOTIFY_EMAIL ?? "contacto@workinworld.co";
  const from =
    process.env.PQRS_FROM_EMAIL ?? "Work in World <noreply@workinworld.co>";

  if (!apiKey) {
    console.info("[PQRS] Sin RESEND_API_KEY — solo registro en logs:", payload);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `[PQRS · ${payload.tipo}] ${payload.nombre}`,
      text: [
        `Tipo: ${payload.tipo}`,
        `Nombre: ${payload.nombre}`,
        `Correo: ${payload.email}`,
        `Fecha: ${payload.fecha}`,
        "",
        payload.mensaje,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}
