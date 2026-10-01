import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import { CalendarXIcon } from '@phosphor-icons/react'

import { EventCard } from '../-components/event-card'
import { FilterChip } from '../-components/filter-chip'
import { PageHero } from '../-components/page-hero'
import { PillButton } from '../-components/pill-button'
import { formatMonthYear, monthKey } from '#/lib/dates'
import { EVENT_TYPES } from '#/lib/entity'
import { nextFestivalNight, pastEvents, upcomingEvents } from '#/lib/events'
import type { AgendaEvent } from '#/lib/events'
import { localized } from '#/lib/i18n'
import { EVENT_TYPE_LABELS } from '#/lib/labels'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/agenda/')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/agenda/')

/** Agrupa os eventos pelo mês do texto ISO, mantendo a ordem recebida. */
function byMonth(
  events: ReadonlyArray<AgendaEvent>,
): Array<[string, Array<AgendaEvent>]> {
  const groups = new Map<string, Array<AgendaEvent>>()

  for (const event of events) {
    const key = monthKey(event.startsAt)
    groups.set(key, [...(groups.get(key) ?? []), event])
  }

  return [...groups.entries()]
}

/**
 * A agenda do boi: o destaque do festival, os filtros por tipo e período, e
 * os eventos agrupados por mês.
 */
function RouteComponent(): React.JSX.Element {
  const { now } = route.useLoaderData()
  const { tipo, periodo } = route.useSearch()

  let source = upcomingEvents(now)
  if (periodo === 'passados') source = pastEvents(now)

  const events = source.filter((event) => !tipo || event.type === tipo)
  const festival = nextFestivalNight(now)

  return (
    <>
      <PageHero
        eyebrow={m.nav_agenda()}
        title={
          <>
            {m.home_agendaTitleLead()} <em>{m.home_agendaTitleEm()}</em>.
          </>
        }
        lead={m.home_agendaLead()}
        cover={{ kind: 'art', art: 'fogueira' }}
        crumbs={[{ label: m.nav_groupFestival() }]}
      >
        {festival && (
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-on-stage/15 bg-on-stage/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow mb-1 text-brand-gold">
                {m.agenda_featuredEyebrow()}
              </p>
              <p className="text-body-lg font-semibold">
                {localized(festival.title)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PillButton
                tone="light"
                scale="md"
                render={
                  <Link to="/agenda/$slug" params={{ slug: festival.slug }}>
                    {m.agenda_featuredCta()}
                  </Link>
                }
              />
              <PillButton
                tone="light-outline"
                scale="md"
                render={<Link to="/visite">{m.nav_visit()}</Link>}
              />
            </div>
          </div>
        )}
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav
              aria-label={m.agenda_filterType()}
              className="flex flex-wrap gap-2"
            >
              <FilterChip
                active={!tipo}
                render={
                  <Link to="." search={{ periodo }} resetScroll={false} />
                }
              >
                {m.agenda_filterAll()}
              </FilterChip>
              {EVENT_TYPES.map((type) => (
                <FilterChip
                  key={type}
                  active={tipo === type}
                  render={
                    <Link
                      to="."
                      search={{ tipo: type, periodo }}
                      resetScroll={false}
                    />
                  }
                >
                  {EVENT_TYPE_LABELS[type]()}
                </FilterChip>
              ))}
            </nav>
            <nav
              aria-label={m.agenda_filterPeriod()}
              className="flex gap-1 rounded-full bg-secondary p-1"
            >
              <FilterChip
                active={periodo !== 'passados'}
                render={<Link to="." search={{ tipo }} resetScroll={false} />}
              >
                {m.agenda_upcoming()}
              </FilterChip>
              <FilterChip
                active={periodo === 'passados'}
                render={
                  <Link
                    to="."
                    search={{ tipo, periodo: 'passados' }}
                    resetScroll={false}
                  />
                }
              >
                {m.agenda_past()}
              </FilterChip>
            </nav>
          </div>

          {events.length === 0 && (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
              <CalendarXIcon className="size-10 text-muted-foreground" />
              <p className="mt-4 text-body-lg font-semibold">
                {m.agenda_emptyTitle()}
              </p>
              <p className="mt-1 text-small text-muted-foreground">
                {m.agenda_emptyText()}
              </p>
            </div>
          )}

          <div className="grid gap-14">
            {byMonth(events).map(([month, list]) => {
              const first = list.at(0)

              return (
                <section key={month} aria-labelledby={`mes-${month}`}>
                  <h2 id={`mes-${month}`} className="mb-5 text-h3 capitalize">
                    {first && formatMonthYear(first.startsAt)}
                  </h2>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {list.map((event) => (
                      <li key={event.slug}>
                        <EventCard
                          event={event}
                          className="h-full bg-surface"
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
