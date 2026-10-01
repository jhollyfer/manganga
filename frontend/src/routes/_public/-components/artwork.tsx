import type * as React from 'react'

import { PHOTOS } from '#/lib/media'
import type { ArtworkKey, Cover } from '#/lib/media'
import { cn } from '#/lib/utils'

/**
 * As capas sem foto própria: recortes das fotos do boi, em duotone.
 *
 * A versão anterior desenhava ilustrações em SVG (bandeirinhas, rio, estrela,
 * fogueira), e desenho de enfeite feito em código é o que mais denuncia site
 * montado no automático. Enquanto o acervo de fotos da arena não chega, cada
 * chave é um enquadramento diferente das duas fotos, em preto e branco tingido
 * de um tom da mata: a mesma técnica da impressão em duas cores, e cartões
 * vizinhos não repetem a mesma imagem.
 *
 * Os nomes das chaves são da versão ilustrada e ficaram para não mexer nos
 * registros de conteúdo. Quando chegarem fotos, cada registro troca `art` por
 * `photo` e esta tabela encolhe.
 */
type Crop = {
  photo: keyof typeof PHOTOS
  /** O ponto da foto que fica no centro do recorte. */
  focus: string
  /** Quanto o recorte aproxima, para dois cartões da mesma foto não se repetirem. */
  zoom: number
  tone: string
}

const CROPS: Record<ArtworkKey, Crop> = {
  bandeirinhas: {
    photo: 'festival',
    focus: '50% 75%',
    zoom: 1.6,
    tone: '#3d9a63',
  },
  rio: { photo: 'festival', focus: '15% 55%', zoom: 1.8, tone: '#4a96a0' },
  estrela: { photo: 'boi', focus: '50% 22%', zoom: 2.2, tone: '#3d9a63' },
  mata: { photo: 'festival', focus: '85% 35%', zoom: 1.7, tone: '#2c6e48' },
  tambor: { photo: 'boi', focus: '35% 80%', zoom: 1.9, tone: '#8fa396' },
  fogueira: { photo: 'festival', focus: '65% 20%', zoom: 1.5, tone: '#4a96a0' },
}

/**
 * Um recorte em duotone. Sem `label` ele é decorativo e some para o leitor de
 * tela; com `label` ele vira imagem com nome, que é o caso da galeria.
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
  const crop = CROPS[art]

  let a11y: React.HTMLAttributes<HTMLDivElement> = { 'aria-hidden': true }
  if (label) a11y = { role: 'img', 'aria-label': label }

  return (
    <div
      data-slot="artwork"
      {...a11y}
      className={cn(
        'relative size-full overflow-hidden bg-[#eef1ec]',
        className,
      )}
    >
      <img
        src={PHOTOS[crop.photo]}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          objectPosition: crop.focus,
          transformOrigin: crop.focus,
          transform: `scale(${crop.zoom})`,
        }}
        className="size-full object-cover contrast-[1.15] grayscale"
      />
      <span
        aria-hidden="true"
        style={{ backgroundColor: crop.tone }}
        className="absolute inset-0 mix-blend-multiply"
      />
    </div>
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
