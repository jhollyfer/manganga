import { createFileRoute } from '@tanstack/react-router'

import { CONTACT_SUBJECTS } from '#/lib/entity'
import type { ContactSubject } from '#/lib/entity'
import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

type ContactSearch = { assunto?: ContactSubject }

/**
 * O contato, com o assunto pré-escolhido pela URL (`?assunto=patrocinio`): é
 * o endereço do convite para patrocinar da home.
 */
export const Route = createFileRoute('/_public/contato')({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    const assunto = CONTACT_SUBJECTS.find(
      (subject) => subject === search.assunto,
    )
    if (assunto) return { assunto }

    return {}
  },
  head: () =>
    pageHead({
      path: '/contato',
      title: m.contact_pageTitle(),
      description: m.contact_pageLead(),
    }),
})
