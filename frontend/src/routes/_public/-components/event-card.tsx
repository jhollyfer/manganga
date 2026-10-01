import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'

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
 * Uma linha da programação: a data, o título, onde e quando, separados por um
 * fio fino.
 *
 * Linha e não cartão: a programação se lê de cima para baixo, como lista, e
 * uma grade de cartões iguais é o desenho que qualquer gerador de site
 * entrega. A cor vem de quem envolve, então a mesma linha serve no papel e na
 * faixa verde.
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
        'group grid grid-cols-[4.5rem_1fr_auto] items-start gap-5 border-t border-border py-6 md:grid-cols-[7rem_1fr_14rem_auto] md:items-baseline md:gap-8',
        className,
      )}
    >
      <p className="leading-none">
        <span className="font-display text-5xl font-bold tabular-nums [font-stretch:72%] group-data-[type=festival]:text-primary-glow">
          {dayOfMonth(event.startsAt)}
        </span>{' '}
        <span className="mt-1 block text-small opacity-70 md:inline">
          {formatMonthShort(event.startsAt)}
        </span>
      </p>
      <div className="min-w-0">
        <h3 className="text-h4 transition-colors group-hover:text-primary-glow">
          {localized(event.title)}
        </h3>
        <p className="mt-1 text-small opacity-70">
          {EVENT_TYPE_LABELS[event.type]()}
        </p>
      </div>
      <p className="col-span-2 col-start-2 text-small opacity-70 md:col-span-1 md:col-start-auto">
        <span className="capitalize">{formatWeekday(event.startsAt)}</span>,{' '}
        {formatTime(event.startsAt)}
        <br />
        {event.location}
      </p>
      <ArrowRightIcon
        aria-hidden="true"
        className="col-start-3 row-start-1 size-5 self-center opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none md:col-start-4"
      />
    </Link>
  )
}
