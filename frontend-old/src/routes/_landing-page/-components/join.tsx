import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Heart } from "lucide-react";

export function Join() {
  return (
    <section id="join" className="scroll-mt-20 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Junte-se ao Boi Bumbá Mangangá e seja parte da maior tradição
            cultural do Alto Solimões.
          </p>
        </div>

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 border hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Artistas e Performers
              </h3>
              <p className="text-muted-foreground mb-6">
                Dançarinos, atores, cantores e músicos. Todos são bem-vindos
                para dar vida às nossas apresentações no Bumbódromo.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Dançarinos de todas as idades
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Músicos da Marujada de Guerra
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Atores para as alegorias
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Artistas visuais e figurinistas
                </li>
              </ul>
            </Card>

            <Card className="p-8 border hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Apoiadores e Voluntários
              </h3>
              <p className="text-muted-foreground mb-6">
                A magia acontece também nos bastidores. Precisamos de pessoas
                dedicadas para manter nossa tradição viva.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Organização de eventos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Produção de fantasias
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Marketing e comunicação
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  Apoio logístico
                </li>
              </ul>
            </Card>
          </div>

          {/* CTA Block */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para Fazer História Conosco?
            </h3>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Entre em contato e descubra como você pode contribuir para manter
              viva a mais bela tradição cultural de Benjamin Constant.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer text-lg px-8"
            >
              Saiba Mais Sobre Nós
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
