import { describe, expect, it } from 'vitest'

import { PRODUCTS, productsIn } from './catalog'
import {
  applyListing,
  facets,
  matchesQuery,
  normalize,
  validateListingSearch,
} from './listing'

describe('validateListingSearch', () => {
  it('descarta ordem desconhecida e texto vazio', () => {
    expect(validateListingSearch({ sort: 'aleatoria', q: '   ' })).toEqual({})
  })

  it('aceita a promoção como texto ou booleano', () => {
    expect(validateListingSearch({ sale: 'true' })).toEqual({ sale: true })
    expect(validateListingSearch({ sale: true })).toEqual({ sale: true })
    expect(validateListingSearch({ sale: 'sim' })).toEqual({})
  })

  it('corta o termo de busca no teto', () => {
    expect(validateListingSearch({ q: 'a'.repeat(200) }).q).toHaveLength(80)
  })
})

describe('busca', () => {
  it('ignora acento e caixa', () => {
    expect(normalize('Boné')).toBe('bone')
  })

  it('casa todos os termos, em qualquer ordem', () => {
    const cap = PRODUCTS.find(
      (product) => product.slug === 'bone-estrela-bordada',
    )
    if (!cap) throw new Error('catálogo sem o boné')

    expect(matchesQuery(cap, 'estrela bone')).toBe(true)
    expect(matchesQuery(cap, 'bone garrafa')).toBe(false)
  })
})

describe('applyListing', () => {
  it('ordena por preço sem mudar a lista recebida', () => {
    const shirts = productsIn('camisas')
    const before = shirts.map((product) => product.slug)
    const sorted = applyListing(shirts, { sort: 'price-asc' })

    expect(sorted.map((product) => product.price)).toEqual(
      [...sorted.map((product) => product.price)].sort((a, b) => a - b),
    )
    expect(shirts.map((product) => product.slug)).toEqual(before)
  })

  it('novidades vêm da data mais recente', () => {
    const first = applyListing(PRODUCTS, { sort: 'newest' }).at(0)

    expect(first?.slug).toBe('camisa-marujada-de-guerra')
  })

  it('filtra por tamanho, cor e promoção juntos', () => {
    const result = applyListing(productsIn('camisas'), {
      size: 'XG',
      color: 'verde-mata',
      sale: true,
    })

    expect(result.map((product) => product.slug)).toEqual([
      'camisa-torcedor-estrela',
    ])
  })

  it('cor que não existe esvazia a vitrine em vez de ignorar o filtro', () => {
    expect(applyListing(PRODUCTS, { color: 'roxo' })).toEqual([])
  })
})

describe('facets', () => {
  it('oferece só o que existe na vitrine, sem repetir', () => {
    const { sizes, colors } = facets(productsIn('bones'))

    expect(sizes).toEqual([])
    expect(new Set(colors.map((color) => color.id)).size).toBe(colors.length)
  })
})
