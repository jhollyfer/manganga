import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { localized } from '#/lib/i18n'
import { PHOTOS } from '#/lib/media'
import { SEASON_YEAR, SITE_TITLE } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O hero: a foto da festa de ponta a ponta, e o nome do boi sobre ela.
 *
 * A versão cartaz montava uma colagem (bandeirinhas desenhadas, selo girando,
 * recorte torto com sombra deslocada, canhoto de ingresso) e cada peça era um
 * enfeite a mais disputando o olho. Aqui a foto é o cartaz: o texto encosta
 * no canto de baixo, sobre um véu escuro que só existe para a letra ler, e o
 * hero tem quatro coisas e não mais (rótulo, título, frase, ações). A
 * contagem para o festival foi para a agenda, que é onde ela informa.
 *
 * A foto entra com `fetchPriority="high"` porque é ela que o LCP mede.
 */
export function Hero(): React.JSX.Element {
  return (
    <section
      data-slot="home-hero"
      className="stage relative isolate flex min-h-[100dvh] items-end overflow-hidden"
    >
      <img
        src={PHOTOS.festival}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[50%_35%]"
      />
      {/* Véu de leitura: escurece só a faixa de baixo, onde o texto mora. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(8_20_13/0.92)_0%,rgb(8_20_13/0.55)_45%,rgb(8_20_13/0.1)_75%)]"
      />

      <div className="container-x w-full pt-28 pb-14 md:pb-20">
        <p className={cn(REVEAL, 'eyebrow mb-4 text-on-stage/80')}>
          {m.home_heroEyebrow({ year: SEASON_YEAR })}
        </p>
        <h1 className={cn(REVEAL, 'delay-75')}>
          <span className="block text-display-xl uppercase [font-stretch:68%]">
            {SITE_TITLE}
          </span>
          <em className="mt-2 block pb-1 text-h2 leading-[1.05] font-semibold">
            {localized(THEME.title)}
          </em>
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className={cn(
              REVEAL,
              'max-w-[44ch] text-body-lg leading-relaxed text-on-stage/85 delay-150',
            )}
          >
            {m.home_heroLead()}
          </p>
          <div
            className={cn(REVEAL, 'flex shrink-0 flex-wrap gap-3 delay-200')}
          >
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
      </div>
    </section>
  )
}
