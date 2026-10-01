import type { LocalizedText } from './i18n'

/**
 * As toadas do Mangangá, por álbum de temporada.
 *
 * A letra é o texto original, em português, nos três idiomas do site: toada
 * não se traduz, se canta. O que muda de idioma é a moldura da página.
 *
 * **Repertório de exemplo**, como o resto do conteúdo: títulos e letras são
 * marcadores para a página ter a forma certa, e a diretoria troca pelo
 * repertório gravado.
 */
export type Toada = {
  number: number
  title: string
  composers: string
  /** Estrofes da letra. Vazio quando a letra ainda não foi publicada. */
  lyrics: ReadonlyArray<string>
}

export type Album = {
  year: number
  title: string
  description: LocalizedText
  tracks: ReadonlyArray<Toada>
}

export const ALBUMS: ReadonlyArray<Album> = [
  {
    year: 2026,
    title: 'O boi que canta o alagado',
    description: {
      'pt-BR':
        'O álbum da temporada 2026, gravado para o tema que volta às origens do Boi Besouro.',
      en: 'The 2026 season album, recorded for the theme that goes back to the roots of Boi Besouro.',
      es: 'El álbum de la temporada 2026, grabado para el tema que vuelve a los orígenes del Boi Besouro.',
    },
    tracks: [
      {
        number: 1,
        title: 'Besouro do alagado',
        composers: 'Compositores do curral',
        lyrics: [
          'Quando a água sobe no Javarizinho\nO pescador não larga o seu caminho\nLevanta a casa, levanta o canto\nE o boi branco seca o nosso pranto',
          'Ê, Besouro, estrela verde na testa\nO Coaban inteiro vem pra festa\nÊ, Besouro, boi do alagado\nTeu povo canta do teu lado',
        ],
      },
      {
        number: 2,
        title: 'Beco 50',
        composers: 'Compositores do curral',
        lyrics: [
          'Foi no beco 50 que o boi nasceu\nDa mão do pescador que não esqueceu\nO forró de rua, a lamparina acesa\nO Mangangá virou nossa riqueza',
        ],
      },
      {
        number: 3,
        title: 'Marujada de Guerra',
        composers: 'Compositores do curral',
        lyrics: [
          'Bate o tambor que a guerra é de alegria\nA marujada chega e incendeia\nRepique, caixa, surdo no compasso\nO bumbódromo treme a cada passo',
        ],
      },
      {
        number: 4,
        title: 'Tríplice fronteira',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 5,
        title: 'Cheia e vazante',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 6,
        title: 'Galera verde',
        composers: 'Compositores do curral',
        lyrics: [],
      },
    ],
  },
  {
    year: 2025,
    title: 'Raízes do Coaban',
    description: {
      'pt-BR':
        'As toadas que levaram a história do bairro para a arena na temporada 2025.',
      en: 'The toadas that took the neighbourhood story to the arena in the 2025 season.',
      es: 'Las toadas que llevaron la historia del barrio a la arena en la temporada 2025.',
    },
    tracks: [
      {
        number: 1,
        title: 'Raízes do Coaban',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 2,
        title: 'Pescador',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 3,
        title: 'Estrela da mata',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 4,
        title: 'Lamparina',
        composers: 'Compositores do curral',
        lyrics: [],
      },
    ],
  },
  {
    year: 2024,
    title: 'Trilogia',
    description: {
      'pt-BR':
        'O álbum que celebrou o Mangangá como parte da trilogia cultural de Benjamin Constant.',
      en: 'The album that celebrated Mangangá as part of the cultural trilogy of Benjamin Constant.',
      es: 'El álbum que celebró al Mangangá como parte de la trilogía cultural de Benjamin Constant.',
    },
    tracks: [
      {
        number: 1,
        title: 'Trilogia',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 2,
        title: 'Boi de rua',
        composers: 'Compositores do curral',
        lyrics: [],
      },
      {
        number: 3,
        title: 'Pavilhão verde e branco',
        composers: 'Compositores do curral',
        lyrics: [],
      },
    ],
  },
]

export function albumByYear(year: number): Album | undefined {
  return ALBUMS.find((album) => album.year === year)
}
