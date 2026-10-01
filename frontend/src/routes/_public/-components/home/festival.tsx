import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { FESTIVAL_STATS, QUESTIONS } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

/**
 * O festival explicado: a faixa de urucum correndo com os números da festa,
 * e as perguntas de quem chega pela primeira vez, uma por linha.
 *
 * Os números saem do bloco "número grande, rótulo pequeno" e vão para uma
 * faixa corrida, que é como a festa os anuncia no carro de som.
 */
export function Festival(): React.JSX.Element {
  const ticker = FESTIVAL_STATS.map(
    (stat) => `${stat.value} ${localized(stat.label)}`,
  )

  return (
    <section data-slot="home-festival" className="pb-24 md:pb-32">
      <div
        aria-label={ticker.join(', ')}
        role="img"
        className="-rotate-1 overflow-hidden border-y-2 border-ink bg-brand-urucum py-3 text-brand-bone"
      >
        <p
          aria-hidden="true"
          className="marquee flex w-max gap-10 font-display text-3xl font-extrabold whitespace-nowrap uppercase motion-reduce:animate-none md:text-4xl"
        >
          {[...ticker, ...ticker, ...ticker, ...ticker].map((item, index) => (
            <span key={index} className="flex items-center gap-10">
              {item}
              <span className="text-brand-gold">✦</span>
            </span>
          ))}
        </p>
      </div>

      <div className="container-x mt-24 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={REVEAL}>
          <p className="eyebrow mb-3 text-primary-glow">
            {m.home_festivalEyebrow()}
          </p>
          <h2 className="text-h2">
            {m.home_festivalTitleLead()} <em>{m.home_festivalTitleEm()}</em>
          </h2>
          <p className="mt-6 max-w-[46ch] text-body-lg text-muted-foreground">
            {m.home_festivalLead()}
          </p>
          <div className="mt-8">
            <SectionAction render={<Link to="/festival" />}>
              {m.home_festivalCta()}
            </SectionAction>
          </div>
        </div>
        <ol className="border-t-2 border-ink">
          {QUESTIONS.slice(0, 3).map((question, index) => (
            <li
              key={question.slug}
              className={`${REVEAL} border-b-2 border-ink`}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <Link
                to="/festival"
                hash={question.slug}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6"
              >
                <span className="font-serif text-h3 leading-none text-primary-glow italic">
                  {index + 1}.
                </span>
                <span>
                  <span className="block text-h4 font-display font-extrabold uppercase transition-colors group-hover:text-primary-glow">
                    {localized(question.question)}
                  </span>
                  <span className="mt-2 line-clamp-2 block text-small text-muted-foreground">
                    {localized(question.answer)}
                  </span>
                </span>
                <ArrowUpRightIcon
                  aria-hidden="true"
                  weight="bold"
                  className="mt-1 size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
