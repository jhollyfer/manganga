import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { ProductBadges } from './product-badges'
import { ProductPrice } from './product-price'
import { ProductArt } from './product-art'
import { localized } from '#/lib/i18n'
import { stockLevel } from '#/lib/store/catalog'
import type { Product } from '#/lib/store/catalog'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O cartão de produto das vitrines e dos trilhos.
 *
 * O cartão inteiro é um link só, com o nome do produto como texto do link:
 * dois links (imagem e título) para o mesmo endereço fazem o leitor de tela
 * anunciar cada produto duas vezes, e o teclado passar por ele duas vezes.
 *
 * As bolinhas de cor ficam de enfeite (`aria-hidden`): a escolha da cor é na
 * página do produto, e aqui elas só dizem que há mais de uma.
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}): React.JSX.Element {
  const main = product.colors.at(0)
  const soldOut = stockLevel(product) === 'out'

  return (
    <Link
      to="/loja/produto/$slug"
      params={{ slug: product.slug }}
      data-slot="product-card"
      className={cn(
        'group flex h-full flex-col rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
        <ProductArt
          art={product.art}
          color={main?.hex ?? '#f7f6f0'}
          className="p-6 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <ProductBadges product={product} className="absolute top-3 left-3" />
        {soldOut && (
          <span className="absolute inset-x-3 bottom-3 rounded-sm bg-ink py-1.5 text-center text-micro font-semibold text-on-stage">
            {m.product_soldOut()}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        {product.colors.length > 1 && (
          <ul aria-hidden="true" className="flex gap-1.5">
            {product.colors.map((color) => (
              <li
                key={color.id}
                className="size-3.5 rounded-full ring-1 ring-foreground/20"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </ul>
        )}
        <h3 className="font-sans text-body font-medium text-foreground transition-colors group-hover:text-primary">
          {localized(product.name)}
        </h3>
        <ProductPrice product={product} className="mt-auto" />
      </div>
    </Link>
  )
}
