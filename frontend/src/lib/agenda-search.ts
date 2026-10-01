import { EVENT_TYPES } from './entity'
import type { EventType } from './entity'

/**
 * O filtro da agenda na URL: o tipo de evento e se a lista é dos próximos ou
 * dos que já passaram. Validado à mão porque o `validateSearch` é síncrono e
 * o VineJS não; valor desconhecido cai fora em vez de quebrar a página.
 */
export const PERIODS = ['proximos', 'passados'] as const

export type Period = (typeof PERIODS)[number]

export type AgendaSearch = {
  tipo?: EventType
  periodo?: Period
}

export function validateAgendaSearch(
  search: Record<string, unknown>,
): AgendaSearch {
  const result: AgendaSearch = {}

  const tipo = EVENT_TYPES.find((type) => type === search.tipo)
  if (tipo) result.tipo = tipo

  const periodo = PERIODS.find((period) => period === search.periodo)
  if (periodo && periodo !== 'proximos') result.periodo = periodo

  return result
}
