import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/** A central de ajuda da loja: o índice dos tópicos. */
export const Route = createFileRoute('/_public/loja/ajuda/')({
  head: () =>
    pageHead({
      path: '/loja/ajuda',
      title: `${m.help_title()} · ${m.nav_store()}`,
      description: m.help_lead(),
    }),
})
