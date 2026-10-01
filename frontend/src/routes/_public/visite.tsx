import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/_public/visite')({
  head: () =>
    pageHead({
      path: '/visite',
      title: m.nav_visit(),
      description: m.visit_pageLead(),
    }),
})
