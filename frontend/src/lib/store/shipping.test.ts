import { describe, expect, it } from 'vitest'

import {
  FREE_SHIPPING_FROM,
  formatCep,
  missingForFreeShipping,
  parseCep,
  quoteShipping,
} from './shipping'

describe('parseCep e formatCep', () => {
  it('aceita com e sem máscara', () => {
    expect(parseCep('69630-000')).toBe('69630000')
    expect(parseCep('69630000')).toBe('69630000')
  })

  it('recusa o que não tem oito dígitos', () => {
    expect(parseCep('6963')).toBeNull()
    expect(parseCep('696300001')).toBeNull()
  })

  it('formata com hífen', () => {
    expect(formatCep('01310100')).toBe('01310-100')
  })
})

describe('quoteShipping', () => {
  it('Benjamin Constant retira de graça no curral', () => {
    const [pickup] = quoteShipping('69630000', 0)

    expect(pickup).toEqual({ method: 'pickup', price: 0, days: [0, 0] })
  })

  it('o resto do Amazonas não tem retirada', () => {
    const methods = quoteShipping('69005000', 0).map((option) => option.method)

    expect(methods).toEqual(['standard', 'express'])
  })

  it('o Norte e o resto do país custam mais que o Amazonas', () => {
    const price = (cep: string): number =>
      quoteShipping(cep, 0).find((option) => option.method === 'standard')
        ?.price ?? 0

    expect(price('66010000')).toBeGreaterThan(price('69005000'))
    expect(price('01310100')).toBeGreaterThan(price('66010000'))
  })

  it('o padrão zera a partir do frete grátis, o expresso não', () => {
    const options = quoteShipping('01310100', FREE_SHIPPING_FROM)

    expect(options.find((option) => option.method === 'standard')?.price).toBe(
      0,
    )
    expect(
      options.find((option) => option.method === 'express')?.price,
    ).toBeGreaterThan(0)
  })

  it('um centavo abaixo do limite ainda paga', () => {
    const standard = quoteShipping('01310100', FREE_SHIPPING_FROM - 1).at(0)

    expect(standard?.price).toBeGreaterThan(0)
  })
})

describe('missingForFreeShipping', () => {
  it('diz quanto falta e nunca fica negativo', () => {
    expect(missingForFreeShipping(20000)).toBe(FREE_SHIPPING_FROM - 20000)
    expect(missingForFreeShipping(FREE_SHIPPING_FROM + 1)).toBe(0)
  })
})
