import { localized } from '#/lib/i18n'

import type { Product } from './catalog'

/**
 * O estado de uma vitrine da loja: ordem, filtros e página, na URL.
 *
 * Na URL e não em `useState`: o link de "camisas verdes, menor preço" que
 * alguém manda no grupo da galera precisa abrir a mesma vitrine do outro lado.
 *
 * Validado à mão, como o filtro do diário do maiyu: o `validateSearch` do
 * router é síncrono, e o VineJS não é. Valor desconhecido cai fora em vez de
 * quebrar a página, porque endereço de vitrine é colado e editado à mão.
 */
export const SORTS = [
  'relevance',
  'bestsellers',
  'newest',
  'price-asc',
  'price-desc',
  'name',
] as const

export type Sort = (typeof SORTS)[number]

export type ListingSearch = {
  sort?: Sort
  size?: string
  color?: string
  /** Só o que está em promoção. */
  sale?: boolean
  q?: string
}

function isSort(value: unknown): value is Sort {
  return SORTS.some((sort) => sort === value)
}

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined

  const trimmed = value.trim().slice(0, max)
  if (!trimmed) return undefined

  return trimmed
}

export function validateListingSearch(
  search: Record<string, unknown>,
): ListingSearch {
  const result: ListingSearch = {}

  if (isSort(search.sort)) result.sort = search.sort

  const size = text(search.size, 8)
  if (size) result.size = size

  const color = text(search.color, 32)
  if (color) result.color = color

  if (search.sale === true || search.sale === 'true') result.sale = true

  const q = text(search.q, 80)
  if (q) result.q = q

  return result
}

/**
 * Tira acento e caixa: quem busca "bone" precisa achar "Boné", e o teclado do
 * celular nem sempre tem o acento à mão.
 */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

/** Se o produto casa com o termo, pelo nome e pelo resumo no idioma atual. */
export function matchesQuery(product: Product, q: string): boolean {
  const haystack = normalize(
    `${localized(product.name)} ${localized(product.summary)}`,
  )

  return normalize(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

const COMPARATORS: Record<Sort, (a: Product, b: Product) => number> = {
  relevance: (a, b) => a.rank - b.rank,
  bestsellers: (a, b) => a.rank - b.rank,
  newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  name: (a, b) => localized(a.name).localeCompare(localized(b.name)),
}

/** A vitrine depois dos filtros e da ordem. Não muda a lista recebida. */
export function applyListing(
  products: ReadonlyArray<Product>,
  search: ListingSearch,
): Array<Product> {
  const filtered = products.filter((product) => {
    if (search.size && !product.sizes.includes(search.size)) return false
    if (
      search.color &&
      !product.colors.some((color) => color.id === search.color)
    )
      return false
    if (search.sale && !(product.compareAt && product.compareAt > product.price))
      return false
    if (search.q && !matchesQuery(product, search.q)) return false

    return true
  })

  return filtered.sort(COMPARATORS[search.sort ?? 'relevance'])
}

/** As opções de filtro que a vitrine oferece: só o que existe nela. */
export function facets(products: ReadonlyArray<Product>): {
  sizes: Array<string>
  colors: Array<Product['colors'][number]>
} {
  const sizes = [...new Set(products.flatMap((product) => product.sizes))]
  const colors = new Map<string, Product['colors'][number]>()

  for (const product of products)
    for (const color of product.colors) colors.set(color.id, color)

  return { sizes, colors: [...colors.values()] }
}
