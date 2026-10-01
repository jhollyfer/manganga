import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { validateNewsSearch } from '#/lib/news-search'
import { m } from '#/paraglide/messages'

/** As notícias, com editoria e busca na URL. */
export const Route = createFileRoute('/_public/noticias/')({
  validateSearch: validateNewsSearch,
  head: () =>
    pageHead({
      path: '/noticias',
      title: m.news_pageTitle(),
      description: m.news_pageLead(),
    }),
})
