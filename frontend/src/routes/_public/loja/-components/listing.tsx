import * as React from 'react'
import {
  CaretDownIcon,
  CheckIcon,
  FunnelSimpleIcon,
  TagIcon,
} from '@phosphor-icons/react'

import { ProductCard } from '../../-components/product-card'
import { SORT_LABELS } from '../../-components/store-labels'
import { REVEAL, STAGGER } from '../../-components/reveal'
import { localized } from '#/lib/i18n'
import type { Product } from '#/lib/store/catalog'
import { SORTS, applyListing, facets } from '#/lib/store/listing'
import type { ListingSearch, Sort } from '#/lib/store/listing'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export type ListingPatch = Partial<Omit<ListingSearch, 'q'>>

/** O chip de filtro: tamanho e "só promoções". */
const CHIP =
  'inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-sm border-2 border-ink/30 px-3 text-small font-medium text-foreground/80 transition-colors hover:border-foreground/40 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background motion-reduce:transition-none'

/** Liga o filtro, ou desliga quando o clique é no que já está ligado. */
function toggle<T>(current: T | undefined, value: T): T | undefined {
  if (current === value) return undefined

  return value
}

function isSort(value: string): value is Sort {
  return SORTS.some((sort) => sort === value)
}

/**
 * A vitrine filtrável: contagem, ordem, filtros e a grade.
 *
 * Não guarda estado: tudo vem de `search`, que mora na URL, e cada clique
 * devolve só o pedaço que mudou em `onChange`. A rota decide como navegar,
 * e a mesma peça serve à vitrine da categoria e à busca.
 *
 * Os filtros são botões com `aria-pressed`, e não caixas de seleção: cada um
 * liga e desliga sozinho, e o leitor de tela anuncia "pressionado" igual ao
 * que o olho vê no chip preenchido.
 */
export function Listing({
  products,
  search,
  onChange,
  onClear,
  emptyAction,
}: {
  /** A vitrine antes dos filtros: a categoria inteira, ou o catálogo. */
  products: ReadonlyArray<Product>
  search: ListingSearch
  onChange: (patch: ListingPatch) => void
  onClear: () => void
  /** O que oferecer quando nada sobra, além de limpar os filtros. */
  emptyAction?: React.ReactNode
}): React.JSX.Element {
  const shown = applyListing(products, search)
  const { sizes, colors } = facets(products)
  const filtered = Boolean(search.size || search.color || search.sale)
  const panelId = React.useId()
  /*
   * No celular os filtros começam fechados: abertos, empurrariam a primeira
   * camisa para a segunda tela. No desktop a coluna lateral fica sempre
   * aberta, e o botão some.
   */
  const [open, setOpen] = React.useState(false)

  let count = m.store_resultsMany({ count: shown.length })
  if (shown.length === 1) count = m.store_resultsOne()

  return (
    <div
      data-slot="listing"
      className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"
    >
      <aside
        aria-label={m.store_filters()}
        className="grid content-start gap-7"
      >
        <p className="eyebrow hidden text-muted-foreground lg:inline-flex">
          <FunnelSimpleIcon aria-hidden="true" className="size-4" />
          {m.store_filters()}
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="group/filters inline-flex h-11 w-fit items-center gap-2 rounded-sm border-2 border-ink/30 px-4 text-small font-semibold lg:hidden"
        >
          <FunnelSimpleIcon aria-hidden="true" className="size-4" />
          {m.store_filters()}
          {filtered && <span className="size-2 rounded-full bg-brand-urucum" />}
          <CaretDownIcon
            aria-hidden="true"
            className="size-4 transition-transform group-aria-expanded/filters:rotate-180 motion-reduce:transition-none"
          />
        </button>

        <div
          id={panelId}
          className={cn('grid content-start gap-7', !open && 'hidden lg:grid')}
        >
          {sizes.length > 0 && (
            <fieldset className="grid gap-3">
              <legend className="mb-3 text-small font-semibold">
                {m.store_filterSize()}
              </legend>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  const active = search.size === size

                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        onChange({ size: toggle(search.size, size) })
                      }
                      className={CHIP}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {colors.length > 0 && (
            <fieldset className="grid gap-3">
              <legend className="mb-3 text-small font-semibold">
                {m.store_filterColor()}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color) => {
                  const active = search.color === color.id
                  const name = localized(color.name)

                  return (
                    <button
                      key={color.id}
                      type="button"
                      aria-pressed={active}
                      aria-label={name}
                      title={name}
                      onClick={() =>
                        onChange({ color: toggle(search.color, color.id) })
                      }
                      className="group/swatch relative inline-flex size-9 items-center justify-center rounded-full ring-1 ring-foreground/20 ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground motion-reduce:transition-none"
                      style={{ backgroundColor: color.hex }}
                    >
                      <CheckIcon
                        aria-hidden="true"
                        weight="bold"
                        className="hidden size-4 text-white mix-blend-difference group-aria-pressed/swatch:block"
                      />
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div className="grid gap-3">
            <p className="text-small font-semibold">{m.store_filterOffers()}</p>
            <button
              type="button"
              aria-pressed={Boolean(search.sale)}
              onClick={() => onChange({ sale: toggle(search.sale, true) })}
              className={cn(CHIP, 'w-fit')}
            >
              <TagIcon aria-hidden="true" className="size-4" />
              {m.store_filterSaleOnly()}
            </button>
          </div>

          {filtered && (
            <button
              type="button"
              onClick={onClear}
              className="w-fit text-small font-semibold text-primary underline underline-offset-4"
            >
              {m.store_clearFilters()}
            </button>
          )}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p role="status" className="text-small text-muted-foreground">
            {count}
          </p>
          <label className="flex items-center gap-3 text-small">
            <span className="text-muted-foreground">{m.store_sortLabel()}</span>
            <select
              value={search.sort ?? 'relevance'}
              onChange={(event) => {
                const value = event.target.value
                if (!isSort(value)) return
                // A ordem padrão sai da URL: o link sem `?sort=` é o canônico.
                let sort: Sort | undefined = value
                if (value === 'relevance') sort = undefined
                onChange({ sort })
              }}
              className="h-10 rounded-sm border-2 border-ink/70 bg-surface px-4 text-small font-medium text-foreground outline-none focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/20"
            >
              {SORTS.map((sort) => (
                <option key={sort} value={sort}>
                  {SORT_LABELS[sort]()}
                </option>
              ))}
            </select>
          </label>
        </div>

        {shown.length === 0 && (
          <div className="grid justify-items-start gap-5 rounded-sm bg-secondary p-8 md:p-12">
            <h2 className="text-h3">{m.store_emptyTitle()}</h2>
            <p className="max-w-[48ch] text-body text-muted-foreground">
              {m.store_emptyLead()}
            </p>
            <div className="flex flex-wrap gap-3">
              {filtered && (
                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex h-11 items-center rounded-sm border-2 border-ink bg-primary px-5 text-micro font-bold uppercase text-primary-foreground"
                >
                  {m.store_clearFilters()}
                </button>
              )}
              {emptyAction}
            </div>
          </div>
        )}

        {/*
          `key` no estado da vitrine: trocar filtro remonta a grade, e a
          remontagem refaz a entrada em cascata, como no diário do maiyu.
        */}
        <ul
          key={JSON.stringify(search)}
          className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6"
        >
          {shown.map((product, index) => (
            <li
              key={product.slug}
              className={REVEAL}
              style={{ animationDelay: `${Math.min(index, 8) * STAGGER}ms` }}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
