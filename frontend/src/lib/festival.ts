import type { LocalizedText } from './i18n'

/**
 * O festival explicado: as perguntas de quem chega pela primeira vez, como
 * se chega a Benjamin Constant e o glossário do boi-bumbá.
 *
 * O texto é de referência geral sobre o boi-bumbá e sobre a viagem até a
 * tríplice fronteira. Horários e preços de transporte mudam toda temporada e
 * ficam de fora de propósito: quem planeja a viagem confere com a empresa.
 */
export type Question = {
  slug: string
  question: LocalizedText
  answer: LocalizedText
}

export const QUESTIONS: ReadonlyArray<Question> = [
  {
    slug: 'o-que-e-boi-bumba',
    question: {
      'pt-BR': 'O que é um boi-bumbá?',
      en: 'What is a boi-bumbá?',
      es: '¿Qué es un boi-bumbá?',
    },
    answer: {
      'pt-BR':
        'Uma festa popular que conta, com dança, música e alegorias, o auto do boi: a história do boi que morre e ressuscita. Na Amazônia ela ganhou as lendas, os povos indígenas e o rio, e virou espetáculo de arena.',
      en: 'A popular celebration that tells, with dance, music and floats, the boi play: the story of the ox that dies and comes back to life. In the Amazon it absorbed the legends, the Indigenous peoples and the river, and became an arena spectacle.',
      es: 'Una fiesta popular que cuenta, con danza, música y alegorías, el auto del boi: la historia del buey que muere y resucita. En la Amazonía incorporó las leyendas, los pueblos indígenas y el río, y se volvió espectáculo de arena.',
    },
  },
  {
    slug: 'como-funciona-o-julgamento',
    question: {
      'pt-BR': 'Como funciona o julgamento?',
      en: 'How does the judging work?',
      es: '¿Cómo funciona el juzgamiento?',
    },
    answer: {
      'pt-BR':
        'Cada boi se apresenta nas noites de festival e um júri avalia os itens em três grupos: os comuns musicais, os cênicos coreográficos e os artísticos. A soma das notas decide o campeão, anunciado na apuração.',
      en: 'Each boi performs on the festival nights and a jury scores the items in three groups: musical, scenic and choreographic, and artistic. The sum of the scores decides the champion, announced at the vote count.',
      es: 'Cada boi se presenta en las noches de festival y un jurado evalúa los ítems en tres grupos: los musicales, los escénicos coreográficos y los artísticos. La suma de las notas decide al campeón, anunciado en el conteo.',
    },
  },
  {
    slug: 'quem-e-a-cunha-poranga',
    question: {
      'pt-BR': 'Quem é a cunhã-poranga?',
      en: 'Who is the cunhã-poranga?',
      es: '¿Quién es la cunhã-poranga?',
    },
    answer: {
      'pt-BR':
        'Em nheengatu, "moça bonita". É o item que representa a beleza e a força da mulher indígena amazônica, guardiã da floresta.',
      en: 'In Nheengatu, "beautiful girl". The item that represents the beauty and strength of the Amazonian Indigenous woman, guardian of the forest.',
      es: 'En ñeengatú, "muchacha bonita". Es el ítem que representa la belleza y la fuerza de la mujer indígena amazónica, guardiana del bosque.',
    },
  },
  {
    slug: 'precisa-de-ingresso',
    question: {
      'pt-BR': 'Precisa de ingresso para o bumbódromo?',
      en: 'Do I need a ticket for the bumbódromo?',
      es: '¿Hace falta entrada para el bumbódromo?',
    },
    answer: {
      'pt-BR':
        'As regras de acesso são definidas pela organização do festival a cada ano. A agenda e o canal do WhatsApp avisam assim que forem divulgadas.',
      en: 'Access rules are set by the festival organizers each year. The calendar and the WhatsApp channel announce them as soon as they are released.',
      es: 'Las reglas de acceso las define la organización del festival cada año. La agenda y el canal de WhatsApp avisan en cuanto se divulguen.',
    },
  },
]

/** Os caminhos até Benjamin Constant. */
export type TravelRoute = {
  key: 'plane' | 'boat' | 'border'
  title: LocalizedText
  text: LocalizedText
}

