import * as React from 'react'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { REVEAL } from './reveal'
import { cn } from '#/lib/utils'

type SectionHeadingProps = {
  /** O rótulo pequeno acima do título, em caixa alta. */
  eyebrow?: string
  /**
   * O título. Termina em ponto, como no Caprichoso, e a palavra que canta vai
   * em `<em>`, que a serifa desenha em itálico.
   */
  title: React.ReactNode
  lead?: React.ReactNode
  /** O "ver todos" à direita, já montado como link. */
  action?: React.ReactNode
  /** `h1` nas páginas internas, `h2` nas seções. */
  as?: 'h1' | 'h2'
  className?: string
}

/**
 * O topo de toda seção: rótulo, título em serifa, frase de apoio e o link de
 * "ver todos" alinhado à direita no desktop.
 *
 * A cor vem de quem envolve: sobre o palco o texto herda `text-on-stage`, no
 * papel herda `text-foreground`. O rótulo usa `text-primary-glow`, que lê bem
 * nos dois fundos.
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
      <div className={cn(REVEAL, 'max-w-3xl')}>
        {eyebrow && (
          <p className="eyebrow mb-4 text-primary-glow">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        )}
        <Tag className="text-h2 [&_em]:text-primary-glow">{title}</Tag>
        {lead && (
          <p className="mt-5 max-w-[56ch] text-body-lg leading-relaxed opacity-75">
            {lead}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

/** O "ver todos" do canto da seção, com a seta que anda no hover. */
export function SectionAction({
  children,
  render,
}: {
  children: React.ReactNode
  render: React.ReactElement<{ className?: string; children?: React.ReactNode }>
}): React.JSX.Element {
  const className =
    'group inline-flex shrink-0 items-center gap-2 text-small font-semibold text-current underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current'

  return React.cloneElement(
    render,
    { className },
    <>
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </>,
  )
}
