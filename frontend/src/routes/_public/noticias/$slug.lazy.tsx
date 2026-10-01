import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import { ArrowLeftIcon, WhatsappLogoIcon } from '@phosphor-icons/react'

import { CoverImage } from '../-components/artwork'
import { NewsCard } from '../-components/news-card'
import { PillButton } from '../-components/pill-button'
import { REVEAL } from '../-components/reveal'
import { NotFoundPage } from '#/components/common/not-found-page'
import { formatLongDate } from '#/lib/dates'
import { localized, localizedUrl } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import { latestNews, newsBySlug } from '#/lib/news'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/noticias/$slug')({
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage className="min-h-[80dvh]" />,
})

const route = getRouteApi('/_public/noticias/$slug')

/**
 * A matéria: editoria e data, título, capa, corpo e o compartilhar. Embaixo,
 * as outras notícias da mesma editoria primeiro, como pede quem acabou de ler
 * sobre o festival e quer a próxima sobre o festival.
 */
function RouteComponent(): React.JSX.Element | null {
  const { slug } = route.useLoaderData()
  const article = newsBySlug(slug)
  if (!article) return null

  const title = localized(article.title)
  const url = localizedUrl('/noticias/'.concat(article.slug))
  const share = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  const others = latestNews()
    .filter((each) => each.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3)

  return (
    <article className="pt-28 pb-24 md:pt-36">
      <header className="container-x max-w-4xl">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-small font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          {m.news_backToList()}
        </Link>
        <p className={cn(REVEAL, 'eyebrow mt-8 mb-4 text-primary')}>
          {NEWS_CATEGORY_LABELS[article.category]()} ·{' '}
          <time dateTime={article.date}>{formatLongDate(article.date)}</time>
        </p>
        <h1 className={cn(REVEAL, 'text-h1 delay-75')}>{title}</h1>
        <p
          className={cn(
            REVEAL,
            'mt-6 text-lead text-muted-foreground delay-150',
          )}
        >
          {localized(article.excerpt)}
        </p>
      </header>

      <div className="container-x mt-12 max-w-5xl">
        <div className="sticker aspect-[16/9] overflow-hidden p-0">
          <CoverImage cover={article.cover} loading="eager" />
        </div>
      </div>

      <div className="container-x mt-12 grid max-w-4xl gap-10 md:grid-cols-[1fr_auto]">
        <div className="prose prose-lg max-w-none">
          {article.body.map((paragraph) => (
            <p key={localized(paragraph)}>{localized(paragraph)}</p>
          ))}
        </div>
        <aside className="md:sticky md:top-24 md:self-start">
          <PillButton
            tone="outline"
            scale="md"
            render={
              <a href={share} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon />
                {m.news_share()}
              </a>
            }
          />
        </aside>
      </div>

      {others.length > 0 && (
        <section className="container-x mt-24 border-t border-border pt-16">
          <h2 className="mb-10 text-h2">{m.news_moreTitle()}</h2>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((each) => (
              <li key={each.slug}>
                <NewsCard article={each} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
