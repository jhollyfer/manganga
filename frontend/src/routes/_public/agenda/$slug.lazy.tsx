import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import {
  CalendarPlusIcon,
  ClockIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'

import { EventCard } from '../-components/event-card'
import { PageHero } from '../-components/page-hero'
import { PillButton } from '../-components/pill-button'
import { NotFoundPage } from '#/components/common/not-found-page'
import { formatLongDate, formatTime, formatWeekday } from '#/lib/dates'
import { eventBySlug, upcomingEvents } from '#/lib/events'
import { buildIcs } from '#/lib/ics'
import { localized, localizedUrl } from '#/lib/i18n'
import { EVENT_TYPE_LABELS } from '#/lib/labels'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/agenda/$slug')({
  component: RouteComponent,
  notFoundComponent: () => <NotFoundPage className="min-h-[80dvh]" />,
})

const route = getRouteApi('/_public/agenda/$slug')

function RouteComponent(): React.JSX.Element | null {
  const { slug, now } = route.useLoaderData()
  const event = eventBySlug(slug)
  if (!event) return null

  const url = localizedUrl('/agenda/'.concat(event.slug))
  const ics = buildIcs({
    uid: `${event.slug}@manganga`,
    title: localized(event.title),
    description: localized(event.summary),
    location: event.location,
    startsAt: event.startsAt,
    url,
  })
  const share = `https://wa.me/?text=${encodeURIComponent(`${localized(event.title)} ${url}`)}`
  const others = upcomingEvents(now)
    .filter((each) => each.slug !== event.slug)
    .slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow={EVENT_TYPE_LABELS[event.type]()}
        title={localized(event.title)}
        lead={localized(event.summary)}
        cover={{ kind: 'art', art: 'bandeirinhas' }}
        crumbs={[{ label: m.nav_agenda(), to: '/agenda' }]}
      >
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-body font-semibold">
          <li className="flex items-center gap-2">
            <ClockIcon
              aria-hidden="true"
              className="size-5 text-primary-glow"
            />
            <span className="capitalize">{formatWeekday(event.startsAt)}</span>,{' '}
            {formatLongDate(event.startsAt)}, {formatTime(event.startsAt)}
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon
              aria-hidden="true"
              className="size-5 text-primary-glow"
            />
            {event.location}
          </li>
        </ul>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-5 text-body-lg leading-relaxed text-muted-foreground">
            {event.description.map((paragraph) => (
              <p key={localized(paragraph)}>{localized(paragraph)}</p>
            ))}
          </div>
          <aside className="sticker grid content-start gap-4 p-6">
            <PillButton
              render={
                <a
                  href={`data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`}
                  download={`${event.slug}.ics`}
                >
                  <CalendarPlusIcon />
                  {m.agenda_addToCalendar()}
                </a>
              }
            />
            <PillButton
              tone="outline"
              render={
                <a href={share} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogoIcon />
                  {m.agenda_share()}
                </a>
              }
            />
            <Link
              to="/agenda"
              className="mt-2 text-center text-small text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {m.agenda_backToList()}
            </Link>
          </aside>
        </div>

        {others.length > 0 && (
          <div className="container-x mt-20">
            <h2 className="mb-6 text-h3">{m.agenda_more()}</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {others.map((each) => (
                <li key={each.slug}>
                  <EventCard event={each} className="h-full bg-surface" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}
