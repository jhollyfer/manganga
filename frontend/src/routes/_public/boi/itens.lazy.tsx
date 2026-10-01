import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { FilterChip } from '../-components/filter-chip'
import { ItemCard } from '../-components/item-card'
import { PageHero } from '../-components/page-hero'
import { REVEAL, STAGGER } from '../-components/reveal'
import { ITEM_GROUPS } from '#/lib/entity'
import { ITEMS } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { SEASON_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/boi/itens')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/boi/itens')

function RouteComponent(): React.JSX.Element {
  const { grupo } = route.useSearch()
  const items = ITEMS.filter((item) => !grupo || item.group === grupo)

  return (
    <>
      <PageHero
        eyebrow={m.items_pageTitle({ year: SEASON_YEAR })}
        title={
          <>
            {m.items_heroTitleLead()} <em>{m.items_heroTitleEm()}</em>.
          </>
        }
        lead={m.items_pageLead()}
        cover={{ kind: 'photo', photo: 'festival', focus: '80% 50%' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <nav
            aria-label={m.items_filterLabel()}
            className="mb-10 flex flex-wrap gap-2"
          >
            <FilterChip
              active={!grupo}
              render={<Link to="." search={{}} resetScroll={false} />}
            >
              {m.items_filterAll()}
            </FilterChip>
            {ITEM_GROUPS.map((group) => (
              <FilterChip
                key={group}
                active={grupo === group}
                render={
                  <Link to="." search={{ grupo: group }} resetScroll={false} />
                }
              >
                {ITEM_GROUP_LABELS[group]()}
              </FilterChip>
            ))}
          </nav>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.slug}
                className={REVEAL}
                style={{ animationDelay: `${(index % 6) * STAGGER}ms` }}
              >
                <ItemCard item={item} className="bg-surface" />
              </li>
            ))}
          </ul>

          <p className="mt-14 max-w-[70ch] text-body text-muted-foreground">
            {m.items_note()}
          </p>
        </div>
      </section>
    </>
  )
}
