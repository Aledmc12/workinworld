/** URL pública del sitio (NEXT_PUBLIC_SITE_URL en producción). */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://workinworld.zomidev.com"
  ).replace(/\/$/, "");
}
