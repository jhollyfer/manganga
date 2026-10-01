/**
 * As imagens do site e as ilustrações que as completam.
 *
 * O acervo de fotos ainda é pequeno: duas imagens do boi. Para que notícia,
 * evento e galeria não repitam a mesma foto em fila, cada registro aponta para
 * uma **capa**: uma foto com enquadramento próprio, ou uma das ilustrações em
 * SVG que `Artwork` desenha nas cores da marca. Quando chegarem fotos da
 * arena, elas entram aqui como `photo` e as telas não mudam.
 */

export const PHOTOS = {
  festival: '/hero-festival.jpg',
  boi: '/boi-manganga.jpg',
} as const

export type PhotoKey = keyof typeof PHOTOS

export const ARTWORKS = [
  'bandeirinhas',
  'rio',
  'estrela',
  'mata',
  'tambor',
  'fogueira',
] as const

export type ArtworkKey = (typeof ARTWORKS)[number]

/**
 * Uma capa: foto com o ponto de foco (`object-position`), ou ilustração.
 *
 * O foco existe porque a mesma foto vira cartão quadrado, faixa larga e
 * miniatura, e o recorte padrão (o centro) corta a estrela da testa do boi
 * na metade das vezes.
 */
export type Cover =
  | { kind: 'photo'; photo: PhotoKey; focus?: string }
  | { kind: 'art'; art: ArtworkKey }