export const ROUTES: ReadonlyArray<TravelRoute> = [
  {
    key: 'plane',
    title: {
      'pt-BR': 'De avião até Tabatinga',
      en: 'By plane to Tabatinga',
      es: 'En avión hasta Tabatinga',
    },
    text: {
      'pt-BR':
        'Há voos de Manaus para Tabatinga, a cidade vizinha. De lá até Benjamin Constant a travessia é de barco ou lancha pelo Solimões.',
      en: 'There are flights from Manaus to Tabatinga, the neighbouring town. From there to Benjamin Constant you cross the Solimões by boat or speedboat.',
      es: 'Hay vuelos de Manaos a Tabatinga, la ciudad vecina. De allí a Benjamin Constant se cruza el Solimões en barco o lancha.',
    },
  },
  {
    key: 'boat',
    title: {
      'pt-BR': 'De barco pelo Solimões',
      en: 'By boat up the Solimões',
      es: 'En barco por el Solimões',
    },
    text: {
      'pt-BR':
        'Barcos de recreio e lanchas expressas sobem o rio a partir de Manaus. É a viagem mais longa e a mais bonita: dias de rede, rio e floresta.',
      en: 'Passenger boats and express speedboats travel upriver from Manaus. It is the longest trip and the most beautiful: days of hammock, river and forest.',
      es: 'Barcos de pasajeros y lanchas rápidas suben el río desde Manaos. Es el viaje más largo y el más bonito: días de hamaca, río y selva.',
    },
  },
  {
    key: 'border',
    title: {
      'pt-BR': 'Pela fronteira',
      en: 'Across the border',
      es: 'Por la frontera',
    },
    text: {
      'pt-BR':
        'Quem vem de Letícia, na Colômbia, chega por Tabatinga. Quem vem do Peru atravessa o Javari a partir de Islândia, bem em frente à cidade.',
      en: 'Visitors from Leticia, in Colombia, come through Tabatinga. Those from Peru cross the Javari from Islandia, right across from town.',
      es: 'Quien viene de Leticia, en Colombia, llega por Tabatinga. Quien viene del Perú cruza el Yavarí desde Islandia, justo frente a la ciudad.',
    },
  },
]

/** Os números do festival, os mesmos que o site anterior publicava. */
export const FESTIVAL_STATS = [
  {
    value: '30+',
    label: {
      'pt-BR': 'anos de tradição',
      en: 'years of tradition',
      es: 'años de tradición',
    },
  },
  {
    value: '5 mil+',
    label: {
      'pt-BR': 'visitantes por noite',
      en: 'visitors per night',
      es: 'visitantes por noche',
    },
  },
  {
    value: '3',
    label: {
      'pt-BR': 'países na arquibancada',
      en: 'countries in the stands',
      es: 'países en la tribuna',
    },
  },
] as const

export type GlossaryTerm = {
  term: string
  definition: LocalizedText
}

