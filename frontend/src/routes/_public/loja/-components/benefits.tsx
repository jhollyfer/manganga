import type * as React from 'react'
import {
  ArrowsClockwiseIcon,
  CreditCardIcon,
  PixLogoIcon,
  StorefrontIcon,
  TruckIcon,
} from '@phosphor-icons/react'

import {
  formatMoney,
  MAX_INSTALLMENTS,
  PIX_DISCOUNT_PERCENT,
} from '#/lib/store/money'
import { FREE_SHIPPING_FROM } from '#/lib/store/shipping'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A faixa de vantagens, logo abaixo do banner, como nas lojas oficiais da
 * Vitrine Azul e da Mangueira.
 *
 * Os números saem das constantes da loja (`FREE_SHIPPING_FROM`,
 * `MAX_INSTALLMENTS`, `PIX_DISCOUNT_PERCENT`) e não do texto: mudar o frete
 * grátis para R$ 300 é trocar uma constante, e a faixa acompanha sozinha.
 */
export function StoreBenefits({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const items = [
    {
      icon: TruckIcon,
      title: m.store_benefitShippingTitle({
        amount: formatMoney(FREE_SHIPPING_FROM),
      }),
      text: m.store_benefitShippingText(),
    },
    {
      icon: CreditCardIcon,
      title: m.store_benefitInstallmentsTitle({ count: MAX_INSTALLMENTS }),
      text: m.store_benefitInstallmentsText(),
    },
    {
      icon: PixLogoIcon,
      title: m.store_benefitPixTitle({ percent: PIX_DISCOUNT_PERCENT }),
      text: m.store_benefitPixText(),
    },
    {
      icon: ArrowsClockwiseIcon,
      title: m.store_benefitExchangeTitle(),
      text: m.store_benefitExchangeText(),
    },
    {
      icon: StorefrontIcon,
      title: m.store_benefitPickupTitle(),
      text: m.store_benefitPickupText(),
    },
  ]

  return (
    <section
      data-slot="store-benefits"
      aria-label={m.store_benefitsLabel()}
      className={cn('border-b border-border bg-surface', className)}
    >
      <ul className="container-x rail gap-6 py-6 lg:grid lg:grid-cols-5 lg:gap-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex w-60 shrink-0 items-start gap-3 lg:w-auto"
          >
            <item.icon
              aria-hidden="true"
              weight="duotone"
              className="mt-0.5 size-7 shrink-0 text-primary"
            />
            <span className="grid gap-0.5">
              <span className="text-small font-semibold">{item.title}</span>
              <span className="text-micro leading-snug text-muted-foreground">
                {item.text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
