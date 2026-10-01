import { describe, expect, it } from 'vitest'

import { safeRedirect, validateSignInSearch } from './-redirect'

describe('safeRedirect', () => {
  it('aceita caminho interno, com busca', () => {
    expect(safeRedirect('/painel')).toBe('/painel')
    expect(safeRedirect('/painel/membros?page=3&search=ana')).toBe(
      '/painel/membros?page=3&search=ana',
    )
  })

  it.each([
    ['https://golpe.example'],
    ['//golpe.example'],
    ['/\\golpe.example'],
    ['javascript:alert(1)'],
    ['painel'],
    [''],
    [42],
    [undefined],
    ['/'.concat('a'.repeat(600))],
  ])('recusa %s', (value) => {
    expect(safeRedirect(value)).toBeUndefined()
  })
})

describe('validateSignInSearch', () => {
  it('some com o redirect inválido em vez de quebrar a página', () => {
    expect(validateSignInSearch({ redirect: 'https://x.y' })).toEqual({})
    expect(validateSignInSearch({})).toEqual({})
  })

  it('mantém o redirect válido', () => {
    expect(validateSignInSearch({ redirect: '/painel' })).toEqual({
      redirect: '/painel',
    })
  })
})
