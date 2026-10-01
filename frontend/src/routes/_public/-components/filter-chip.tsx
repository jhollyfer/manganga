import * as React from 'react'

import { cn } from '#/lib/utils'

/**
 * O filtro: itens por grupo, notícias por editoria, agenda por tipo. Texto
 * com sublinhado no ativo, como as abas de editoria de um jornal, e não a
 * fileira de pílulas com borda.
 *
 * É um link e não um botão: o filtro mora na URL, e o link é o que deixa abrir
 * o filtro em outra aba e compartilhar o endereço. O ativo ganha
 * `aria-current`, que é o que diz ao leitor de tela qual filtro está aplicado.
 */
export function FilterChip({
  active,
  render,
  children,
}: {
  active: boolean
  render: React.ReactElement<{
    className?: string
    'aria-current'?: 'true'
    children?: React.ReactNode
  }>
  children: React.ReactNode
}): React.JSX.Element {
  let current: 'true' | undefined
  if (active) current = 'true'

  return React.cloneElement(
    render,
    {
      'aria-current': current,
      className: cn(
        'mr-3 inline-flex h-9 items-center border-b-2 border-transparent text-small font-medium opacity-65 transition-[opacity,border-color] hover:opacity-100 aria-[current=true]:border-current aria-[current=true]:opacity-100',
      ),
    },
    children,
  )
}
