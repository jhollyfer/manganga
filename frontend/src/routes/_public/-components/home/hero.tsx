import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowDownIcon, CalendarDotsIcon } from '@phosphor-icons/react'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { Festoon } from './festoon'
import { useNow } from './use-now'
import { daysUntil, formatLongDate } from '#/lib/dates'
import type { AgendaEvent } from '#/lib/events'
import { localized } from '#/lib/i18n'
import { PHOTOS } from '#/lib/media'
import { SEASON_YEAR } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O hero da home: o palco inteiro, a foto do Besouro, o cordão de
 * bandeirinhas e o tema da temporada.
 *
 * O desenho do Caprichoso (palco em tela cheia, festão no alto, título do tema
 * e duas chamadas), com a foto do boi no lugar das camadas de ilustração. A
 * foto entra com `fetchPriority="high"` porque é o maior elemento da primeira
 * tela, e é ela que o LCP mede.
 */
export function Hero({
  festival,
}: {
  festival: AgendaEvent | undefined
}): React.JSX.Element {
  return (
    <section
      data-slot="home-hero"
      className="stage relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={PHOTOS.festival}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-[60%_30%] opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--stage)_0%,rgb(3_20_11/0.85)_38%,rgb(3_20_11/0.25)_75%,rgb(3_20_11/0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stage to-transparent" />
      </div>

      <Festoon className="pointer-events-none absolute inset-x-0 top-16 h-20 opacity-90 md:h-28" />

      <div className="container-x flex flex-1 flex-col justify-end pt-44 pb-14 md:justify-center md:pb-24">
        <div className="max-w-3xl">
          <p className={cn(REVEAL, 'eyebrow mb-6 text-primary-glow')}>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {m.home_heroEyebrow({ year: SEASON_YEAR })}
          </p>
          <h1
            className={cn(
              REVEAL,
              'text-display text-on-stage delay-75 [&_em]:text-primary-glow',
            )}
          >
            {m.home_heroTitleLead({ year: SEASON_YEAR })}{' '}
            <em>{localized(THEME.title)}</em>.
          </h1>
          <p
            className={cn(
              REVEAL,
              'mt-6 max-w-[52ch] text-lead leading-snug text-on-stage/80 delay-150',
            )}
          >
            {m.home_heroLead()}
          </p>
          <div className={cn(REVEAL, 'mt-10 flex flex-wrap gap-3 delay-200')}>
            <PillButton
              tone="light"
              render={<Link to="/tema">{m.home_heroThemeCta()}</Link>}
            />
            <PillButton
              tone="light-outline"
              render={
                <Link to="/agenda">
                  <CalendarDotsIcon />
                  {m.home_heroAgendaCta()}
                </Link>
              }
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <a
            href="#manifesto"
            className="inline-flex items-center gap-2 text-micro font-semibold tracking-[0.16em] text-on-stage/70 uppercase hover:text-on-stage"
          >
            <ArrowDownIcon className="size-4 animate-bounce motion-reduce:animate-none" />
            {m.home_heroScroll()}
          </a>
          {festival && <Countdown festival={festival} />}
        </div>
      </div>
    </section>
  )
}

/**
 * A contagem até a próxima noite de festival, no canto do hero.
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
      className="group flex items-center gap-4 rounded-2xl border border-on-stage/15 bg-stage/60 px-5 py-4 backdrop-blur-md transition-colors hover:border-brand-leaf/50"
    >
      <span className="font-display text-5xl leading-none text-brand-gold tabular-nums">
        {now !== null && daysUntil(festival.startsAt, now)}
        {now === null && '…'}
      </span>
      <span className="text-small leading-tight">
        <span className="block font-semibold">{m.home_countdownLabel()}</span>
        <span className="text-on-stage/65">
          {formatLongDate(festival.startsAt)}
        </span>
      </span>
    </Link>
  )
}
