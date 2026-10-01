import { describe, expect, it } from 'vitest'

import { validateAgendaSearch } from './agenda-search'
import { validateNewsSearch } from './news-search'

describe('filtro da agenda', () => {
  it('aceita tipo e período conhecidos', () => {
    expect(
      validateAgendaSearch({ tipo: 'ensaio', periodo: 'passados' }),
    ).toEqual({
      tipo: 'ensaio',
      periodo: 'passados',
    })
  })

  it('descarta o que não conhece e o período padrão', () => {
    // "proximos" é o padrão, e fica fora da URL para o link curto ser o canônico.
    expect(
      validateAgendaSearch({ tipo: 'carnaval', periodo: 'proximos' }),
    ).toEqual({})
  })
})

describe('filtro das notícias', () => {
  it('apara o termo e corta no teto', () => {
    const result = validateNewsSearch({ q: `  ${'a'.repeat(200)}  ` })

    expect(result.q).toHaveLength(80)
  })

  it('ignora termo vazio e editoria desconhecida', () => {
    expect(validateNewsSearch({ q: '   ', categoria: 'esporte' })).toEqual({})
  })
})
