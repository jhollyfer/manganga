import type * as React from 'react'

import { BADGE_LABELS } from './store-labels'
import type { Badge, Product } from '#/lib/store/catalog'
import { discountPercent } from '#/lib/store/money'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A cor de cada selo. Cor de marca e não do tema: o selo fica sobre o
 * desenho do produto, que tem fundo próprio, e precisa ler igual no claro e
 * no escuro.
 */
const BADGE_TONES: Record<Badge, string> = {
  new: 'bg-brand-leaf text-stage',
  bestseller: 'bg-brand-gold text-stage',
  season: 'bg-brand-forest text-white',
}

const PILL =
  'inline-flex h-6 items-center rounded-full px-2.5 text-2xs font-bold tracking-[0.08em] uppercase'

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
      className={cn('flex flex-wrap gap-1.5', className)}
    >
      {percent > 0 && (
        <li className={cn(PILL, 'bg-brand-urucum text-white')}>
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