/** O glossário, em ordem alfabética do termo. */
export const GLOSSARY: ReadonlyArray<GlossaryTerm> = [
  {
    term: 'Alegoria',
    definition: {
      'pt-BR':
        'Estrutura cenográfica gigante que se movimenta na arena e conta parte do tema.',
      en: 'Giant scenic structure that moves in the arena and tells part of the theme.',
      es: 'Estructura escenográfica gigante que se mueve en la arena y cuenta parte del tema.',
    },
  },
  {
    term: 'Amo do boi',
    definition: {
      'pt-BR':
        'O dono da fazenda no auto do boi, que canta versos de improviso.',
      en: 'The farm owner in the boi play, who sings improvised verses.',
      es: 'El dueño de la hacienda en el auto del boi, que canta versos improvisados.',
    },
  },
  {
    term: 'Apuração',
    definition: {
      'pt-BR': 'A leitura pública das notas do júri, que revela o campeão.',
      en: 'The public reading of the jury scores, which reveals the champion.',
      es: 'La lectura pública de las notas del jurado, que revela al campeón.',
    },
  },
  {
    term: 'Arena',
    definition: {
      'pt-BR': 'O espaço central do bumbódromo onde o boi se apresenta.',
      en: 'The central space of the bumbódromo where the boi performs.',
      es: 'El espacio central del bumbódromo donde se presenta el boi.',
    },
  },
  {
    term: 'Auto do boi',
    definition: {
      'pt-BR':
        'A narrativa tradicional da morte e ressurreição do boi, base de toda apresentação.',
      en: 'The traditional story of the death and resurrection of the ox, the basis of every show.',
      es: 'La narrativa tradicional de la muerte y resurrección del buey, base de toda presentación.',
    },
  },
  {
    term: 'Bumbódromo',
    definition: {
      'pt-BR':
        'O estádio do festival, com a arena no centro e a galera nas arquibancadas.',
      en: 'The festival stadium, with the arena in the middle and the crowd in the stands.',
      es: 'El estadio del festival, con la arena en el centro y la hinchada en las tribunas.',
    },
  },
  {
    term: 'Contrário',
    definition: {
      'pt-BR':
        'O boi adversário. No festival não se diz o nome dele: é sempre o contrário.',
      en: 'The rival boi. At the festival its name is never said: it is always the contrário.',
      es: 'El boi adversario. En el festival no se dice su nombre: es siempre el contrario.',
    },
  },
  {
    term: 'Curral',
    definition: {
      'pt-BR':
        'A sede do boi, onde acontecem os ensaios e as festas da comunidade.',
      en: 'The boi headquarters, where rehearsals and community parties happen.',
      es: 'La sede del boi, donde se hacen los ensayos y las fiestas de la comunidad.',
    },
  },
  {
    term: 'Cunhã-poranga',
    definition: {
      'pt-BR':
        '"Moça bonita" em nheengatu, item que representa a mulher indígena.',
      en: '"Beautiful girl" in Nheengatu, the item that represents the Indigenous woman.',
      es: '"Muchacha bonita" en ñeengatú, ítem que representa a la mujer indígena.',
    },
  },
  {
    term: 'Galera',
    definition: {
      'pt-BR':
        'A torcida organizada do boi, que canta, dança e também é avaliada.',
      en: 'The organised crowd of the boi, which sings, dances and is also judged.',
      es: 'La hinchada organizada del boi, que canta, baila y también es evaluada.',
    },
  },
  {
    term: 'Levantador de toadas',
    definition: {
      'pt-BR': 'O cantor principal, que puxa as toadas na arena.',
      en: 'The lead singer, who leads the toadas in the arena.',
      es: 'El cantor principal, que guía las toadas en la arena.',
    },
  },
  {
    term: 'Marujada',
    definition: {
      'pt-BR': 'A batucada do boi. No Mangangá, a Marujada de Guerra.',
      en: 'The boi drum line. At Mangangá, the Marujada de Guerra.',
      es: 'La batucada del boi. En el Mangangá, la Marujada de Guerra.',
    },
  },
  {
    term: 'Pajé',
    definition: {
      'pt-BR':
        'O líder espiritual indígena, figura central das lendas na arena.',
      en: 'The Indigenous spiritual leader, a central figure of the legends in the arena.',
      es: 'El líder espiritual indígena, figura central de las leyendas en la arena.',
    },
  },
  {
    term: 'Toada',
    definition: {
      'pt-BR':
        'A música do boi-bumbá, composta para cada tema e cantada pela galera.',
      en: 'The boi-bumbá song, written for each theme and sung by the crowd.',
      es: 'La música del boi-bumbá, compuesta para cada tema y cantada por la hinchada.',
    },
  },
  {
    term: 'Tripa',
    definition: {
      'pt-BR': 'Quem dança dentro do boi e dá vida aos movimentos dele.',
      en: 'The dancer inside the boi who brings its movements to life.',
      es: 'Quien baila dentro del boi y da vida a sus movimientos.',
    },
  },
  {
    term: 'Vazante',
    definition: {
      'pt-BR': 'O tempo em que o rio baixa, depois da cheia.',
      en: 'The season when the river drops, after the flood.',
      es: 'La época en que el río baja, después de la crecida.',
    },
  },
]
