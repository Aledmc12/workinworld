import type { MetadataRoute } from "next";
import { temasTrabajador } from "@/lib/content/derechos";
import { temasEmpleador } from "@/lib/content/empleadores";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticRoutes = Object.values(routes).map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const derechos = temasTrabajador.map((t) => ({
    url: `${base}/derechos/${t.slug}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const empleadores = temasEmpleador.map((t) => ({
    url: `${base}/empleadores/${t.slug}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...derechos, ...empleadores];
}
