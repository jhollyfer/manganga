import type { EventType } from './entity'
import type { LocalizedText } from './i18n'

/**
 * A agenda do boi: ensaios, festas, shows e as noites de festival.
 *
 * Conteúdo em `lib/`, como as notícias, e de exemplo: a diretoria troca pelas
 * datas reais. O horário vai com o fuso de Benjamin Constant (`-05:00`) no
 * próprio texto da data, e é por isso que ele aparece certo para quem abre a
 * agenda em Manaus, uma hora à frente.
 */
export type AgendaEvent = {
  slug: string
  /** ISO 8601 com o fuso local, `2026-10-17T20:00:00-05:00`. */
  startsAt: string
  type: EventType
  title: LocalizedText
  summary: LocalizedText
  location: string
  description: ReadonlyArray<LocalizedText>
}

const CURRAL = 'Curral do Mangangá, beco 50, Coaban'
const BUMBODROMO = 'Bumbódromo de Benjamin Constant'

export const EVENTS: ReadonlyArray<AgendaEvent> = [
  {
    slug: 'ensaio-geral-outubro',
    startsAt: '2026-10-17T20:00:00-05:00',
    type: 'ensaio',
    location: CURRAL,
    title: {
      'pt-BR': 'Ensaio geral no curral',
      en: 'Full rehearsal at the curral',
      es: 'Ensayo general en el corral',
    },
    summary: {
      'pt-BR': 'Tribos, Marujada e itens juntos pela primeira vez na temporada.',
      en: 'Tribes, Marujada and items together for the first time this season.',
      es: 'Tribus, Marujada e ítems juntos por primera vez en la temporada.',
    },
    description: [
      {
        'pt-BR':
          'O primeiro ensaio com todos os grupos do boi. Aberto ao público, com venda de comida e bebida no curral. A renda ajuda a levantar as alegorias.',
        en: 'The first rehearsal with every group of the boi. Open to the public, with food and drinks at the curral. Proceeds help build the floats.',
        es: 'El primer ensayo con todos los grupos del boi. Abierto al público, con venta de comida y bebida en el corral. Lo recaudado ayuda a levantar las alegorías.',
      },
    ],
  },
  {
    slug: 'oficina-marujada-de-guerra',
    startsAt: '2026-10-21T19:00:00-05:00',
    type: 'ensaio',
    location: CURRAL,
    title: {
      'pt-BR': 'Oficina aberta da Marujada de Guerra',
      en: 'Marujada de Guerra open workshop',
      es: 'Taller abierto de la Marujada de Guerra',
    },
    summary: {
      'pt-BR': 'Aprenda as batidas do boi com quem toca na arena.',
      en: 'Learn the boi beats from those who play in the arena.',
      es: 'Aprende los toques del boi con quienes tocan en la arena.',
    },
    description: [
      {
        'pt-BR':
          'Oficina gratuita para iniciantes, com instrumentos emprestados pelo curral. Vagas por ordem de chegada.',
        en: 'Free workshop for beginners, with instruments lent by the curral. First come, first served.',
        es: 'Taller gratuito para principiantes, con instrumentos prestados por el corral. Cupos por orden de llegada.',
      },
    ],
  },
  {
    slug: 'arraial-do-besouro',
    startsAt: '2026-11-14T21:00:00-05:00',
    type: 'festa',
    location: CURRAL,
    title: {
      'pt-BR': 'Arraial do Besouro',
      en: 'Besouro street party',
      es: 'Fiesta del Besouro',
    },
    summary: {
      'pt-BR': 'Noite de toadas, comida típica e o boi no meio da galera.',
      en: 'A night of toadas, local food and the boi among the crowd.',
      es: 'Noche de toadas, comida típica y el boi en medio de la hinchada.',
    },
    description: [
      {
        'pt-BR':
          'A festa que lembra as origens do Mangangá nos forrós de rua do Coaban. Entrada solidária com um quilo de alimento.',
        en: 'The party that recalls the roots of Mangangá in the Coaban street forrós. Entry with a donation of one kilo of food.',
        es: 'La fiesta que recuerda los orígenes del Mangangá en los forrós callejeros del Coaban. Entrada solidaria con un kilo de alimento.',
      },
    ],
  },
  {
    slug: 'assembleia-de-socios',
    startsAt: '2026-12-05T18:00:00-05:00',
    type: 'institucional',
    location: CURRAL,
    title: {
      'pt-BR': 'Assembleia geral de sócios',
      en: 'General members meeting',
      es: 'Asamblea general de socios',
    },
    summary: {
      'pt-BR': 'Prestação de contas da temporada e planejamento do próximo festival.',
      en: 'Season accounts and planning for the next festival.',
      es: 'Rendición de cuentas de la temporada y planificación del próximo festival.',
    },
    description: [
      {
        'pt-BR':
          'Sócios em dia votam as contas e conhecem o plano de trabalho. A pauta completa sai na semana anterior, por e-mail e no canal do WhatsApp.',
        en: 'Members in good standing vote on the accounts and hear the work plan. The full agenda goes out the week before, by email and on the WhatsApp channel.',
        es: 'Los socios al día votan las cuentas y conocen el plan de trabajo. La agenda completa sale la semana anterior, por correo y en el canal de WhatsApp.',
      },
    ],
  },
  {
    slug: 'lancamento-das-toadas',
    startsAt: '2027-02-20T20:00:00-05:00',
    type: 'show',
    location: CURRAL,
    title: {
      'pt-BR': 'Show de lançamento das toadas',
      en: 'Toadas release show',
      es: 'Show de lanzamiento de las toadas',
    },
    summary: {
      'pt-BR': 'O álbum da temporada tocado ao vivo pela primeira vez.',
      en: 'The season album played live for the first time.',
      es: 'El álbum de la temporada tocado en vivo por primera vez.',
    },
    description: [
      {
        'pt-BR':
          'O levantador de toadas e a Marujada apresentam o repertório que vai para a arena em julho.',
        en: 'The toada singer and the Marujada present the repertoire that goes to the arena in July.',
        es: 'El cantor de toadas y la Marujada presentan el repertorio que va a la arena en julio.',
      },
    ],
  },
  {
    slug: 'festival-primeira-noite',
    startsAt: '2027-07-16T20:00:00-05:00',
    type: 'festival',
    location: BUMBODROMO,
    title: {
      'pt-BR': 'Festival Folclórico: primeira noite',
      en: 'Folk Festival: first night',
      es: 'Festival Folclórico: primera noche',
    },
    summary: {
      'pt-BR': 'O Mangangá entra na arena para a primeira apresentação.',
      en: 'Mangangá enters the arena for the first show.',
      es: 'El Mangangá entra a la arena para la primera presentación.',
    },
    description: [
      {
        'pt-BR':
          'Abertura do Festival Folclórico Benjaminense. Chegue cedo: a fila do bumbódromo começa no fim da tarde.',
        en: 'Opening of the Benjamin Constant Folk Festival. Arrive early: the bumbódromo line starts late in the afternoon.',
        es: 'Apertura del Festival Folclórico de Benjamin Constant. Llega temprano: la fila del bumbódromo empieza al final de la tarde.',
      },
    ],
  },
  {
    slug: 'festival-segunda-noite',
    startsAt: '2027-07-17T20:00:00-05:00',
    type: 'festival',
    location: BUMBODROMO,
    title: {
      'pt-BR': 'Festival Folclórico: segunda noite',
      en: 'Folk Festival: second night',
      es: 'Festival Folclórico: segunda noche',
    },
    summary: {
      'pt-BR': 'A segunda noite de toadas, alegorias e galera verde.',
      en: 'The second night of toadas, floats and green crowd.',
      es: 'La segunda noche de toadas, alegorías e hinchada verde.',
    },
    description: [
      {
        'pt-BR':
          'Segunda apresentação do boi na arena, com os itens avaliados pelo júri.',
        en: 'Second boi show in the arena, with the items judged by the jury.',
        es: 'Segunda presentación del boi en la arena, con los ítems evaluados por el jurado.',
      },
    ],
  },
  {
    slug: 'festival-terceira-noite',
    startsAt: '2027-07-18T20:00:00-05:00',
    type: 'festival',
    location: BUMBODROMO,
    title: {
      'pt-BR': 'Festival Folclórico: noite final',
      en: 'Folk Festival: final night',
      es: 'Festival Folclórico: noche final',
    },
    summary: {
      'pt-BR': 'A última noite na arena, e depois a apuração.',
      en: 'The last night in the arena, then the results.',
      es: 'La última noche en la arena, y después el conteo.',
    },
    description: [
      {
        'pt-BR':
          'A noite que decide o campeão. A apuração dos votos acontece no dia seguinte, com transmissão pelas redes do boi.',
        en: 'The night that decides the champion. The vote count happens the next day, streamed on the boi social channels.',
        es: 'La noche que decide al campeón. El conteo de votos es al día siguiente, con transmisión por las redes del boi.',
      },
    ],
  },
  {
    slug: 'aniversario-do-boi-2026',
    startsAt: '2026-06-24T19:00:00-05:00',
    type: 'festa',
    location: CURRAL,
    title: {
      'pt-BR': 'Aniversário do Mangangá',
      en: 'Mangangá birthday',
      es: 'Cumpleaños del Mangangá',
    },
    summary: {
      'pt-BR': 'Mais um ano do boi do alagado, com bolo e toada.',
      en: 'Another year of the floodplain boi, with cake and toadas.',
      es: 'Un año más del boi del anegado, con torta y toadas.',
    },
    description: [
      {
        'pt-BR':
          'A comunidade do Coaban comemorou mais um aniversário do boi com o pavilhão verde e branco hasteado no curral.',
        en: 'The Coaban community celebrated another boi birthday with the green and white flag raised at the curral.',
        es: 'La comunidad del Coaban celebró un cumpleaños más del boi con el pabellón verde y blanco izado en el corral.',
      },
    ],
  },
]

/** O instante do evento, para comparar com agora. */
export function eventTime(event: AgendaEvent): number {
  return new Date(event.startsAt).getTime()
}

/** Os eventos a partir de `now`, do mais próximo para o mais distante. */
export function upcomingEvents(now: number, limit?: number): Array<AgendaEvent> {
  const upcoming = EVENTS.filter((event) => eventTime(event) >= now).sort(
    (a, b) => eventTime(a) - eventTime(b),
  )

  return upcoming.slice(0, limit ?? upcoming.length)
}

/** Os eventos que já aconteceram, do mais recente para o mais antigo. */
export function pastEvents(now: number): Array<AgendaEvent> {
  return EVENTS.filter((event) => eventTime(event) < now).sort(
    (a, b) => eventTime(b) - eventTime(a),
  )
}

export function eventBySlug(slug: string): AgendaEvent | undefined {
  return EVENTS.find((event) => event.slug === slug)
}

/** A primeira noite de festival que ainda não passou, para a contagem. */
export function nextFestivalNight(now: number): AgendaEvent | undefined {
  return upcomingEvents(now).find((event) => event.type === 'festival')
}
