import type * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { ArrowRightIcon, WhatsappLogoIcon } from '@phosphor-icons/react'

import { StoreBenefits } from './-components/benefits'
import { HelpCards } from './-components/help-cards'
import { ProductRail } from '../-components/product-rail'
import { StoreNav } from './-components/store-nav'
import { PillButton } from '../-components/pill-button'
import { ProductArt } from '../-components/product-art'
import { REVEAL, STAGGER } from '../-components/reveal'
import { SectionAction, SectionHeading } from '../-components/section-heading'
import { localized } from '#/lib/i18n'
import { SEASON_YEAR, WHATSAPP_URL } from '#/lib/site'
import {
  CATEGORIES,
  PRODUCTS,
  findProduct,
  onSale,
  productsIn,
} from '#/lib/store/catalog'
import { applyListing } from '#/lib/store/listing'
import { formatMoney } from '#/lib/store/money'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/loja/')({
  component: RouteComponent,
})

/** Quantos cartões cada prateleira mostra antes do "ver todos". */
const SHELF = 8

/** A peça do banner: a camisa da temporada, que é o que a loja mais vende. */
const FEATURED = findProduct('camisa-oficial-2026')

const BESTSELLERS = applyListing(PRODUCTS, { sort: 'bestsellers' }).slice(
  0,
  SHELF,
)
const NEWEST = applyListing(PRODUCTS, { sort: 'newest' }).slice(0, SHELF)
const SALE = onSale()

/**
 * A capa de cada vitrine: o produto mais vendido dela, na cor principal.
 * Calculado do catálogo e não escolhido à mão, para uma vitrine nova já
 * nascer com capa.
 */
const CATEGORY_COVERS = CATEGORIES.map((category) => {
  const products = productsIn(category.slug).sort((a, b) => a.rank - b.rank)

  return { category, cover: products.at(0), count: products.length }
})

/**
 * A vitrine da loja, no desenho das lojas oficiais de boi (a Vitrine Azul do
 * Caprichoso, a da Mangueira) mas dentro da casca do site: banner da
 * coleção, faixa de vantagens, vitrines, prateleiras e a ajuda no fim.
 *
 * As prateleiras são calculadas uma vez no carregamento do módulo: o
 * catálogo é estático, e a ordem dele não muda entre um render e outro.
 */
