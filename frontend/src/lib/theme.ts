import type { LocalizedText } from './i18n'
import type { Cover } from './media'

/**
 * O tema da temporada: o manifesto que o boi leva para a arena.
 *
 * Um registro só, e não uma lista por ano: a página `/tema` é sempre a da
 * temporada em cartaz, como a `/tema-2026` do Caprichoso, sem o ano no
 * endereço para o link não envelhecer. O texto é de exemplo, escrito a partir
 * da origem do Boi Besouro, o boi do alagado.
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
    'pt-BR': 'O boi que canta o alagado',
    en: 'The boi that sings the floodplain',
    es: 'El boi que canta el anegado',
  },
  lead: {
    'pt-BR':
      'Quando o Javarizinho sobe, o Coaban não para. O Mangangá volta às suas origens para cantar a cheia, a vazante e a gente que aprendeu a viver com o rio.',
    en: 'When the Javarizinho rises, Coaban does not stop. Mangangá goes back to its roots to sing the flood, the ebb and the people who learned to live with the river.',
    es: 'Cuando el Javarizinho sube, el Coaban no se detiene. El Mangangá vuelve a sus orígenes para cantar la crecida, la bajante y la gente que aprendió a vivir con el río.',
  },
  closing: {
    'pt-BR':
      'O boi branco da estrela verde é o pescador que não larga o remo. É a casa levantada no esteio, o forró na rua seca, a galera que volta todo ano. É o alagado cantando.',
    en: 'The white boi with the green star is the fisherman who never lets go of the oar. It is the house raised on stilts, the forró on the dry street, the crowd that returns every year. It is the floodplain singing.',
    es: 'El boi blanco de la estrella verde es el pescador que no suelta el remo. Es la casa levantada sobre pilotes, el forró en la calle seca, la hinchada que vuelve cada año. Es el anegado cantando.',
  },
  chapters: [
    {
      numeral: 'I',
      eyebrow: { 'pt-BR': 'Capítulo I', en: 'Chapter I', es: 'Capítulo I' },
      title: { 'pt-BR': 'A cheia', en: 'The flood', es: 'La crecida' },
      text: {
        'pt-BR':
          'Todo ano a água chega sem pedir licença. Entra no quintal, sobe a escada, cobre a rua. E todo ano o bairro responde do mesmo jeito: levanta o assoalho, amarra a canoa na porta e segue a vida em cima do rio.',
        en: 'Every year the water arrives without asking. It enters the yard, climbs the stairs, covers the street. And every year the neighbourhood answers the same way: raises the floor, ties the canoe to the door and goes on living above the river.',
        es: 'Cada año el agua llega sin pedir permiso. Entra al patio, sube la escalera, cubre la calle. Y cada año el barrio responde igual: levanta el piso, amarra la canoa a la puerta y sigue la vida sobre el río.',
      },
      cover: { kind: 'art', art: 'rio' },
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
      cover: { kind: 'photo', photo: 'boi', focus: '50% 40%' },
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
          'Branco como a espuma do rio, com uma estrela verde na testa. O Besouro carrega na pele a resistência de quem planta na várzea e colhe antes da água voltar.',
        en: 'White as river foam, with a green star on the forehead. The Besouro carries on its skin the resilience of those who plant on the floodplain and harvest before the water returns.',
        es: 'Blanco como la espuma del río, con una estrella verde en la frente. El Besouro lleva en la piel la resistencia de quien siembra en la várzea y cosecha antes de que el agua vuelva.',
      },
      cover: { kind: 'art', art: 'estrela' },
    },
    {
      numeral: 'IV',
      eyebrow: { 'pt-BR': 'Capítulo IV', en: 'Chapter IV', es: 'Capítulo IV' },
      title: { 'pt-BR': 'A vazante', en: 'The ebb', es: 'La bajante' },
      text: {
        'pt-BR':
          'Quando a água baixa, a rua seca vira terreiro. É a hora do forró, da lamparina acesa e do boi saindo do curral. A vazante é a festa de quem atravessou a cheia junto.',
        en: 'When the water drops, the dry street becomes a dance floor. It is time for forró, for the lit oil lamp and for the boi leaving the curral. The ebb is the party of those who crossed the flood together.',
        es: 'Cuando el agua baja, la calle seca se vuelve terreiro. Es la hora del forró, del candil encendido y del boi saliendo del corral. La bajante es la fiesta de quienes atravesaron juntos la crecida.',
      },
      cover: { kind: 'photo', photo: 'festival', focus: '50% 60%' },
    },
  ] satisfies ReadonlyArray<ThemeChapter>,
}
