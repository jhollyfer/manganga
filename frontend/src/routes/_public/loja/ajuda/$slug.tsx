import { createFileRoute, notFound } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { localized, localizedUrl } from '#/lib/i18n'
import { SITE_TITLE } from '#/lib/site'
import { findHelpTopic } from '#/lib/store/help'
import { breadcrumbListJsonLd, jsonLdScript } from '#/lib/structured-data'
import { m } from '#/paraglide/messages'

/**
 * Um tópico da central de ajuda. Tópico desconhecido é `notFound()` no
 * loader, com o `notFoundComponent` no `.lazy.tsx`.
 */
export const Route = createFileRoute('/_public/loja/ajuda/$slug')({
  loader: ({ params }) => {
    const topic = findHelpTopic(params.slug)
    if (!topic) throw notFound()

    return topic
  },
  head: ({ loaderData, params }) => {
    if (!loaderData)
      return {
        meta: [
          { title: `${m.help_notFound()} · ${SITE_TITLE}` },
          { name: 'robots', content: 'noindex' },
        ],
      }

    const path = '/loja/ajuda/'.concat(params.slug)
    const title = localized(loaderData.title)

    return {
      ...pageHead({
        path,
        title: `${title} · ${m.nav_store()}`,
        description: localized(loaderData.summary),
      }),
      scripts: breadcrumbListJsonLd(
        { name: m.nav_home(), url: localizedUrl('/') },
        [
          { name: m.nav_store(), url: localizedUrl('/loja') },
          { name: m.help_title(), url: localizedUrl('/loja/ajuda') },
          { name: title, url: localizedUrl(path) },
        ],
      ).map(jsonLdScript),
    }
  },
})
