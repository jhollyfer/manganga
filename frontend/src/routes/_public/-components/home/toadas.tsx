import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { Artwork } from '../artwork'
import { REVEAL } from '../reveal'
import { SectionAction } from '../section-heading'
import { localized } from '#/lib/i18n'
import { ALBUMS } from '#/lib/toadas'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * As toadas da temporada como contracapa de disco: a capa colada de um lado,
 * a lista de faixas do outro, numerada e com fio pontilhado entre elas.
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
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className={cn(REVEAL, 'lg:sticky lg:top-28')}>
          <p className="eyebrow mb-3 text-primary-glow">
            {m.home_toadasEyebrow()}
          </p>
          <h2 className="text-h2">
            {m.home_toadasTitleLead()} <em>{m.home_toadasTitleEm()}</em>
          </h2>
          <div className="sticker mt-10 aspect-square w-64 rotate-[-4deg] overflow-hidden p-0 md:w-72">
            <div className="relative size-full">
              <Artwork art="estrela" />
              <p className="absolute inset-x-4 bottom-4 font-display text-3xl leading-[0.9] font-extrabold text-brand-bone uppercase">
                {album.title}
              </p>
              <p className="absolute top-3 right-4 font-display text-xl font-bold text-brand-gold">
                {album.year}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-[40ch] text-small text-muted-foreground">
            {localized(album.description)}
          </p>
        </div>

        <div className={cn(REVEAL, 'delay-100')}>
          <ol>
            {album.tracks.map((track) => (
              <li
                key={track.number}
                className="border-b-2 border-dashed border-ink/25"
              >
                <Link
                  to="/boi/toadas"
                  hash={`faixa-${track.number}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5"
                >
                  <span className="font-display text-3xl font-black text-primary-glow tabular-nums">
                    {String(track.number).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-h4 font-extrabold uppercase transition-colors group-hover:text-primary-glow">
                      {track.title}
                    </span>
                    <span className="mt-1 block text-small text-muted-foreground">
                      {track.composers}
                    </span>
                  </span>
                  {track.lyrics.length > 0 && (
                    <span className="font-serif text-body text-primary italic">
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
