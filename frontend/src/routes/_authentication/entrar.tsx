import { createFileRoute } from '@tanstack/react-router'

import { validateSignInSearch } from './-redirect'
import { m } from '#/paraglide/messages'
import { SITE_TITLE } from '#/lib/site'

/**
 * A entrada do painel da diretoria.
 *
 * `?redirect=` é para onde voltar depois do login, escrito pelo guarda do
 * painel e validado em `-redirect.ts`. O `noindex` vem do layout.
 */
export const Route = createFileRoute('/_authentication/entrar')({
  validateSearch: validateSignInSearch,
  head: () => ({
    meta: [
      { title: `${m.signin_title()} · ${SITE_TITLE}` },
      { name: 'description', content: m.signin_description() },
    ],
  }),
})
