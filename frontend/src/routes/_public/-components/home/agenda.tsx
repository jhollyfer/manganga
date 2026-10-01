import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { EventCard } from '../event-card'
import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { useNow } from './use-now'
import { daysUntil, formatLongDate } from '#/lib/dates'
import type { AgendaEvent } from '#/lib/events'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A programação: o título, a contagem para o festival numa frase, e os
 * próximos eventos em linhas de largura inteira, como a tabela de horários
 * de uma revista de programação.
 *
 * A lista vem do loader da home, que decide o "agora" no servidor: assim o
 * HTML e a hidratação concordam sobre o que já passou.
 */
export function Agenda({
  events,
  festival,
}: {
  events: ReadonlyArray<AgendaEvent>
  festival: AgendaEvent | undefined
}): React.JSX.Element {
  return (
    <section
      data-slot="home-agenda"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="container-x">
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
          <h2 className={cn(REVEAL, 'text-h2 lg:col-span-6')}>
            {m.home_agendaTitleLead()} <em>{m.home_agendaTitleEm()}</em>
          </h2>
          {festival && <Countdown festival={festival} />}
        </div>
        <ol className="border-b border-border">
          {events.map((event, index) => (
            <li
              key={event.slug}
              className={REVEAL}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <EventCard event={event} />
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <SectionAction render={<Link to="/agenda" />}>
            {m.home_agendaCta()}
          </SectionAction>
        </div>
      </div>
    </section>
  )
}

/**
 * A contagem até a próxima noite de festival, numa frase e não num bloco de
 * número gigante com rótulo miúdo.
 *
 * A data vem do servidor e aparece já no primeiro quadro; o número de dias
 * depende do relógio de quem lê e entra depois da hidratação (`useNow`).
 */
function Countdown({ festival }: { festival: AgendaEvent }): React.JSX.Element {
  const now = useNow()
  let days = '…'
  if (now !== null) days = String(daysUntil(festival.startsAt, now))

  return (
    <p
      className={cn(
        REVEAL,
        'max-w-[42ch] text-body-lg leading-relaxed text-muted-foreground delay-100 lg:col-span-5 lg:col-start-8',
      )}
    >
      <Link
        to="/agenda/$slug"
        params={{ slug: festival.slug }}
        className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
      >
        {m.home_countdown({
          days,
          date: formatLongDate(festival.startsAt),
        })}
      </Link>
    </p>
  )
}
