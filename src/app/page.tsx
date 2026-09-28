import { BibliotecaPreview } from "@/components/home/BibliotecaPreview";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { LandingHerramientas, LandingPasos } from "@/components/home/LandingModules";

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <LandingPasos />
      <section className="border-t border-[var(--border)] bg-[var(--bg)]">
        <BibliotecaPreview />
      </section>
      <LandingHerramientas />
    </>
  );
}
