import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { QUESTIONS } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

/**
 * O festival explicado para quem chega pela primeira vez: a pergunta em
 * corpo grande, a resposta curta embaixo, uma por linha.
 *
 * A faixa de urucum correndo com os números da festa saiu: letreiro rolando é
 * enfeite que ninguém lê, e os números moram na página do festival.
 */
export function Festival(): React.JSX.Element {
  return (
    <section
      data-slot="home-festival"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className={`${REVEAL} lg:col-span-4`}>
          <h2 className="text-h2">
            {m.home_festivalTitleLead()} <em>{m.home_festivalTitleEm()}</em>
          </h2>
          <p className="mt-6 max-w-[40ch] text-body-lg leading-relaxed text-muted-foreground">
            {m.home_festivalLead()}
          </p>
          <div className="mt-8">
            <SectionAction render={<Link to="/festival" />}>
              {m.home_festivalCta()}
            </SectionAction>
          </div>
        </div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {QUESTIONS.slice(0, 3).map((question, index) => (
            <li
              key={question.slug}
              className={`${REVEAL} border-b border-border first:border-t`}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <Link
                to="/festival"
                hash={question.slug}
                className="group grid grid-cols-[1fr_auto] items-start gap-6 py-7"
              >
                <span>
                  <span className="block font-display text-h3 font-bold [font-stretch:80%] transition-colors group-hover:text-primary-glow">
                    {localized(question.question)}
                  </span>
                  <span className="mt-3 line-clamp-2 block max-w-[60ch] text-body text-muted-foreground">
                    {localized(question.answer)}
                  </span>
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="mt-2 size-5 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
