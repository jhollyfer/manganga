import type * as React from 'react'

import { PIX_DISCOUNT_PERCENT, formatMoney } from '#/lib/store/money'
import type { Cents, Installments } from '#/lib/store/money'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

function Row({
  label,
  children,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}): React.JSX.Element {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <dt>{label}</dt>
      <dd className="text-right tabular-nums">{children}</dd>
    </div>
  )
}

/**
 * O resumo de valores: subtotal, cupom, frete e total, e as alternativas de
 * pagamento abaixo do total.
 *
 * Uma peça só para o carrinho, o checkout e a confirmação, porque são três
 * telas que a pessoa compara entre si: se o desconto aparece numa linha
 * diferente em cada uma, parece que o número mudou.
 */
export function OrderSummary({
  subtotal,
  discount,
  coupon,
  pixDiscount = 0,
  shipping,
  total,
  pixTotal,
  installments,
  className,
}: {
  subtotal: Cents
  discount: Cents
  coupon: string | null
  /** O desconto do Pix já aplicado, na confirmação de um pedido em Pix. */
  pixDiscount?: Cents
  /** `null` enquanto não há CEP: o frete fica "a calcular". */
  shipping: Cents | null
  total: Cents
  /** O total no Pix, mostrado como alternativa sob o total. */
  pixTotal?: Cents
  installments?: Installments
  className?: string
}): React.JSX.Element {
  let freight: React.ReactNode = m.store_summaryShippingPending()
  if (shipping === 0) freight = m.store_shippingFree()
  if (shipping !== null && shipping > 0) freight = formatMoney(shipping)

  return (
    <div
      data-slot="order-summary"
      className={cn('grid gap-3 text-small', className)}
    >
      <dl className="grid gap-3">
        <Row label={m.store_summarySubtotal()}>{formatMoney(subtotal)}</Row>
        {discount > 0 && (
          <Row
            label={m.store_summaryCoupon({ code: coupon ?? '' })}
            className="text-primary"
          >
            {'-'.concat(formatMoney(discount))}
          </Row>
        )}
        {pixDiscount > 0 && (
          <Row
            label={m.store_pixLabel({ percent: PIX_DISCOUNT_PERCENT })}
            className="text-primary"
          >
            {'-'.concat(formatMoney(pixDiscount))}
          </Row>
        )}
        <Row label={m.store_summaryShipping()}>{freight}</Row>
        <Row
          label={m.store_summaryTotal()}
          className="mt-2 border-t border-border pt-4 text-body-lg font-semibold"
        >
          {formatMoney(total)}
        </Row>
      </dl>
      {pixTotal !== undefined && (
        <p className="text-right text-small text-primary">
          {m.store_summaryPix({
            price: formatMoney(pixTotal),
            percent: PIX_DISCOUNT_PERCENT,
          })}
        </p>
      )}
      {installments && installments.count > 1 && (
        <p className="text-right text-micro text-muted-foreground">
          {m.store_installments({
            count: installments.count,
            value: formatMoney(installments.value),
          })}
        </p>
      )}
    </div>
  )
}
