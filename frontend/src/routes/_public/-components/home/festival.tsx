import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import { FESTIVAL_STATS, QUESTIONS } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

/**
 * O festival explicado em três perguntas, para quem chega pela primeira vez,
 * com os números da festa por cima.
 */
export function Festival(): React.JSX.Element {
  return (
    <section data-slot="home-festival" className="stage py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={m.home_festivalEyebrow()}
          title={
            <>
              {m.home_festivalTitleLead()} <em>{m.home_festivalTitleEm()}</em>.
            </>
          }
          lead={m.home_festivalLead()}
          action={
            <SectionAction render={<Link to="/festival" />}>
              {m.home_festivalCta()}
            </SectionAction>
          }
        />

        <dl className="mb-14 grid grid-cols-3 divide-x divide-on-stage/15 border-y border-on-stage/15 py-6">
          {FESTIVAL_STATS.map((stat) => (
            <div key={stat.value} className="px-3 text-center md:px-6">
              <dt className="sr-only">{localized(stat.label)}</dt>
              <dd className="font-display text-h2 text-brand-gold">
                {stat.value}
              </dd>
              <dd
                aria-hidden="true"
                className="mt-1 text-micro text-on-stage/60 md:text-small"
              >
                {localized(stat.label)}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="grid gap-4 md:grid-cols-3">
          {QUESTIONS.slice(0, 3).map((question, index) => (
            <li
              key={question.slug}
              className={REVEAL}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <Link
                to="/festival"
                hash={question.slug}
                className="group flex h-full flex-col rounded-2xl border border-on-stage/12 bg-on-stage/[0.03] p-6 transition-colors hover:border-brand-leaf/50"
              >
                <span className="font-display text-5xl text-brand-leaf">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-h4">{localized(question.question)}</h3>
                <p className="mt-3 line-clamp-3 flex-1 text-small leading-relaxed text-on-stage/65">
                  {localized(question.answer)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-small font-semibold">
                  {m.home_festivalCardCta()}
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
