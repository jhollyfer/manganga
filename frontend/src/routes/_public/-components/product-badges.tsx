import type * as React from 'react'

import { BADGE_LABELS } from './store-labels'
import type { Badge, Product } from '#/lib/store/catalog'
import { discountPercent } from '#/lib/store/money'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A cor de cada selo. Texto e não etiqueta colada sobre o desenho do
 * produto: a etiqueta preta por cima da imagem tampava o produto e repetia em
 * todo cartão o mesmo enfeite.
 */
const BADGE_TONES: Record<Badge, string> = {
  new: 'text-primary',
  bestseller: 'text-foreground',
  season: 'text-muted-foreground',
}

const PILL = 'text-micro font-semibold'

/**
 * Os selos do produto: novidade, mais vendido, coleção da temporada e o
 * percentual da promoção.
 *
 * O desconto sai do preço, e não de um selo escrito no catálogo: um selo de
 * "-20%" digitado à mão continua lá depois que a promoção acaba.
 */
export function ProductBadges({
  product,
  className,
}: {
  product: Product
  className?: string
}): React.JSX.Element | null {
  let percent = 0
  if (product.compareAt)
    percent = discountPercent(product.price, product.compareAt)

  if (product.badges.length === 0 && percent === 0) return null

  return (
    <ul
      data-slot="product-badges"
      className={cn('flex flex-wrap gap-x-3 gap-y-1', className)}
    >
      {percent > 0 && (
        <li className={cn(PILL, 'text-primary')}>
          {m.store_badgeDiscount({ percent })}
        </li>
      )}
      {product.badges.map((badge) => (
        <li key={badge} className={cn(PILL, BADGE_TONES[badge])}>
          {BADGE_LABELS[badge]()}
        </li>
      ))}
    </ul>
  )
}
