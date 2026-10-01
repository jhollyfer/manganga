import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O convite final, em urucum de ponta a ponta: brincar no boi ou apoiar dos
 * bastidores. É o "Faça parte da nossa história" do site anterior, agora
 * ligado ao cadastro de verdade.
 */
export function Join(): React.JSX.Element {
  const paths = [
    { title: m.home_joinPerformTitle(), text: m.home_joinPerformText() },
    { title: m.home_joinSupportTitle(), text: m.home_joinSupportText() },
  ]

  return (
    <section
      data-slot="home-join"
      className="zigzag-top bg-brand-urucum pt-24 pb-28 text-brand-bone md:pt-32"
    >
      <div className="container-x grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className={REVEAL}>
          <p className="eyebrow mb-3 text-brand-gold">{m.home_joinEyebrow()}</p>
          <h2 className="text-display [&_em]:text-brand-gold">
            {m.home_joinTitleLead()} <em>{m.home_joinTitleEm()}</em>
          </h2>
          <p className="mt-8 max-w-[48ch] text-lead leading-snug text-brand-bone/90">
            {m.home_joinLead()}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton
              tone="light"
              className="border-brand-bone bg-brand-bone text-ink shadow-[4px_4px_0_0_var(--ink)] hover:bg-brand-bone hover:text-ink hover:shadow-[2px_2px_0_0_var(--ink)]"
              render={<Link to="/socio">{m.home_joinCta()}</Link>}
            />
            <PillButton
              tone="light-outline"
              className="border-brand-bone text-brand-bone hover:bg-brand-bone/10 hover:text-brand-bone"
              render={<Link to="/loja">{m.home_joinStoreCta()}</Link>}
            />
          </div>
        </div>
        <dl className={cn(REVEAL, 'grid gap-8 delay-150')}>
          {paths.map((path) => (
            <div
              key={path.title}
              className="border-t-2 border-brand-bone/60 pt-4"
            >
              <dt className="font-display text-h4 font-extrabold uppercase">
                {path.title}
              </dt>
              <dd className="mt-2 text-small leading-relaxed text-brand-bone/85">
                {path.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
