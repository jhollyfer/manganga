import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import { MILESTONES } from '#/lib/history'
import { localized } from '#/lib/i18n'
import { FOUNDED_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * A história em três marcos, com a página completa a um clique: o "Do Reduto
 * do Esconde para o mundo" do Caprichoso, contado a partir do beco 50.
 */
export function History(): React.JSX.Element {
  const highlights = [MILESTONES[0], MILESTONES[2], MILESTONES.at(-1)].filter(
    (milestone) => milestone !== undefined,
  )

  return (
    <section
      data-slot="home-history"
      className="relative overflow-hidden bg-secondary py-24 md:py-32"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 font-display text-[clamp(10rem,28vw,24rem)] leading-none text-primary/[0.06] select-none"
      >
        {FOUNDED_YEAR}
      </span>
      <div className="container-x relative">
        <SectionHeading
          eyebrow={m.home_historyEyebrow()}
          title={
            <>
              {m.home_historyTitleLead()} <em>{m.home_historyTitleEm()}</em>.
            </>
          }
          lead={m.home_historyLead()}
        />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {highlights.map((milestone, index) => (
            <li
              key={localized(milestone.when)}
              className={`${REVEAL} bg-surface p-7`}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <p className="font-display text-h2 text-primary">
                {localized(milestone.when)}
              </p>
              <h3 className="mt-4 font-sans text-body-lg font-semibold">
                {localized(milestone.title)}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                {localized(milestone.text)}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <SectionAction render={<Link to="/boi/historia" />}>
            {m.home_historyCta()}
          </SectionAction>
        </div>
      </div>
    </section>
  )
}
