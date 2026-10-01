import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowDownIcon } from '@phosphor-icons/react'

import { CoverImage } from '../artwork'
import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { Festoon } from './festoon'
import { Stamp } from './stamp'
import { useNow } from './use-now'
import { daysUntil, formatLongDate } from '#/lib/dates'
import type { AgendaEvent } from '#/lib/events'
import { localized } from '#/lib/i18n'
import { FOUNDED_YEAR, SEASON_YEAR, SITE_TITLE } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O hero: o cartaz do arraial inteiro.
 *
 * O nome do boi de ponta a ponta em letra de cartaz, o tema escrito à mão por
 * baixo, a foto do Besouro colada como recorte torto com o carimbo de
 * "desde 1992" no canto, e a contagem como canhoto de ingresso. A primeira
 * versão era foto esmaecida em tela cheia com texto por cima, que é o hero de
 * qualquer site; um cartaz se monta por colagem.
 *
 * A foto entra com `fetchPriority="high"` porque é ela que o LCP mede junto
 * com o título.
 */
export function Hero({
  festival,
}: {
  festival: AgendaEvent | undefined
}): React.JSX.Element {
  return (
    <section
      data-slot="home-hero"
      className="stage zigzag-bottom relative overflow-hidden"
    >
      <Festoon className="pointer-events-none absolute inset-x-0 top-16 h-16 md:h-24" />

      <div className="container-x grid gap-12 pt-36 pb-16 md:pt-44 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pb-24">
        <div>
          <p className={cn(REVEAL, 'eyebrow mb-5 text-primary-glow')}>
            {m.home_heroEyebrow({ year: SEASON_YEAR })}
          </p>
          <h1 className={cn(REVEAL, 'delay-75')}>
            <span className="block text-display-xl text-on-stage">
              {SITE_TITLE}
            </span>
            <em className="mt-3 block text-h2 leading-[0.95]">
              {localized(THEME.title)}
            </em>
          </h1>
          <p
            className={cn(
              REVEAL,
              'mt-8 max-w-[46ch] text-lead leading-snug text-on-stage/85 delay-150',
            )}
          >
            {m.home_heroLead()}
          </p>
          <div className={cn(REVEAL, 'mt-10 flex flex-wrap gap-4 delay-200')}>
            <PillButton
              tone="light"
              render={<Link to="/tema">{m.home_heroThemeCta()}</Link>}
            />
            <PillButton
              tone="light-outline"
              render={<Link to="/agenda">{m.home_heroAgendaCta()}</Link>}
            />
          </div>
        </div>

        <div
          className={cn(REVEAL, 'relative mx-auto w-full max-w-md delay-150')}
        >
          <div className="aspect-[4/5] -rotate-2 overflow-hidden rounded-sm border-2 border-on-stage shadow-[10px_10px_0_0_var(--primary-glow)]">
            <CoverImage
              cover={{ kind: 'photo', photo: 'festival', focus: '50% 30%' }}
              alt={m.home_manifestoImageAlt()}
              loading="eager"
            />
          </div>
          <Stamp
            text={m.home_heroStamp({ year: FOUNDED_YEAR })}
            className="absolute -top-10 -left-8 size-32 md:size-36"
          />
          {festival && <Countdown festival={festival} />}
        </div>
      </div>

      <a
        href="#manifesto"
        className="container-x mb-6 flex items-center gap-2 text-micro font-bold tracking-[0.14em] text-on-stage/75 uppercase hover:text-primary-glow"
      >
        <ArrowDownIcon className="size-4" weight="bold" />
        {m.home_heroScroll()}
      </a>
    </section>
  )
}

/**
 * A contagem até a próxima noite de festival, como canhoto de ingresso preso
 * na foto.
 *
 * A data vem do servidor e aparece já no primeiro quadro; o número de dias
 * depende do relógio de quem lê e entra depois da hidratação (`useNow`).
 */
function Countdown({ festival }: { festival: AgendaEvent }): React.JSX.Element {
  const now = useNow()

  return (
    <Link
      to="/agenda/$slug"
      params={{ slug: festival.slug }}
      className="absolute -right-3 -bottom-8 flex rotate-3 items-stretch rounded-sm bg-brand-urucum text-brand-bone shadow-[6px_6px_0_0_var(--ink)] transition-transform hover:rotate-0 md:-right-8"
    >
      <span className="flex items-center border-r-2 border-dashed border-brand-bone/60 px-4 font-display text-6xl leading-none font-black tabular-nums">
        {now !== null && daysUntil(festival.startsAt, now)}
        {now === null && '…'}
      </span>
      <span className="flex flex-col justify-center px-4 py-3 leading-tight">
        <span className="text-micro font-bold tracking-[0.12em] uppercase">
          {m.home_countdownLabel()}
        </span>
        <span className="mt-0.5 font-serif text-body-lg italic">
          {formatLongDate(festival.startsAt)}
        </span>
      </span>
    </Link>
  )
}
