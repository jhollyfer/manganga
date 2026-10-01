import { PAYMENT_METHODS } from '#/lib/entity'
import type { PaymentMethod } from '#/lib/entity'
import type { LocalizedText } from '#/lib/i18n'
import type { CheckoutPayload } from '#/lib/validator'

import { colorOf } from './catalog'
import type { ArtKind } from './catalog'
import { couponDiscount, resolveLines, subtotal } from './cart'
import type { Cart } from './cart'
import { installments, pixPrice } from './money'
import type { Cents, Installments } from './money'
import { SHIPPING_METHODS, parseCep } from './shipping'
import type { ShippingMethod, ShippingOption } from './shipping'

/**
 * O pedido da loja, como dado puro.
 *
 * O checkout termina aqui: monta o pedido a partir do carrinho e do
 * formulário, e quem guarda é o navegador (`order-storage.ts`, na pasta da
 * loja). Não há pagamento on-line; a equipe confirma cada pedido pelo
 * WhatsApp, e o código é o que a pessoa manda na conversa.
 *
 * O pedido guarda uma **cópia** do nome, da cor e do preço de cada peça, e não
 * só o endereço do produto: a confirmação precisa mostrar o que foi comprado
 * pelo preço daquele dia, mesmo depois de o catálogo mudar.
 */

/** A chave do `localStorage`, versionada como a do carrinho. */
export const ORDERS_STORAGE_KEY = 'manganga:orders:v1'

/** Quantos pedidos o navegador guarda. O mais antigo sai primeiro. */
export const MAX_STORED_ORDERS = 20

// ---------------------------------------------------------------------------
// Resumo do carrinho
// ---------------------------------------------------------------------------

export type CartSummary = {
  subtotal: Cents
  discount: Cents
  /** O frete escolhido, ou `null` enquanto não há CEP. */
  shipping: Cents | null
  total: Cents
  /** O total pagando no Pix. */
  pixTotal: Cents
  installments: Installments
}

/**
 * Os números do resumo, que o carrinho e o checkout desenham iguais.
 *
 * O desconto do Pix vale sobre as peças, depois do cupom, e não sobre o frete:
 * o frete é repasse ao transportador, e descontar sobre ele seria a loja pagar
 * parte da entrega de quem mora mais longe.
 */
export function summarize(cart: Cart, shipping: Cents | null): CartSummary {
  const gross = subtotal(cart)
  const discount = couponDiscount(cart)
  const items = gross - discount
  const freight = shipping ?? 0
  const total = items + freight

  return {
    subtotal: gross,
    discount,
    shipping,
    total,
    pixTotal: pixPrice(items) + freight,
    installments: installments(total),
  }
}

// ---------------------------------------------------------------------------
// Código do pedido
// ---------------------------------------------------------------------------

/**
 * O alfabeto do código, sem `0`, `O`, `1` e `I`: o código é lido em voz alta
 * e digitado no WhatsApp, e é ali que um zero vira letra.
 */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6
const CODE_PATTERN = /^MGA-[A-Z0-9]{6}$/

function cryptoIndex(max: number): number {
  const values = new Uint32Array(1)
  crypto.getRandomValues(values)

  return (values.at(0) ?? 0) % max
}

/**
 * Um código novo, `MGA-` e seis caracteres.
 *
 * O sorteio entra por parâmetro para o teste fixar o resultado; o padrão é o
 * `crypto`, porque `Math.random` repete sequência em alguns navegadores
 * antigos e dois pedidos com o mesmo código se sobrescreveriam.
 */
export function orderCode(
  randomIndex: (max: number) => number = cryptoIndex,
): string {
  const chars = Array.from(
    { length: CODE_LENGTH },
    () => CODE_ALPHABET[randomIndex(CODE_ALPHABET.length)] ?? 'A',
  )

  return 'MGA-'.concat(chars.join(''))
}

/** Se o texto tem a forma de um código de pedido. */
export function isOrderCode(value: string): boolean {
  return CODE_PATTERN.test(value)
}

// ---------------------------------------------------------------------------
// O pedido
// ---------------------------------------------------------------------------

export type OrderLine = {
  slug: string
  name: LocalizedText
  art: ArtKind
  size: string | null
  color: { id: string; name: LocalizedText; hex: string }
  quantity: number
  unitPrice: Cents
}

export type OrderCustomer = {
  name: string
  email: string
  phone: string
  document: string
}

export type OrderAddress = {
  cep: string
  street: string
  number: string
  complement: string | null
  district: string
  city: string
  state: string
}

export type OrderTotals = {
  subtotal: Cents
  discount: Cents
  /** O desconto do Pix, zero nas outras formas de pagamento. */
  pixDiscount: Cents
  shipping: Cents
  total: Cents
}

export type Order = {
  code: string
  /** Data e hora em ISO 8601, no relógio de quem comprou. */
  createdAt: string
  lines: ReadonlyArray<OrderLine>
  coupon: string | null
  payment: PaymentMethod
  shipping: ShippingOption
  customer: OrderCustomer
  address: OrderAddress
  totals: OrderTotals
}

export type BuildOrderInput = {
  cart: Cart
  payload: CheckoutPayload
  shipping: ShippingOption
  code: string
  now: Date
}

