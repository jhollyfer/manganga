import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { localized } from '#/lib/i18n'
import { SEASON_YEAR } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { m } from '#/paraglide/messages'

/**
 * O tema da temporada, em `/tema` e sem o ano no endereço: o link que circula
 * no WhatsApp continua levando ao tema em cartaz quando a temporada virar.
 */
export const Route = createFileRoute('/_public/tema')({
  head: () =>
    pageHead({
      path: '/tema',
      title: m.theme_pageTitle({ year: SEASON_YEAR }),
      description: localized(THEME.lead),
    }),
})
