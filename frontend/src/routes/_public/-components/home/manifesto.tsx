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
 * O manifesto da temporada, logo abaixo do hero: o texto do tema ao lado da
 * imagem do boi, como a seção "Tema 2026" do Caprichoso.
 *
 * É o alvo do "role para descobrir" do hero (`#manifesto`), e o
 * `scroll-mt-16` desconta o cabeçalho fixo para o título não nascer coberto.
 */
export function Manifesto(): React.JSX.Element {
  const first = THEME.chapters.at(0)

  return (
    <section
      id="manifesto"
      data-slot="home-manifesto"
      className="scroll-mt-16 py-24 md:py-32"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className={REVEAL}>
          <p className="eyebrow mb-5 text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {m.home_manifestoEyebrow({ year: SEASON_YEAR })}
          </p>
          <h2 className="text-h2 [&_em]:text-primary">
            {m.home_manifestoTitleLead()} <em>{m.home_manifestoTitleEm()}</em>.
          </h2>
          <p className="mt-6 max-w-[56ch] text-body-lg leading-relaxed text-muted-foreground">
            {localized(THEME.lead)}
          </p>
          <blockquote className="mt-8 border-l-2 border-primary-glow pl-5 font-display text-h4 leading-snug text-foreground italic">
            {localized(THEME.closing)}
          </blockquote>
          <div className="mt-8">
            <SectionAction render={<Link to="/tema" />}>
              {m.home_manifestoCta()}
            </SectionAction>
          </div>
        </div>
        <div
          className={cn(
            REVEAL,
            'relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stage delay-150',
          )}
        >
          <CoverImage
            cover={{ kind: 'photo', photo: 'boi', focus: '50% 35%' }}
            alt={m.home_manifestoImageAlt()}
          />
          {first && (
            <span className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-micro font-semibold backdrop-blur">
              {localized(first.eyebrow)}: {localized(first.title)}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
