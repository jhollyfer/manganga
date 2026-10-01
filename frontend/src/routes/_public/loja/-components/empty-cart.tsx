import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ShoppingBagIcon } from '@phosphor-icons/react'

import { PillButton } from '../../-components/pill-button'
import { Skeleton } from '#/components/ui/skeleton'
import { m } from '#/paraglide/messages'

/**
 * O carrinho vazio, no carrinho e no checkout. No checkout ele é o que
 * sobra de quem abre o endereço direto, ou volta depois de fechar o pedido:
 * não há o que finalizar, e a saída é a mesma vitrine.
 */
export function EmptyCart({
  title,
  lead,
}: {
  title: string
  lead: string
}): React.JSX.Element {
  return (
    <div className="mx-auto grid max-w-xl justify-items-center gap-5 py-10 text-center">
      <span className="inline-flex size-20 items-center justify-center rounded-full bg-secondary">
        <ShoppingBagIcon className="size-9 text-primary" />
      </span>
      <h2 className="text-h2">{title}</h2>
      <p className="text-body-lg text-muted-foreground">{lead}</p>
      <PillButton render={<Link to="/loja" />}>
        {m.store_cartEmptyCta()}
        <ArrowRightIcon />
      </PillButton>
    </div>
  )
}

/**
 * O esqueleto do carrinho e do checkout, enquanto o navegador não leu o
 * `localStorage`. Mesma grade da tela pronta, para nada pular de lugar.
 */
export function CartSkeleton(): React.JSX.Element {
  return (
    <div
      aria-busy="true"
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]"
    >
      <span className="sr-only">{m.store_loading()}</span>
      <div className="grid content-start gap-4">
        <Skeleton className="h-32 rounded-sm" />
        <Skeleton className="h-32 rounded-sm" />
      </div>
      <Skeleton className="h-80 rounded-sm" />
    </div>
  )
}
