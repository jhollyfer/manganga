import { describe, expect, it } from 'vitest'

import { membersListParams, validateMembersSearch } from './-search'

describe('validateMembersSearch', () => {
  it('aceita página, itens por página e busca', () => {
    expect(
      validateMembersSearch({ page: 3, perPage: 20, search: 'Silva' }),
    ).toEqual({ page: 3, perPage: 20, search: 'Silva' })
  })

  it('aceita os números como texto, que é como chegam de URL editada', () => {
    expect(validateMembersSearch({ page: '2', perPage: '10' })).toEqual({
      page: 2,
      perPage: 10,
    })
  })

  it('tira o padrão da URL: página 1, 50 por página e busca vazia', () => {
    expect(
      validateMembersSearch({ page: 1, perPage: 50, search: '   ' }),
    ).toEqual({})
  })

  it.each([
    [{ page: 0 }],
    [{ page: -4 }],
    [{ page: 2.5 }],
    [{ page: 'dois' }],
    [{ page: '1e3' }],
    [{ perPage: 15 }],
    [{ perPage: 1000 }],
    [{ perPage: '50abc' }],
    [{ search: 42 }],
    [{ search: ['a'] }],
  ])('descarta valor estranho em vez de quebrar: %o', (input) => {
    expect(validateMembersSearch(input)).toEqual({})
  })

  it('apara a busca e corta o excesso', () => {
    expect(validateMembersSearch({ search: '  Ana  ' })).toEqual({
      search: 'Ana',
    })
    expect(
      validateMembersSearch({ search: 'a'.repeat(300) }).search,
    ).toHaveLength(100)
  })
})

describe('membersListParams', () => {
  it('preenche o padrão para a API', () => {
    expect(membersListParams({})).toEqual({
      page: 1,
      perPage: 50,
      search: undefined,
    })
    expect(membersListParams({ page: 4, perPage: 10, search: 'x' })).toEqual({
      page: 4,
      perPage: 10,
      search: 'x',
    })
  })
})
