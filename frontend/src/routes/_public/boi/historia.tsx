import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/_public/boi/historia')({
  head: () =>
    pageHead({
      path: '/boi/historia',
      title: m.history_pageTitle(),
      description: m.history_pageLead(),
    }),
})
