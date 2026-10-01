import type * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { MusicNotesIcon, SparkleIcon, TrophyIcon } from '@phosphor-icons/react'

import { CoverImage } from '../-components/artwork'
import { PageHero } from '../-components/page-hero'
import { REVEAL, STAGGER } from '../-components/reveal'
import { SectionHeading } from '../-components/section-heading'
import { MILESTONES, PILLARS } from '#/lib/history'
import type { Pillar } from '#/lib/history'
import { localized } from '#/lib/i18n'
import { FOUNDED_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/boi/historia')({
  component: RouteComponent,
})

const PILLAR_ICONS: Record<
  Pillar['key'],
  React.ComponentType<{ className?: string }>
> = {
  marujada: MusicNotesIcon,
  champion: TrophyIcon,
  trilogy: SparkleIcon,
}

/**
 * A história: o fundador e o boi do alagado, a linha do tempo com os marcos
 * e os três pilares da tradição. É a página "História" do Caprichoso no
 * tamanho do que o Mangangá já publicou sobre si.
 */
function RouteComponent(): React.JSX.Element {
  const years = new Date().getFullYear() - FOUNDED_YEAR

  return (
    <>
      <PageHero
        eyebrow={m.history_pageEyebrow({ year: FOUNDED_YEAR })}
        title={
          <>
            {m.history_heroTitleLead()} <em>{m.history_heroTitleEm()}</em>.
          </>
        }
        lead={m.history_pageLead()}
        cover={{ kind: 'photo', photo: 'boi', focus: '50% 35%' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div
            className={`${REVEAL} relative aspect-square overflow-hidden rounded-[2rem] bg-stage`}
          >
            <CoverImage
              cover={{ kind: 'photo', photo: 'boi', focus: '50% 40%' }}
              alt={m.home_manifestoImageAlt()}
            />
          </div>
          <div className={REVEAL}>
            <p className="eyebrow mb-4 text-primary">
              {m.history_founderEyebrow()}
            </p>
            <h2 className="text-h2">
              {m.history_founderTitleLead()}{' '}
              <em className="text-primary">{m.history_founderTitleEm()}</em>.
            </h2>
            <div className="mt-6 grid gap-4 text-body-lg leading-relaxed text-muted-foreground">
              <p>{m.history_founderP1()}</p>
              <p>{m.history_founderP2()}</p>
              <p>{m.history_founderP3()}</p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border p-5">
                <dt className="text-small text-muted-foreground">
                  {m.history_statFounded()}
                </dt>
                <dd className="font-display text-h2 text-primary">
                  {FOUNDED_YEAR}
                </dd>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <dt className="text-small text-muted-foreground">
                  {m.history_statYears()}
                </dt>
                <dd className="font-display text-h2 text-primary">{years}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="stage py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={m.history_timelineEyebrow()}
            title={
              <>
                {m.history_timelineTitleLead()}{' '}
                <em>{m.history_timelineTitleEm()}</em>.
              </>
            }
          />
          <ol className="relative grid gap-10 border-l border-on-stage/15 pl-8 md:pl-12">
            {MILESTONES.map((milestone, index) => (
              <li
                key={localized(milestone.when)}
                className={`${REVEAL} relative`}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-brand-leaf ring-4 ring-stage md:-left-[calc(3rem+5px)]"
                />
                <p className="font-display text-h2 text-brand-gold">
                  {localized(milestone.when)}
                </p>
                <h3 className="mt-2 font-sans text-h4 font-semibold">
                  {localized(milestone.title)}
                </h3>
                <p className="mt-2 max-w-[60ch] text-body text-on-stage/70">
                  {localized(milestone.text)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={m.history_pillarsEyebrow()}
            title={
              <>
                {m.history_pillarsTitleLead()}{' '}
                <em className="text-primary">{m.history_pillarsTitleEm()}</em>.
              </>
            }
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[pillar.key]

              return (
                <li
                  key={pillar.key}
                  className={`${REVEAL} rounded-2xl border border-border bg-surface p-7`}
                  style={{ animationDelay: `${index * STAGGER}ms` }}
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-sans text-h4 font-semibold">
                    {localized(pillar.title)}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                    {localized(pillar.text)}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
