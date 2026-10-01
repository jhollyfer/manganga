import * as React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { localized } from '#/lib/i18n'
import { CATEGORIES } from '#/lib/store/catalog'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O link da barra. O `data-status="active"` vem do próprio `Link` do router,
 * então a vitrine marcada é a da URL, sem estado nenhum aqui.
 */
const NAV_LINK =
  'inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-small font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-foreground data-[status=active]:text-background motion-reduce:transition-none'

/**
 * A barra da loja: as vitrines e a busca, presa logo abaixo do cabeçalho.
 *
 * Presa (`sticky`) porque é o "menu da loja" que a Vitrine Azul tem no
 * topo, e quem rola uma vitrine longa quer pular para outra sem voltar lá em
 * cima. Sob o cabeçalho fixo de 64px, e não por cima dele, para a sacola e o
 * menu do site continuarem à mão.
 *
 * A busca é um `<form method="get" action="/loja/busca">`: antes da
 * hidratação ela ainda funciona como formulário comum, e depois o `submit`
 * navega pelo router sem recarregar a página.
 */
export function StoreNav({
  defaultQuery = '',
}: {
  /** O termo já buscado, para a caixa abrir preenchida na página de busca. */
  defaultQuery?: string
}): React.JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState(defaultQuery)

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const q = query.trim()

    void navigate({ to: '/loja/busca', search: { q: q || undefined } })
  }

  return (
    <div
      data-slot="store-nav"
      className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl"
    >
      <div className="container-x flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label={m.store_navLabel()} className="-mx-4 min-w-0 lg:mx-0">
          <ul className="rail gap-1 px-4 lg:px-0">
            <li>
              <Link
                to="/loja"
                activeOptions={{ exact: true }}
                className={NAV_LINK}
              >
                {m.store_navAll()}
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/loja/categoria/$slug"
                  params={{ slug: category.slug }}
                  className={NAV_LINK}
                >
                  {localized(category.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/loja/busca"
                search={{ sale: true }}
                activeOptions={{ includeSearch: true }}
                className={cn(NAV_LINK, 'text-brand-urucum')}
              >
                {m.store_navSale()}
              </Link>
            </li>
            <li>
              <Link to="/loja/ajuda" className={NAV_LINK}>
                {m.store_navHelp()}
              </Link>
            </li>
          </ul>
        </nav>

        <form
          role="search"
          method="get"
          action="/loja/busca"
          onSubmit={submit}
          className="relative w-full lg:w-72"
        >
          <label htmlFor="store-search" className="sr-only">
            {m.store_searchLabel()}
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="store-search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={m.store_searchPlaceholder()}
            maxLength={80}
            className="h-10 w-full rounded-full border border-input bg-surface pr-4 pl-10 text-small text-foreground outline-none placeholder:text-foreground/45 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/20"
          />
        </form>
      </div>
    </div>
  )
}
