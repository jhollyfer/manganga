import type { MembersListParams } from '#/integrations/tanstack-query/queries'

/**
 * O estado da lista de membros na URL: `?page&perPage&search`.
 *
 * Na URL e não em `useState`, como a vitrine da loja: a diretoria manda o link
 * "membros com Silva, página 2" no grupo, e quem abre precisa ver a mesma
 * lista. E o voltar do navegador devolve a página em que a pessoa estava.
 *
 * Validado à mão porque o `validateSearch` é síncrono e o VineJS não é. Valor
 * estranho cai fora e a lista abre no padrão, em vez de quebrar: endereço de
 * lista é colado e editado à mão.
 *
 * O padrão **não** vai para a URL (`page` 1, `perPage` 50, busca vazia): o
 * endereço limpo `/painel/membros` é o mesmo da lista inicial, e o menu não
 * precisa saber de parâmetro nenhum para apontar para ela.
 */
export const PER_PAGE_OPTIONS = [10, 20, 30, 40, 50] as const

export type PerPage = (typeof PER_PAGE_OPTIONS)[number]

/** 50, como no painel antigo: a diretoria rola mais do que pagina. */
export const DEFAULT_PER_PAGE: PerPage = 50

/** Teto da busca: nome inteiro com folga, sem virar parágrafo na URL. */
const SEARCH_MAX = 100

export type MembersSearch = {
  page?: number
  perPage?: PerPage
  search?: string
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value === 'string' && /^\d+$/.test(value)) return Number(value)

  return undefined
}

function isPerPage(value: number | undefined): value is PerPage {
  return PER_PAGE_OPTIONS.some((option) => option === value)
}

export function validateMembersSearch(
  search: Record<string, unknown>,
): MembersSearch {
  const result: MembersSearch = {}

  const page = toNumber(search.page)
  if (page !== undefined && Number.isSafeInteger(page) && page > 1)
    result.page = page

  const perPage = toNumber(search.perPage)
  if (isPerPage(perPage) && perPage !== DEFAULT_PER_PAGE)
    result.perPage = perPage

  if (typeof search.search === 'string') {
    const text = search.search.trim().slice(0, SEARCH_MAX)
    if (text) result.search = text
  }

  return result
}

/** O que a consulta manda para a API, com o padrão preenchido. */
export function membersListParams(search: MembersSearch): MembersListParams {
  return {
    page: search.page ?? 1,
    perPage: search.perPage ?? DEFAULT_PER_PAGE,
    search: search.search,
  }
}
