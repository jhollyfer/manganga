import * as React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'

import { AdminHeader } from './-components/admin-header'
import { AppSidebar } from './-components/app-sidebar'
import { BrandStar } from '#/components/common/brand-mark'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { Spinner } from '#/components/ui/spinner'
import { HttpError } from '#/integrations/tanstack-query/http'
import { profileQuery } from '#/integrations/tanstack-query/queries'
import { m } from '#/paraglide/messages'

/** 401 é sessão ausente ou vencida; 403 é sessão de quem não é da diretoria. */
function isUnauthorized(error: unknown): boolean {
  return (
    error instanceof HttpError && (error.status === 401 || error.status === 403)
  )
}

/**
 * O painel da diretoria, atrás da entrada.
 *
 * **`ssr: false`, e é o que faz o guarda funcionar.** A sessão é um cookie
 * `httpOnly` emitido pela API, no domínio da API. Quando o Nitro renderiza a
 * página, quem chama `GET /profile` é o servidor, e o servidor não tem o
 * cookie de ninguém: o guarda receberia 401 sempre e mandaria para a entrada
 * até quem acabou de entrar. Com o SSR seletivo do TanStack Start (a opção
 * `ssr` da rota, conferida na 1.168 instalada), `beforeLoad`, `loader` e a
 * tela desta rota e de todas as filhas rodam só no navegador, onde o cookie
 * existe: filha não pode ser mais SSR que o pai. No servidor sai o `pendingComponent`, que é o que o navegador mostra
 * enquanto o guarda decide.
 *
 * Perder o SSR aqui não custa nada: a área é `noindex`, ninguém chega por
 * busca, e todo dado dela é da sessão de quem olha.
 *
 * O guarda lê o perfil com `ensureQueryData`, então trocar de página dentro do
 * painel não refaz a chamada: o perfil fica no cache pelo `staleTime` de
 * `profileQuery`.
 */
export const Route = createFileRoute('/_private')({
  ssr: false,
  beforeLoad: async ({ context, location }) => {
    try {
      await context.queryClient.ensureQueryData(profileQuery())
    } catch (error) {
      if (isUnauthorized(error)) {
        throw redirect({
          to: '/entrar',
          search: { redirect: location.href },
          replace: true,
        })
      }

      throw error
    }
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  pendingComponent: PanelPending,
  component: RouteComponent,
})

/**
 * Quando a sessão vence com o painel aberto.
 *
 * O guarda só olha na entrada. Depois dela, a próxima consulta da tela é quem
 * descobre o 401, e sem isto a pessoa ficaria olhando um "não foi possível
 * carregar" sem saber que bastava entrar de novo. Escuta o cache inteiro, e
 * não cada tela, para que uma consulta nova no futuro já nasça coberta.
 */
function useSessionExpiry(): void {
  const queryClient = useQueryClient()
  const router = useRouter()

  React.useEffect(() => {
    return queryClient.getQueryCache().subscribe((event) => {
      if (event.type !== 'updated' || event.action.type !== 'error') return
      if (!isUnauthorized(event.action.error)) return

      void router.navigate({
        to: '/entrar',
        search: { redirect: router.state.location.href },
        replace: true,
      })
    })
  }, [queryClient, router])
}

function RouteComponent(): React.JSX.Element {
  useSessionExpiry()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <AdminHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

/** O que o servidor desenha, e o que aparece enquanto o guarda consulta a API. */
function PanelPending(): React.JSX.Element {
  return (
    <div
      role="status"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-muted-foreground"
    >
      <BrandStar className="size-12" />
      <span className="inline-flex items-center gap-2 text-small">
        <Spinner aria-hidden="true" />
        {m.admin_loading()}
      </span>
    </div>
  )
}
