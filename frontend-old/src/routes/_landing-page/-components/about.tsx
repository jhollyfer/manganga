import boiMangangaImage from "@/assets/boi-manganga.jpg";
import { Card } from "@/components/ui/card";
import { Music, Trophy, Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={boiMangangaImage}
              alt="Boi Bumbá Mangangá"
              className="w-full rounded-2xl shadow-lg"
              loading="lazy"
              width={800}
              height={600}
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Boi Bumbá Mangangá
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Desde <strong className="text-foreground">1992</strong>, o Boi
                Bumbá Mangangá representa o orgulho e a tradição do bairro da
                Coaban (Javarizinho). Fundado pelo pescador{" "}
                <strong className="text-foreground">Raimundo Dimas</strong>, de
                origens nordestinas, nasceu no beco 50 e conquistou o coração de
                toda Benjamin Constant.
              </p>

              <div className="border-l-4 border-primary pl-6 py-2">
                <p className="font-semibold text-foreground mb-1">
                  O Boi Besouro — O Boi do Alagado
                </p>
                <p>
                  Nosso boi é <strong className="text-foreground">branco</strong>{" "}
                  com uma{" "}
                  <strong className="text-foreground">estrela verde na testa</strong>,
                  simbolizando a força e a resistência dos pescadores e
                  agricultores que enfrentam anualmente as cheias do rio
                  Javarizinho.
                </p>
              </div>

              <p>
                O que começou como entretenimento nos forros de rua locais,
                rapidamente ganhou reconhecimento e se tornou o{" "}
                <strong className="text-foreground">maior campeão</strong> do
                Festival Folclórico Benjaminense, com diversos títulos
                conquistados ao longo de mais de três décadas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1992</div>
                <div className="text-sm text-muted-foreground">
                  Ano de Fundação
                </div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm text-muted-foreground">
                  Anos de História
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Tradição Section */}
        <div className="mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Tradição e Cultura
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Music className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Marujada de Guerra
              </h4>
              <p className="text-muted-foreground">
                Nossa tradição musical única, onde a Marujada de Guerra traz o
                ritmo especial para as apresentações no Bumbódromo.
              </p>
            </Card>

            <Card className="p-8 border hover:border-primary transition-colors duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Trophy className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Maior Campeão
              </h4>
              <p className="text-muted-foreground">
                Diversos títulos conquistados ao longo dos anos, consolidando
                nossa posição como o boi bumbá mais vitorioso do festival.
              </p>
            </Card>

            <Card className="p-8 border hover:border-primary transition-colors duration-200 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Trilogia Cultural
              </h4>
              <p className="text-muted-foreground">
                Representa oficialmente a trilogia cultural do município,
                simbolizando o orgulho de toda a comunidade benjaminense.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
