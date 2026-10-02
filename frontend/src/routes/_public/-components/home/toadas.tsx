import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from '../artwork'
import { REVEAL } from '../reveal'
import { SectionAction } from '../section-heading'
import { localized } from '#/lib/i18n'
import { ALBUMS } from '#/lib/toadas'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * As toadas da temporada como encarte de disco: a capa (a foto do boi, em
 * quadrado) com o nome do álbum embaixo, e as faixas numeradas ao lado.
 *
 * Sem player embutido: o iframe do Spotify que o Caprichoso usa pesa mais que
 * a home inteira num 4G do Alto Solimões. A lista leva à página de toadas,
 * com as letras.
 */
export function Toadas(): React.JSX.Element | null {
  const album = ALBUMS.at(0)
  if (!album) return null

  return (
    <section data-slot="home-toadas" className="bg-secondary py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-start">
        <figure className={cn(REVEAL, 'lg:sticky lg:top-28 lg:col-span-5')}>
          <div className="aspect-square overflow-hidden bg-stage">
            <CoverImage cover={{ kind: 'art', art: 'estrela' }} />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4">
            <span className="font-display text-h4 font-bold [font-stretch:85%]">
              {album.title}
            </span>
            <span className="text-small text-muted-foreground tabular-nums">
              {album.year}
            </span>
          </figcaption>
          <p className="mt-2 max-w-[44ch] text-small text-muted-foreground">
            {localized(album.description)}
          </p>
        </figure>

        <div className={cn(REVEAL, 'delay-100 lg:col-span-6 lg:col-start-7')}>
          <h2 className="text-h2">
            {m.home_toadasTitleLead()} <em>{m.home_toadasTitleEm()}</em>
          </h2>
          <ol className="mt-10 border-b border-foreground/20">
            {album.tracks.map((track) => (
              <li key={track.number} className="border-t border-foreground/20">
                <Link
                  to="/boi/toadas"
                  hash={`faixa-${track.number}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-4"
                >
                  <span className="text-small text-muted-foreground tabular-nums">
                    {String(track.number).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-body-lg font-semibold transition-colors group-hover:text-primary-glow">
                      {track.title}
                    </span>
                    <span className="block text-small text-muted-foreground">
                      {track.composers}
                    </span>
                  </span>
                  {track.lyrics.length > 0 && (
                    <span className="text-micro text-muted-foreground">
                      {m.home_toadasHasLyrics()}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <SectionAction render={<Link to="/boi/toadas" />}>
              {m.home_toadasCta()}
            </SectionAction>
          </div>
        </div>
      </div>
    </section>
  )
}
