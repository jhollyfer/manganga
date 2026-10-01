import { NEWS_CATEGORIES } from './entity'
import type { NewsCategory } from './entity'

/**
 * O filtro das notícias na URL: a editoria e o termo buscado. Validado à mão,
 * como o da agenda, e com teto no termo para a URL não carregar um livro.
 */
export type NewsSearch = {
  categoria?: NewsCategory
  q?: string
}

export function validateNewsSearch(
  search: Record<string, unknown>,
): NewsSearch {
  const result: NewsSearch = {}

  const categoria = NEWS_CATEGORIES.find(
    (category) => category === search.categoria,
  )
  if (categoria) result.categoria = categoria

  if (typeof search.q === 'string') {
    const q = search.q.trim().slice(0, 80)
    if (q) result.q = q
  }

  return result
}
