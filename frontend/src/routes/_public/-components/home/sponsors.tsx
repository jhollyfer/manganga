import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { SectionAction } from '../section-heading'
import { SPONSORS } from '#/lib/sponsors'
import { m } from '#/paraglide/messages'

/**
 * Quem apoia o boi.
 *
 * Com apoiadores, os nomes correm em `marquee` (a lista duplicada fecha o laço
 * sem salto). Sem apoiadores, que é o estado de hoje, a faixa vira o convite
 * para patrocinar, e nenhuma marca aparece sem acordo fechado.
 */
export function Sponsors(): React.JSX.Element {
  if (SPONSORS.length === 0) {
    return (
      <section data-slot="home-sponsors" className="py-20">
        <div className="container-x grid gap-6 border-y-2 border-ink py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow mb-2 text-primary-glow">
              {m.home_sponsorsEyebrow()}
            </p>
            <h2 className="text-h3">{m.home_sponsorsInviteTitle()}</h2>
            <p className="mt-3 max-w-[64ch] text-body text-muted-foreground">
              {m.home_sponsorsInviteLead()}
            </p>
          </div>
          <SectionAction
            render={<Link to="/contato" search={{ assunto: 'patrocinio' }} />}
          >
            {m.home_sponsorsInviteCta()}
          </SectionAction>
        </div>
      </section>
    )
  }

  return (
    <section
      data-slot="home-sponsors"
      aria-label={m.home_sponsorsEyebrow()}
      className="overflow-hidden border-y-2 border-ink py-10"
    >
      <ul className="marquee flex w-max gap-16 motion-reduce:animate-none">
        {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
          <li
            key={`${sponsor.name}-${index}`}
            aria-hidden={index >= SPONSORS.length}
            className="font-display text-h3 whitespace-nowrap uppercase"
          >
            {sponsor.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
