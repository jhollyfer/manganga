import type * as React from 'react'

import { cn } from '#/lib/utils'

const COLORS = ['#2fbf6b', '#fbfaf5', '#e4572e', '#f2b632', '#1fa855']

/**
 * O cordão de bandeirinhas do topo do hero, o mesmo das festas de rua do
 * Coaban e dos estandartes do Caprichoso.
 *
 * Um cordão só, em curva, com as bandeirinhas presas nele. O balanço é a
 * utilidade `sway` em CSS, com `motion-reduce:animate-none` para quem pediu
 * menos movimento.
 */
export function Festoon({
  className,
  count = 18,
}: {
  className?: string
  count?: number
}): React.JSX.Element {
  const width = 1200
  const sag = 70

  return (
    <svg
      viewBox={`0 0 ${width} 140`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('sway w-full motion-reduce:animate-none', className)}
    >
      <path
        d={`M0 8 Q${width / 2} ${8 + sag * 2} ${width} 8`}
        stroke="#fbfaf5"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        fill="none"
      />
      {Array.from({ length: count }, (_, index) => {
        const t = (index + 0.5) / count
        const x = t * width
        const y = 8 + sag * 4 * t * (1 - t)

        return (
          <polygon
            key={index}
            points={`${x - 18},${y} ${x + 18},${y} ${x},${y + 42}`}
            fill={COLORS[index % COLORS.length]}
          />
        )
      })}
    </svg>
  )
}
