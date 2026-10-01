import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import {
  dayOfMonth,
  formatMonthShort,
  formatTime,
  formatWeekday,
} from '#/lib/dates'
import type { AgendaEvent } from '#/lib/events'
import { localized } from '#/lib/i18n'
import { EVENT_TYPE_LABELS } from '#/lib/labels'
import { cn } from '#/lib/utils'

/**
 * Uma linha da programação, como no cartaz do arraial: o dia grande à
 * esquerda, o tipo, o título e onde e quando, separados por um fio de tinta.
 *
 * Linha e não cartão: a programação de festa se lê de cima para baixo, como
 * lista, e uma grade de cartões iguais é o desenho que qualquer gerador de
 * site entrega. A cor vem de quem envolve, então a mesma linha serve no papel
 * e na folha verde.
 *
 * A linha inteira é o link, com o título como nome acessível.
 */
export function EventCard({
  event,
  className,
}: {
  event: AgendaEvent
  className?: string
}): React.JSX.Element {
  return (
    <Link
      to="/agenda/$slug"
      params={{ slug: event.slug }}
      data-slot="event-card"
      data-type={event.type}
      className={cn(
        'group grid grid-cols-[4.5rem_1fr] gap-5 border-t-2 border-current py-5',
        className,
      )}
    >
      <div className="leading-none">
        <span className="block font-display text-6xl font-black group-data-[type=festival]:text-primary-glow">
          {dayOfMonth(event.startsAt)}
        </span>
        <span className="mt-1 block text-micro font-bold tracking-[0.14em] uppercase opacity-75">
          {formatMonthShort(event.startsAt)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="eyebrow mb-1.5 text-primary-glow">
          {EVENT_TYPE_LABELS[event.type]()}
        </p>
        <h3 className="text-h4 transition-colors group-hover:text-primary-glow">
          {localized(event.title)}
        </h3>
        <p className="mt-2 text-small opacity-75">
          <span className="capitalize">{formatWeekday(event.startsAt)}</span>,{' '}
          {formatTime(event.startsAt)} · {event.location}
        </p>
      </div>
    </Link>
  )
}
