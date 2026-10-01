import type * as React from 'react'

import { cn } from '#/lib/utils'

/**
 * A estrela do Besouro, o símbolo do Mangangá.
 *
 * Em `common/` porque três áreas a desenham: a casca pública, a tela de
 * entrada e o painel. É a mesma estrela verde de contorno dourado da testa do
 * boi, e o mesmo desenho do `favicon.svg`.
 *
 * SVG em linha e não `<img>`: a estrela herda o tamanho do texto ao lado e não
 * custa uma requisição a mais no cabeçalho de toda página.
 */
export function BrandStar({
  className,
  ...props
}: React.ComponentProps<'svg'>): React.JSX.Element {
  return (
    <svg
      data-slot="brand-star"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn('size-7 shrink-0', className)}
      {...props}
    >
      <polygon
        points="32.00,8.00 38.47,25.10 56.73,25.97 42.46,37.40 47.28,55.03 32.00,45.00 16.72,55.03 21.54,37.40 7.27,25.97 25.53,25.10"
        fill="#1fa855"
        stroke="#f2b632"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
