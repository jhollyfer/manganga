import type * as React from 'react'
import { getRouteApi } from '@tanstack/react-router'

import { Agenda } from './home/agenda'
import { Festival } from './home/festival'
import { Hero } from './home/hero'
import { History } from './home/history'
import { Items } from './home/items'
import { Join } from './home/join'
import { Manifesto } from './home/manifesto'
import { News } from './home/news'
import { Store } from './home/store'
import { Toadas } from './home/toadas'
import { nextFestivalNight, upcomingEvents } from '#/lib/events'
import { latestNews } from '#/lib/news'

const route = getRouteApi('/_public/')

/**
 * A home, montada.
 *
 * Só composição: a ordem aqui é a ordem na tela. Primeiro o tema (hero e
 * manifesto) e o que vem por aí (agenda); depois quem faz a festa (itens e
 * toadas), o que está acontecendo (notícias), a camisa para vestir (loja), de
 * onde o boi vem (história) e como a festa funciona (festival); por fim o
 * convite para entrar no boi.
 *
 * A galeria e os apoiadores saíram da home: com duas fotos no acervo a
 * galeria repetia o hero, e a faixa de apoiadores sem nenhum apoiador era um
 * espaço vazio pedindo patrocínio. Os dois continuam nas páginas próprias.
 *
 * Cada seção usa um desenho diferente (foto, texto, tabela, índice, encarte,
 * jornal, trilho, régua, perguntas, faixa), porque o mesmo cabeçalho com o
 * mesmo bloco embaixo, seção após seção, é o que faz uma página parecer gerada
 * em série.
 *
 * O "agora" vem do loader, decidido no servidor: o HTML e a hidratação
 * concordam sobre quais eventos já passaram.
 */
export function Home(): React.JSX.Element {
  const { now } = route.useLoaderData()

  return (
    <>
      <Hero />
      <Manifesto />
      <Agenda
        events={upcomingEvents(now, 3)}
        festival={nextFestivalNight(now)}
      />
      <Items />
      <Toadas />
      <News articles={latestNews(3)} />
      <Store />
      <History />
      <Festival />
      <Join />
    </>
  )
}
