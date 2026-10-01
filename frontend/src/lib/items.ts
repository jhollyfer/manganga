import type { ItemGroup } from './entity'
import type { LocalizedText } from './i18n'

/**
 * Os itens que o júri avalia na arena, e quem dá vida a cada um.
 *
 * Cada item é um **papel**, e é assim que a página os apresenta: o nome de
 * quem defende o item muda de temporada para temporada e entra aqui quando a
 * diretoria divulga o elenco. Sem nome, o cartão mostra o papel e o que ele
 * faz, que é o que quem chega ao festival pela primeira vez quer entender.
 */
export type OfficialItem = {
  number: number
  slug: string
  group: ItemGroup
  name: LocalizedText
  description: LocalizedText
  /** Quem defende o item na temporada atual, quando já foi anunciado. */
  performer?: string
}

export const ITEMS: ReadonlyArray<OfficialItem> = [
  {
    number: 1,
    slug: 'apresentador',
    group: 'musical',
    name: { 'pt-BR': 'Apresentador', en: 'Host', es: 'Presentador' },
    description: {
      'pt-BR':
        'O anfitrião da noite: anuncia cada item à galera e conduz o ritmo do espetáculo.',
      en: 'The host of the night: announces each item to the crowd and leads the pace of the show.',
      es: 'El anfitrión de la noche: anuncia cada ítem a la hinchada y conduce el ritmo del espectáculo.',
    },
  },
  {
    number: 2,
    slug: 'levantador-de-toadas',
    group: 'musical',
    name: {
      'pt-BR': 'Levantador de toadas',
      en: 'Toada singer',
      es: 'Cantor de toadas',
    },
    description: {
      'pt-BR':
        'A voz do boi. Levanta as toadas que contam o tema e puxa o canto da arquibancada.',
      en: 'The voice of the boi. Sings the toadas that tell the theme and leads the stands in song.',
      es: 'La voz del boi. Canta las toadas que cuentan el tema y guía el canto de la tribuna.',
    },
  },
  {
    number: 3,
    slug: 'amo-do-boi',
    group: 'musical',
    name: { 'pt-BR': 'Amo do boi', en: 'Boi master', es: 'Amo del boi' },
    description: {
      'pt-BR':
        'O dono da fazenda no auto do boi. Improvisa versos e desafia o contrário no repente.',
      en: 'The farm owner in the boi play. Improvises verses and challenges the rival in rhyme.',
      es: 'El dueño de la hacienda en el auto del boi. Improvisa versos y desafía al rival en el repentismo.',
    },
  },
  {
    number: 4,
    slug: 'marujada-de-guerra',
    group: 'musical',
    name: {
      'pt-BR': 'Marujada de Guerra',
      en: 'Marujada de Guerra',
      es: 'Marujada de Guerra',
    },
    description: {
      'pt-BR':
        'A batucada do Mangangá. Tambores, caixas e repiques que dão o compasso de cada toada.',
      en: 'The Mangangá drum line. Drums, snares and repiques that set the beat of every toada.',
      es: 'La batucada del Mangangá. Tambores, cajas y repiques que marcan el compás de cada toada.',
    },
  },
  {
    number: 5,
    slug: 'boi-bumba-evolucao',
    group: 'cenico',
    name: {
      'pt-BR': 'Boi-bumbá (evolução)',
      en: 'Boi-bumbá (dance)',
      es: 'Boi-bumbá (evolución)',
    },
    description: {
      'pt-BR':
        'O Besouro em pessoa: o boi branco da estrela verde, conduzido pelo tripa que dança por dentro.',
      en: 'The Besouro himself: the white boi with the green star, carried by the dancer inside it.',
      es: 'El Besouro en persona: el boi blanco de la estrella verde, llevado por el bailarín que danza dentro.',
    },
  },
  {
    number: 6,
    slug: 'sinhazinha-da-fazenda',
    group: 'cenico',
    name: {
      'pt-BR': 'Sinhazinha da fazenda',
      en: 'Farm daughter',
      es: 'Señorita de la hacienda',
    },
    description: {
      'pt-BR':
        'A filha do dono da fazenda no auto do boi, com a dança delicada que encanta a arena.',
      en: 'The daughter of the farm owner in the boi play, with a delicate dance that enchants the arena.',
      es: 'La hija del dueño de la hacienda en el auto del boi, con la danza delicada que encanta la arena.',
    },
  },
  {
    number: 7,
    slug: 'rainha-do-folclore',
    group: 'cenico',
    name: {
      'pt-BR': 'Rainha do folclore',
      en: 'Folklore queen',
      es: 'Reina del folclore',
    },
    description: {
      'pt-BR':
        'Representa a diversidade da cultura popular, com dança e fantasia que contam o tema.',
      en: 'Represents the diversity of popular culture, with dance and costume that tell the theme.',
      es: 'Representa la diversidad de la cultura popular, con danza y fantasía que cuentan el tema.',
    },
  },
  {
    number: 8,
    slug: 'cunha-poranga',
    group: 'cenico',
    name: {
      'pt-BR': 'Cunhã-poranga',
      en: 'Cunhã-poranga',
      es: 'Cunhã-poranga',
    },
    description: {
      'pt-BR':
        'A beleza e a força da mulher indígena amazônica, guardiã da floresta e do rio.',
      en: 'The beauty and strength of the Amazonian Indigenous woman, guardian of forest and river.',
      es: 'La belleza y la fuerza de la mujer indígena amazónica, guardiana del bosque y del río.',
    },
  },
  {
    number: 9,
    slug: 'porta-estandarte',
    group: 'cenico',
    name: {
      'pt-BR': 'Porta-estandarte',
      en: 'Standard bearer',
      es: 'Portaestandarte',
    },
    description: {
      'pt-BR':
        'Conduz o estandarte do Mangangá, o símbolo do boi, com dança e domínio do corpo.',
      en: 'Carries the Mangangá standard, the symbol of the boi, with dance and body control.',
      es: 'Lleva el estandarte del Mangangá, el símbolo del boi, con danza y dominio del cuerpo.',
    },
  },
  {
    number: 10,
    slug: 'paje',
    group: 'cenico',
    name: { 'pt-BR': 'Pajé', en: 'Pajé (shaman)', es: 'Pajé (chamán)' },
    description: {
      'pt-BR':
        'A figura sagrada que traz a dimensão espiritual dos povos da floresta para a arena.',
      en: 'The sacred figure who brings the spiritual side of the forest peoples to the arena.',
      es: 'La figura sagrada que trae la dimensión espiritual de los pueblos del bosque a la arena.',
    },
  },
  {
    number: 11,
    slug: 'tribos-indigenas',
    group: 'artistico',
    name: {
      'pt-BR': 'Tribos indígenas',
      en: 'Indigenous tribes',
      es: 'Tribus indígenas',
    },
    description: {
      'pt-BR':
        'Os grupos coreografados que homenageiam os povos do Alto Solimões e do Vale do Javari.',
      en: 'Choreographed groups honouring the peoples of the Upper Solimões and the Javari Valley.',
      es: 'Los grupos coreografiados que homenajean a los pueblos del Alto Solimões y del Valle del Yavarí.',
    },
  },
  {
    number: 12,
    slug: 'alegorias',
    group: 'artistico',
    name: { 'pt-BR': 'Alegorias', en: 'Floats', es: 'Alegorías' },
    description: {
      'pt-BR':
        'As estruturas gigantes que se abrem na arena e contam o tema em ferro, espuma e cor.',
      en: 'The giant structures that open in the arena and tell the theme in iron, foam and colour.',
      es: 'Las estructuras gigantes que se abren en la arena y cuentan el tema en hierro, espuma y color.',
    },
  },
  {
    number: 13,
    slug: 'lenda-amazonica',
    group: 'artistico',
    name: {
      'pt-BR': 'Lenda amazônica',
      en: 'Amazonian legend',
      es: 'Leyenda amazónica',
    },
    description: {
      'pt-BR':
        'A encenação de uma lenda da região, com alegoria, dança e o pajé no centro da história.',
      en: 'The staging of a regional legend, with float, dance and the pajé at the heart of the story.',
      es: 'La escenificación de una leyenda de la región, con alegoría, danza y el pajé en el centro de la historia.',
    },
  },
  {
    number: 14,
    slug: 'galera',
    group: 'artistico',
    name: { 'pt-BR': 'Galera', en: 'The crowd', es: 'Hinchada' },
    description: {
      'pt-BR':
        'A torcida verde na arquibancada também é julgada: canto, coreografia e lealdade ao boi.',
      en: 'The green crowd in the stands is judged too: singing, choreography and loyalty to the boi.',
      es: 'La hinchada verde en la tribuna también se juzga: canto, coreografía y lealtad al boi.',
    },
  },
]
