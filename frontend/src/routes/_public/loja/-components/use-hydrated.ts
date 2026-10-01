import * as React from 'react'

function subscribe(): () => void {
  return () => {}
}

/**
 * Se a página já hidratou no navegador.
 *
 * O carrinho e os pedidos moram no `localStorage`, que o servidor não lê: o
 * HTML do servidor sai com o carrinho vazio. Sem esta guarda, quem abre o
 * carrinho cheio veria "seu carrinho está vazio" piscar antes das peças. Com
 * ela, a tela mostra o esqueleto até o navegador assumir.
 *
 * `useSyncExternalStore` e não `useEffect` com `useState`: o snapshot do
 * servidor é `false` por contrato, a hidratação concorda com o HTML recebido,
 * e não há render extra depois de montar.
 */
export function useHydrated(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
