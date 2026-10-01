import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { validateCheckoutSearch } from '#/lib/store/order'
import { m } from '#/paraglide/messages'

/**
 * O checkout. O carrinho passa o CEP e a entrega já escolhidos pela URL
 * (`?cep=69630000&shipping=pickup`), para a pessoa não digitar duas vezes.
 * `noindex`, como o carrinho: é uma página de cada navegador.
 */
export const Route = createFileRoute('/_public/loja/checkout')({
  validateSearch: validateCheckoutSearch,
  head: () =>
    pageHead({
      path: '/loja/checkout',
      title: m.checkout_title(),
      description: m.store_metaDescription(),
      noindex: true,
    }),
})
