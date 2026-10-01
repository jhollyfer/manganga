import * as React from 'react'
import {
  Link,
  createLazyFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import { MagnifyingGlassIcon, NewspaperIcon } from '@phosphor-icons/react'

import { FilterChip } from '../-components/filter-chip'
import { FIELD } from '../-components/form-style'
import { NewsCard } from '../-components/news-card'
import { PageHero } from '../-components/page-hero'
import { REVEAL, STAGGER } from '../-components/reveal'
import { Input } from '#/components/ui/input'
import { NEWS_CATEGORIES } from '#/lib/entity'
import { localized } from '#/lib/i18n'
import { NEWS_CATEGORY_LABELS } from '#/lib/labels'
import { latestNews } from '#/lib/news'
import { normalize } from '#/lib/store/listing'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/noticias/')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/noticias/')

/**
 * As notícias: editorias em pílula, a busca e a grade, com a mais recente em
 * destaque quando não há filtro.
 *
 * A busca vai para a URL no envio e não a cada tecla: o histórico do
 * navegador ganha uma entrada por busca, e o botão de voltar desfaz a busca
 * inteira e não uma letra.
 */
function RouteComponent(): React.JSX.Element {
  const { categoria, q } = route.useSearch()
  const navigate = useNavigate({ from: '/noticias/' })
  const [term, setTerm] = React.useState(q ?? '')

  const articles = latestNews().filter((article) => {
    if (categoria && article.category !== categoria) return false
    if (!q) return true

    const needle = normalize(q)

    return (
      normalize(localized(article.title)).includes(needle) ||
      normalize(localized(article.excerpt)).includes(needle)
    )
  })

  const filtered = Boolean(categoria || q)
  const featured = articles.at(0)
  const rest = articles.slice(1)

  // Sem filtro a mais recente sobe para o destaque e sai da grade; com filtro
  // a grade mostra tudo o que casou, sem destaque.
  let grid = rest
  if (filtered) grid = articles

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const value = term.trim()

    void navigate({
      search: (prev) => ({ ...prev, q: value || undefined }),
      resetScroll: false,
    })
  }

  return (
    <>
      <PageHero
        eyebrow={m.home_newsEyebrow()}
        title={
          <>
            {m.home_newsTitleLead()} <em>{m.home_newsTitleEm()}</em>.
          </>
        }
        lead={m.news_pageLead()}
        cover={{ kind: 'art', art: 'mata' }}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav
              aria-label={m.news_filterLabel()}
              className="flex flex-wrap gap-2"
            >
              <FilterChip
                active={!categoria}
                render={<Link to="." search={{ q }} resetScroll={false} />}
              >
                {m.news_filterAll()}
              </FilterChip>
              {NEWS_CATEGORIES.map((category) => (
                <FilterChip
                  key={category}
                  active={categoria === category}
                  render={
                    <Link
                      to="."
                      search={{ categoria: category, q }}
                      resetScroll={false}
                    />
                  }
                >
                  {NEWS_CATEGORY_LABELS[category]()}
                </FilterChip>
              ))}
            </nav>
            <form
              role="search"
              onSubmit={submit}
              className="relative w-full lg:max-w-xs"
            >
              <label htmlFor="news-search" className="sr-only">
                {m.news_searchLabel()}
              </label>
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="news-search"
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder={m.news_searchLabel()}
                className={cn(FIELD, 'pl-10')}
              />
            </form>
          </div>

          {articles.length === 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <NewspaperIcon className="size-10 text-muted-foreground" />
              <p className="mt-4 text-body-lg font-semibold">
                {m.news_emptyTitle()}
              </p>
              <Link
                to="."
                search={{}}
                className="mt-2 text-small text-primary underline underline-offset-4"
              >
                {m.news_clear()}
              </Link>
            </div>
          )}

          {featured && !filtered && (
            <NewsCard
              article={featured}
              featured
              className={cn(REVEAL, 'mb-16 lg:w-2/3')}
            />
          )}

          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((article, index) => (
              <li
                key={article.slug}
                className={REVEAL}
                style={{ animationDelay: `${(index % 6) * STAGGER}ms` }}
              >
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
