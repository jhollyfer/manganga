import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ListIcon, ShoppingBagIcon } from '@phosphor-icons/react'

import { CartCount } from './cart-count'
import { LanguageSwitcher } from './language-switcher'
import { BOI_GROUP, DIRECT_LINKS, FESTIVAL_GROUP, HOME, STORE } from './menu'
import { navLinkVariants } from './nav-link'
import { PillButton } from './pill-button'
import { ThemeToggle } from '#/components/common/theme-toggle'
import { useScrolled } from './use-scrolled'
import { BrandStar } from '#/components/common/brand-mark'
import { Button } from '#/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#/components/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'
import { SITE_TITLE } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * O cabeçalho de vidro.
 *
 * O desenho do Caprichoso: barra fixa, fundo translúcido com desfoque, e um
 * fio de borda que fica mais firme quando a página rola. Translúcido e não
 * transparente porque metade das páginas abre sobre papel claro e a outra
 * metade sobre o palco escuro, e o vidro lê bem nos dois.
 *
 * "O Boi" e "O Festival" abrem painéis com descrição, como lá; notícias,
 * sócio e contato são links diretos; a loja é a pílula da direita, com a
 * sacola e a contagem do carrinho ao lado.
 */
export function Header(): React.JSX.Element {
  const scrolled = useScrolled(24)

  return (
    <header
      data-slot="site-header"
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-background/65 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-500 motion-reduce:transition-none data-[scrolled=true]:border-primary/15 data-[scrolled=true]:bg-background/85 data-[scrolled=true]:shadow-[0_8px_30px_-16px_var(--shadow-tint)]"
    >
      <div className="container-x flex h-16 items-center gap-4">
        <Link
          to={HOME.to}
          aria-label={m.a11y_home()}
          className="flex shrink-0 items-center gap-2.5 py-2"
        >
          <BrandStar className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl text-foreground italic">
              {SITE_TITLE}
            </span>
            <span className="text-2xs tracking-[0.16em] text-muted-foreground uppercase">
              {m.brand_tagline()}
            </span>
          </span>
        </Link>

        <NavigationMenu
          aria-label={m.a11y_mainNav()}
          className="mx-auto hidden xl:flex"
          align="center"
        >
          <NavigationMenuList className="gap-0.5">
            {[BOI_GROUP, FESTIVAL_GROUP].map((group) => (
              <NavigationMenuItem key={group.label()}>
                <NavigationMenuTrigger
                  className={navLinkVariants({ tone: 'bar' })}
                >
                  {group.label()}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[26rem] gap-1 p-1">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <NavigationMenuLink
                          className="flex flex-col items-start gap-0.5 rounded-xl px-3 py-2.5"
                          render={<Link to={link.to} />}
                        >
                          <span className="text-small font-semibold text-foreground">
                            {link.label()}
                          </span>
                          <span className="text-micro leading-snug text-muted-foreground">
                            {link.description()}
                          </span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {DIRECT_LINKS.map((link) => (
              <NavigationMenuItem key={link.to}>
                <NavigationMenuLink
                  className={navLinkVariants({ tone: 'bar' })}
                  render={<Link to={link.to} />}
                >
                  {link.label()}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle className="hidden size-9 rounded-full md:inline-flex" />
          <CartButton />
          <PillButton
            scale="md"
            className="hidden md:inline-flex"
            render={
              <Link to={STORE.to}>
                <ShoppingBagIcon weight="bold" />
                {m.nav_storeCta()}
              </Link>
            }
          />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

/** A sacola com a contagem: leva direto ao carrinho. */
function CartButton(): React.JSX.Element {
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      nativeButton={false}
      className="relative size-10 rounded-full"
      render={
        <Link to="/loja/carrinho" aria-label={m.a11y_openCart()}>
          <ShoppingBagIcon className="size-5" />
          <CartCount className="absolute -top-0.5 -right-0.5" />
        </Link>
      }
    />
  )
}

/**
 * O menu do celular: painel lateral com os dois grupos e os links diretos.
 *
 * Cada link fecha o painel com `SheetClose render={<Link />}`, e não com um
 * `onClick` que mexe em estado: a navegação e o fechamento saem do mesmo
 * clique, e o componente continua não controlado.
 */
function MobileMenu(): React.JSX.Element {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="size-11 rounded-full xl:hidden"
            aria-label={m.a11y_openMenu()}
          >
            <ListIcon className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto bg-background px-5 pt-16 pb-8 sm:max-w-sm"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{SITE_TITLE}</SheetTitle>
          <SheetDescription>{m.a11y_mainNav()}</SheetDescription>
        </SheetHeader>

        <nav aria-label={m.a11y_mainNav()} className="grid gap-8">
          {[BOI_GROUP, FESTIVAL_GROUP].map((group) => (
            <div key={group.label()}>
              <p className="eyebrow mb-2 text-primary">{group.label()}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          to={link.to}
                          className={navLinkVariants({ tone: 'sheet' })}
                        >
                          {link.label()}
                        </Link>
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul>
            {[...DIRECT_LINKS, STORE].map((link) => (
              <li key={link.to}>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      to={link.to}
                      className={navLinkVariants({ tone: 'sheet' })}
                    >
                      {link.label()}
                    </Link>
                  }
                />
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="mt-8 flex-row items-center justify-between gap-4 px-0">
          <LanguageSwitcher />
          <ThemeToggle className="size-11 rounded-full" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
