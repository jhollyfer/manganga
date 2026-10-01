import { createFileRoute, notFound } from '@tanstack/react-router'

import { eventBySlug } from '#/lib/events'
import { pageHead } from '#/lib/head'
import { localized, localizedUrl } from '#/lib/i18n'
import { SITE_TITLE } from '#/lib/site'
import {
  breadcrumbListJsonLd,
  eventJsonLd,
  jsonLdScript,
} from '#/lib/structured-data'
import { m } from '#/paraglide/messages'

/**
 * Um evento da agenda. Endereço que não existe é `notFound()` no loader, com a
 * tela própria em `notFoundComponent`, e não uma página em branco.
 */
export const Route = createFileRoute('/_public/agenda/$slug')({
  loader: ({ params }) => {
    const event = eventBySlug(params.slug)
    if (!event) throw notFound()

    return { slug: event.slug, now: Date.now() }
  },
  head: ({ loaderData }) => {
    const event = eventBySlug(loaderData?.slug ?? '')
    if (!event)
      return {
        meta: [
          { title: `${m.notFound_title()} · ${SITE_TITLE}` },
          { name: 'robots', content: 'noindex' },
        ],
      }

    const path = '/agenda/'.concat(event.slug)
    const head = pageHead({
      path,
      title: localized(event.title),
      description: localized(event.summary),
    })

    return {
      ...head,
      scripts: [
        jsonLdScript(
          eventJsonLd({
            name: localized(event.title),
            description: localized(event.summary),
            url: localizedUrl(path),
            startDate: event.startsAt,
            location: event.location,
          }),
        ),
        ...breadcrumbListJsonLd(
          { name: m.nav_home(), url: localizedUrl('/') },
          [
            { name: m.nav_agenda(), url: localizedUrl('/agenda') },
            { name: localized(event.title), url: localizedUrl(path) },
          ],
        ).map(jsonLdScript),
      ],
    }
  },
})
