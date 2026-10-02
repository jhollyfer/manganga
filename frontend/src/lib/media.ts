/**
 * As capas do site.
 *
 * O site não tem foto por enquanto: as duas do acervo eram geradas por IA e
 * saíram. Cada registro aponta para uma **capa**, que hoje é sempre uma das
 * cenas do Alto Solimões que `Scene` (`components/common/scenery.tsx`)
 * desenha em SVG. Quando chegarem fotos de verdade do curral e da arena, elas
 * voltam aqui como um segundo tipo (`{ kind: 'photo' }`), e as telas, que só
 * conhecem `CoverImage`, não mudam.
 */

export const ARTWORKS = [
  'bandeirinhas',
  'rio',
  'estrela',
  'mata',
  'tambor',
  'fogueira',
] as const

export type ArtworkKey = (typeof ARTWORKS)[number]

export type Cover = { kind: 'art'; art: ArtworkKey }
