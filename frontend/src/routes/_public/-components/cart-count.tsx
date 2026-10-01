import type * as React from 'react'

import { useCart } from './use-cart'
import { itemCount } from '#/lib/store/cart'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A bolinha com o número de peças no carrinho.
 *
 * Some com o carrinho vazio: um "0" pendurado na sacola chama o olho para
 * nada. O número também vai por texto para o leitor de tela, porque a bolinha
 * sozinha é só desenho.
 */
export function CartCount({
  className,
}: {
  className?: string
}): React.JSX.Element | null {
  const [cart] = useCart()
  const count = itemCount(cart)

  if (count === 0) return null

  return (
    <span
      data-slot="cart-count"
      className={cn(
        'inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-2xs leading-5 font-bold text-primary-foreground tabular-nums',
        className,
      )}
    >
      {count}
      <span className="sr-only">{m.cart_itemsInCart({ count })}</span>
    </span>
  )
}
