import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { Listing } from '../-components/listing'
import type { ListingPatch } from '../-components/listing'
import { StoreNav } from '../-components/store-nav'
import { PageHero } from '../../-components/page-hero'
import {
  NotFoundPage,
  NotFoundPageActions,
  NotFoundPageDescription,
  NotFoundPageHomeButton,
  NotFoundPageTitle,
} from '#/components/common/not-found-page'
import { localized } from '#/lib/i18n'
import { productsIn } from '#/lib/store/catalog'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_public/loja/categoria/$slug')

export const Route = createLazyFileRoute('/_public/loja/categoria/$slug')({
  component: RouteComponent,
  notFoundComponent: CategoryNotFound,
})

/**
 * A vitrine que não existe. Quem chega aqui quase sempre veio de um link
 * antigo de uma categoria que mudou de nome, e o que precisa saber é que a
 * loja continua ali.
 */
function CategoryNotFound(): React.JSX.Element {
  return (
    <NotFoundPage className="min-h-[80dvh]">
      <NotFoundPageTitle>{m.store_categoryNotFound()}</NotFoundPageTitle>
      <NotFoundPageDescription>
        {m.store_categoryNotFoundLead()}
      </NotFoundPageDescription>
      <NotFoundPageActions>
        <NotFoundPageHomeButton to="/loja">
          {m.store_backToStore()}
        </NotFoundPageHomeButton>
      </NotFoundPageActions>
    </NotFoundPage>
  )
}

/**
 * Uma vitrine da loja. O estado da vitrine é a URL: cada filtro navega com
 * `replace`, para o "voltar" do celular sair da vitrine em vez de desfazer
 * filtro por filtro, e com `resetScroll: false`, para a grade não fugir de
 * quem acabou de tocar num chip.
 */
function RouteComponent(): React.JSX.Element {
  const category = route.useLoaderData()
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
      search: (previous) => ({ sort: previous.sort }),
      replace: true,
      resetScroll: false,
    })
  }

  return (
    <>
      <PageHero
        eyebrow={m.nav_store()}
        title={
          <>
            <em>{localized(category.name)}</em>
          </>
        }
        lead={localized(category.description)}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: localized(category.name) },
        ]}
        className="md:pb-16"
      />
      <StoreNav />
      <section className="container-x py-12 md:py-16">
        <Listing
          products={productsIn(category.slug)}
          search={search}
          onChange={change}
          onClear={clear}
          emptyAction={
            <Link
              to="/loja"
              className="inline-flex h-11 items-center rounded-sm border border-foreground px-5 text-small font-semibold"
            >
              {m.store_backToStore()}
            </Link>
          }
        />
      </section>
    </>
  )
}
