import { createFileRoute, notFound } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { localized, localizedUrl } from '#/lib/i18n'
import { SITE_TITLE } from '#/lib/site'
import { findCategory } from '#/lib/store/catalog'
import { validateListingSearch } from '#/lib/store/listing'
import { breadcrumbListJsonLd, jsonLdScript } from '#/lib/structured-data'
import { m } from '#/paraglide/messages'

/**
 * Uma vitrine da loja: a categoria, com ordem e filtros na URL
 * (`?sort=price-asc&size=M&color=verde-mata&sale=true`).
 *
 * Categoria desconhecida é `notFound()` no loader, e não uma vitrine vazia:
 * vitrine vazia com status 200 é página que o buscador indexa sem nada nela.
 */
export const Route = createFileRoute('/_public/loja/categoria/$slug')({
  validateSearch: validateListingSearch,
  loader: ({ params }) => {
    const category = findCategory(params.slug)
    if (!category) throw notFound()

    return category
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [
          { title: `${m.store_categoryNotFound()} · ${SITE_TITLE}` },
          { name: 'robots', content: 'noindex' },
        ],
      }

    const path = '/loja/categoria/'.concat(params.slug)
    const title = localized(loaderData.name)

    return {
      ...pageHead({
        path,
        title: `${title} · ${m.nav_store()}`,
        description: localized(loaderData.description),
      }),
      scripts: breadcrumbListJsonLd(
        { name: m.nav_home(), url: localizedUrl('/') },
        [
          { name: m.nav_store(), url: localizedUrl('/loja') },
          { name: title, url: localizedUrl(path) },
        ],
      ).map(jsonLdScript),
    }
  },
})
