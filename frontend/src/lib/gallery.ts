import type { LocalizedText } from './i18n'
import type { Cover } from './media'

/**
 * A galeria: arena, curral e comunidade.
 *
 * Os registros apontam para capas de `media.ts`, e a página monta o mosaico a
 * partir delas. Fotos novas entram aqui com a legenda, e o mosaico se ajusta.
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
    id: 'besouro-na-mata',
    tag: 'arena',
    cover: { kind: 'photo', photo: 'festival', focus: '50% 35%' },
    caption: {
      'pt-BR': 'O Besouro abre caminho entre as tribos.',
      en: 'The Besouro makes its way among the tribes.',
      es: 'El Besouro se abre paso entre las tribus.',
    },
  },
  {
    id: 'retrato-do-boi',
    tag: 'curral',
    cover: { kind: 'photo', photo: 'boi', focus: '50% 40%' },
    caption: {
      'pt-BR': 'O boi branco da estrela verde, pronto para a arena.',
      en: 'The white boi with the green star, ready for the arena.',
      es: 'El boi blanco de la estrella verde, listo para la arena.',
    },
  },
  {
    id: 'bandeirinhas-no-beco',
    tag: 'comunidade',
    cover: { kind: 'art', art: 'bandeirinhas' },
    caption: {
      'pt-BR': 'Bandeirinhas no beco 50 em noite de arraial.',
      en: 'Festoons on alley 50 on a party night.',
      es: 'Banderines en el callejón 50 en noche de fiesta.',
    },
  },
  {
    id: 'dancarinas-urucum',
    tag: 'arena',
    cover: { kind: 'photo', photo: 'festival', focus: '90% 60%' },
    caption: {
      'pt-BR': 'As dançarinas de urucum guardam o boi na evolução.',
      en: 'The annatto dancers guard the boi as it dances.',
      es: 'Las bailarinas de achiote custodian al boi en la evolución.',
    },
  },
  {
    id: 'tambores-da-marujada',
    tag: 'curral',
    cover: { kind: 'art', art: 'tambor' },
    caption: {
      'pt-BR': 'Os tambores da Marujada de Guerra.',
      en: 'The drums of the Marujada de Guerra.',
      es: 'Los tambores de la Marujada de Guerra.',
    },
  },
  {
    id: 'estrela-na-testa',
    tag: 'curral',
    cover: { kind: 'photo', photo: 'boi', focus: '50% 30%' },
    caption: {
      'pt-BR': 'A estrela na testa, bordada à mão no curral.',
      en: 'The star on the forehead, hand-embroidered at the curral.',
      es: 'La estrella en la frente, bordada a mano en el corral.',
    },
  },
  {
    id: 'rio-javari',
    tag: 'comunidade',
    cover: { kind: 'art', art: 'rio' },
    caption: {
      'pt-BR': 'O Javari na vazante, quando a rua volta a secar.',
      en: 'The Javari at low water, when the street dries again.',
      es: 'El Yavarí en la bajante, cuando la calle vuelve a secarse.',
    },
  },
  {
    id: 'galera-na-fogueira',
    tag: 'comunidade',
    cover: { kind: 'art', art: 'fogueira' },
    caption: {
      'pt-BR': 'A galera verde em volta da fogueira.',
      en: 'The green crowd around the bonfire.',
      es: 'La hinchada verde alrededor de la fogata.',
    },
  },
  {
    id: 'chifres-ao-sol',
    tag: 'arena',
    cover: { kind: 'photo', photo: 'festival', focus: '50% 5%' },
    caption: {
      'pt-BR': 'Os chifres do Besouro contra a luz da mata.',
      en: 'The Besouro horns against the forest light.',
      es: 'Los cuernos del Besouro contra la luz de la selva.',
    },
  },
]
