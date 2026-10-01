import type * as React from 'react'

import { PHOTOS } from '#/lib/media'
import type { ArtworkKey, Cover } from '#/lib/media'
import { cn } from '#/lib/utils'

/**
 * As ilustrações da marca, em SVG.
 *
 * Desenhadas em código e não exportadas de um editor: são formas simples
 * (triângulo, onda, estrela), cabem em poucas linhas cada, e escalam do cartão
 * de notícia ao banner sem perder nitidez nem custar um arquivo a mais.
 *
 * Todas usam `preserveAspectRatio="xMidYMid slice"`, o equivalente do
 * `object-fit: cover`: quem decide o recorte é o contêiner.
 */
const FLAG_COLORS = ['#2fbf6b', '#fbfaf5', '#e4572e', '#f2b632', '#0d6b3a']

function Bandeirinhas(): React.JSX.Element {
  const strings = [40, 110, 180]

  return (
    <>
      <rect width="400" height="300" fill="#03140b" />
      <circle cx="320" cy="250" r="120" fill="#e4572e" opacity="0.18" />
      {strings.map((y, row) => (
        <g key={y}>
          <path
            d={`M-10 ${y} Q200 ${y + 40} 410 ${y}`}
            stroke="#fbfaf5"
            strokeOpacity="0.4"
            fill="none"
          />
          {Array.from({ length: 14 }, (_, index) => {
            const x = index * 30 + (row % 2) * 15
            const t = x / 400
            const sag = y + 40 * 2 * t * (1 - t)

            return (
              <polygon
                key={x}
                points={`${x},${sag} ${x + 22},${sag} ${x + 11},${sag + 26}`}
                fill={FLAG_COLORS[(index + row) % FLAG_COLORS.length]}
                opacity="0.92"
              />
            )
          })}
        </g>
      ))}
    </>
  )
}

function Rio(): React.JSX.Element {
  const waves = [
    { y: 170, color: '#0d6b3a', opacity: 0.9 },
    { y: 200, color: '#2a7f8f', opacity: 0.85 },
    { y: 232, color: '#1fa855', opacity: 0.55 },
    { y: 262, color: '#03140b', opacity: 0.9 },
  ]

  return (
    <>
      <rect width="400" height="300" fill="#082414" />
      <circle cx="300" cy="110" r="46" fill="#f2b632" opacity="0.85" />
      <path
        d="M0 160 L40 120 L70 140 L120 90 L170 135 L210 105 L260 150 L400 150 L400 300 L0 300Z"
        fill="#03140b"
        opacity="0.8"
      />
      {waves.map((wave) => (
        <path
          key={wave.y}
          d={`M0 ${wave.y} Q50 ${wave.y - 14} 100 ${wave.y} T200 ${wave.y} T300 ${wave.y} T400 ${wave.y} V300 H0Z`}
          fill={wave.color}
          opacity={wave.opacity}
        />
      ))}
    </>
  )
}

