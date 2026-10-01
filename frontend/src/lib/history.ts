import type { LocalizedText } from './i18n'

/**
 * A história do Mangangá, em marcos.
 *
 * Os fatos de 1992 (o pescador Raimundo Dimas, o beco 50, o boi branco da
 * estrela verde, os forrós de rua) vêm do site anterior, que os publicava. Os
 * marcos sem data exata usam a década, e não um ano inventado: um ano errado
 * numa linha do tempo é o tipo de erro que a comunidade corrige na primeira
 * leitura.
 */
export type Milestone = {
  /** O rótulo do marco: um ano ou uma década. */
  when: LocalizedText
  title: LocalizedText
  text: LocalizedText
}

export const MILESTONES: ReadonlyArray<Milestone> = [
  {
    when: { 'pt-BR': '1992', en: '1992', es: '1992' },
    title: {
      'pt-BR': 'Nasce no beco 50',
      en: 'Born on alley 50',
      es: 'Nace en el callejón 50',
    },
    text: {
      'pt-BR':
        'O pescador Raimundo Dimas, de origem nordestina, cria o boi no beco 50 do bairro da Coaban, o Javarizinho.',
      en: 'Fisherman Raimundo Dimas, of northeastern Brazilian origin, creates the boi on alley 50 in the Coaban neighbourhood, the Javarizinho.',
      es: 'El pescador Raimundo Dimas, de origen nordestino, crea el boi en el callejón 50 del barrio Coaban, el Javarizinho.',
    },
  },
  {
    when: { 'pt-BR': 'Anos 1990', en: '1990s', es: 'Años 1990' },
    title: {
      'pt-BR': 'Do forró de rua para a cidade',
      en: 'From street forró to the whole town',
      es: 'Del forró callejero a la ciudad',
    },
    text: {
      'pt-BR':
        'O que começa como diversão nos forrós de rua ganha o bairro e, depois, o coração de Benjamin Constant.',
      en: 'What starts as fun in the street forrós wins the neighbourhood and then the heart of Benjamin Constant.',
      es: 'Lo que empieza como diversión en los forrós callejeros gana el barrio y, después, el corazón de Benjamin Constant.',
    },
  },
  {
    when: { 'pt-BR': 'Anos 2000', en: '2000s', es: 'Años 2000' },
    title: {
      'pt-BR': 'O Besouro chega à arena',
      en: 'The Besouro reaches the arena',
      es: 'El Besouro llega a la arena',
    },
    text: {
      'pt-BR':
        'O boi passa a disputar o Festival Folclórico Benjaminense e começa a colecionar os títulos que o fazem o maior campeão.',
      en: 'The boi starts competing in the Benjamin Constant Folk Festival and begins collecting the titles that make it the top champion.',
      es: 'El boi pasa a disputar el Festival Folclórico de Benjamin Constant y empieza a coleccionar los títulos que lo hacen el mayor campeón.',
    },
  },
  {
    when: { 'pt-BR': '2022', en: '2022', es: '2022' },
    title: {
      'pt-BR': 'Trinta anos de estrela verde',
      en: 'Thirty years of the green star',
      es: 'Treinta años de estrella verde',
    },
    text: {
      'pt-BR':
        'Três décadas depois do beco 50, o Mangangá é parte oficial da trilogia cultural do município.',
      en: 'Three decades after alley 50, Mangangá is an official part of the municipal cultural trilogy.',
      es: 'Tres décadas después del callejón 50, el Mangangá es parte oficial de la trilogía cultural del municipio.',
    },
  },
  {
    when: { 'pt-BR': '2026', en: '2026', es: '2026' },
    title: {
      'pt-BR': 'Utopia Ancestral',
      en: 'Ancestral Utopia',
      es: 'Utopía Ancestral',
    },
    text: {
      'pt-BR':
        'O tema da temporada volta aos povos do Alto Solimões e às origens do boi para sonhar o futuro.',
      en: 'The season theme goes back to the peoples of the Upper Solimões and the roots of the boi to dream the future.',
      es: 'El tema de la temporada vuelve a los pueblos del Alto Solimões y a los orígenes del boi para soñar el futuro.',
    },
  },
]

/** Os três pilares que o boi defende, da seção "Tradição e cultura". */
export type Pillar = {
  key: 'marujada' | 'champion' | 'trilogy'
  title: LocalizedText
  text: LocalizedText
}

export const PILLARS: ReadonlyArray<Pillar> = [
  {
    key: 'marujada',
    title: {
      'pt-BR': 'Marujada de Guerra',
      en: 'Marujada de Guerra',
      es: 'Marujada de Guerra',
    },
    text: {
      'pt-BR':
        'A tradição musical do boi: a batucada que traz o ritmo de cada apresentação no bumbódromo.',
      en: 'The musical tradition of the boi: the drum line that brings the rhythm to every show at the bumbódromo.',
      es: 'La tradición musical del boi: la batucada que trae el ritmo de cada presentación en el bumbódromo.',
    },
  },
  {
    key: 'champion',
    title: {
      'pt-BR': 'Maior campeão',
      en: 'Top champion',
      es: 'Mayor campeón',
    },
    text: {
      'pt-BR':
        'Títulos conquistados ao longo de três décadas fazem do Mangangá o boi mais vitorioso do festival.',
      en: 'Titles won over three decades make Mangangá the most victorious boi of the festival.',
      es: 'Títulos conquistados a lo largo de tres décadas hacen del Mangangá el boi más victorioso del festival.',
    },
  },
  {
    key: 'trilogy',
    title: {
      'pt-BR': 'Trilogia cultural',
      en: 'Cultural trilogy',
      es: 'Trilogía cultural',
    },
    text: {
      'pt-BR':
        'O boi representa oficialmente a trilogia cultural do município, orgulho de toda a comunidade benjaminense.',
      en: 'The boi officially represents the municipal cultural trilogy, the pride of the whole Benjamin Constant community.',
      es: 'El boi representa oficialmente la trilogía cultural del municipio, orgullo de toda la comunidad benjaminense.',
    },
  },
]
