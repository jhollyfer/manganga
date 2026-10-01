import { createFileRoute } from '@tanstack/react-router'

import { dashboardQuery } from '#/integrations/tanstack-query/queries'
import { SITE_TITLE } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * O Dashboard do painel.
 *
 * O `loader` dispara a consulta e **não espera**: a tela tem esqueleto e
 * estado de erro próprios, e segurar a navegação até a API responder deixaria
 * o clique no menu sem resposta nenhuma por um segundo. Como a rota herda o
 * `ssr: false` do layout, isto só roda no navegador.
 */
export const Route = createFileRoute('/_private/painel/')({
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(dashboardQuery())
  },
  head: () => ({
    meta: [{ title: `${m.admin_nav_dashboard()} · ${SITE_TITLE}` }],
  }),
})
