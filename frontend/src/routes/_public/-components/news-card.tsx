import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from './artwork'
import { formatShortDate } from '#/lib/dates'
import { localized } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import type { NewsArticle } from '#/lib/news'
import { cn } from '#/lib/utils'

/**
 * O cartão de notícia: capa, editoria, data, título e o resumo.
 *
 * `featured` é o destaque da listagem, mais largo e com o resumo maior. O
 * título é o nome acessível do link, e a capa é decorativa.
 */
export function NewsCard({
  article,
  featured = false,
  className,
}: {
  article: NewsArticle
  featured?: boolean
  className?: string
}): React.JSX.Element {
  return (
    <Link
      to="/noticias/$slug"
      params={{ slug: article.slug }}
      data-slot="news-card"
      data-featured={featured}
      className={cn('group flex flex-col', className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stage group-data-[featured=true]:aspect-[16/10]">
        <CoverImage
          cover={article.cover}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-micro font-semibold text-foreground backdrop-blur">
          {NEWS_CATEGORY_LABELS[article.category]()}
        </span>
      </div>
      <time
        dateTime={article.date}
        className="mt-4 text-micro font-medium tracking-wide uppercase opacity-60"
      >
        {formatShortDate(article.date)}
      </time>
      <h3 className="mt-2 text-h4 leading-tight decoration-primary-glow decoration-2 underline-offset-4 group-hover:underline group-data-[featured=true]:text-h3">
        {localized(article.title)}
      </h3>
      <p className="mt-2 line-clamp-3 text-small leading-relaxed opacity-70 group-data-[featured=true]:text-body">
        {localized(article.excerpt)}
      </p>
    </Link>
  )
}
