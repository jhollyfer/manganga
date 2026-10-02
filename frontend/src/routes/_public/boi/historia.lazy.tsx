import type * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

import { CoverImage } from '../-components/artwork'
import { PageHero } from '../-components/page-hero'
import { REVEAL, STAGGER } from '../-components/reveal'
import { SectionHeading } from '../-components/section-heading'
import { MILESTONES, PILLARS } from '#/lib/history'
import { localized } from '#/lib/i18n'
import { FOUNDED_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/boi/historia')({
  component: RouteComponent,
})

/**
 * A história: o fundador e o boi do alagado, a linha do tempo na folha verde
 * e os três pilares da tradição como colunas de jornal, numeradas à mão.
 */
function RouteComponent(): React.JSX.Element {
  const years = new Date().getFullYear() - FOUNDED_YEAR

  return (
    <>
      <PageHero
        eyebrow={m.history_pageEyebrow({ year: FOUNDED_YEAR })}
        title={
          <>
            {m.history_heroTitleLead()} <em>{m.history_heroTitleEm()}</em>
          </>
        }
        lead={m.history_pageLead()}
        cover={{ kind: 'art', art: 'rio' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div
            className={`${REVEAL} sticker relative mx-auto aspect-square w-full max-w-md overflow-hidden p-0`}
          >
            <CoverImage cover={{ kind: 'art', art: 'tambor' }} />
          </div>
          <div className={REVEAL}>
            <p className="eyebrow mb-3 text-primary-glow">
              {m.history_founderEyebrow()}
            </p>
            <h2 className="text-h2">
              {m.history_founderTitleLead()}{' '}
              <em>{m.history_founderTitleEm()}</em>
            </h2>
            <div className="mt-8 grid gap-4 text-body-lg leading-relaxed text-muted-foreground">
              <p>{m.history_founderP1()}</p>
              <p>{m.history_founderP2()}</p>
              <p>{m.history_founderP3()}</p>
            </div>
            <p className="mt-10 border-t border-foreground pt-5 font-display font-semibold text-h4 text-primary">
              {m.history_statFounded()} {FOUNDED_YEAR}. {years}{' '}
              {m.history_statYears()}.
            </p>
          </div>
        </div>
      </section>

      <section className="band py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={m.history_timelineEyebrow()}
            title={
              <>
                {m.history_timelineTitleLead()}{' '}
                <em>{m.history_timelineTitleEm()}</em>
              </>
            }
          />
          <ol className="relative grid gap-12 border-l border-on-stage/30 pl-8 md:pl-12">
            {MILESTONES.map((milestone, index) => (
              <li
                key={localized(milestone.when)}
                className={`${REVEAL} relative`}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <p className="font-display text-h2 text-primary-glow tabular-nums">
                  {localized(milestone.when)}
                </p>
                <h3 className="mt-2 font-sans text-h4 font-bold normal-case">
                  {localized(milestone.title)}
                </h3>
                <p className="mt-2 max-w-[60ch] text-body opacity-80">
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
                <em>{m.history_pillarsTitleEm()}</em>
              </>
            }
          />
          <ol className="grid border-t border-foreground md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <li
                key={pillar.key}
                className={`${REVEAL} border-b border-foreground/20 py-8 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0`}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <span className="font-display font-semibold text-h2 leading-none text-primary-glow">
                  {index + 1}.
                </span>
                <h3 className="mt-4 text-h3">{localized(pillar.title)}</h3>
                <p className="mt-3 text-body leading-relaxed text-muted-foreground">
                  {localized(pillar.text)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