function RouteComponent(): React.JSX.Element {
  return (
    <>
      <SeasonBanner />
      <StoreNav />
      <StoreBenefits />

      <section
        data-slot="store-categories"
        aria-labelledby="loja-vitrines"
        className="py-16 md:py-24"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow={m.store_categoriesEyebrow()}
            title={
              <span id="loja-vitrines">
                {m.store_categoriesTitleStart()}{' '}
                <em>{m.store_categoriesTitleEm()}</em>
              </span>
            }
          />
          <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {CATEGORY_COVERS.map(({ category, cover, count }, index) => (
              <li
                key={category.slug}
                className={REVEAL}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <Link
                  to="/loja/categoria/$slug"
                  params={{ slug: category.slug }}
                  className="group grid h-full overflow-hidden rounded-sm bg-secondary md:grid-cols-[1fr_1.1fr]"
                >
                  <div className="aspect-square md:aspect-auto">
                    {cover && (
                      <ProductArt
                        art={cover.art}
                        color={cover.colors.at(0)?.hex ?? '#f7f6f0'}
                        className="bg-transparent p-5 transition-transform duration-700 ease-out-expo group-hover:scale-105 motion-reduce:transition-none"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-5 md:justify-center md:pl-0">
                    <h3 className="text-h4 md:text-h3">
                      {localized(category.name)}
                    </h3>
                    <p className="hidden text-small leading-relaxed text-muted-foreground sm:block">
                      {localized(category.description)}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-micro font-semibold text-primary">
                      {m.store_categoryCount({ count })}
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProductRail
        id="loja-destaques"
        eyebrow={m.store_bestsellersEyebrow()}
        title={
          <>
            {m.store_bestsellersTitleStart()}{' '}
            <em>{m.store_bestsellersTitleEm()}</em>
          </>
        }
        action={
          <SectionAction
            render={<Link to="/loja/busca" search={{ sort: 'bestsellers' }} />}
          >
            {m.store_seeAll()}
          </SectionAction>
        }
        products={BESTSELLERS}
        className="bg-surface"
      />

      <ProductRail
        id="loja-lancamentos"
        eyebrow={m.store_newestEyebrow()}
        title={
          <>
            {m.store_newestTitleStart()} <em>{m.store_newestTitleEm()}</em>
          </>
        }
        action={
          <SectionAction
            render={<Link to="/loja/busca" search={{ sort: 'newest' }} />}
          >
            {m.store_seeAll()}
          </SectionAction>
        }
        products={NEWEST}
      />

      <ProductRail
        id="loja-promocoes"
        eyebrow={m.store_saleEyebrow()}
        title={
          <>
            {m.store_saleTitleStart()} <em>{m.store_saleTitleEm()}</em>
          </>
        }
        action={
          <SectionAction
            render={<Link to="/loja/busca" search={{ sale: true }} />}
          >
            {m.store_seeAll()}
          </SectionAction>
        }
        products={SALE}
        className="bg-surface"
      />

      <Welcome />
    </>
  )
}

/**
 * O banner da coleção, no palco escuro: a camisa da temporada desenhada
 * grande, com o preço ao lado, e as duas saídas (a peça e a vitrine).
 */
function SeasonBanner(): React.JSX.Element {
  return (
    <section
      data-slot="season-banner"
      className="stage relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20"
    >
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className={cn(REVEAL, 'eyebrow mb-5 text-primary-glow')}>
            {m.store_heroEyebrow({ year: SEASON_YEAR })}
          </p>
          <h1
            className={cn(
              REVEAL,
              'text-display text-on-stage delay-75 [&_em]:text-primary-glow',
            )}
          >
            {m.store_heroTitleStart()} <em>{m.store_heroTitleEm()}</em>{' '}
            {m.store_heroTitleEnd({ year: SEASON_YEAR })}
          </h1>
          <p
            className={cn(
              REVEAL,
              'mt-6 max-w-[48ch] text-lead leading-snug text-on-stage/75 delay-150',
            )}
          >
            {m.store_heroLead()}
          </p>
          <div className={cn(REVEAL, 'mt-9 flex flex-wrap gap-3 delay-200')}>
            {FEATURED && (
              <PillButton
                tone="light"
                render={
                  <Link
                    to="/loja/produto/$slug"
                    params={{ slug: FEATURED.slug }}
                  />
                }
              >
                {m.store_heroCta()}
                <ArrowRightIcon />
              </PillButton>
            )}
            <PillButton
              tone="light-outline"
              render={
                <Link to="/loja/categoria/$slug" params={{ slug: 'camisas' }} />
              }
            >
              {m.store_heroSecondary()}
            </PillButton>
          </div>
        </div>

        {FEATURED && (
          <div
            className={cn(
              REVEAL,
              'relative mx-auto aspect-square w-full max-w-md delay-200 zoom-in-95 duration-1000',
            )}
          >
            <ProductArt
              art={FEATURED.art}
              color={FEATURED.colors.at(0)?.hex ?? '#f7f6f0'}
              label={localized(FEATURED.name)}
              className="relative bg-transparent float-gentle motion-reduce:animate-none"
            />
            <p className="absolute right-0 bottom-6 rounded-sm bg-on-stage px-4 py-3 text-stage shadow-xl md:right-4">
              <span className="block text-micro font-semibold tracking-[0.12em] uppercase opacity-70">
                {localized(FEATURED.name)}
              </span>
              <span className="text-h4 font-semibold tabular-nums">
                {formatMoney(FEATURED.price)}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

/** O bloco institucional e os atalhos da ajuda, no fim da vitrine. */
function Welcome(): React.JSX.Element {
  return (
    <section
      data-slot="store-welcome"
      aria-labelledby="loja-boas-vindas"
      className="py-16 md:py-24"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className={REVEAL}>
          <p className="eyebrow mb-4 text-primary-glow">{m.nav_store()}</p>
          <h2
            id="loja-boas-vindas"
            className="text-h2 [&_em]:text-primary-glow"
          >
            {m.store_welcomeTitleStart()} <em>{m.store_welcomeTitleEm()}</em>
          </h2>
          <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
            {m.store_welcomeText()}
          </p>
          <p className="mt-4 text-body leading-relaxed text-muted-foreground">
            {m.store_welcomeDemo()}
          </p>
          <PillButton
            tone="outline"
            className="mt-8"
            render={
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <WhatsappLogoIcon />
            {m.store_welcomeWhatsapp()}
          </PillButton>
        </div>
        <HelpCards />
      </div>
    </section>
  )
}
