import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { REVEAL } from '../reveal'
import { SectionAction } from '../section-heading'
import { localized } from '#/lib/i18n'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O manifesto da temporada, logo abaixo do hero, só com texto.
 *
 * O hero já é a foto; aqui a palavra é o desenho. Título largo, a frase do
 * tema recuada para a coluna de leitura e o fechamento do manifesto em
 * corpo grande, como a abertura de uma reportagem de revista. A versão
 * anterior repetia a foto do boi presa com fita crepe, e a fita era enfeite.
 *
 * O `scroll-mt-16` desconta o cabeçalho fixo para quem chega por `#manifesto`.
 */
export function Manifesto(): React.JSX.Element {
  return (
    <section
      id="manifesto"
      data-slot="home-manifesto"
      className="scroll-mt-16 py-24 md:py-40"
    >
      <div className="container-x grid gap-10 md:grid-cols-12">
        <h2 className={cn(REVEAL, 'text-h1 md:col-span-10 lg:col-span-8')}>
          {m.home_manifestoTitleLead()} <em>{m.home_manifestoTitleEm()}</em>
        </h2>
        <div className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-6">
          <p
            className={cn(
              REVEAL,
              'text-lead leading-snug text-muted-foreground delay-100',
            )}
          >
            {localized(THEME.lead)}
          </p>
          <blockquote
            className={cn(
              REVEAL,
              'mt-12 border-l border-primary pl-6 text-h4 leading-snug font-medium [font-stretch:100%] delay-150',
            )}
          >
            “{localized(THEME.closing)}”
          </blockquote>
          <div className="mt-12">
            <SectionAction render={<Link to="/tema" />}>
              {m.home_manifestoCta()}
            </SectionAction>
          </div>
        </div>
      </div>
    </section>
  )
}
