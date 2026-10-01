import { describe, expect, it } from 'vitest'

import { HELP_SLUGS, HELP_TOPICS, findHelpTopic } from './help'
import { ADULT_SIZE_CHART, KIDS_SIZE_CHART } from './sizes'
import { PRODUCTS } from './catalog'
import type { LocalizedText } from '#/lib/i18n'
import { locales } from '#/paraglide/runtime'

/**
 * A central de ajuda é conteúdo, e conteúdo quebra em silêncio: um parágrafo
 * sem a versão em espanhol aparece vazio na tela, e um travessão colado de um
 * editor de texto fura a regra de escrita do repositório.
 */
function texts(): Array<LocalizedText> {
  return HELP_TOPICS.flatMap((topic) => [
    topic.title,
    topic.summary,
    ...topic.body,
    ...(topic.faq ?? []).flatMap((item) => [item.question, item.answer]),
  ])
}

describe('central de ajuda', () => {
  it('tem um tópico por endereço, na ordem do menu', () => {
    expect(HELP_TOPICS.map((topic) => topic.slug)).toEqual([...HELP_SLUGS])
  })

  it('todo texto existe nos três idiomas', () => {
    for (const text of texts())
      for (const locale of locales) expect(text[locale].trim()).not.toBe('')
  })

  it('nenhum texto tem travessão', () => {
    for (const text of texts())
      for (const locale of locales) expect(text[locale]).not.toMatch(/[—–]/)
  })

  it('acha o tópico pelo endereço', () => {
    expect(findHelpTopic('pagamentos')?.slug).toBe('pagamentos')
    expect(findHelpTopic('nada')).toBeUndefined()
  })
})

describe('grade de tamanhos', () => {
  it('cobre todo tamanho que a loja vende', () => {
    const charted = new Set(
      [...ADULT_SIZE_CHART, ...KIDS_SIZE_CHART].map((row) => row.size),
    )

    for (const product of PRODUCTS)
      for (const size of product.sizes) expect(charted.has(size)).toBe(true)
  })

  it('cresce de um tamanho para o seguinte', () => {
    for (const chart of [ADULT_SIZE_CHART, KIDS_SIZE_CHART])
      chart.slice(1).forEach((row, index) => {
        expect(row.chest).toBeGreaterThan(chart[index]?.chest ?? 0)
        expect(row.length).toBeGreaterThan(chart[index]?.length ?? 0)
      })
  })
})
