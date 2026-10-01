import * as React from 'react'

import {
  EMPTY_CART,
  addLine,
  applyCoupon,
  parseCart,
  removeLine,
  setQuantity,
} from '#/lib/store/cart'
import type { Cart, CartLine } from '#/lib/store/cart'

/**
 * O carrinho do navegador, compartilhado entre o ícone do cabeçalho, a gaveta
 * e as telas da loja.
 *
 * Na casca pública e não dentro de `loja/`: o cabeçalho de toda página mostra
 * a contagem, então o ancestral comum dos consumidores é `_public`.
 *
 * `useSyncExternalStore` sobre o `localStorage`, e não um contexto com
 * `useState`: o snapshot do servidor é o carrinho vazio, explícito, e a
 * hidratação não briga com o número que só o navegador conhece. O evento
 * `storage` mantém duas abas da loja no mesmo carrinho.
 */
const STORAGE_KEY = 'manganga:cart:v1'
const CHANGE_EVENT = 'manganga:cart'

/*
 * O último texto lido e o carrinho que saiu dele. O `getSnapshot` precisa
 * devolver o **mesmo** objeto enquanto nada mudou; sem este cache cada leitura
 * criaria um carrinho novo e o React renderizaria em laço.
 */
let lastRaw: string | null = null
let lastCart: Cart = EMPTY_CART

function read(): Cart {
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Navegação privada em alguns navegadores recusa o storage: carrinho vazio.
    return EMPTY_CART
  }

  if (raw === lastRaw) return lastCart

  lastRaw = raw
  lastCart = parseCart(raw)

  return lastCart
}

function write(cart: Cart): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Sem storage o carrinho vale só até recarregar, e a compra ainda fecha.
    lastRaw = null
    lastCart = cart
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(listener: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)

  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}

function getServerSnapshot(): Cart {
  return EMPTY_CART
}

export type CartActions = {
  add: (line: CartLine) => void
  update: (line: CartLine, quantity: number) => void
  remove: (line: CartLine) => void
  coupon: (code: string | null) => void
  clear: () => void
}

/** O carrinho atual e as ações sobre ele. */
export function useCart(): [Cart, CartActions] {
  const cart = React.useSyncExternalStore(subscribe, read, getServerSnapshot)

  const actions = React.useMemo<CartActions>(
    () => ({
      add: (line) => write(addLine(read(), line)),
      update: (line, quantity) => write(setQuantity(read(), line, quantity)),
      remove: (line) => write(removeLine(read(), line)),
      coupon: (code) => write(applyCoupon(read(), code)),
      clear: () => write(EMPTY_CART),
    }),
    [],
  )

  return [cart, actions]
}
