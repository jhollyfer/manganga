import type * as React from 'react'

import { Scene } from '#/components/common/scenery'
import type { ArtworkKey, Cover } from '#/lib/media'

/**
 * Uma cena como capa. Sem `label` ela é decorativa e some para o leitor de
 * tela; com `label` ela vira imagem com nome, que é o caso da galeria.
 *
 * A versão anterior recortava as duas fotos do acervo em duotone; as fotos
 * eram geradas por IA e saíram, e as cenas desenhadas (`Scene`) tomaram o
 * lugar delas.
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
  return <Scene scene={art} label={label} className={className} />
}

/**
 * A capa de um registro. Hoje sempre uma cena; quando a foto voltar, é aqui
 * que ela entra.
 *
 * `alt` vazio por padrão porque quase toda capa é decorativa (o título do
 * cartão já diz o que ela mostra). A galeria, onde a imagem é o conteúdo,
 * passa a legenda.
 */
export function CoverImage({
  cover,
  alt = '',
  className,
}: {
  cover: Cover
  alt?: string
  className?: string
  /** Sem efeito numa cena em SVG; fica para quando a foto voltar. */
  loading?: 'lazy' | 'eager'
}): React.JSX.Element {
  return <Artwork art={cover.art} label={alt} className={className} />
}
