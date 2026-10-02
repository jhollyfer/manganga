import * as React from 'react'

import { H, SCENES, SCENE_SPECS, W, starPoints } from '#/lib/scenery'
import type { ArtworkKey } from '#/lib/media'
import { cn } from '#/lib/utils'

/**
 * As cenas do Alto Solimões, desenhadas em SVG no lugar das fotos.
 *
 * As duas fotos do acervo eram geradas por IA, e foto gerada denuncia o site
 * inteiro. Até chegarem fotos de verdade do curral e da arena, a imagem é
 * paisagem desenhada em código, como o céu do maiyu (`sky.tsx`): a mata
 * ribeirinha, o rio, as palafitas do Coaban, a canoa, a arena com o cordão de
 * luzes, a fogueira e a estrela verde do Besouro.
 *
 * Dia no tema claro, noite de festival no escuro. Quem decide é CSS
 * (`.scene-day` e `.scene-night`, em `styles.css`), sem ler o tema em
 * JavaScript: o tema chega pelo script do `next-themes` antes da hidratação, e
 * decidir em React desenharia o céu errado no primeiro quadro. As cores são
 * tokens (`--sky-*`, `--forest-*`, `--river*`, `--lights`, `--star`).
 *
 * Mora em `components/common/` porque a casca pública, a página de erro e a
 * entrada do painel desenham a mesma paisagem.
 */

/**
 * Uma cena. Sem `label` ela é decorativa e some para o leitor de tela; com
 * `label` ela vira imagem com nome, que é o caso da galeria.
 *
 * `preserveAspectRatio="xMidYMax slice"` é o `object-fit: cover` do SVG
 * ancorado embaixo: o cartão estreito corta o céu dos lados, nunca a mata e o
 * rio. Os ids dos degradês saem de `useId` porque a mesma cena aparece mais
 * de uma vez na página, e id repetido faz a segunda pintar com o degradê da
 * primeira (ou com nenhum, quando a primeira está escondida).
 */
export function Scene({
  scene,
  label,
  className,
}: {
  scene: ArtworkKey
  label?: string
  className?: string
}): React.JSX.Element {
  const id = React.useId()
  const spec = SCENE_SPECS[scene]
  const g = SCENES[scene]
  const sky = `${id}-sky`
  const river = `${id}-river`
  const glow = `${id}-glow`

  let a11y: React.SVGProps<SVGSVGElement> = { 'aria-hidden': true }
  if (label) a11y = { role: 'img', 'aria-label': label }

  const [sx, sy, sr] = spec.sun
  const [bx, by, br] = spec.besouro
  const besouro = (
    <polygon
      points={starPoints(bx, by, br)}
      fill="var(--star)"
      stroke="var(--lights)"
      strokeWidth={br * 0.05}
      strokeLinejoin="round"
    />
  )

  return (
    <svg
      data-slot="scene"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      {...a11y}
      className={cn('block size-full', className)}
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-top)" />
          <stop offset="1" stopColor="var(--sky-low)" />
        </linearGradient>
        <linearGradient id={river} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--river)" />
          <stop offset="1" stopColor="var(--river-deep)" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="var(--lights)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--lights)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${sky})`} />

      <g className="scene-day">
        {!spec.besouroByDay && (
          <>
            <circle
              cx={sx}
              cy={sy}
              r={sr * 1.7}
              fill="var(--sun)"
              opacity="0.35"
            />
            <circle cx={sx} cy={sy} r={sr} fill="var(--sun)" />
          </>
        )}
        {spec.besouroByDay && besouro}
      </g>
      <g className="scene-night">
        {g.stars.map((star) => (
          <circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="var(--star-dust)"
            className="twinkle motion-reduce:animate-none"
            style={{ animationDelay: `-${star.delay}s` }}
          />
        ))}
        <circle cx={bx} cy={by} r={br * 2.2} fill={`url(#${glow})`} />
        {besouro}
      </g>

      <path d={g.back} fill="var(--forest-back)" />
      {g.giants.map((d) => (
        <path key={d} d={d} fill="var(--forest-back)" />
      ))}
      {g.arena && (
        <g>
          <path
            d={g.arena.arch}
            fill="none"
            stroke="var(--forest-front)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {g.arena.bulbs.map((bulb) => (
            <circle
              key={`${bulb.x}-${bulb.y}`}
              cx={bulb.x}
              cy={bulb.y}
              r="5"
              fill="var(--lights)"
            />
          ))}
        </g>
      )}
      <path d={g.mid} fill="var(--forest-mid)" />
      {g.palms.map((p) => (
        <g key={p.stem} fill="var(--forest-front)">
          <path
            d={p.stem}
            stroke="var(--forest-front)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {p.fronds.map((frond) => (
            <path key={frond} d={frond} />
          ))}
        </g>
      ))}
      <path d={g.front} fill="var(--forest-front)" />
      {g.houses.map((house) => (
        <g key={house.body}>
          <path d={house.body} fill="var(--house)" />
          {house.windows.map((win) => (
            <rect
              key={`${win.x}-${win.y}`}
              x={win.x}
              y={win.y}
              width={win.w}
              height={win.h}
              fill="var(--lights)"
            />
          ))}
        </g>
      ))}

      <rect
        x="0"
        y={spec.water}
        width={W}
        height={H - spec.water}
        fill={`url(#${river})`}
      />
      <g stroke="var(--river-glint)" strokeWidth="3" strokeLinecap="round">
        {g.ripples.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {g.canoe && <path d={g.canoe} fill="var(--house)" />}
      {g.fire && (
        <g>
          <circle
            cx={g.fire.cx}
            cy={g.fire.base - g.fire.size * 0.4}
            r={g.fire.size * 2.4}
            fill={`url(#${glow})`}
          />
          <path d={g.fire.logs} fill="var(--house)" />
          <path d={g.fire.flame} fill="var(--lights)" />
        </g>
      )}
    </svg>
  )
}
