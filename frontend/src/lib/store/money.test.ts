import { describe, expect, it } from 'vitest'

import {
  MAX_INSTALLMENTS,
  MIN_INSTALLMENT,
  discountPercent,
  formatMoney,
  installmentTable,
  installments,
  pixPrice,
} from './money'

describe('formatMoney', () => {
  it('escreve centavos como reais', () => {
    expect(formatMoney(8990).replace(/\s/g, ' ')).toBe('R$ 89,90')
  })
})

describe('pixPrice', () => {
  it('tira 5% e arredonda para o centavo', () => {
    expect(pixPrice(10000)).toBe(9500)
    // 89,90 * 0,95 = 85,405: o meio centavo arredonda para cima.
    expect(pixPrice(8990)).toBe(8541)
  })
})

describe('installments', () => {
  it('para no teto de parcelas', () => {
    expect(installments(100000)).toEqual({
      count: MAX_INSTALLMENTS,
      value: 16667,
    })
  })

  it('respeita a parcela mínima', () => {
    // R$ 59,90 dá duas parcelas de R$ 29,95, e não três de R$ 19,97.
    expect(installments(5990)).toEqual({ count: 2, value: 2995 })
  })

  it('valor abaixo da parcela mínima ainda paga à vista', () => {
    expect(installments(1290)).toEqual({ count: 1, value: 1290 })
  })

  it('nenhuma parcela fica abaixo do mínimo quando há mais de uma', () => {
    for (const cents of [2000, 3999, 4000, 8990, 12000, 25000]) {
      const result = installments(cents)
      if (result.count > 1)
        expect(result.value).toBeGreaterThanOrEqual(MIN_INSTALLMENT)
    }
  })
})

describe('installmentTable', () => {
  it('lista de 1x até o teto, sem nunca somar menos que o total', () => {
    const table = installmentTable(8990)

    expect(table.map((row) => row.count)).toEqual([1, 2, 3, 4])
    for (const row of table)
      expect(row.value * row.count).toBeGreaterThanOrEqual(8990)
  })
})

describe('discountPercent', () => {
  it('arredonda o percentual', () => {
    expect(discountPercent(6990, 7990)).toBe(13)
  })

  it('não inventa desconto quando o preço cheio não é maior', () => {
    expect(discountPercent(5000, 5000)).toBe(0)
    expect(discountPercent(5000, 4000)).toBe(0)
  })
})
