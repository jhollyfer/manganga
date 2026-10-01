import { describe, expect, it } from 'vitest'

import { EMPTY_CART, addLine, applyCoupon } from './cart'
import {
  MAX_STORED_ORDERS,
  addOrder,
  buildOrder,
  findOrder,
  isOrderCode,
  orderCode,
  orderItemCount,
  parseOrders,
  summarize,
  validateCheckoutSearch,
} from './order'
import type { Order } from './order'
import type { CheckoutPayload } from '#/lib/validator'

const CART = applyCoupon(
  addLine(
    addLine(EMPTY_CART, {
      slug: 'camisa-oficial-2026',
      size: 'G',
      color: 'verde-mata',
      quantity: 2,
    }),
    { slug: 'chaveiro-estrela', size: null, color: 'verde-folha', quantity: 1 },
  ),
  'BESOURO5',
)

const PAYLOAD: CheckoutPayload = {
  name: 'Maria da Silva',
  email: 'maria@exemplo.com',
  phone: '(97) 98431-7149',
  document: '123.456.789-00',
  cep: '69630-000',
  street: 'Beco 50',
  number: '12',
  complement: null,
  district: 'Coaban',
  city: 'Benjamin Constant',
  state: 'am',
  payment: 'pix',
}

const SHIPPING = { method: 'standard', price: 800, days: [1, 2] } as const

function order(
  code: string,
  payment: CheckoutPayload['payment'] = 'pix',
): Order {
  return buildOrder({
    cart: CART,
    payload: { ...PAYLOAD, payment },
    shipping: { ...SHIPPING, days: [1, 2] },
    code,
    now: new Date('2026-07-01T12:00:00Z'),
  })
}

describe('summarize', () => {
  it('soma frete depois do cupom e dá o Pix só sobre as peças', () => {
    const summary = summarize(CART, 800)
    // 2 x 89,90 + 19,90 = 199,70; 5% de cupom = 9,99 (9,985 arredondado).
    expect(summary.subtotal).toBe(19970)
    expect(summary.discount).toBe(999)
    expect(summary.total).toBe(19970 - 999 + 800)
    expect(summary.pixTotal).toBe(Math.round((18971 * 95) / 100) + 800)
  })

  it('sem CEP o frete fica em aberto e não entra no total', () => {
    const summary = summarize(CART, null)

    expect(summary.shipping).toBeNull()
    expect(summary.total).toBe(19970 - 999)
  })
})

describe('orderCode', () => {
  it('tem o prefixo e seis caracteres sem 0, O, 1 e I', () => {
    for (let index = 0; index < 50; index += 1) {
      const code = orderCode()

      expect(isOrderCode(code)).toBe(true)
      expect(code.slice(4)).not.toMatch(/[01OI]/)
    }
  })

  it('usa o sorteio recebido', () => {
    expect(orderCode(() => 0)).toBe('MGA-AAAAAA')
  })

  it('recusa o que não tem a forma do código', () => {
    expect(isOrderCode('MGA-ABC')).toBe(false)
    expect(isOrderCode('mga-abcdef')).toBe(false)
  })
})

describe('buildOrder', () => {
  it('copia nome, cor e preço de cada peça', () => {
    const built = order('MGA-ABCDEF')

    expect(built.lines).toHaveLength(2)
    expect(built.lines[0]?.color.id).toBe('verde-mata')
    expect(built.lines[0]?.unitPrice).toBe(8990)
    expect(orderItemCount(built)).toBe(3)
  })

  it('o Pix leva o desconto, o cartão paga cheio', () => {
    const pix = order('MGA-ABCDEF', 'pix')
    const card = order('MGA-ABCDEF', 'card')

    expect(pix.totals.total).toBe(summarize(CART, 800).pixTotal)
    expect(pix.totals.pixDiscount).toBeGreaterThan(0)
    expect(card.totals.total).toBe(summarize(CART, 800).total)
    expect(card.totals.pixDiscount).toBe(0)
  })

  it('a UF sai em caixa alta', () => {
    expect(order('MGA-ABCDEF').address.state).toBe('AM')
  })
})

describe('guarda dos pedidos', () => {
  it('lê o que gravou', () => {
    const list = addOrder([], order('MGA-ABCDEF'))

    expect(parseOrders(JSON.stringify(list))).toEqual(list)
  })

  it('texto ilegível e registro sem forma somem', () => {
    expect(parseOrders('{')).toEqual([])
    expect(parseOrders(JSON.stringify([{ code: 'x' }]))).toEqual([])
  })

  it('põe o novo na frente, sem repetir e sem passar do teto', () => {
    let list: Array<Order> = []
    for (let index = 0; index < MAX_STORED_ORDERS + 5; index += 1)
      list = addOrder(list, order(orderCode()))
    list = addOrder(list, list[3] ?? order('MGA-ZZZZZZ'))

    expect(list).toHaveLength(MAX_STORED_ORDERS)
    expect(new Set(list.map((each) => each.code)).size).toBe(list.length)
  })

  it('acha o pedido mesmo com o código em caixa baixa', () => {
    const list = addOrder([], order('MGA-ABCDEF'))

    expect(findOrder(list, 'mga-abcdef')?.code).toBe('MGA-ABCDEF')
    expect(findOrder(list, 'MGA-ZZZZZZ')).toBeUndefined()
  })
})

describe('validateCheckoutSearch', () => {
  it('aceita CEP com máscara e a entrega conhecida', () => {
    expect(
      validateCheckoutSearch({ cep: '69630-000', shipping: 'pickup' }),
    ).toEqual({ cep: '69630000', shipping: 'pickup' })
  })

  it('devolve o zero da frente de um CEP lido como número', () => {
    expect(validateCheckoutSearch({ cep: 1310100 })).toEqual({
      cep: '01310100',
    })
  })

  it('descarta o que não reconhece', () => {
    expect(validateCheckoutSearch({ cep: 'abc', shipping: 'drone' })).toEqual(
      {},
    )
  })
})
