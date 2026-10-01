import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { MusicNotesIcon, PlayIcon } from '@phosphor-icons/react'

import { Artwork } from '../artwork'
import { REVEAL } from '../reveal'
import { SectionAction, SectionHeading } from '../section-heading'
import { localized } from '#/lib/i18n'
import { ALBUMS } from '#/lib/toadas'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * As toadas da temporada: a capa do álbum e a lista de faixas.
 *
 * Sem player embutido: o Caprichoso usa o iframe do Spotify, que pesa mais que
 * a home inteira num 4G do Alto Solimões. A lista leva à página de toadas, com
 * as letras, e de lá para as plataformas.
 */
export function Toadas(): React.JSX.Element | null {
  const album = ALBUMS.at(0)
  if (!album) return null

  return (
    <section data-slot="home-toadas" className="stage py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className={REVEAL}>
          <SectionHeading
            className="mb-8 md:mb-8"
            eyebrow={m.home_toadasEyebrow()}
            title={
              <>
                {m.home_toadasTitleLead()} <em>{m.home_toadasTitleEm()}</em>.
              </>
            }
            lead={localized(album.description)}
          />
          <SectionAction render={<Link to="/boi/toadas" />}>
            {m.home_toadasCta()}
          </SectionAction>
        </div>

        <div
          className={cn(
            REVEAL,
            'grid gap-6 rounded-[2rem] border border-on-stage/10 bg-on-stage/[0.04] p-5 delay-150 sm:grid-cols-[180px_1fr] sm:p-6',
          )}
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Artwork art="estrela" />
            <span className="absolute inset-x-3 bottom-3 font-display text-xl leading-tight italic">
              {album.title}
            </span>
          </div>
          <ol className="grid content-start gap-1">
            {album.tracks.map((track) => (
              <li key={track.number}>
                <Link
                  to="/boi/toadas"
                  hash={`faixa-${track.number}`}
                  className="group flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-on-stage/[0.06]"
                >
                  <span className="w-5 text-right text-small text-on-stage/50 tabular-nums group-hover:hidden">
                    {track.number}
                  </span>
                  <PlayIcon
                    weight="fill"
                    aria-hidden="true"
                    className="hidden size-5 text-brand-leaf group-hover:block"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">
                      {track.title}
                    </span>
                    <span className="block truncate text-micro text-on-stage/55">
                      {track.composers}
                    </span>
                  </span>
                  {track.lyrics.length > 0 && (
                    <MusicNotesIcon
                      aria-label={m.home_toadasHasLyrics()}
                      className="size-4 text-on-stage/45"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
