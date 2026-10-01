import { createFileRoute, notFound } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { localized, localizedUrl } from '#/lib/i18n'
import { PHOTOS } from '#/lib/media'
import { newsBySlug } from '#/lib/news'
import { SITE_IMAGE, SITE_TITLE, absoluteUrl } from '#/lib/site'
import {
  breadcrumbListJsonLd,
  jsonLdScript,
  newsArticleJsonLd,
} from '#/lib/structured-data'
import { m } from '#/paraglide/messages'

/**
 * Uma notícia. A imagem do cartão de link é a foto da capa quando há foto, e
 * a imagem do site quando a capa é ilustração: SVG desenhado em React não tem
 * endereço para o rastreador baixar.
 */
export const Route = createFileRoute('/_public/noticias/$slug')({
  loader: ({ params }) => {
    const article = newsBySlug(params.slug)
    if (!article) throw notFound()

    return { slug: article.slug }
  },
  head: ({ loaderData }) => {
    const article = newsBySlug(loaderData?.slug ?? '')
    if (!article)
      return {
        meta: [
          { title: `${m.notFound_title()} · ${SITE_TITLE}` },
          { name: 'robots', content: 'noindex' },
        ],
      }

    const path = '/noticias/'.concat(article.slug)
    const title = localized(article.title)
    const description = localized(article.excerpt)

    let image = SITE_IMAGE
    if (article.cover.kind === 'photo')
      image = absoluteUrl(PHOTOS[article.cover.photo])

    return {
      ...pageHead({ path, title, description, image, type: 'article' }),
      scripts: [
        jsonLdScript(
          newsArticleJsonLd({
            title,
            description,
            url: localizedUrl(path),
            image,
            author: SITE_TITLE,
            publishedAt: article.date,
          }),
        ),
        ...breadcrumbListJsonLd(
          { name: m.nav_home(), url: localizedUrl('/') },
          [
            { name: m.nav_news(), url: localizedUrl('/noticias') },
            { name: title, url: localizedUrl(path) },
          ],
        ).map(jsonLdScript),
      ],
    }
  },
})
