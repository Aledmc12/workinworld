"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/content/hero-images";
import { DISCLAIMER_SHORT } from "@/lib/legal-copy";
import { routes } from "@/lib/routes";

const INTERVAL_MS = 7000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden md:min-h-[calc(100vh-4rem)]">
      {/* Fondos a pantalla completa — desde debajo del header */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "motion-safe:animate-hero-zoom" : "scale-105"}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3a]/75 via-[#0b1f3a]/55 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a]/50 via-transparent to-transparent" />
      </div>

      {/* Indicadores */}
      <div
        className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col"
        role="tablist"
        aria-label="Imágenes del banner"
      >
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={slide.alt}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "h-1.5 w-8 bg-white md:h-8 md:w-1.5"
                : "h-1.5 w-1.5 bg-white/35 hover:bg-white/60 md:h-6 md:w-1.5"
            }`}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl animate-fade-in-up flex-col justify-center px-4 pb-24 pt-10 md:min-h-[calc(100vh-4rem)] md:pb-28 md:pt-16"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200/90">
          Orientación laboral · Colombia 2026
        </p>
        <h1 className="mt-4 max-w-[14em] font-display text-[clamp(2.35rem,5.8vw,4.5rem)] font-extrabold leading-[1.03] tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.45)]">
          Tu trabajo tiene derechos. Conócelos antes de necesitarlos.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100/90 md:mt-6 md:border-l-2 md:border-blue-400/50 md:pl-5 md:text-lg">
          Orientación laboral para quienes trabajan en Colombia y para quienes
          contratan. Sin tecnicismos y con los valores de 2026.
        </p>
        <div
          className="mt-7 flex animate-fade-in-up animation-delay-200 flex-wrap gap-3 md:mt-8"
        >
          <Link
            href={routes.porDias}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b1f3a] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Trabajo doméstico por días
          </Link>
          <Link
            href={routes.derechos + "/contrato"}
            className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/18"
          >
            Conocer mis derechos
          </Link>
        </div>
      </div>

      {/* Aviso legal — pie del hero, sin tapar el contenido principal */}
      <div
        role="note"
        aria-label="Aviso legal"
        className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0b1f3a]/75 px-4 py-2.5 backdrop-blur-md"
      >
        <p className="mx-auto max-w-4xl text-center text-[10px] leading-relaxed text-white/70 sm:text-[11px]">
          {DISCLAIMER_SHORT}{" "}
          <Link
            href={routes.aviso}
            className="font-medium text-white/90 underline-offset-2 hover:underline"
          >
            Aviso legal
          </Link>
        </p>
      </div>
    </section>
  );
}
