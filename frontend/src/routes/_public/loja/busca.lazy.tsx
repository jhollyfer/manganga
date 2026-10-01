import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { Listing } from './-components/listing'
import type { ListingPatch } from './-components/listing'
import { StoreNav } from './-components/store-nav'
import { PageHero } from '../-components/page-hero'
import { localized } from '#/lib/i18n'
import { CATEGORIES, PRODUCTS } from '#/lib/store/catalog'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_public/loja/busca')

export const Route = createLazyFileRoute('/_public/loja/busca')({
  component: RouteComponent,
})

/**
 * O título da página, que diz o que está na tela: o termo buscado, as
 * promoções ou o catálogo inteiro. Com termo, o termo entre aspas é a
 * palavra que canta.
 */
function Title({ q, sale }: { q?: string; sale?: boolean }): React.JSX.Element {
  if (q)
    return (
      <>
        {m.store_searchResultsFor()} <em>“{q}”</em>
      </>
    )

  if (sale)
    return (
      <>
        {m.store_saleTitleStart()} <em>{m.store_saleTitleEm()}</em>
      </>
    )

  return (
    <>
      {m.store_searchAllStart()} <em>{m.store_searchAllEm()}</em>
    </>
  )
}

/**
 * A busca da loja. O termo (`q`) sobrevive a "limpar filtros": limpar é
 * tirar tamanho, cor e promoção, não desfazer a busca que a pessoa digitou.
 *
 * `key` no `StoreNav` pelo termo: a caixa de busca guarda o texto
 * digitado, e uma busca nova vinda de outro link precisa abrir a caixa com
 * o termo novo, não com o anterior.
 */
function RouteComponent(): React.JSX.Element {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  function change(patch: ListingPatch): void {
    void navigate({
      search: (previous) => ({ ...previous, ...patch }),
      replace: true,
      resetScroll: false,
    })
  }

  function clear(): void {
    void navigate({
      search: (previous) => ({ q: previous.q, sort: previous.sort }),
      replace: true,
      resetScroll: false,
    })
  }

  return (
    <>
      <PageHero
        eyebrow={m.nav_store()}
        title={<Title q={search.q} sale={search.sale} />}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.store_searchTitle() },
        ]}
        className="md:pb-16"
      />
      <StoreNav key={search.q ?? ''} defaultQuery={search.q} />
      <section className="container-x py-12 md:py-16">
        <Listing
          products={PRODUCTS}
          search={search}
          onChange={change}
          onClear={clear}
          emptyAction={
            <nav aria-label={m.store_navLabel()} className="grid gap-3">
              <p className="text-small font-semibold">
                {m.store_searchSuggestions()}
              </p>
              <ul className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to="/loja/categoria/$slug"
                      params={{ slug: category.slug }}
                      className="inline-flex h-10 items-center rounded-sm border-2 border-ink/30 bg-surface px-4 text-small font-medium hover:border-primary/50"
                    >
                      {localized(category.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          }
        />
      </section>
    </>
  )
}
