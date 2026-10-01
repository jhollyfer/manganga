import { describe, expect, it } from 'vitest'

import {
  CATEGORIES,
  LOW_STOCK_FROM,
  PRODUCTS,
  colorOf,
  findProduct,
  onSale,
  relatedTo,
  stockLevel,
} from './catalog'

function product(slug: string) {
  const found = findProduct(slug)
  if (!found) throw new Error('catálogo sem '.concat(slug))

  return found
}

describe('catálogo', () => {
  it('não repete endereço de produto', () => {
    const slugs = PRODUCTS.map((each) => each.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('toda categoria tem produto à venda', () => {
    for (const category of CATEGORIES)
      expect(PRODUCTS.some((each) => each.category === category.slug)).toBe(
        true,
      )
  })

  it('promoção é só o que tem preço cheio acima do atual', () => {
    for (const each of onSale())
      expect(each.compareAt ?? 0).toBeGreaterThan(each.price)
  })

  it('relacionados nunca trazem o próprio produto', () => {
    const shirt = product('camisa-oficial-2026')

    expect(relatedTo(shirt).map((each) => each.slug)).not.toContain(shirt.slug)
  })
})

describe('stockLevel', () => {
  const shirt = product('camisa-oficial-2026')

  it('separa esgotado, últimas unidades e em estoque', () => {
    expect(stockLevel({ ...shirt, stock: 0 })).toBe('out')
    expect(stockLevel({ ...shirt, stock: LOW_STOCK_FROM })).toBe('low')
    expect(stockLevel({ ...shirt, stock: LOW_STOCK_FROM + 1 })).toBe('in')
  })
})

describe('colorOf', () => {
  it('cai na cor principal quando o id saiu da grade', () => {
    const shirt = product('camisa-oficial-2026')

    expect(colorOf(shirt, 'verde-mata')?.id).toBe('verde-mata')
    expect(colorOf(shirt, 'roxo')?.id).toBe(shirt.colors[0]?.id)
  })
})
