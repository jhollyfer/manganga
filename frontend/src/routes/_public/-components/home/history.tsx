import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { MILESTONES } from '#/lib/history'
import { localized } from '#/lib/i18n'
import { FOUNDED_YEAR } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * A história em uma frase e uma régua: o ano de fundação em tamanho de
 * fachada, e os marcos numa linha do tempo horizontal com o fio de tinta
 * passando por todos, como a corda das bandeirinhas.
 */
export function History(): React.JSX.Element {
  return (
    <section
      data-slot="home-history"
      className="stage zigzag-y overflow-hidden py-24 md:py-32"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end">
          <p
            aria-hidden="true"
            className={`${REVEAL} font-display text-[clamp(7rem,24vw,20rem)] leading-[0.75] font-black text-primary-glow`}
          >
            {FOUNDED_YEAR}
          </p>
          <div className={`${REVEAL} delay-100`}>
            <p className="eyebrow mb-3 text-primary-glow">
              {m.home_historyEyebrow()}
            </p>
            <h2 className="text-h2">
              {m.home_historyTitleLead()} <em>{m.home_historyTitleEm()}</em>
            </h2>
            <p className="mt-6 max-w-[52ch] text-body-lg text-on-stage/80">
              {m.home_historyLead()}
            </p>
          </div>
        </div>

        <ol className="mt-20 grid gap-10 border-t-2 border-on-stage/40 pt-0 md:grid-cols-5 md:gap-6">
          {MILESTONES.map((milestone, index) => (
            <li
              key={localized(milestone.when)}
              className={`${REVEAL} relative pt-8`}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-[9px] left-0 size-4 rotate-45 bg-primary-glow"
              />
              <p className="font-display text-h3 text-on-stage">
                {localized(milestone.when)}
              </p>
              <h3 className="mt-2 font-sans text-body font-bold normal-case">
                {localized(milestone.title)}
              </h3>
              <p className="mt-1 text-small leading-relaxed text-on-stage/70">
                {localized(milestone.text)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <SectionAction render={<Link to="/boi/historia" />}>
            {m.home_historyCta()}
          </SectionAction>
        </div>
      </div>
    </section>
  )
}
