import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { NewsCard } from '../news-card'
import { REVEAL, STAGGER } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import { formatShortDate } from '#/lib/dates'
import { localized } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import type { NewsArticle } from '#/lib/news'
import { m } from '#/paraglide/messages'

/**
 * As últimas notícias como primeira página de jornal: a manchete com foto de
 * um lado, as outras como chamadas só de texto do outro. Três cartões iguais
 * lado a lado é a grade que todo gerador entrega; jornal tem hierarquia.
 */
export function News({
  articles,
}: {
  articles: ReadonlyArray<NewsArticle>
}): React.JSX.Element | null {
  const featured = articles.at(0)
  if (!featured) return null
  const rest = articles.slice(1)

  return (
    <section data-slot="home-news" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          title={
            <>
              {m.home_newsTitleLead()} <em>{m.home_newsTitleEm()}</em>
            </>
          }
          action={
            <SectionAction render={<Link to="/noticias" />}>
              {m.home_newsCta()}
            </SectionAction>
          }
        />
        <div className="grid gap-12 border-t border-foreground pt-10 lg:grid-cols-[1.5fr_1fr]">
          <NewsCard article={featured} featured className={REVEAL} />
          <ul className="grid content-start lg:border-l lg:border-border lg:pl-10">
            {rest.map((article, index) => (
              <li
                key={article.slug}
                className={`${REVEAL} border-b border-border py-6 first:pt-0`}
                style={{ animationDelay: `${(index + 1) * STAGGER}ms` }}
              >
                <Link
                  to="/noticias/$slug"
                  params={{ slug: article.slug }}
                  className="group block"
                >
                  <p className="text-micro text-muted-foreground">
                    {NEWS_CATEGORY_LABELS[article.category]()} ·{' '}
                    <time dateTime={article.date}>
                      {formatShortDate(article.date)}
                    </time>
                  </p>
                  <h3 className="mt-2 text-h4 transition-colors group-hover:text-primary-glow">
                    {localized(article.title)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-small text-muted-foreground">
                    {localized(article.excerpt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
