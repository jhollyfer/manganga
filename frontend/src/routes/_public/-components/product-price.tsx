import type * as React from 'react'

import type { Product } from '#/lib/store/catalog'
import {
  PIX_DISCOUNT_PERCENT,
  formatMoney,
  installments,
  pixPrice,
} from '#/lib/store/money'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const PRICE_SIZES = {
  card: 'text-body-lg',
  page: 'text-h3',
} as const

/**
 * O preço como a loja anuncia: o valor, o preço cheio riscado quando há
 * promoção, o valor no Pix e a linha das parcelas.
 *
 * As três linhas sempre juntas porque é assim que o comprador compara: quem
 * vê só "R$ 89,90" não sabe que no Pix sai mais barato, e é o Pix que a loja
 * prefere receber.
 */
export function ProductPrice({
  product,
  size = 'card',
  className,
}: {
  product: Product
  size?: keyof typeof PRICE_SIZES
  className?: string
}): React.JSX.Element {
  const plan = installments(product.price)

  return (
    <div data-slot="product-price" className={cn('grid gap-0.5', className)}>
      <p className="flex flex-wrap items-baseline gap-x-2">
        {product.compareAt && product.compareAt > product.price && (
          <s className="text-small text-muted-foreground">
            <span className="sr-only">{m.product_priceFrom()} </span>
            {formatMoney(product.compareAt)}
          </s>
        )}
        <span
          className={cn(
            'font-semibold text-foreground tabular-nums',
            PRICE_SIZES[size],
          )}
        >
          {formatMoney(product.price)}
        </span>
      </p>
      <p className="text-small text-primary">
        {m.store_pixPrice({
          price: formatMoney(pixPrice(product.price)),
          percent: PIX_DISCOUNT_PERCENT,
        })}
      </p>
      {plan.count > 1 && (
        <p className="text-micro text-muted-foreground">
          {m.store_installments({
            count: plan.count,
            value: formatMoney(plan.value),
          })}
        </p>
      )}
    </div>
  )
}
