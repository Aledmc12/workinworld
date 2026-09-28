import type { EventoConFecha } from "./events";

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function generarIcs(
  eventos: EventoConFecha[],
  rol: "trabajador" | "empleador",
): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Work in World//Calendario laboral//ES",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Calendario laboral de Colombia",
  ];

  for (const ev of eventos) {
    const start = ev.date.replace(/-/g, "");
    const endDate = new Date(
      Date.UTC(
        +ev.date.slice(0, 4),
        +ev.date.slice(5, 7) - 1,
        +ev.date.slice(8, 10) + 1,
      ),
    )
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

    const desc =
      (rol === "trabajador" ? ev.trabajador : ev.empleador) +
      " " +
      ev.quien +
      " Orientación de Work in World; no reemplaza la asesoría de un abogado.";

    lines.push(
      "BEGIN:VEVENT",
      `UID:${start}-${ev.md}@workinworld`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${escapeIcs(ev.name)}`,
      `DESCRIPTION:${escapeIcs(desc)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P3D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcs(ev.name)}`,
      "END:VALARM",
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function googleCalendarUrl(ev: EventoConFecha): string {
  const start = ev.date.replace(/-/g, "");
  const endDate = new Date(
    Date.UTC(
      +ev.date.slice(0, 4),
      +ev.date.slice(5, 7) - 1,
      +ev.date.slice(8, 10) + 1,
    ),
  )
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.name,
    dates: `${start}/${endDate}`,
    details: ev.trabajador,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
