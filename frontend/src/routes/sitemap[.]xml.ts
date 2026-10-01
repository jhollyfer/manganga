import { createFileRoute } from '@tanstack/react-router'

import { EVENTS } from '#/lib/events'
import { NEWS } from '#/lib/news'
import { STATIC_ENTRIES, buildSitemap } from '#/lib/sitemap'
import type { SitemapEntry } from '#/lib/sitemap'
import { SITE_URL } from '#/lib/site'
import { CATEGORIES, PRODUCTS } from '#/lib/store/catalog'
import { HELP_TOPICS } from '#/lib/store/help'
import { locales, localizeHref } from '#/paraglide/runtime'

/**
 * O sitemap, servido em `/sitemap.xml`.
 *
 * Rota de servidor e não página: quem consome é o rastreador do buscador, que
 * precisa de `Content-Type` e status próprios.
 *
 * Notícias, eventos, vitrines e produtos saem dos próprios registros em
 * `lib/`, e não de uma lista escrita aqui: um produto novo entra no sitemap no
 * mesmo commit que o põe à venda.
 *
 * Cada página entra uma vez por idioma (`/loja`, `/en/loja`, `/es/loja`): são
 * endereços diferentes para o rastreador, e o que não está no sitemap demora a
 * ser descoberto.
 */
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const entries: Array<SitemapEntry> = [
          ...STATIC_ENTRIES,
          ...NEWS.map((article) => ({
            path: '/noticias/'.concat(article.slug),
            lastModified: article.date,
            priority: 0.5,
          })),
          ...EVENTS.map((event) => ({
            path: '/agenda/'.concat(event.slug),
            priority: 0.4,
          })),
          ...CATEGORIES.map((category) => ({
            path: '/loja/categoria/'.concat(category.slug),
            priority: 0.6,
          })),
          ...PRODUCTS.map((product) => ({
            path: '/loja/produto/'.concat(product.slug),
            lastModified: product.addedAt,
            priority: 0.6,
          })),
          ...HELP_TOPICS.map((topic) => ({
            path: '/loja/ajuda/'.concat(topic.slug),
            priority: 0.3,
          })),
        ]

        const localized = locales.flatMap((locale) =>
          entries.map((entry) => ({
            ...entry,
            path: localizeHref(entry.path, { locale }),
          })),
        )

        return new Response(buildSitemap(SITE_URL, localized), {
          status: 200,
          headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
