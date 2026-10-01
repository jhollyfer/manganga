import { createFileRoute } from '@tanstack/react-router'

import { LegalPage } from './-components/legal-page'
import { pageHead } from '#/lib/head'
import { TERMS } from '#/lib/legal'
import { m } from '#/paraglide/messages'

/**
 * Página legal, sem `.lazy`: é texto corrido, e dividi-la custaria uma ida a
 * mais ao servidor para carregar o que já cabe no primeiro chunk.
 */
export const Route = createFileRoute('/_public/termos')({
  head: () =>
    pageHead({
      path: '/termos',
      title: m.legal_termsTitle(),
      description: m.legal_termsLead(),
    }),
  component: () => (
    <LegalPage
      title={m.legal_termsTitle()}
      lead={m.legal_termsLead()}
      document={TERMS}
    />
  ),
})
