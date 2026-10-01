import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ClockIcon, MapPinIcon } from '@phosphor-icons/react'

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
 * O cartão de um evento: o selo do calendário à esquerda, o tipo, o título e
 * onde e quando.
 *
 * Usado pela home (sobre o palco) e pela agenda (sobre o papel), e por isso a
 * cor vem de quem envolve: o cartão só desenha borda e fundo translúcidos
 * sobre `currentColor`.
 *
 * O cartão inteiro é o link, com o título como nome acessível, e não um
 * "saiba mais" solto no canto.
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
        'group flex gap-5 rounded-2xl border border-current/12 bg-current/[0.03] p-5 transition-colors hover:border-primary-glow/60 hover:bg-current/[0.06]',
        className,
      )}
    >
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary py-3 text-primary-foreground group-data-[type=festival]:bg-brand-urucum group-data-[type=festival]:text-white">
        <span className="font-display text-4xl leading-none">
          {dayOfMonth(event.startsAt)}
        </span>
        <span className="mt-1 text-micro font-semibold uppercase">
          {formatMonthShort(event.startsAt)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="eyebrow mb-2 text-primary-glow">
          {EVENT_TYPE_LABELS[event.type]()}
        </p>
        <h3 className="font-sans text-body-lg leading-snug font-semibold">
          {localized(event.title)}
        </h3>
        <ul className="mt-3 grid gap-1 text-small opacity-70">
          <li className="flex items-center gap-1.5">
            <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="capitalize">
              {formatWeekday(event.startsAt)}
            </span>, {formatTime(event.startsAt)}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPinIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{event.location}</span>
          </li>
        </ul>
      </div>
    </Link>
  )
}
