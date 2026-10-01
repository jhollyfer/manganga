import heroImage from "@/assets/hero-festival.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Festival Folclórico Benjaminense"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content - bottom left aligned */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-24 md:pb-32 max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-white/70 mb-4">
          Festival Folclórico Benjaminense
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Boi Bumbá
          <br />
          Mangangá
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
          Mais de 30 anos celebrando a cultura amazônica. O maior campeão do
          Festival Folclórico de Benjamin Constant.
        </p>
        <Button
          size="lg"
          className="cursor-pointer text-lg px-8"
          asChild
        >
          <a href="#about">Conheça Nossa História</a>
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#festival" aria-label="Rolar para próxima seção" className="cursor-pointer">
          <ChevronDown
            className="h-8 w-8 text-white/60 animate-bounce"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
