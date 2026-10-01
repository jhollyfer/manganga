import type * as React from 'react'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'

import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const STEP =
  'inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none'

/**
 * O campo de quantidade: menos, o número e mais.
 *
 * Botões e não `<input type="number">`: no celular o campo numérico abre o
 * teclado inteiro para trocar um 1 por um 2, e aceita digitar 999. O teto
 * vem de quem chama (o estoque, ou o limite por linha do carrinho), e o
 * número sai num `<output>` com `aria-live`, para o leitor de tela anunciar
 * a quantidade nova a cada toque.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  label,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max: number
  /** O nome do produto, para o botão dizer "menos uma camisa oficial". */
  label: string
  className?: string
}): React.JSX.Element {
  return (
    <div
      data-slot="quantity-stepper"
      role="group"
      aria-label={m.store_quantityOf({ name: label })}
      className={cn(
        'inline-flex h-12 items-center gap-1 rounded-sm border-2 border-ink/30 px-1',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={m.store_quantityDecrease()}
        className={STEP}
      >
        <MinusIcon weight="bold" className="size-4" />
      </button>
      <output
        aria-live="polite"
        className="min-w-8 text-center text-body font-semibold tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={m.store_quantityIncrease()}
        className={STEP}
      >
        <PlusIcon weight="bold" className="size-4" />
      </button>
    </div>
  )
}
