import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/**
 * O festival explicado numa página só, com âncoras por seção, como o
 * Caprichoso faz: `/festival#como-funciona` e `/festival#glossario` são os
 * endereços que os cartões da home usam.
 */
export const Route = createFileRoute('/_public/festival')({
  head: () =>
    pageHead({
      path: '/festival',
      title: m.festival_pageTitle(),
      description: m.festival_pageLead(),
    }),
})
