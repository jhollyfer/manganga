import type * as React from 'react'

import { REVEAL, STAGGER } from './reveal'
import { ROUTES } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { cn } from '#/lib/utils'

/**
 * Os caminhos até Benjamin Constant, como as colunas de um guia impresso:
 * número, destino e o texto, separados por fio de tinta. Usado pela página do
 * festival e pelo guia do visitante.
 */
export function TravelRoutes({
  className,
}: {
  className?: string
}): React.JSX.Element {
  return (
    <ol className={cn('grid border-t-4 border-ink md:grid-cols-3', className)}>
      {ROUTES.map((travel, index) => (
        <li
          key={travel.key}
          className={cn(
            REVEAL,
            'border-b-2 border-ink/20 py-8 md:border-r-2 md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0',
          )}
          style={{ animationDelay: `${index * STAGGER}ms` }}
        >
          <span className="font-serif text-h2 leading-none text-primary-glow italic">
            {index + 1}.
          </span>
          <h3 className="mt-4 text-h3">{localized(travel.title)}</h3>
          <p className="mt-3 text-body leading-relaxed text-muted-foreground">
            {localized(travel.text)}
          </p>
        </li>
      ))}
    </ol>
  )
}
