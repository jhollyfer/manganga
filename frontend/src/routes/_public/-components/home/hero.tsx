import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { Scene } from '#/components/common/scenery'
import { localized } from '#/lib/i18n'
import { SEASON_YEAR, SITE_TITLE } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O hero: a estrela do Besouro nascendo sobre a mata do Javari, de ponta a
 * ponta, e o nome do boi no céu.
 *
 * Cena desenhada e não foto: a foto que estava aqui era gerada por IA, e é a
 * primeira coisa que se vê. De dia (tema claro) o céu é claro e a letra é
 * tinta; à noite (tema escuro) é noite de festival, com estrelas, e a letra
 * clareia junto com o tema, sem véu escuro por cima de nada.
 *
 * Quatro coisas e não mais: rótulo, título, frase, ações.
 */
export function Hero(): React.JSX.Element {
  return (
    <section
      data-slot="home-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <Scene scene="estrela" className="absolute inset-0 -z-10" />

      <div className="container-x w-full pt-28 pb-[34vh] md:pt-36 md:pb-[30vh]">
        <p className={cn(REVEAL, 'eyebrow mb-4 text-muted-foreground')}>
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
        <p
          className={cn(
            REVEAL,
            'mt-6 max-w-[44ch] text-body-lg leading-relaxed text-muted-foreground delay-150',
          )}
        >
          {m.home_heroLead()}
        </p>
        <div className={cn(REVEAL, 'mt-8 flex flex-wrap gap-3 delay-200')}>
          <PillButton
            tone="ink"
            render={<Link to="/tema">{m.home_heroThemeCta()}</Link>}
          />
          <PillButton
            tone="outline"
            render={<Link to="/agenda">{m.home_heroAgendaCta()}</Link>}
          />
        </div>
      </div>
    </section>
  )
}
