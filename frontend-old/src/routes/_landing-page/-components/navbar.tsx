import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "O Festival", href: "#festival" },
  { label: "Quem Somos", href: "#about" },
  { label: "Participe", href: "#join" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a
          href="#inicio"
          className="text-xl font-bold cursor-pointer transition-colors duration-200 hover:text-primary"
          style={{ color: scrolled ? undefined : "white" }}
        >
          Mangangá
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "cursor-pointer",
                  !scrolled && "text-white hover:bg-white/10"
                )}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center justify-between px-2">
                  <span className="text-lg font-bold">Mangangá</span>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      aria-label="Fechar menu"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4 px-2">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        className="text-base font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
