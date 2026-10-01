import { getLocale } from '#/paraglide/runtime'

/**
 * Dinheiro da loja.
 *
 * Todo valor mora em **centavos inteiros**. Somar `79.9 + 9.9` em ponto
 * flutuante dá `89.80000000000001`, e um total de carrinho que erra no
 * centavo é o tipo de defeito que só aparece na conferência do Pix.
 */
export type Cents = number

/**
 * O valor em reais, no formato do idioma de quem lê.
 *
 * A moeda é sempre o real: a loja vende e entrega a partir de Benjamin
 * Constant. Quem lê em espanhol vê "R$ 89,90" escrito do jeito dele, e não um
 * valor convertido que a loja não cobra.
 */
export function formatMoney(cents: Cents): string {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

/** O desconto do Pix, em porcentagem inteira. */
export const PIX_DISCOUNT_PERCENT = 5

/** O valor com o desconto do Pix, arredondado para o centavo. */
export function pixPrice(cents: Cents): Cents {
  return Math.round((cents * (100 - PIX_DISCOUNT_PERCENT)) / 100)
}

/** O teto de parcelas sem juros no cartão. */
export const MAX_INSTALLMENTS = 6

/**
 * A menor parcela aceita. Abaixo dela a taxa do cartão come a margem de um
 * chaveiro, e a loja prefere não oferecer 6x de R$ 3,31.
 */
export const MIN_INSTALLMENT: Cents = 2000

export type Installments = {
  count: number
  value: Cents
}

/**
 * Quantas parcelas sem juros o valor aceita, e de quanto cada uma.
 *
 * Nunca menos de uma: um produto abaixo da parcela mínima ainda se paga à
 * vista no cartão.
 */
export function installments(cents: Cents): Installments {
  const byMinimum = Math.floor(cents / MIN_INSTALLMENT)
  const count = Math.max(1, Math.min(MAX_INSTALLMENTS, byMinimum))

  return { count, value: Math.ceil(cents / count) }
}

/** O percentual de desconto entre o preço cheio e o atual, arredondado. */
export function discountPercent(price: Cents, compareAt: Cents): number {
  if (compareAt <= price) return 0

  return Math.round(((compareAt - price) / compareAt) * 100)
}

/**
 * A tabela de parcelas que o valor aceita, de 1x até o teto de
 * `installments`.
 *
 * Cada linha arredonda a parcela para cima, como a de `installments`: a soma
 * das parcelas pode passar do total em centavos, nunca ficar abaixo dele, e a
 * loja não recebe menos do que anunciou.
 */
export function installmentTable(cents: Cents): Array<Installments> {
  const { count } = installments(cents)

  return Array.from({ length: count }, (_, index) => ({
    count: index + 1,
    value: Math.ceil(cents / (index + 1)),
  }))
}
