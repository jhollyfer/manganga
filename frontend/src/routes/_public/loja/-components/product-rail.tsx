import type * as React from 'react'

import { ProductCard } from './product-card'
import { REVEAL, STAGGER } from '../../-components/reveal'
import { SectionHeading } from '../../-components/section-heading'
import type { Product } from '#/lib/store/catalog'
import { cn } from '#/lib/utils'

/**
 * Uma prateleira da loja: título de seção e um trilho horizontal de cartões.
 *
 * Trilho e não grade porque é vitrine de passagem (destaques, novidades,
 * promoções, relacionados): no celular a pessoa desliza com o polegar e vê
 * que há mais sem rolar a página inteira para baixo. O trilho sai da margem
 * do contêiner até a borda da tela, como no Caprichoso, para o cartão cortado
 * na direita dizer "tem mais aqui".
 */
export function ProductRail({
  id,
  eyebrow,
  title,
  lead,
  action,
  products,
  className,
}: {
  /** O `id` do título, que nomeia a lista para o leitor de tela. */
  id: string
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  action?: React.ReactNode
  products: ReadonlyArray<Product>
  className?: string
}): React.JSX.Element | null {
  if (products.length === 0) return null

  return (
    <section
      data-slot="product-rail"
      aria-labelledby={id}
      className={cn('py-16 md:py-24', className)}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id={id}>{title}</span>}
          lead={lead}
          action={action}
        />
      </div>
      <ul
        className="rail gap-4 scroll-px-4 px-4 pb-2 md:gap-6 md:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        aria-labelledby={id}
      >
        {products.map((product, index) => (
          <li
            key={product.slug}
            className={cn(REVEAL, 'w-[15.5rem] shrink-0 md:w-[17.5rem]')}
            style={{ animationDelay: `${Math.min(index, 6) * STAGGER}ms` }}
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
