import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/**
 * O carrinho. `noindex`: é uma página de cada navegador, e o que o servidor
 * entrega a um rastreador é sempre o carrinho vazio.
 */
export const Route = createFileRoute('/_public/loja/carrinho')({
  head: () =>
    pageHead({
      path: '/loja/carrinho',
      title: m.store_cartTitle(),
      description: m.store_metaDescription(),
      noindex: true,
    }),
})