/** A estrela de cinco pontas, centrada em `(cx, cy)` com raio externo `r`. */
function starPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 10 }, (_, index) => {
    let radius = r * 0.42
    if (index % 2 === 0) radius = r
    const angle = -Math.PI / 2 + (index * Math.PI) / 5

    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`
  }).join(' ')
}

function Estrela(): React.JSX.Element {
  return (
    <>
      <rect width="400" height="300" fill="#03140b" />
      {Array.from({ length: 12 }, (_, index) => (
        <rect
          key={index}
          x="198"
          y="-40"
          width="4"
          height="380"
          fill="#2fbf6b"
          opacity="0.08"
          transform={`rotate(${index * 15} 200 150)`}
        />
      ))}
      <circle cx="200" cy="150" r="96" fill="#0d6b3a" opacity="0.5" />
      <polygon
        points={starPoints(200, 156, 86)}
        fill="#1fa855"
        stroke="#f2b632"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </>
  )
}

function Mata(): React.JSX.Element {
  const layers = [
    { color: '#0d6b3a', base: 180, peaks: [60, 30, 70, 20, 55, 40, 65] },
    { color: '#082414', base: 220, peaks: [40, 70, 25, 60, 35, 75, 30] },
    { color: '#03140b', base: 262, peaks: [55, 30, 60, 40, 70, 25, 50] },
  ]

  return (
    <>
      <rect width="400" height="300" fill="#1fa855" opacity="0.35" />
      <rect width="400" height="300" fill="#2fbf6b" opacity="0.25" />
      {layers.map((layer) => {
        const step = 400 / (layer.peaks.length - 1)
        const crest = layer.peaks
          .map(
            (peak, index) =>
              `${(index * step).toFixed(0)},${layer.base - peak}`,
          )
          .join(' ')

        return (
          <polygon
            key={layer.base}
            points={`0,300 ${crest} 400,300`}
            fill={layer.color}
          />
        )
      })}
    </>
  )
}

function Tambor(): React.JSX.Element {
  const drums = [
    { cx: 110, cy: 160, r: 70 },
    { cx: 250, cy: 120, r: 52 },
    { cx: 300, cy: 220, r: 60 },
  ]

  return (
    <>
      <rect width="400" height="300" fill="#03140b" />
      {drums.map((drum) => (
        <g key={drum.cx}>
          <circle cx={drum.cx} cy={drum.cy} r={drum.r} fill="#e4572e" />
          <circle cx={drum.cx} cy={drum.cy} r={drum.r * 0.8} fill="#fbfaf5" />
          <circle
            cx={drum.cx}
            cy={drum.cy}
            r={drum.r * 0.8}
            fill="none"
            stroke="#0d6b3a"
            strokeWidth="3"
            strokeDasharray="6 8"
          />
          <polygon
            points={starPoints(drum.cx, drum.cy + 2, drum.r * 0.38)}
            fill="#1fa855"
          />
        </g>
      ))}
    </>
  )
}

function Fogueira(): React.JSX.Element {
  return (
    <>
      <rect width="400" height="300" fill="#03140b" />
      <circle cx="200" cy="230" r="150" fill="#e4572e" opacity="0.15" />
      <path
        d="M200 70 C240 130 270 160 250 220 C240 250 160 250 150 220 C135 175 175 150 200 70Z"
        fill="#e4572e"
      />
      <path
        d="M200 130 C222 165 235 185 225 215 C218 235 182 235 176 215 C168 190 190 170 200 130Z"
        fill="#f2b632"
      />
      <rect
        x="130"
        y="238"
        width="140"
        height="14"
        rx="7"
        fill="#5a3a1a"
        transform="rotate(-10 200 245)"
      />
      <rect
        x="130"
        y="238"
        width="140"
        height="14"
        rx="7"
        fill="#6b4520"
        transform="rotate(10 200 245)"
      />
      {[90, 130, 270, 310, 160, 240].map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy={60 + index * 18}
          r="3"
          fill="#f2b632"
          opacity="0.7"
        />
      ))}
    </>
  )
}

const ARTWORK: Record<ArtworkKey, () => React.JSX.Element> = {
  bandeirinhas: Bandeirinhas,
  rio: Rio,
  estrela: Estrela,
  mata: Mata,
  tambor: Tambor,
  fogueira: Fogueira,
}

/**
 * Uma ilustração. Sem `label` ela é decorativa e some para o leitor de tela;
 * com `label` ela vira imagem com nome, que é o caso da galeria.
 */
export function Artwork({
  art,
  label,
  className,
}: {
  art: ArtworkKey
  label?: string
  className?: string
}): React.JSX.Element {
  const Drawing = ARTWORK[art]

  let a11y: React.SVGProps<SVGSVGElement> = { 'aria-hidden': true }
  if (label) a11y = { role: 'img', 'aria-label': label }

  return (
    <svg
      data-slot="artwork"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      {...a11y}
      className={cn('size-full', className)}
    >
      <Drawing />
    </svg>
  )
}

/**
 * A capa de um registro: a foto com o enquadramento dele, ou a ilustração.
 *
 * `alt` vazio por padrão porque quase toda capa é decorativa (o título do
 * cartão já diz o que ela mostra). A galeria, onde a imagem é o conteúdo,
 * passa a legenda.
 */
export function CoverImage({
  cover,
  alt = '',
  className,
  loading = 'lazy',
}: {
  cover: Cover
  alt?: string
  className?: string
  loading?: 'lazy' | 'eager'
}): React.JSX.Element {
  if (cover.kind === 'art')
    return <Artwork art={cover.art} label={alt} className={className} />

  return (
    <img
      src={PHOTOS[cover.photo]}
      alt={alt}
      loading={loading}
      decoding="async"
      style={{ objectPosition: cover.focus }}
      className={cn('size-full object-cover', className)}
    />
  )
}
