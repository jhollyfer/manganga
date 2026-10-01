import { createFileRoute } from '@tanstack/react-router'

import { LegalPage } from './-components/legal-page'
import { pageHead } from '#/lib/head'
import { PRIVACY } from '#/lib/legal'
import { m } from '#/paraglide/messages'

/**
 * Página legal, sem `.lazy`: é texto corrido, e dividi-la custaria uma ida a
 * mais ao servidor para carregar o que já cabe no primeiro chunk.
 */
export const Route = createFileRoute('/_public/privacidade')({
  head: () =>
    pageHead({
      path: '/privacidade',
      title: m.legal_privacyTitle(),
      description: m.legal_privacyLead(),
    }),
  component: () => (
    <LegalPage
      title={m.legal_privacyTitle()}
      lead={m.legal_privacyLead()}
      document={PRIVACY}
    />
  ),
})
