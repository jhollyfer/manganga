import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { validateListingSearch } from '#/lib/store/listing'
import { m } from '#/paraglide/messages'

/**
 * A busca da loja (`?q=camisa`), que também é a vitrine do catálogo inteiro
 * com ordem e filtros: "ver todos os mais vendidos" e "promoções" caem aqui.
 *
 * `noindex`: cada termo buscado é uma URL nova, e o buscador gastaria a
 * visita dele indexando "camisa", "camisas" e "camisa verde" como páginas
 * diferentes do mesmo catálogo. As vitrines de categoria é que entram.
 */
export const Route = createFileRoute('/_public/loja/busca')({
  validateSearch: validateListingSearch,
  head: () =>
    pageHead({
      path: '/loja/busca',
      title: `${m.store_searchTitle()} · ${m.nav_store()}`,
      description: m.store_metaDescription(),
      noindex: true,
    }),
})
