import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from '../artwork'
import { REVEAL } from '../reveal'
import { SectionAction } from '../section-heading'
import { localized } from '#/lib/i18n'
import { SEASON_YEAR } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O manifesto da temporada, logo abaixo do hero: o retrato do boi preso com
 * fita crepe, e o texto do tema com a frase de fechamento escrita à mão.
 *
 * É o alvo do "role para descobrir" do hero (`#manifesto`), e o
 * `scroll-mt-16` desconta o cabeçalho fixo para o título não nascer coberto.
 */
export function Manifesto(): React.JSX.Element {
  return (
    <section
      id="manifesto"
      data-slot="home-manifesto"
      className="scroll-mt-16 py-24 md:py-36"
    >
      <div className="container-x grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <figure className={cn(REVEAL, 'relative mx-auto w-full max-w-sm')}>
          <div className="sticker aspect-[4/5] rotate-[-3deg] overflow-hidden p-0">
            <CoverImage
              cover={{ kind: 'photo', photo: 'boi', focus: '50% 35%' }}
              alt={m.home_manifestoImageAlt()}
            />
          </div>
          {/* As duas tiras de fita que prendem o retrato no papel. */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-8 h-7 w-24 -rotate-6 bg-brand-gold/70"
          />
          <span
            aria-hidden="true"
            className="absolute right-6 -bottom-3 h-7 w-24 rotate-[8deg] bg-brand-gold/70"
          />
        </figure>

        <div className={cn(REVEAL, 'delay-100')}>
          <p className="eyebrow mb-3 text-primary-glow">
            {m.home_manifestoEyebrow({ year: SEASON_YEAR })}
          </p>
          <h2 className="text-h2">
            {m.home_manifestoTitleLead()} <em>{m.home_manifestoTitleEm()}</em>
          </h2>
          <p className="mt-8 max-w-[52ch] text-body-lg leading-relaxed text-muted-foreground">
            {localized(THEME.lead)}
          </p>
          <p className="mt-10 font-serif text-h3 leading-[1.08] text-primary italic">
            “{localized(THEME.closing)}”
          </p>
          <div className="mt-10">
            <SectionAction render={<Link to="/tema" />}>
              {m.home_manifestoCta()}
            </SectionAction>
          </div>
        </div>
      </div>
    </section>
  )
}
