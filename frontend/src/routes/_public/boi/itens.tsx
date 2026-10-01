import { createFileRoute } from '@tanstack/react-router'

import { ITEM_GROUPS } from '#/lib/entity'
import type { ItemGroup } from '#/lib/entity'
import { pageHead } from '#/lib/head'
import { SEASON_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

type ItemsSearch = { grupo?: ItemGroup }

function isGroup(value: unknown): value is ItemGroup {
  return ITEM_GROUPS.some((group) => group === value)
}

/**
 * Os itens oficiais, com o filtro por grupo na URL (`?grupo=cenico`): quem
 * explica o festival para alguém manda o link já filtrado.
 */
export const Route = createFileRoute('/_public/boi/itens')({
  validateSearch: (search: Record<string, unknown>): ItemsSearch => {
    if (isGroup(search.grupo)) return { grupo: search.grupo }

    return {}
  },
  head: () =>
    pageHead({
      path: '/boi/itens',
      title: m.items_pageTitle({ year: SEASON_YEAR }),
      description: m.items_pageLead(),
    }),
})
