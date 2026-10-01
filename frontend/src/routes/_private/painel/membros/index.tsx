import { createFileRoute } from '@tanstack/react-router'

import { membersListParams, validateMembersSearch } from './-search'
import { membersQuery } from '#/integrations/tanstack-query/queries'
import { SITE_TITLE } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * A lista de membros. Página, itens por página e busca moram na URL,
 * validados em `-search.ts`.
 *
 * `loaderDeps` com a busca inteira: sem ele o router reaproveita o `loader` da
 * visita anterior e a troca de página não dispara a consulta nova. O `loader`
 * não espera a resposta, pelo mesmo motivo do Dashboard: a tabela tem
 * esqueleto, e `keepPreviousData` deixa a página atual na tela enquanto a
 * próxima chega.
 */
export const Route = createFileRoute('/_private/painel/membros/')({
  validateSearch: validateMembersSearch,
  loaderDeps: ({ search }) => membersListParams(search),
  loader: ({ context, deps }) => {
    void context.queryClient.prefetchQuery(membersQuery(deps))
  },
  head: () => ({
    meta: [{ title: `${m.admin_nav_members()} · ${SITE_TITLE}` }],
  }),
})
