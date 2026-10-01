import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { NewsCard } from '../news-card'
import { REVEAL, STAGGER } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import type { NewsArticle } from '#/lib/news'
import { m } from '#/paraglide/messages'

/** As últimas notícias: a mais nova em destaque, as outras ao lado. */
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
          eyebrow={m.home_newsEyebrow()}
          title={
            <>
              {m.home_newsTitleLead()} <em>{m.home_newsTitleEm()}</em>.
            </>
          }
          action={
            <SectionAction render={<Link to="/noticias" />}>
              {m.home_newsCta()}
            </SectionAction>
          }
        />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <NewsCard article={featured} featured className={REVEAL} />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((article, index) => (
              <li
                key={article.slug}
                className={REVEAL}
                style={{ animationDelay: `${(index + 1) * STAGGER}ms` }}
              >
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
