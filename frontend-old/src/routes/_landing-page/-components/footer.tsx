import { Instagram, Facebook, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Boi Bumbá Mangangá</h3>
            <p className="text-primary-foreground/70 mb-6">
              Mais de 30 anos celebrando a cultura amazônica com orgulho e
              tradição. O maior campeão do Festival Folclórico Benjaminense.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Boi Bumbá Mangangá"
                className="text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook do Boi Bumbá Mangangá"
                className="text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <nav className="flex flex-col gap-3">
              <a
                href="#inicio"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:underline cursor-pointer transition-colors duration-200"
              >
                Início
              </a>
              <a
                href="#festival"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:underline cursor-pointer transition-colors duration-200"
              >
                O Festival
              </a>
              <a
                href="#about"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:underline cursor-pointer transition-colors duration-200"
              >
                Quem Somos
              </a>
              <a
                href="#join"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:underline cursor-pointer transition-colors duration-200"
              >
                Participe
              </a>
            </nav>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Localização</h4>
            <div className="flex items-start gap-3 text-primary-foreground/70">
              <MapPin className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p>Bairro Coaban (Javarizinho)</p>
                <p>Benjamin Constant — AM</p>
                <p className="mt-2">Fundado em 1992</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-primary-foreground/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Boi Bumbá Mangangá. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
