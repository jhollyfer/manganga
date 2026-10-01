import * as React from 'react'

import { cn } from '#/lib/utils'

/**
 * A pílula de filtro: itens por grupo, notícias por editoria, agenda por tipo.
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
        'inline-flex h-9 items-center rounded-sm border-2 border-current/25 px-3 text-micro font-bold tracking-[0.08em] uppercase opacity-80 transition-[opacity,border-color] hover:border-current hover:opacity-100 aria-[current=true]:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-background aria-[current=true]:opacity-100',
      ),
    },
    children,
  )
}
