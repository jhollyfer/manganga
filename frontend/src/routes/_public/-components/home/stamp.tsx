import type * as React from 'react'

import { BrandStar } from '#/components/common/brand-mark'
import { cn } from '#/lib/utils'

/**
 * O selo redondo, o carimbo do canto do cartaz: texto em volta, a estrela do
 * Besouro no meio. Gira devagar (`spin-slow`) e para para quem pediu menos
 * movimento.
 *
 * O texto vai uma vez só para o leitor de tela, como rótulo; o desenho é
 * decoração.
 */
export function Stamp({
  text,
  className,
}: {
  text: string
  className?: string
}): React.JSX.Element {
  return (
    <div
      role="img"
      aria-label={text}
      className={cn('relative size-36 text-ink', className)}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="spin-slow absolute inset-0 size-full motion-reduce:animate-none"
      >
        <defs>
          <path
            id="selo-circulo"
            d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--brand-stamp, #e8a71c)" />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3 5"
        />
        <text
          fill="currentColor"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="20"
          letterSpacing="2.5"
        >
          <textPath href="#selo-circulo">{text}</textPath>
        </text>
      </svg>
      <BrandStar className="absolute inset-0 m-auto size-14" />
    </div>
  )
}
