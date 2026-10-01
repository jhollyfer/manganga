import type { NewsCategory } from './entity'
import type { LocalizedText } from './i18n'
import type { Cover } from './media'

/**
 * As notícias do curral.
 *
 * Conteúdo em `lib/`, como o maiyu faz com o diário: o site ainda não lê
 * notícia da API. A forma do registro já é a que um endpoint devolveria
 * (`slug`, data, editoria, capa, corpo em parágrafos), e trocar a fonte é
 * trocar o corpo de `newsBySlug` e `latestNews` por `queryOptions`.
 *
 * **Os textos são de exemplo.** Quem cuida da comunicação do boi substitui
 * pelas matérias reais antes da publicação.
 */
export type NewsArticle = {
  slug: string
  /** `YYYY-MM-DD`. */
  date: string
  category: NewsCategory
  title: LocalizedText
  excerpt: LocalizedText
  body: ReadonlyArray<LocalizedText>
  cover: Cover
}

export const NEWS: ReadonlyArray<NewsArticle> = [
  {
    slug: 'manganga-abre-inscricoes-para-brincantes-2026',
    date: '2026-09-22',
    category: 'comunidade',
    cover: { kind: 'photo', photo: 'festival', focus: '50% 30%' },
    title: {
      'pt-BR': 'Mangangá abre inscrições para brincantes da temporada 2026',
      en: 'Mangangá opens sign-ups for 2026 season performers',
      es: 'Mangangá abre inscripciones para bailarines de la temporada 2026',
    },
    excerpt: {
      'pt-BR':
        'Dançarinos, músicos e artistas de todas as idades podem se cadastrar pelo site ou no curral, no beco 50.',
      en: 'Dancers, musicians and artists of all ages can sign up on the website or at the curral, on alley 50.',
      es: 'Bailarines, músicos y artistas de todas las edades pueden inscribirse en el sitio o en el corral, en el callejón 50.',
    },
    body: [
      {
        'pt-BR':
          'O Boi Bumbá Mangangá abriu as inscrições para quem quer brincar na temporada 2026. O cadastro vale para tribos, alegorias, Marujada de Guerra e equipe de bastidores, e pode ser feito pelo site, na página Seja sócio, ou presencialmente no curral.',
        en: 'Boi Bumbá Mangangá has opened sign-ups for anyone who wants to perform in the 2026 season. Registration covers tribes, floats, the Marujada de Guerra drum line and the backstage crew, and can be done on the website, on the Join us page, or in person at the curral.',
        es: 'El Boi Bumbá Mangangá abrió las inscripciones para quienes quieran bailar en la temporada 2026. El registro vale para tribus, alegorías, Marujada de Guerra y equipo de bastidores, y se hace en el sitio, en la página Hazte socio, o en persona en el corral.',
      },
      {
        'pt-BR':
          'Menores de idade se inscrevem com o nome da mãe ou do responsável. Os ensaios gerais começam depois do cadastro, sempre às sextas e sábados à noite.',
        en: 'Minors sign up with the name of their mother or guardian. General rehearsals start after registration, always on Friday and Saturday nights.',
        es: 'Los menores se inscriben con el nombre de la madre o del responsable. Los ensayos generales empiezan después del registro, siempre los viernes y sábados por la noche.',
      },
    ],
  },
  {
    slug: 'marujada-de-guerra-retoma-ensaios-no-curral',
    date: '2026-09-10',
    category: 'bastidores',
    cover: { kind: 'art', art: 'tambor' },
    title: {
      'pt-BR': 'Marujada de Guerra retoma os ensaios no curral',
      en: 'Marujada de Guerra resumes rehearsals at the curral',
      es: 'La Marujada de Guerra retoma los ensayos en el corral',
    },
    excerpt: {
      'pt-BR':
        'A batucada do Mangangá volta a tocar às quartas-feiras, com oficina aberta para quem quer aprender.',
      en: 'The Mangangá drum line plays again on Wednesdays, with an open workshop for newcomers.',
      es: 'La batucada del Mangangá vuelve a tocar los miércoles, con taller abierto para quien quiera aprender.',
    },
    body: [
      {
        'pt-BR':
          'Os tambores voltaram a soar no Coaban. A Marujada de Guerra, que dá o compasso do boi na arena, retomou os ensaios semanais e abriu uma oficina para iniciantes.',
        en: 'The drums are sounding again in Coaban. Marujada de Guerra, which sets the boi rhythm in the arena, resumed weekly rehearsals and opened a workshop for beginners.',
        es: 'Los tambores volvieron a sonar en el Coaban. La Marujada de Guerra, que marca el compás del boi en la arena, retomó los ensayos semanales y abrió un taller para principiantes.',
      },
      {
        'pt-BR':
          'Não é preciso trazer instrumento: o curral empresta caixas, surdos e repiques para quem está começando.',
        en: 'No need to bring an instrument: the curral lends snare, bass and repique drums to beginners.',
        es: 'No hace falta traer instrumento: el corral presta cajas, surdos y repiques a quien está empezando.',
      },
    ],
  },
  {
    slug: 'tema-2026-e-apresentado-a-galera',
    date: '2026-08-28',
    category: 'festival',
    cover: { kind: 'photo', photo: 'boi', focus: '50% 35%' },
    title: {
      'pt-BR': 'Tema 2026 é apresentado à galera verde',
      en: 'The 2026 theme is unveiled to the green crowd',
      es: 'El tema 2026 se presenta a la hinchada verde',
    },
    excerpt: {
      'pt-BR':
        'Utopia Ancestral: o boi branco da estrela verde volta aos que vieram antes para sonhar o que vem depois.',
      en: 'Ancestral Utopia: the white boi with the green star goes back to those who came before to dream what comes next.',
      es: 'Utopía Ancestral: el boi blanco de la estrella verde vuelve a los que vinieron antes para soñar lo que viene después.',
    },
    body: [
      {
        'pt-BR':
          'Em noite de festa no curral, a diretoria apresentou o tema da temporada 2026, Utopia Ancestral. A proposta volta aos povos do Alto Solimões e às origens do Boi Besouro, o boi do alagado, para contar o mundo que os mais velhos conheceram e que a arena quer ver de novo.',
        en: 'On a party night at the curral, the board unveiled the 2026 season theme, Ancestral Utopia. It goes back to the peoples of the Upper Solimões and the roots of Boi Besouro, the boi of the floodplain, to tell the world the elders knew and the arena wants to see again.',
        es: 'En noche de fiesta en el corral, la directiva presentó el tema de la temporada 2026, Utopía Ancestral. La propuesta vuelve a los pueblos del Alto Solimões y a los orígenes del Boi Besouro, el boi del anegado, para contar el mundo que los mayores conocieron y que la arena quiere ver de nuevo.',
      },
      {
        'pt-BR':
          'O manifesto completo está na página do tema, e as toadas da temporada chegam nas próximas semanas.',
        en: 'The full manifesto is on the theme page, and the season toadas arrive in the coming weeks.',
        es: 'El manifiesto completo está en la página del tema, y las toadas de la temporada llegan en las próximas semanas.',
      },
    ],
  },
  {
    slug: 'toadas-da-temporada-ganham-data-de-lancamento',
    date: '2026-08-12',
    category: 'toadas',
    cover: { kind: 'art', art: 'estrela' },
    title: {
      'pt-BR': 'Toadas da temporada ganham data de lançamento',
      en: 'Season toadas get a release date',
      es: 'Las toadas de la temporada tienen fecha de lanzamiento',
    },
    excerpt: {
      'pt-BR':
        'O álbum sai nas plataformas de música e na página de toadas, com as letras completas.',
      en: 'The album comes out on music platforms and on the toadas page, with full lyrics.',
      es: 'El álbum sale en las plataformas de música y en la página de toadas, con las letras completas.',
    },
    body: [
      {
        'pt-BR':
          'As toadas escolhidas pelo júri interno foram gravadas no estúdio parceiro e chegam às plataformas antes dos ensaios de arena. As letras ficam disponíveis no site para a galera aprender junto.',
        en: 'The toadas chosen by the internal jury were recorded at the partner studio and reach the platforms before the arena rehearsals. The lyrics are available on the website so the crowd can learn them together.',
        es: 'Las toadas elegidas por el jurado interno se grabaron en el estudio aliado y llegan a las plataformas antes de los ensayos de arena. Las letras quedan en el sitio para que la hinchada las aprenda junta.',
      },
    ],
  },
  {
    slug: 'curral-recebe-oficina-de-alegorias',
    date: '2026-07-30',
    category: 'itens',
    cover: { kind: 'art', art: 'mata' },
    title: {
      'pt-BR': 'Curral recebe oficina de alegorias para jovens artistas',
      en: 'Curral hosts a float-making workshop for young artists',
      es: 'El corral recibe un taller de alegorías para jóvenes artistas',
    },
    excerpt: {
      'pt-BR':
        'Ferro, papel e espuma: a oficina ensina as técnicas que levantam as alegorias do boi.',
      en: 'Iron, paper and foam: the workshop teaches the techniques behind the boi floats.',
      es: 'Hierro, papel y espuma: el taller enseña las técnicas que levantan las alegorías del boi.',
    },
    body: [
      {
        'pt-BR':
          'Artistas do Mangangá passaram uma semana com jovens do bairro ensinando a estrutura em ferro, a modelagem em espuma e a pintura das alegorias. A oficina forma a próxima geração de quem faz o boi crescer na arena.',
        en: 'Mangangá artists spent a week with local youth teaching iron frames, foam modelling and painting for the floats. The workshop trains the next generation of those who make the boi grow in the arena.',
        es: 'Artistas del Mangangá pasaron una semana con jóvenes del barrio enseñando la estructura de hierro, el modelado en espuma y la pintura de las alegorías. El taller forma a la próxima generación de quienes hacen crecer al boi en la arena.',
      },
    ],
  },
  {
    slug: 'festival-folclorico-benjaminense-confirma-datas',
    date: '2026-06-18',
    category: 'festival',
    cover: { kind: 'art', art: 'bandeirinhas' },
    title: {
      'pt-BR': 'Festival Folclórico Benjaminense confirma as noites de julho',
      en: 'Benjamin Constant Folk Festival confirms its July nights',
      es: 'El Festival Folclórico de Benjamin Constant confirma las noches de julio',
    },
    excerpt: {
      'pt-BR':
        'As apresentações acontecem no bumbódromo, com público de três países na arquibancada.',
      en: 'The shows take place at the bumbódromo, with a crowd from three countries in the stands.',
      es: 'Las presentaciones se realizan en el bumbódromo, con público de tres países en la tribuna.',
    },
    body: [
      {
        'pt-BR':
          'A organização do festival confirmou as noites de apresentação no bumbódromo de Benjamin Constant. Como em todos os anos, a festa recebe visitantes de Islândia, no Peru, e de Letícia, na Colômbia, além de benjaminenses que voltam para casa só para ver o boi.',
        en: 'The festival organizers confirmed the show nights at the Benjamin Constant bumbódromo. As every year, the party welcomes visitors from Islandia, in Peru, and from Leticia, in Colombia, plus locals who come home just to see the boi.',
        es: 'La organización del festival confirmó las noches de presentación en el bumbódromo de Benjamin Constant. Como cada año, la fiesta recibe visitantes de Islandia, en Perú, y de Leticia, en Colombia, además de benjaminenses que vuelven a casa solo para ver al boi.',
      },
    ],
  },
]

/** As notícias da mais nova para a mais antiga. */
export function latestNews(limit?: number): Array<NewsArticle> {
  const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

  return sorted.slice(0, limit ?? sorted.length)
}

export function newsBySlug(slug: string): NewsArticle | undefined {
  return NEWS.find((article) => article.slug === slug)
}
