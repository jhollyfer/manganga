import { SEASON_YEAR } from '#/lib/site'
import type { Badge } from '#/lib/store/catalog'
import type { Sort } from '#/lib/store/listing'
import type { ShippingMethod, ShippingOption } from '#/lib/store/shipping'
import { m } from '#/paraglide/messages'

/**
 * Os rótulos dos valores fechados da loja: ordem da vitrine, selo do produto
 * e forma de entrega.
 *
 * Aqui e não em `lib/labels.ts` porque só a loja os desenha, e o critério do
 * repositório é o ancestral comum de quem consome. Mesmo desenho de lá:
 * função e não string, para a mensagem ser lida no render, no idioma de quem
 * visita, e `Record` de chave fechada, para valor novo sem rótulo não
 * compilar.
 */
export const SORT_LABELS: Record<Sort, () => string> = {
  relevance: () => m.store_sortRelevance(),
  bestsellers: () => m.store_sortBestsellers(),
  newest: () => m.store_sortNewest(),
  'price-asc': () => m.store_sortPriceAsc(),
  'price-desc': () => m.store_sortPriceDesc(),
  name: () => m.store_sortName(),
}

export const BADGE_LABELS: Record<Badge, () => string> = {
  new: () => m.store_badgeNew(),
  bestseller: () => m.store_badgeBestseller(),
  season: () => m.store_badgeSeason({ year: SEASON_YEAR }),
}

export const SHIPPING_METHOD_LABELS: Record<ShippingMethod, () => string> = {
  pickup: () => m.store_shippingPickup(),
  standard: () => m.store_shippingStandard(),
  express: () => m.store_shippingExpress(),
}

/**
 * O prazo de uma opção de entrega, por extenso.
 *
 * A retirada não tem prazo de viagem, então diz onde e quando retirar em vez
 * de "0 a 0 dias úteis".
 */
export function shippingDeadline(option: ShippingOption): string {
  if (option.method === 'pickup') return m.store_shippingPickupDeadline()

  const [min, max] = option.days

  return m.store_shippingDays({ min, max })
}
