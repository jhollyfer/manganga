import * as React from 'react'

import {
  ORDERS_STORAGE_KEY,
  addOrder,
  findOrder,
  parseOrders,
} from '#/lib/store/order'
import type { Order } from '#/lib/store/order'

/**
 * Os pedidos feitos neste navegador.
 *
 * O mesmo desenho do carrinho (`use-cart.ts`): `useSyncExternalStore` sobre
 * o `localStorage`, com o snapshot do servidor explícito. Aqui ele é
 * `undefined`, e não lista vazia, porque a página de confirmação precisa
 * distinguir "ainda não li" de "li e o pedido não está aqui": a primeira
 * desenha o esqueleto, a segunda diz que o pedido não foi encontrado.
 */
const CHANGE_EVENT = 'manganga:orders'

/*
 * Quando o navegador recusa o storage (navegação privada em alguns), o
 * pedido fica aqui até recarregar: a confirmação logo depois do checkout
 * ainda aparece, que é o momento em que ela mais importa.
 */
let fallbackRaw: string | null = null

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(ORDERS_STORAGE_KEY) ?? fallbackRaw
  } catch {
    return fallbackRaw
  }
}

function subscribe(listener: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)

  return () => {
    window.removeEventListener(CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
  }
}

function getServerSnapshot(): undefined {
  return undefined
}

/** Guarda o pedido na frente da lista do navegador. */
export function saveOrder(order: Order): void {
  const raw = JSON.stringify(addOrder(parseOrders(readRaw()), order))

  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, raw)
  } catch {
    fallbackRaw = raw
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export type OrderLookup =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'found'; order: Order }

/** O pedido pelo código, lido no navegador. */
export function useOrder(code: string): OrderLookup {
  const raw = React.useSyncExternalStore(subscribe, readRaw, getServerSnapshot)

  return React.useMemo<OrderLookup>(() => {
    if (raw === undefined) return { status: 'loading' }

    const order = findOrder(parseOrders(raw), code)
    if (!order) return { status: 'missing' }

    return { status: 'found', order }
  }, [raw, code])
}
