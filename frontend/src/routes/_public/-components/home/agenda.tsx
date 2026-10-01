import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { EventCard } from '../event-card'
import { REVEAL, STAGGER } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import type { AgendaEvent } from '#/lib/events'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * Os próximos eventos, sobre o palco. A lista vem do loader da home, que
 * decide o "agora" no servidor: assim o HTML e a hidratação concordam sobre o
 * que já passou.
 */
export function Agenda({
  events,
}: {
  events: ReadonlyArray<AgendaEvent>
}): React.JSX.Element {
  return (
    <section data-slot="home-agenda" className="stage py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={m.home_agendaEyebrow()}
          title={
            <>
              {m.home_agendaTitleLead()} <em>{m.home_agendaTitleEm()}</em>.
            </>
          }
          lead={m.home_agendaLead()}
          action={
            <SectionAction render={<Link to="/agenda" />}>
              {m.home_agendaCta()}
            </SectionAction>
          }
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <li
              key={event.slug}
              className={REVEAL}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <EventCard event={event} className={cn('h-full')} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
