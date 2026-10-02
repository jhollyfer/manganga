import type { LocalizedText } from './i18n'
import type { Cover } from './media'

/**
 * O tema da temporada: o manifesto que o boi leva para a arena.
 *
 * Um registro só, e não uma lista por ano: a página `/tema` é sempre a da
 * temporada em cartaz, como a `/tema-2026` do Caprichoso, sem o ano no
 * endereço para o link não envelhecer. O tema de 2026 é "Utopia Ancestral";
 * o texto dos capítulos é de exemplo, escrito a partir da origem do Boi
 * Besouro, e a diretoria revisa antes de valer como manifesto oficial.
 */
export type ThemeChapter = {
  numeral: string
  eyebrow: LocalizedText
  title: LocalizedText
  text: LocalizedText
  cover: Cover
}

export const THEME = {
  title: {
    'pt-BR': 'Utopia Ancestral',
    en: 'Ancestral Utopia',
    es: 'Utopía Ancestral',
  },
  lead: {
    'pt-BR':
      'O Mangangá olha para trás para sonhar para a frente: os povos do Alto Solimões, o pescador do beco 50 e o mundo que a floresta ainda promete.',
    en: 'Mangangá looks back in order to dream forward: the peoples of the Upper Solimões, the fisherman of alley 50 and the world the forest still promises.',
    es: 'El Mangangá mira hacia atrás para soñar hacia adelante: los pueblos del Alto Solimões, el pescador del callejón 50 y el mundo que la selva todavía promete.',
  },
  closing: {
    'pt-BR':
      'A utopia não está no futuro. Ela foi vivida antes de nós, na beira deste rio, e o boi branco da estrela verde volta à arena para lembrar o caminho.',
    en: 'Utopia is not in the future. It was lived before us, on the bank of this river, and the white boi with the green star returns to the arena to remember the way.',
    es: 'La utopía no está en el futuro. Fue vivida antes que nosotros, a la orilla de este río, y el boi blanco de la estrella verde vuelve a la arena para recordar el camino.',
  },
  chapters: [
    {
      numeral: 'I',
      eyebrow: { 'pt-BR': 'Capítulo I', en: 'Chapter I', es: 'Capítulo I' },
      title: {
        'pt-BR': 'Os que vieram antes',
        en: 'Those who came before',
        es: 'Los que vinieron antes',
      },
      text: {
        'pt-BR':
          'Antes da cidade, o Javari e o Solimões já tinham dono: os povos que pescavam, plantavam e contavam a origem do mundo nestas águas. A arena começa por eles.',
        en: 'Before the town, the Javari and the Solimões already had keepers: the peoples who fished, planted and told the origin of the world in these waters. The arena begins with them.',
        es: 'Antes de la ciudad, el Yavarí y el Solimões ya tenían dueños: los pueblos que pescaban, sembraban y contaban el origen del mundo en estas aguas. La arena empieza por ellos.',
      },
      cover: { kind: 'art', art: 'mata' },
    },
    {
      numeral: 'II',
      eyebrow: { 'pt-BR': 'Capítulo II', en: 'Chapter II', es: 'Capítulo II' },
      title: { 'pt-BR': 'O pescador', en: 'The fisherman', es: 'El pescador' },
      text: {
        'pt-BR':
          'Raimundo Dimas veio do Nordeste e encontrou no Javari o seu mar. Foi pescando que ele aprendeu o tempo das águas, e foi no beco 50 que ele deu ao bairro um boi para chamar de seu.',
        en: 'Raimundo Dimas came from the Northeast and found his sea in the Javari. Fishing taught him the timing of the waters, and on alley 50 he gave the neighbourhood a boi to call its own.',
        es: 'Raimundo Dimas vino del Nordeste y encontró en el Yavarí su mar. Pescando aprendió el tiempo de las aguas, y en el callejón 50 le dio al barrio un boi para llamar suyo.',
      },
      cover: { kind: 'art', art: 'rio' },
    },
    {
      numeral: 'III',
      eyebrow: {
        'pt-BR': 'Capítulo III',
        en: 'Chapter III',
        es: 'Capítulo III',
      },
      title: {
        'pt-BR': 'A estrela',
        en: 'The star',
        es: 'La estrella',
      },
      text: {
        'pt-BR':
          'Branco como a espuma do rio, com uma estrela verde na testa. O Besouro carrega na pele a herança de quem planta na várzea e colhe antes da água voltar.',
        en: 'White as river foam, with a green star on the forehead. The Besouro carries on its skin the heritage of those who plant on the floodplain and harvest before the water returns.',
        es: 'Blanco como la espuma del río, con una estrella verde en la frente. El Besouro lleva en la piel la herencia de quien siembra en la várzea y cosecha antes de que el agua vuelva.',
      },
      cover: { kind: 'art', art: 'estrela' },
    },
    {
      numeral: 'IV',
      eyebrow: { 'pt-BR': 'Capítulo IV', en: 'Chapter IV', es: 'Capítulo IV' },
      title: {
        'pt-BR': 'O mundo prometido',
        en: 'The promised world',
        es: 'El mundo prometido',
      },
      text: {
        'pt-BR':
          'A floresta de pé, o rio com peixe, a festa na rua de todo mundo. A utopia do Mangangá é a que os mais velhos já conheceram, e a arena é onde ela volta a existir por uma noite.',
        en: "The forest standing, the river full of fish, the party on everyone's street. Mangangá's utopia is the one the elders already knew, and the arena is where it exists again for one night.",
        es: 'La selva en pie, el río con peces, la fiesta en la calle de todos. La utopía del Mangangá es la que los mayores ya conocieron, y la arena es donde vuelve a existir por una noche.',
      },
      cover: { kind: 'art', art: 'bandeirinhas' },
    },
  ] satisfies ReadonlyArray<ThemeChapter>,
}