/**
 * O pedido a partir do carrinho e do formulário já validado.
 *
 * O total depende da forma de pagamento: o Pix leva o desconto, cartão e
 * boleto pagam o valor cheio. Calculado aqui, e não na tela de confirmação,
 * para o número que a pessoa viu ao fechar ser o mesmo que ela vai pagar.
 */
export function buildOrder({
  cart,
  payload,
  shipping,
  code,
  now,
}: BuildOrderInput): Order {
  const summary = summarize(cart, shipping.price)

  let total = summary.total
  if (payload.payment === 'pix') total = summary.pixTotal

  const lines = resolveLines(cart).map(({ line, product }) => {
    const color = colorOf(product, line.color)

    return {
      slug: product.slug,
      name: product.name,
      art: product.art,
      size: line.size,
      color: {
        id: color?.id ?? line.color,
        name: color?.name ?? product.name,
        hex: color?.hex ?? '#f7f6f0',
      },
      quantity: line.quantity,
      unitPrice: product.price,
    }
  })

  return {
    code,
    createdAt: now.toISOString(),
    lines,
    coupon: cart.coupon,
    payment: payload.payment,
    shipping,
    customer: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      document: payload.document,
    },
    address: {
      cep: payload.cep,
      street: payload.street,
      number: payload.number,
      complement: payload.complement,
      district: payload.district,
      city: payload.city,
      state: payload.state.toUpperCase(),
    },
    totals: {
      subtotal: summary.subtotal,
      discount: summary.discount,
      pixDiscount: summary.total - total,
      shipping: shipping.price,
      total,
    },
  }
}

// ---------------------------------------------------------------------------
// Leitura e gravação
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isPaymentMethod(value: unknown): value is PaymentMethod {
  return PAYMENT_METHODS.some((method) => method === value)
}

function isShippingMethod(value: unknown): value is ShippingMethod {
  return SHIPPING_METHODS.some((method) => method === value)
}

/**
 * Confere o que importa para desenhar a confirmação sem quebrar: código,
 * data, linhas, totais, pagamento e frete. O resto do pedido foi escrito por
 * `buildOrder` e só muda de forma junto com a versão da chave.
 */
function isOrder(value: unknown): value is Order {
  if (!isRecord(value)) return false

  const { code, createdAt, lines, totals, payment, shipping, customer } = value

  return (
    typeof code === 'string' &&
    isOrderCode(code) &&
    typeof createdAt === 'string' &&
    Array.isArray(lines) &&
    lines.every(isRecord) &&
    isRecord(totals) &&
    typeof totals.total === 'number' &&
    isPaymentMethod(payment) &&
    isRecord(shipping) &&
    isShippingMethod(shipping.method) &&
    isRecord(customer)
  )
}

/**
 * Os pedidos guardados, aceitando só os que têm a forma certa.
 *
 * Como o carrinho: o `localStorage` pode ter qualquer coisa, e um registro
 * ilegível some da lista em vez de derrubar a página de confirmação.
 */
export function parseOrders(raw: string | null): Array<Order> {
  if (!raw) return []

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return []
  }

  if (!Array.isArray(data)) return []

  return data.filter(isOrder)
}

/**
 * A lista com o pedido novo na frente, sem repetir código e sem passar do
 * teto: o navegador é de quem compra, e guardar o histórico inteiro só
 * acumularia dado pessoal num aparelho que às vezes é da família toda.
 */
export function addOrder(
  orders: ReadonlyArray<Order>,
  order: Order,
): Array<Order> {
  const others = orders.filter((each) => each.code !== order.code)

  return [order, ...others].slice(0, MAX_STORED_ORDERS)
}

export function findOrder(
  orders: ReadonlyArray<Order>,
  code: string,
): Order | undefined {
  return orders.find((order) => order.code === code.toUpperCase())
}

/** Quantas peças há no pedido. */
export function orderItemCount(order: Order): number {
  return order.lines.reduce((total, line) => total + line.quantity, 0)
}

// ---------------------------------------------------------------------------
// A URL do checkout
// ---------------------------------------------------------------------------

export type CheckoutSearch = {
  /** O CEP já cotado no carrinho, só os oito dígitos. */
  cep?: string
  /** A entrega escolhida no carrinho. */
  shipping?: ShippingMethod
}

/**
 * O que o carrinho passa ao checkout pela URL: o CEP e a entrega que a
 * pessoa já escolheu, para não digitar duas vezes. Valor estranho cai fora,
 * como na vitrine.
 */
export function validateCheckoutSearch(
  search: Record<string, unknown>,
): CheckoutSearch {
  const result: CheckoutSearch = {}

  /*
   * O router lê `?cep=01310100` como número e come o zero da frente: o CEP de
   * São Paulo viraria sete dígitos e cairia fora. Número volta a ter oito.
   */
  let raw: string | undefined
  if (typeof search.cep === 'string') raw = search.cep
  if (typeof search.cep === 'number') raw = String(search.cep).padStart(8, '0')

  const cep = parseCep(raw ?? '')
  if (cep) result.cep = cep

  if (isShippingMethod(search.shipping)) result.shipping = search.shipping

  return result
}
