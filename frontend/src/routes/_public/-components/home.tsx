import type * as React from 'react'
import { getRouteApi } from '@tanstack/react-router'

import { Agenda } from './home/agenda'
import { Festival } from './home/festival'
import { Gallery } from './home/gallery'
import { Hero } from './home/hero'
import { History } from './home/history'
import { Items } from './home/items'
import { Join } from './home/join'
import { Manifesto } from './home/manifesto'
import { News } from './home/news'
import { Sponsors } from './home/sponsors'
import { Toadas } from './home/toadas'
import { nextFestivalNight, upcomingEvents } from '#/lib/events'
import { latestNews } from '#/lib/news'

const route = getRouteApi('/_public/')

/**
 * A home, montada.
 *
 * Só composição: a ordem aqui é a ordem na tela, e é a do Caprichoso. Primeiro
 * o tema (hero e manifesto) e o que vem por aí (agenda); depois quem faz a
 * festa (itens e toadas), o que está acontecendo (notícias), de onde o boi vem
 * (história) e como a festa funciona (festival); por fim as imagens, quem
 * apoia e o convite para entrar no boi.
 *
 * O "agora" vem do loader, decidido no servidor: o HTML e a hidratação
 * concordam sobre quais eventos já passaram.
 */
export function Home(): React.JSX.Element {
  const { now } = route.useLoaderData()

  return (
    <>
      <Hero festival={nextFestivalNight(now)} />
      <Manifesto />
      <Agenda events={upcomingEvents(now, 3)} />
      <Items />
      <Toadas />
      <News articles={latestNews(3)} />
      <History />
      <Festival />
      <Gallery />
      <Sponsors />
      <Join />
    </>
  )
}
