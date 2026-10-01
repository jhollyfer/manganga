import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from './artwork'
import { formatShortDate } from '#/lib/dates'
import { localized } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import type { NewsArticle } from '#/lib/news'
import { cn } from '#/lib/utils'

/**
 * A notícia como recorte de jornal: a capa com borda de tinta, a editoria
 * carimbada no canto, a data e o título em letra de cartaz.
 *
 * `featured` é o destaque da listagem, com a capa mais larga e o título
 * maior. O título é o nome acessível do link, e a capa é decorativa.
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-ink bg-stage group-data-[featured=true]:aspect-[16/10]">
        <CoverImage
          cover={article.cover}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <span className="absolute top-0 left-0 bg-ink px-2.5 py-1 text-micro font-bold tracking-[0.1em] text-background uppercase">
          {NEWS_CATEGORY_LABELS[article.category]()}
        </span>
      </div>
      <time
        dateTime={article.date}
        className="mt-4 text-micro font-bold tracking-[0.1em] uppercase opacity-60"
      >
        {formatShortDate(article.date)}
      </time>
      <h3 className="mt-1.5 text-h4 transition-colors group-hover:text-primary-glow group-data-[featured=true]:text-h3">
        {localized(article.title)}
      </h3>
      <p className="mt-2 line-clamp-3 text-small leading-relaxed opacity-75 group-data-[featured=true]:text-body">
        {localized(article.excerpt)}
      </p>
    </Link>
  )
}
