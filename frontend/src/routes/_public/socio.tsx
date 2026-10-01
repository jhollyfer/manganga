import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/_public/socio')({
  head: () =>
    pageHead({
      path: '/socio',
      title: m.member_pageTitle(),
      description: m.member_pageLead(),
    }),
})
