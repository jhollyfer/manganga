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
        'inline-flex h-10 items-center rounded-full border border-border px-4 text-small font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground',
      ),
    },
    children,
  )
}
