import type * as React from 'react'

import type { ArtKind } from '#/lib/store/catalog'
import { cn } from '#/lib/utils'

/**
 * O desenho de um produto da loja, em SVG, na cor da variação.
 *
 * A loja ainda não tem fotos, e um quadrado cinza com "sem imagem" vende pior
 * que um desenho honesto da peça. Cada tipo de produto é uma silhueta chapada
 * na cor escolhida, com a estrela verde do Besouro como estampa: trocar a cor
 * na página do produto repinta o desenho, que é o que a foto da variação
 * faria. Quando a foto existir, ela entra no lugar deste componente.
 *
 * Na casca pública e não dentro de `loja/`: a home também mostra produto, e o
 * ancestral comum das duas é `_public`.
 *
 * `preserveAspectRatio="xMidYMid meet"`, ao contrário das ilustrações de
 * `artwork.tsx`: aqui a peça inteira precisa caber no quadro, e um recorte
 * que come a manga da camisa faria o desenho mentir sobre o produto.
 */

/** O contorno de toda peça: separa a camisa branca do fundo claro. */
const OUTLINE = 'rgb(3 20 11 / 0.28)'
/** A sombra chapada que dá volume sem gradiente. */
const SHADE = 'rgb(3 20 11 / 0.1)'
const STAR_FILL = '#1fa855'
const STAR_STROKE = '#f2b632'

