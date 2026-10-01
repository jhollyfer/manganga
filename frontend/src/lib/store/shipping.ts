import type { Cents } from './money'

/**
 * O frete, calculado no navegador a partir do CEP.
 *
 * **Tabela de exemplo**, como o catálogo: a cotação de verdade vem dos
 * Correios quando a loja tiver API. O que a tabela já acerta é a forma da
 * resposta (opções com preço e prazo), e a regra da casa: quem é de Benjamin
 * Constant retira no curral sem pagar nada.
 */

/** Acima deste subtotal o envio padrão é grátis. */
export const FREE_SHIPPING_FROM: Cents = 25000

/** Os oito dígitos do CEP, ou `null` quando o texto não é um CEP. */
export function parseCep(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 8) return null

  return digits
}

/** O CEP no formato `00000-000`. */
export function formatCep(digits: string): string {
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export const SHIPPING_METHODS = ['pickup', 'standard', 'express'] as const

export type ShippingMethod = (typeof SHIPPING_METHODS)[number]

export type ShippingOption = {
  method: ShippingMethod
  price: Cents
  /** Prazo em dias úteis, `[mínimo, máximo]`. Retirada é `[0, 0]`. */
  days: readonly [number, number]
}

type Zone = 'city' | 'amazonas' | 'north' | 'rest'

/**
 * A faixa do CEP decide a zona. O Amazonas inteiro vai de 69000 a 69299 e de
 * 69400 a 69899; o 69630 é Benjamin Constant.
 */
function zoneOf(cep: string): Zone {
  const prefix = Number(cep.slice(0, 5))

  if (prefix >= 69630 && prefix <= 69639) return 'city'
  if (
    (prefix >= 69000 && prefix <= 69299) ||
    (prefix >= 69400 && prefix <= 69899)
  )
    return 'amazonas'
  if (prefix >= 66000 && prefix <= 69999) return 'north'

  return 'rest'
}

const TABLE: Record<Zone, ReadonlyArray<ShippingOption>> = {
  city: [
    { method: 'pickup', price: 0, days: [0, 0] },
    { method: 'standard', price: 800, days: [1, 2] },
  ],
  amazonas: [
    { method: 'standard', price: 2490, days: [7, 15] },
    { method: 'express', price: 4990, days: [3, 6] },
  ],
  north: [
    { method: 'standard', price: 2990, days: [8, 14] },
    { method: 'express', price: 5990, days: [4, 7] },
  ],
  rest: [
    { method: 'standard', price: 3490, days: [9, 16] },
    { method: 'express', price: 6990, days: [5, 8] },
  ],
}

/**
 * As opções de entrega para o CEP e o subtotal.
 *
 * O envio padrão zera acima de `FREE_SHIPPING_FROM`; o expresso continua
 * cobrado, porque é ele que a loja paga caro para mandar rio acima.
 */
export function quoteShipping(
  cep: string,
  subtotal: Cents,
): Array<ShippingOption> {
  return TABLE[zoneOf(cep)].map((option) => {
    if (option.method === 'standard' && subtotal >= FREE_SHIPPING_FROM)
      return { ...option, price: 0 }

    return option
  })
}

/** Quanto falta para o frete grátis, nunca negativo. */
export function missingForFreeShipping(subtotal: Cents): Cents {
  return Math.max(0, FREE_SHIPPING_FROM - subtotal)
}
