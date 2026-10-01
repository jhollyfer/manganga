import { createFileRoute } from '@tanstack/react-router'

import { validateAgendaSearch } from '#/lib/agenda-search'
import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/**
 * A agenda, com tipo e período na URL. O `loader` fixa o "agora" no servidor,
 * pelo mesmo motivo da home: HTML e hidratação concordam sobre o que passou.
 */
export const Route = createFileRoute('/_public/agenda/')({
  validateSearch: validateAgendaSearch,
  loader: () => ({ now: Date.now() }),
  head: () =>
    pageHead({
      path: '/agenda',
      title: m.agenda_pageTitle(),
      description: m.home_agendaLead(),
    }),
})