/** A estrela de cinco pontas, centrada em `(cx, cy)` com raio externo `r`. */
function starPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 10 }, (_, index) => {
    let radius = r * 0.42
    if (index % 2 === 0) radius = r
    const angle = -Math.PI / 2 + (index * Math.PI) / 5

    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`
  }).join(' ')
}

function Star({
  cx,
  cy,
  r,
}: {
  cx: number
  cy: number
  r: number
}): React.JSX.Element {
  return (
    <polygon
      points={starPoints(cx, cy, r)}
      fill={STAR_FILL}
      stroke={STAR_STROKE}
      strokeWidth={Math.max(1.5, r / 8)}
      strokeLinejoin="round"
    />
  )
}

type DrawingProps = { color: string }

function Shirt({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M72 38 L48 46 L20 72 L38 100 L56 90 L56 172 L144 172 L144 90 L162 100 L180 72 L152 46 L128 38 Q100 60 72 38 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M56 90 L56 172 L72 172 L72 96 Z" fill={SHADE} />
      <path
        d="M72 38 Q100 60 128 38"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Star cx={100} cy={98} r={18} />
    </>
  )
}

function Tank({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M72 32 L72 58 Q68 82 56 92 L56 172 L144 172 L144 92 Q132 82 128 58 L128 32 L112 32 Q100 70 88 32 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M56 92 L56 172 L70 172 L70 98 Z" fill={SHADE} />
      <Star cx={100} cy={112} r={18} />
    </>
  )
}

function Cap({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M28 124 Q100 104 184 126 Q178 146 150 144 Q100 132 46 140 Q26 140 28 124 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M44 126 Q100 114 170 128 L150 136 Q100 126 50 134 Z"
        fill={SHADE}
      />
      <path
        d="M44 126 Q42 64 100 58 Q158 64 156 126 Q100 112 44 126 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M100 58 Q84 90 82 120 M100 58 Q116 90 118 120"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="58"
        r="5"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Star cx={100} cy={94} r={15} />
    </>
  )
}

function Cup({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M60 54 L140 54 L128 172 Q100 180 72 172 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M60 54 L76 54 L84 174 Q76 174 72 172 Z" fill={SHADE} />
      <rect
        x="54"
        y="36"
        width="92"
        height="20"
        rx="8"
        fill="#14171a"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect x="112" y="30" width="20" height="8" rx="3" fill="#14171a" />
      <Star cx={100} cy={112} r={20} />
    </>
  )
}

function Bottle({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M118 34 Q146 34 146 52 Q146 66 128 66"
        fill="none"
        stroke="#14171a"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="80" y="24" width="40" height="22" rx="6" fill="#14171a" />
      <path
        d="M84 46 L116 46 L118 62 Q132 70 132 86 L132 166 Q132 176 122 176 L78 176 Q68 176 68 166 L68 86 Q68 70 82 62 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M68 86 L68 166 Q68 176 78 176 L82 176 L82 74 Q70 78 68 86 Z"
        fill={SHADE}
      />
      <Star cx={100} cy={122} r={18} />
    </>
  )
}

function Mug({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M132 84 L146 84 Q166 84 166 106 Q166 128 146 128 L132 128"
        fill="none"
        stroke={color}
        strokeWidth="12"
      />
      <path
        d="M132 84 L146 84 Q166 84 166 106 Q166 128 146 128 L132 128"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <rect
        x="44"
        y="62"
        width="92"
        height="104"
        rx="12"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect x="44" y="62" width="16" height="104" rx="8" fill={SHADE} />
      <ellipse cx="90" cy="64" rx="44" ry="6" fill={SHADE} />
      <Star cx={90} cy={114} r={22} />
    </>
  )
}

function Keychain({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <circle
        cx="100"
        cy="38"
        r="16"
        fill="none"
        stroke="#b9c2c4"
        strokeWidth="6"
      />
      <rect
        x="92"
        y="50"
        width="16"
        height="34"
        rx="4"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <polygon
        points={starPoints(100, 128, 52)}
        fill={color}
        stroke={STAR_STROKE}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <polygon points={starPoints(100, 128, 26)} fill={STAR_FILL} />
    </>
  )
}

function Bag({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M70 84 Q70 30 100 30 Q130 30 130 84"
        fill="none"
        stroke={color}
        strokeWidth="9"
      />
      <path
        d="M70 84 Q70 30 100 30 Q130 30 130 84"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <path
        d="M46 80 L154 80 L160 176 L40 176 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M46 80 L60 80 L56 176 L40 176 Z" fill={SHADE} />
      <Star cx={100} cy={128} r={24} />
    </>
  )
}

function Pillow({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <path
        d="M36 44 Q100 30 164 44 Q178 100 164 156 Q100 170 36 156 Q22 100 36 44 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M36 44 Q22 100 36 156 Q48 100 36 44 Z" fill={SHADE} />
      <circle cx="100" cy="100" r="40" fill="#fbfaf5" opacity="0.9" />
      <Star cx={100} cy={102} r={30} />
    </>
  )
}

function Flag({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <rect x="34" y="20" width="6" height="166" rx="3" fill="#6b4520" />
      <circle cx="37" cy="20" r="6" fill={STAR_STROKE} />
      <path
        d="M40 34 Q80 24 112 38 Q144 52 178 40 L178 124 Q144 136 112 122 Q80 108 40 118 Z"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 98 Q80 88 112 102 Q144 116 178 104 L178 124 Q144 136 112 122 Q80 108 40 118 Z"
        fill={SHADE}
      />
      <circle cx="109" cy="78" r="30" fill="#fbfaf5" />
      <Star cx={109} cy={80} r={24} />
    </>
  )
}

function Magnet({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <rect
        x="48"
        y="56"
        width="104"
        height="92"
        rx="18"
        fill="#14171a"
        opacity="0.12"
        transform="translate(4 6)"
      />
      <rect
        x="48"
        y="56"
        width="104"
        height="92"
        rx="18"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect
        x="58"
        y="66"
        width="84"
        height="72"
        rx="12"
        fill="none"
        stroke={STAR_FILL}
        strokeWidth="3"
        strokeDasharray="6 5"
      />
      <Star cx={100} cy={104} r={26} />
    </>
  )
}

function Plush({ color }: DrawingProps): React.JSX.Element {
  return (
    <>
      <ellipse
        cx="100"
        cy="140"
        rx="54"
        ry="36"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect
        x="62"
        y="156"
        width="18"
        height="22"
        rx="8"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect
        x="120"
        y="156"
        width="18"
        height="22"
        rx="8"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <path
        d="M66 58 Q48 40 56 22 Q64 44 80 52 Z"
        fill="#e8dcc0"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <path
        d="M134 58 Q152 40 144 22 Q136 44 120 52 Z"
        fill="#e8dcc0"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <ellipse
        cx="58"
        cy="78"
        rx="14"
        ry="8"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <ellipse
        cx="142"
        cy="78"
        rx="14"
        ry="8"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="88"
        r="38"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <ellipse cx="100" cy="108" rx="22" ry="14" fill="#f1c9b8" />
      <circle cx="93" cy="108" r="3" fill="#14171a" />
      <circle cx="107" cy="108" r="3" fill="#14171a" />
      <circle cx="86" cy="86" r="4" fill="#14171a" />
      <circle cx="114" cy="86" r="4" fill="#14171a" />
      <Star cx={100} cy={68} r={11} />
    </>
  )
}

function Scarf({ color }: DrawingProps): React.JSX.Element {
  const flags = [0, 1, 2, 3, 4]

  return (
    <>
      <polygon
        points="100,24 176,100 100,176 24,100"
        fill={color}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon points="100,24 24,100 100,176 92,100" fill={SHADE} />
      <polygon
        points="100,40 160,100 100,160 40,100"
        fill="none"
        stroke="#fbfaf5"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      {flags.map((index) => {
        const x = 66 + index * 17

        return (
          <polygon
            key={index}
            points={`${x},62 ${x + 12},62 ${x + 6},74`}
            fill={[STAR_STROKE, '#e4572e', '#fbfaf5'][index % 3]}
          />
        )
      })}
      <Star cx={100} cy={106} r={24} />
    </>
  )
}

const DRAWINGS: Record<ArtKind, (props: DrawingProps) => React.JSX.Element> = {
  shirt: Shirt,
  tank: Tank,
  cap: Cap,
  cup: Cup,
  bottle: Bottle,
  mug: Mug,
  keychain: Keychain,
  bag: Bag,
  pillow: Pillow,
  flag: Flag,
  magnet: Magnet,
  plush: Plush,
  scarf: Scarf,
}

/**
 * O desenho de uma peça. Sem `label` ele é decorativo e some para o leitor de
 * tela, que é o caso do cartão (o nome do produto já está ao lado); com
 * `label` vira imagem com nome, que é o caso da galeria do produto.
 */
export function ProductArt({
  art,
  color,
  label,
  className,
}: {
  art: ArtKind
  /** A cor da variação, em hexadecimal. */
  color: string
  label?: string
  className?: string
}): React.JSX.Element {
  const Drawing = DRAWINGS[art]

  let a11y: React.SVGProps<SVGSVGElement> = { 'aria-hidden': true }
  if (label) a11y = { role: 'img', 'aria-label': label }

  return (
    <svg
      data-slot="product-art"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      {...a11y}
      className={cn('size-full bg-secondary', className)}
    >
      <ellipse cx="100" cy="186" rx="62" ry="6" fill="rgb(3 20 11 / 0.08)" />
      <Drawing color={color} />
    </svg>
  )
}
