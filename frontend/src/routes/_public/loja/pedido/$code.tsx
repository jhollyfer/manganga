import { createFileRoute, notFound } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { isOrderCode } from '#/lib/store/order'
import { m } from '#/paraglide/messages'

/**
 * A confirmação de um pedido, em `/loja/pedido/MGA-XXXXXX`.
 *
 * O pedido mora no navegador de quem comprou, então o servidor não sabe se
 * ele existe: quem decide é a tela, depois de hidratar. O que o servidor já
 * sabe é a forma do código, e endereço que nem tem a forma de um pedido é
 * `notFound()` aqui, com o 404 de verdade.
 *
 * `noindex` porque cada pedido é de uma pessoa só.
 */
export const Route = createFileRoute('/_public/loja/pedido/$code')({
  loader: ({ params }) => {
    if (!isOrderCode(params.code.toUpperCase())) throw notFound()
  },
  head: ({ params }) =>
    pageHead({
      path: '/loja/pedido/'.concat(params.code),
      title: m.order_title(),
      description: m.store_metaDescription(),
      noindex: true,
    }),
})
