import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { HeartIcon, UsersThreeIcon } from '@phosphor-icons/react'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O convite final: brincar no boi ou apoiar dos bastidores. É o "Faça parte
 * da nossa história" do site anterior, agora ligado ao cadastro de verdade.
 */
export function Join(): React.JSX.Element {
  const paths = [
    {
      icon: UsersThreeIcon,
      title: m.home_joinPerformTitle(),
      text: m.home_joinPerformText(),
    },
    {
      icon: HeartIcon,
      title: m.home_joinSupportTitle(),
      text: m.home_joinSupportText(),
    },
  ]

  return (
    <section data-slot="home-join" className="py-24 md:py-32">
      <div className="container-x">
        <div className="stage relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className={REVEAL}>
              <p className="eyebrow mb-5 text-primary-glow">
                {m.home_joinEyebrow()}
              </p>
              <h2 className="text-h1 [&_em]:text-primary-glow">
                {m.home_joinTitleLead()} <em>{m.home_joinTitleEm()}</em>.
              </h2>
              <p className="mt-6 max-w-[50ch] text-body-lg text-on-stage/75">
                {m.home_joinLead()}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PillButton
                  tone="light"
                  render={<Link to="/socio">{m.home_joinCta()}</Link>}
                />
                <PillButton
                  tone="light-outline"
                  render={<Link to="/loja">{m.home_joinStoreCta()}</Link>}
                />
              </div>
            </div>
            <ul className={cn(REVEAL, 'grid gap-4 delay-150')}>
              {paths.map((path) => (
                <li
                  key={path.title}
                  className="flex gap-4 rounded-2xl border border-on-stage/12 bg-on-stage/[0.04] p-5"
                >
                  <path.icon
                    aria-hidden="true"
                    className="size-7 shrink-0 text-brand-gold"
                  />
                  <div>
                    <h3 className="font-sans text-body-lg font-semibold">
                      {path.title}
                    </h3>
                    <p className="mt-1 text-small leading-relaxed text-on-stage/65">
                      {path.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
