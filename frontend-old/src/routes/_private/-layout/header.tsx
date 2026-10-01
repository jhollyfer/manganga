// import { Pesquisar } from "@/components/pesquisar";
// import { ThemeToggle } from "@/components/theme-toggle";
import { InputSearch } from "@/components/input-search";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "@tanstack/react-router";
// import { useLocation } from "react-router";
// import { Profile } from "./profile";

export function Header() {
  const location = useLocation();

  console.log(location);
  const rotasSemPesquisa = ["/dashboard"];

  const exibirPesquisa = !rotasSemPesquisa.some(
    (rota) => location.pathname === rota || location.pathname.endsWith(rota)
  );

  return (
    <header className="w-full py-4 inline-flex gap-2 justify-center border-b ">
      <nav className="container max-w-full items-center inline-flex justify-between gap-4 h-8">
        <SidebarTrigger
          className="cursor-pointer rounded-sm shadow-none h-full w-8"
          variant="outline"
          size="icon"
        />
        <div className="inline-flex gap-2 w-full items-center">
          {exibirPesquisa && <InputSearch />}
        </div>
        <div className="inline-flex gap-2">{/* <Profile /> */}</div>
      </nav>
    </header>
  );
}
