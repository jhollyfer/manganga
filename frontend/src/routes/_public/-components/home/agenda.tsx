import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { EventCard } from '../event-card'
import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import type { AgendaEvent } from '#/lib/events'
import { m } from '#/paraglide/messages'

/**
 * A programação, na folha verde: o título grande de um lado, a lista de
 * próximos eventos do outro, como a coluna de datas de um cartaz de festa.
 *
 * A lista vem do loader da home, que decide o "agora" no servidor: assim o
 * HTML e a hidratação concordam sobre o que já passou.
 */
export function Agenda({
  events,
}: {
  events: ReadonlyArray<AgendaEvent>
}): React.JSX.Element {
  return (
    <section data-slot="home-agenda" className="stage zigzag-y py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={REVEAL}>
          <p className="eyebrow mb-3 text-primary-glow">
            {m.home_agendaEyebrow()}
          </p>
          <h2 className="text-h1">
            {m.home_agendaTitleLead()} <em>{m.home_agendaTitleEm()}</em>
          </h2>
          <p className="mt-6 max-w-[40ch] text-body-lg text-on-stage/80">
            {m.home_agendaLead()}
          </p>
          <div className="mt-8">
            <SectionAction render={<Link to="/agenda" />}>
              {m.home_agendaCta()}
            </SectionAction>
          </div>
        </div>
        <ol className="border-b-2 border-current">
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
      </div>
    </section>
  )
}
