import type { LocalizedText } from './i18n'
import type { Cover } from './media'

/**
 * A galeria: arena, curral e comunidade.
 *
 * Os registros apontam para capas de `media.ts`, e a página monta o mosaico a
 * partir delas. Hoje é uma cena desenhada por lugar, com legenda que descreve
 * a cena e não uma foto que não existe; fotos novas entram aqui com a
 * legenda, e o mosaico se ajusta.
 */
export const GALLERY_TAGS = ['arena', 'curral', 'comunidade'] as const

export type GalleryTag = (typeof GALLERY_TAGS)[number]

export type GalleryImage = {
  id: string
  tag: GalleryTag
  cover: Cover
  caption: LocalizedText
}

export const GALLERY: ReadonlyArray<GalleryImage> = [
  {
    id: 'arena-iluminada',
    tag: 'arena',
    cover: { kind: 'art', art: 'bandeirinhas' },
    caption: {
      'pt-BR': 'O arco da arena aceso para a noite de festival.',
      en: 'The arena arch lit for the festival night.',
      es: 'El arco de la arena encendido para la noche de festival.',
    },
  },
  {
    id: 'estrela-sobre-a-mata',
    tag: 'arena',
    cover: { kind: 'art', art: 'estrela' },
    caption: {
      'pt-BR': 'A estrela do Besouro nascendo sobre a mata.',
      en: 'The Besouro star rising over the forest.',
      es: 'La estrella del Besouro naciendo sobre la selva.',
    },
  },
  {
    id: 'rua-do-curral',
    tag: 'curral',
    cover: { kind: 'art', art: 'tambor' },
    caption: {
      'pt-BR': 'As palafitas do beco 50 em noite de ensaio.',
      en: 'The stilt houses of alley 50 on a rehearsal night.',
      es: 'Los palafitos del callejón 50 en noche de ensayo.',
    },
  },
  {
    id: 'fogueira-na-beira',
    tag: 'comunidade',
    cover: { kind: 'art', art: 'fogueira' },
    caption: {
      'pt-BR': 'A galera verde em volta da fogueira, na beira do rio.',
      en: 'The green crowd around the bonfire, on the riverbank.',
      es: 'La hinchada verde alrededor de la fogata, a la orilla del río.',
    },
  },
  {
    id: 'javari-na-vazante',
    tag: 'comunidade',
    cover: { kind: 'art', art: 'rio' },
    caption: {
      'pt-BR': 'O Javari na vazante, quando a canoa volta a ser rua.',
      en: 'The Javari at low water, when the canoe becomes the street again.',
      es: 'El Yavarí en la bajante, cuando la canoa vuelve a ser calle.',
    },
  },
  {
    id: 'mata-do-javari',
    tag: 'curral',
    cover: { kind: 'art', art: 'mata' },
    caption: {
      'pt-BR': 'A mata do Javari, de onde vêm as lendas da arena.',
      en: 'The Javari forest, where the arena legends come from.',
      es: 'La selva del Yavarí, de donde vienen las leyendas de la arena.',
    },
  },
]
