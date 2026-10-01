import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from './artwork'
import { formatShortDate } from '#/lib/dates'
import { localized } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import type { NewsArticle } from '#/lib/news'
import { cn } from '#/lib/utils'

/**
 * A notícia como chamada de jornal: a capa, a editoria e a data numa linha
 * pequena embaixo dela, e o título. A editoria fica fora da foto: etiqueta
 * colada sobre imagem é enfeite que tampa a imagem.
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
      <div className="relative aspect-[4/3] overflow-hidden bg-stage group-data-[featured=true]:aspect-[16/10]">
        <CoverImage
          cover={article.cover}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <p className="mt-4 text-micro opacity-65">
        {NEWS_CATEGORY_LABELS[article.category]()} ·{' '}
        <time dateTime={article.date}>{formatShortDate(article.date)}</time>
      </p>
      <h3 className="mt-1.5 text-h4 transition-colors group-hover:text-primary-glow group-data-[featured=true]:text-h3">
        {localized(article.title)}
      </h3>
      <p className="mt-2 line-clamp-3 text-small leading-relaxed opacity-75 group-data-[featured=true]:text-body">
        {localized(article.excerpt)}
      </p>
    </Link>
  )
}
