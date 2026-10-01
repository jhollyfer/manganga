import { describe, expect, it } from 'vitest'

import {
  EMPTY_CART,
  MAX_PER_LINE,
  addLine,
  applyCoupon,
  couponDiscount,
  itemCount,
  lineKey,
  parseCart,
  removeLine,
  resolveLines,
  setQuantity,
  subtotal,
} from './cart'
import type { CartLine } from './cart'

const SHIRT: CartLine = {
  slug: 'camisa-oficial-2026',
  size: 'M',
  color: 'branco',
  quantity: 1,
}

const MAGNET: CartLine = {
  slug: 'ima-de-geladeira',
  size: null,
  color: 'branco',
  quantity: 2,
}

describe('addLine', () => {
  it('a mesma variação soma na linha que já existe', () => {
    const cart = addLine(addLine(EMPTY_CART, SHIRT), { ...SHIRT, quantity: 2 })

    expect(cart.lines).toHaveLength(1)
    expect(cart.lines[0]?.quantity).toBe(3)
  })

  it('outro tamanho abre outra linha', () => {
    const cart = addLine(addLine(EMPTY_CART, SHIRT), { ...SHIRT, size: 'G' })

    expect(cart.lines).toHaveLength(2)
  })

  it('não passa do teto por linha', () => {
    const cart = addLine(EMPTY_CART, { ...SHIRT, quantity: 50 })

    expect(cart.lines[0]?.quantity).toBe(MAX_PER_LINE)
  })

  it('ignora produto que não existe', () => {
    expect(addLine(EMPTY_CART, { ...SHIRT, slug: 'nada' })).toBe(EMPTY_CART)
  })
})

describe('setQuantity e removeLine', () => {
  it('zero tira a linha', () => {
    const cart = setQuantity(addLine(EMPTY_CART, SHIRT), SHIRT, 0)

    expect(cart.lines).toEqual([])
  })

  it('removeLine tira só a variação pedida', () => {
    const cart = removeLine(addLine(addLine(EMPTY_CART, SHIRT), MAGNET), SHIRT)

    expect(cart.lines.map(lineKey)).toEqual([lineKey(MAGNET)])
  })
})

describe('contas', () => {
  const cart = addLine(addLine(EMPTY_CART, SHIRT), MAGNET)

  it('conta as peças somando as quantidades', () => {
    expect(itemCount(cart)).toBe(3)
  })

  it('soma o subtotal em centavos', () => {
    expect(subtotal(cart)).toBe(8990 + 2 * 1290)
  })

  it('resolve o produto de cada linha', () => {
    expect(resolveLines(cart).map((each) => each.product.slug)).toEqual([
      'camisa-oficial-2026',
      'ima-de-geladeira',
    ])
  })
})

describe('cupom', () => {
  const cart = addLine(EMPTY_CART, { ...SHIRT, quantity: 2 })

  it('aceita o código em qualquer caixa e com espaço', () => {
    expect(applyCoupon(cart, '  galeraverde ').coupon).toBe('GALERAVERDE')
  })

  it('código inválido não muda o carrinho', () => {
    expect(applyCoupon(cart, 'NAOEXISTE')).toBe(cart)
  })

  it('desconta sobre o subtotal, arredondado', () => {
    // 10% de R$ 179,80.
    expect(couponDiscount(applyCoupon(cart, 'GALERAVERDE'))).toBe(1798)
  })

  it('sem cupom não há desconto', () => {
    expect(couponDiscount(cart)).toBe(0)
  })
})

describe('parseCart', () => {
  it('texto ilegível vira carrinho vazio', () => {
    expect(parseCart('{')).toBe(EMPTY_CART)
    expect(parseCart('"x"')).toBe(EMPTY_CART)
  })

  it('descarta linha sem forma e junta variações repetidas', () => {
    const cart = parseCart(
      JSON.stringify({
        lines: [SHIRT, SHIRT, { slug: 1 }],
        coupon: 'besouro5',
      }),
    )

    expect(cart.lines).toHaveLength(1)
    expect(cart.lines[0]?.quantity).toBe(2)
    expect(cart.coupon).toBe('BESOURO5')
  })
})
