import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/**
 * A vitrine da loja oficial. Sem `loader`: o catálogo mora em `lib/store`, e
 * a tela lê as funções dele direto, como a home lê as notícias.
 */
export const Route = createFileRoute('/_public/loja/')({
  head: () =>
    pageHead({
      path: '/loja',
      title: m.nav_store(),
      description: m.store_metaDescription(),
    }),
})
