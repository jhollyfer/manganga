import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { HttpError, http } from './http'
import type { Dashboard, Member, Paginated, User } from '#/lib/model'

/**
 * As leituras da API, uma `queryOptions()` por recurso.
 *
 * Fábrica e não `useQuery` pronto: a mesma opção serve ao `beforeLoad` do
 * layout (`ensureQueryData`), ao `loader` (`prefetchQuery`) e ao componente
 * (`useQuery`), e a chave escrita uma vez só é o que garante que os três leem
 * a mesma entrada do cache. Chave digitada em dois lugares diverge na primeira
 * renomeação, e o sintoma é uma tela que nunca atualiza depois de salvar.
 *
 * As chaves são hierárquicas (`['administrator', 'members', ...]`) para que a
 * invalidação depois de uma escrita derrube a lista e o detalhe com um prefixo.
 */
export const queryKeys = {
  profile: ['profile'],
  dashboard: ['administrator', 'dashboard'],
  members: ['administrator', 'members'],
} as const

/**
 * Tentar de novo só o que pode dar certo na segunda vez.
 *
 * O padrão do TanStack Query são três tentativas para qualquer erro, e um 401
 * ou 404 repetido três vezes é um segundo e meio de esqueleto antes de a tela
 * admitir que não vai carregar. Erro 4xx é resposta definitiva; 5xx e falha de
 * rede (sem `HttpError`) ganham mais duas chances.
 */
export function shouldRetry(failureCount: number, error: unknown): boolean {
  if (error instanceof HttpError && error.status < 500) return false

  return failureCount < 2
}

/**
 * Quem está logado: `GET /profile`, 401 se ninguém.
 *
 * `staleTime` de cinco minutos porque é o guarda do painel quem lê isto a cada
 * navegação: sem ele, trocar de Dashboard para Membros refaria a chamada.
 */
export function profileQuery() {
  return queryOptions({
    queryKey: queryKeys.profile,
    queryFn: ({ signal }) => http<User>('/profile', { signal }),
    staleTime: 5 * 60 * 1000,
    retry: shouldRetry,
  })
}

export function dashboardQuery() {
  return queryOptions({
    queryKey: queryKeys.dashboard,
    queryFn: ({ signal }) =>
      http<Dashboard>('/administrator/dashboard', { signal }),
    retry: shouldRetry,
  })
}

/** O que a lista de membros manda para a API, vindo do `?page&perPage&search`. */
export type MembersListParams = {
  page: number
  perPage: number
  search?: string
}

/**
 * Uma página da lista de membros.
 *
 * `keepPreviousData` porque página e busca moram na URL: sem ele, cada troca
 * de página zera a tabela e pisca o esqueleto, e a pessoa perde o lugar onde
 * estava olhando.
 */
export function membersQuery(params: MembersListParams) {
  return queryOptions({
    queryKey: [...queryKeys.members, 'paginated', params],
    queryFn: ({ signal }) =>
      http<Paginated<Member>>('/administrator/members/paginated', {
        query: {
          page: params.page,
          perPage: params.perPage,
          search: params.search,
        },
        signal,
      }),
    placeholderData: keepPreviousData,
    retry: shouldRetry,
  })
}

export function memberQuery(id: string) {
  return queryOptions({
    queryKey: [...queryKeys.members, 'detail', id],
    queryFn: ({ signal }) =>
      http<Member>('/administrator/members/'.concat(encodeURIComponent(id)), {
        signal,
      }),
    retry: shouldRetry,
  })
}
