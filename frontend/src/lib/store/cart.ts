import { findProduct } from './catalog'
import type { Product } from './catalog'
import type { Cents } from './money'

/**
 * O carrinho, como dado puro.
 *
 * Só funções que recebem um carrinho e devolvem outro: quem guarda o estado é
 * `use-cart.ts`, no navegador. Separado assim porque o que quebra num carrinho
 * é a conta (somar a mesma variação duas vezes, aceitar mais que o estoque,
 * cupom que desconta sobre o frete), e conta se testa sem DOM.
 */

/** Uma linha do carrinho: o produto e a variação escolhida. */
export type CartLine = {
  slug: string
  /** O tamanho, ou `null` para peça de tamanho único. */
  size: string | null
  color: string
  quantity: number
}

export type Cart = {
  lines: ReadonlyArray<CartLine>
  /** O cupom aplicado, já validado. */
  coupon: string | null
}

export const EMPTY_CART: Cart = { lines: [], coupon: null }

/** O teto por linha, para o campo de quantidade não aceitar 999. */
export const MAX_PER_LINE = 10

/** Duas linhas são a mesma quando produto, tamanho e cor coincidem. */
export function sameVariant(a: CartLine, b: CartLine): boolean {
  return a.slug === b.slug && a.size === b.size && a.color === b.color
}

/** A chave estável de uma linha, para `key` do React e para a URL. */
export function lineKey(line: CartLine): string {
  return [line.slug, line.size ?? '-', line.color].join(':')
}

function clamp(quantity: number, product: Product | undefined): number {
  const ceiling = Math.min(MAX_PER_LINE, product?.stock ?? 0)

  return Math.max(0, Math.min(ceiling, Math.floor(quantity)))
}

/**
 * Põe a variação no carrinho. A mesma variação soma na linha que já existe,
 * em vez de abrir outra: duas linhas iguais confundem quem confere o pedido.
 */
export function addLine(cart: Cart, line: CartLine): Cart {
  const product = findProduct(line.slug)
  const existing = cart.lines.find((each) => sameVariant(each, line))

  if (!existing) {
    const quantity = clamp(line.quantity, product)
    if (quantity === 0) return cart

    return { ...cart, lines: [...cart.lines, { ...line, quantity }] }
  }

  return setQuantity(cart, existing, existing.quantity + line.quantity)
}

/** Troca a quantidade de uma linha. Zero tira a linha do carrinho. */
export function setQuantity(
  cart: Cart,
  line: CartLine,
  quantity: number,
): Cart {
  const next = clamp(quantity, findProduct(line.slug))

  if (next === 0) return removeLine(cart, line)

  return {
    ...cart,
    lines: cart.lines.map((each) => {
      if (!sameVariant(each, line)) return each

      return { ...each, quantity: next }
    }),
  }
}

export function removeLine(cart: Cart, line: CartLine): Cart {
  return {
    ...cart,
    lines: cart.lines.filter((each) => !sameVariant(each, line)),
  }
}

/** Quantas peças há no carrinho, somando as quantidades. */
export function itemCount(cart: Cart): number {
  return cart.lines.reduce((total, line) => total + line.quantity, 0)
}

/** Uma linha com o produto resolvido, que é o que a tela desenha. */
export type ResolvedLine = {
  line: CartLine
  product: Product
  total: Cents
}

/**
 * As linhas com o produto ao lado.
 *
 * Linha de produto que saiu do catálogo some daqui em vez de quebrar a tela:
 * o carrinho mora no navegador e sobrevive a uma troca de catálogo.
 */
export function resolveLines(cart: Cart): Array<ResolvedLine> {
  return cart.lines.flatMap((line) => {
    const product = findProduct(line.slug)
    if (!product) return []

    return [{ line, product, total: product.price * line.quantity }]
  })
}

export function subtotal(cart: Cart): Cents {
  return resolveLines(cart).reduce((total, each) => total + each.total, 0)
}

/**
 * Os cupons da loja e o desconto de cada um, em porcentagem.
 *
 * Em código porque a loja ainda não tem API. Quando tiver, a validação vai
 * para o servidor e esta tabela some: cupom conferido só no navegador é cupom
 * que qualquer um lê no bundle.
 */
export const COUPONS: Record<string, number> = {
  GALERAVERDE: 10,
  BESOURO5: 5,
}

export function normalizeCoupon(code: string): string {
  return code.trim().toUpperCase()
}

/** Se o código é um cupom válido. */
export function isCoupon(code: string): boolean {
  return normalizeCoupon(code) in COUPONS
}

export function applyCoupon(cart: Cart, code: string | null): Cart {
  if (code === null) return { ...cart, coupon: null }

  const normalized = normalizeCoupon(code)
  if (!isCoupon(normalized)) return cart

  return { ...cart, coupon: normalized }
}

/** O desconto do cupom sobre o subtotal. Frete nunca entra no desconto. */
export function couponDiscount(cart: Cart): Cents {
  if (!cart.coupon) return 0

  const percent = COUPONS[cart.coupon] ?? 0

  return Math.round((subtotal(cart) * percent) / 100)
}

/**
 * Lê um carrinho guardado, aceitando só o que tem a forma certa.
 *
 * O `localStorage` é de quem está no navegador e pode ter qualquer coisa: uma
 * versão antiga do formato, um valor editado à mão. Carrinho ilegível vira
 * carrinho vazio, nunca uma tela quebrada.
 */
export function parseCart(raw: string | null): Cart {
  if (!raw) return EMPTY_CART

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return EMPTY_CART
  }

  if (typeof data !== 'object' || data === null) return EMPTY_CART

  const lines: unknown = Reflect.get(data, 'lines')
  const coupon: unknown = Reflect.get(data, 'coupon')

  if (!Array.isArray(lines)) return EMPTY_CART

  let cart: Cart = EMPTY_CART
  for (const line of lines) {
    if (!isLine(line)) continue
    cart = addLine(cart, line)
  }

  if (typeof coupon === 'string') cart = applyCoupon(cart, coupon)

  return cart
}

function isLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false

  const slug: unknown = Reflect.get(value, 'slug')
  const size: unknown = Reflect.get(value, 'size')
  const color: unknown = Reflect.get(value, 'color')
  const quantity: unknown = Reflect.get(value, 'quantity')

  return (
    typeof slug === 'string' &&
    (size === null || typeof size === 'string') &&
    typeof color === 'string' &&
    typeof quantity === 'number'
  )
}
