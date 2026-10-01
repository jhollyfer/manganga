import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { HandshakeIcon } from '@phosphor-icons/react'

import { PillButton } from '../pill-button'
import { SPONSORS } from '#/lib/sponsors'
import { m } from '#/paraglide/messages'

/**
 * Quem apoia o boi.
 *
 * Com apoiadores, a faixa corre em `marquee` (a lista duplicada é o que fecha
 * o laço sem salto). Sem apoiadores, que é o estado de hoje, a faixa vira o
 * convite para patrocinar, e nenhuma marca aparece sem acordo fechado.
 */
export function Sponsors(): React.JSX.Element {
  if (SPONSORS.length === 0) {
    return (
      <section
        data-slot="home-sponsors"
        className="border-y border-border py-14"
      >
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <HandshakeIcon className="size-6" />
            </span>
            <div>
              <p className="eyebrow mb-1 text-primary">
                {m.home_sponsorsEyebrow()}
              </p>
              <h2 className="text-h3">{m.home_sponsorsInviteTitle()}</h2>
              <p className="mt-2 max-w-[60ch] text-small text-muted-foreground">
                {m.home_sponsorsInviteLead()}
              </p>
            </div>
          </div>
          <PillButton
            tone="outline"
            render={
              <Link to="/contato" search={{ assunto: 'patrocinio' }}>
                {m.home_sponsorsInviteCta()}
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  return (
    <section
      data-slot="home-sponsors"
      aria-label={m.home_sponsorsEyebrow()}
      className="overflow-hidden border-y border-border py-10"
    >
      <ul className="marquee flex w-max gap-16 motion-reduce:animate-none">
        {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
          <li
            key={`${sponsor.name}-${index}`}
            aria-hidden={index >= SPONSORS.length}
            className="font-display text-h3 whitespace-nowrap text-muted-foreground"
          >
            {sponsor.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
