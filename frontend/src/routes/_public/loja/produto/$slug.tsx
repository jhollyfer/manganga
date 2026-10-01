import { createFileRoute, notFound } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { localized, localizedUrl } from '#/lib/i18n'
import { SITE_IMAGE, SITE_TITLE } from '#/lib/site'
import { findCategory, findProduct, stockLevel } from '#/lib/store/catalog'
import {
  breadcrumbListJsonLd,
  jsonLdScript,
  productJsonLd,
} from '#/lib/structured-data'
import type { Crumb } from '#/lib/structured-data'
import { m } from '#/paraglide/messages'

/**
 * A página de um produto.
 *
 * O `loader` acha o produto e lança `notFound()` quando o endereço não
 * existe: o 404 de negócio do padrão, com o `notFoundComponent` próprio no
 * `.lazy.tsx`. O `Product` do JSON-LD sai daqui, no `head`, porque é o que
 * põe preço e disponibilidade no resultado do buscador, e o buscador lê o
 * HTML do servidor, não o que a tela monta depois.
 */
export const Route = createFileRoute('/_public/loja/produto/$slug')({
  loader: ({ params }) => {
    const product = findProduct(params.slug)
    if (!product) throw notFound()

    return product
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [
          { title: `${m.product_notFound()} · ${SITE_TITLE}` },
          { name: 'robots', content: 'noindex' },
        ],
      }

    const path = '/loja/produto/'.concat(params.slug)
    const name = localized(loaderData.name)
    const description = localized(loaderData.summary)
    const category = findCategory(loaderData.category)

    const trail: Array<Crumb> = [
      { name: m.nav_store(), url: localizedUrl('/loja') },
    ]
    if (category)
      trail.push({
        name: localized(category.name),
        url: localizedUrl('/loja/categoria/'.concat(category.slug)),
      })
    trail.push({ name, url: localizedUrl(path) })

    return {
      ...pageHead({ path, title: name, description }),
      scripts: [
        jsonLdScript(
          productJsonLd({
            name,
            description: localized(loaderData.description),
            url: localizedUrl(path),
            image: SITE_IMAGE,
            sku: loaderData.slug,
            price: loaderData.price,
            inStock: stockLevel(loaderData) !== 'out',
          }),
        ),
        ...breadcrumbListJsonLd(
          { name: m.nav_home(), url: localizedUrl('/') },
          trail,
        ).map(jsonLdScript),
      ],
    }
  },
})
