import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { ALBUMS } from '#/lib/toadas'
import { m } from '#/paraglide/messages'

type ToadasSearch = { ano?: number }

/**
 * As toadas por álbum, com o ano na URL (`?ano=2025`). Ano que não tem álbum
 * cai fora em vez de mostrar uma página vazia.
 */
export const Route = createFileRoute('/_public/boi/toadas')({
  validateSearch: (search: Record<string, unknown>): ToadasSearch => {
    const year = Number(search.ano)
    if (ALBUMS.some((album) => album.year === year)) return { ano: year }

    return {}
  },
  head: () =>
    pageHead({
      path: '/boi/toadas',
      title: m.toadas_pageTitle(),
      description: m.toadas_pageLead(),
    }),
})
