import { MapPin } from "lucide-react";

export function Festival() {
  return (
    <section id="festival" className="scroll-mt-20 py-24">
      <div className="container mx-auto px-4">
        {/* Header - left aligned */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O Maior Festival do Alto Solimões
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Há mais de 30 anos, Benjamin Constant se transforma na Capital
            Cultural do Alto Solimões, recebendo milhares de visitantes de
            toda a região amazônica.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-baseline gap-y-6 mb-20">
          <div className="pr-8 md:pr-12">
            <span className="text-5xl md:text-6xl font-bold text-primary">30+</span>
            <p className="text-sm text-muted-foreground mt-1">Anos de Tradição</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border self-center" />
          <div className="px-8 md:px-12">
            <span className="text-5xl md:text-6xl font-bold text-primary">5k+</span>
            <p className="text-sm text-muted-foreground mt-1">Visitantes</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border self-center" />
          <div className="pl-0 sm:pl-8 md:pl-12">
            <span className="text-5xl md:text-6xl font-bold text-primary">1</span>
            <p className="text-sm text-muted-foreground mt-1">Bumbódromo</p>
          </div>
        </div>

        {/* International section - 2 columns */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Uma Celebração Internacional
            </h3>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                O Festival Folclórico Benjaminense transcende fronteiras,
                atraindo visitantes das cidades vizinhas de{" "}
                <strong className="text-foreground">Islândia (Peru)</strong> e{" "}
                <strong className="text-foreground">Letícia (Colômbia)</strong>,
                além de benjaminenses que vivem em outras cidades do Amazonas e
                até mesmo do exterior.
              </p>
              <p>
                Tradicionalmente realizado em{" "}
                <strong className="text-foreground">julho</strong>, o festival
                eleva a cultura do povo benjaminense através de alegorias,
                lendas e figuras típicas da Amazônia e do Alto Solimões.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">
                  Brasil — Benjamin Constant
                </p>
                <p className="text-muted-foreground">
                  Capital Cultural do Alto Solimões
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">
                  Peru — Islândia
                </p>
                <p className="text-muted-foreground">
                  Visitantes internacionais
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">
                  Colômbia — Letícia
                </p>
                <p className="text-muted-foreground">
                  União cultural amazônica
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
