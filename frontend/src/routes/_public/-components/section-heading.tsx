import * as React from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { REVEAL } from './reveal'
import { cn } from '#/lib/utils'

type SectionHeadingProps = {
  /** O rótulo pequeno acima do título, em caixa alta. */
  eyebrow?: string
  /** O título em letra de cartaz. A palavra que canta vai em `<em>`. */
  title: React.ReactNode
  lead?: React.ReactNode
  /** O "ver todos" à direita, já montado como link. */
  action?: React.ReactNode
  /** `h1` nas páginas internas, `h2` nas seções. */
  as?: 'h1' | 'h2'
  className?: string
}

/**
 * O topo de uma seção: rótulo, título de cartaz, frase de apoio e o "ver
 * todos" encostado na base do título.
 *
 * Não é obrigatório. Seção que se explica pelo próprio conteúdo (a lista de
 * faixas, o calendário) entra sem ele: o mesmo cabeçalho em toda seção é o
 * que faz uma página parecer gerada em série.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  as: Tag = 'h2',
  className,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div
      data-slot="section-heading"
      className={cn(
        'mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn(REVEAL, 'max-w-4xl')}>
        {eyebrow && <p className="eyebrow mb-3 text-primary-glow">{eyebrow}</p>}
        <Tag className="text-h2">{title}</Tag>
        {lead && (
          <p className="mt-5 max-w-[54ch] text-body-lg leading-relaxed opacity-80">
            {lead}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

/** O "ver todos" do canto da seção: texto em caixa alta com a seta. */
export function SectionAction({
  children,
  render,
}: {
  children: React.ReactNode
  render: React.ReactElement<{ className?: string; children?: React.ReactNode }>
}): React.JSX.Element {
  const className =
    'group inline-flex shrink-0 items-center gap-2 border-b-2 border-current pb-1 text-micro font-bold tracking-[0.12em] uppercase transition-colors hover:text-primary-glow'

  return React.cloneElement(
    render,
    { className },
    <>
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        weight="bold"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </>,
  )
}
