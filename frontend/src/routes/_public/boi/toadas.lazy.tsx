import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import { MusicNotesIcon, YoutubeLogoIcon } from '@phosphor-icons/react'

import { Artwork } from '../-components/artwork'
import { FilterChip } from '../-components/filter-chip'
import { PageHero } from '../-components/page-hero'
import { PillButton } from '../-components/pill-button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { localized } from '#/lib/i18n'
import { SOCIALS } from '#/lib/site'
import { ALBUMS } from '#/lib/toadas'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/boi/toadas')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/boi/toadas')

const YOUTUBE = SOCIALS.find((social) => social.name === 'YouTube')

/**
 * As toadas: o álbum escolhido com a capa, as faixas e as letras abertas uma
 * a uma, e a discografia por ano.
 *
 * Cada faixa tem âncora (`#faixa-3`), que é para onde a lista da home leva.
 * A letra fica num acordeão porque o álbum inteiro aberto vira uma página de
 * rolagem sem fim no celular.
 */
function RouteComponent(): React.JSX.Element | null {
  const { ano } = route.useSearch()
  const album = ALBUMS.find((each) => each.year === ano) ?? ALBUMS.at(0)
  if (!album) return null

  return (
    <>
      <PageHero
        eyebrow={m.toadas_pageTitle()}
        title={
          <>
            {m.toadas_heroTitleLead()} <em>{m.toadas_heroTitleEm()}</em>
          </>
        }
        lead={m.toadas_pageLead()}
        cover={{ kind: 'art', art: 'estrela' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      >
        {YOUTUBE && (
          <div className="mt-10">
            <PillButton
              tone="ink"
              render={
                <a
                  href={YOUTUBE.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeLogoIcon weight="fill" />
                  {m.toadas_listenCta()}
                </a>
              }
            />
          </div>
        )}
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <nav
            aria-label={m.toadas_discography()}
            className="mb-12 flex flex-wrap gap-2"
          >
            {ALBUMS.map((each) => (
              <FilterChip
                key={each.year}
                active={each.year === album.year}
                render={
                  <Link
                    to="."
                    search={{ ano: each.year }}
                    resetScroll={false}
                  />
                }
              >
                {each.year}
              </FilterChip>
            ))}
          </nav>

          <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="sticker relative aspect-square -rotate-2 overflow-hidden p-0">
                <Artwork art="estrela" />
                <span className="absolute top-0 left-0 bg-brand-gold px-3 py-1 font-display text-xl font-black text-ink">
                  {album.year}
                </span>
                <p className="absolute inset-x-5 bottom-5 font-display text-h3 font-extrabold text-brand-bone uppercase">
                  {album.title}
                </p>
              </div>
              <p className="mt-5 text-small leading-relaxed text-muted-foreground">
                {localized(album.description)}
              </p>
              <p className="mt-2 text-micro text-muted-foreground">
                {m.toadas_trackCount({ count: album.tracks.length })}
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-h2">
                {m.toadas_lyricsTitle({ year: album.year })}
              </h2>
              <Accordion className="border-t-4 border-ink">
                {album.tracks.map((track) => (
                  <AccordionItem
                    key={track.number}
                    value={String(track.number)}
                    id={`faixa-${track.number}`}
                    className="scroll-mt-24 border-b-2 border-ink/20"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <span className="flex items-center gap-4 text-left">
                        <span className="w-10 font-display text-3xl font-black text-primary-glow tabular-nums">
                          {track.number}
                        </span>
                        <span>
                          <span className="block font-display text-h4 font-extrabold uppercase">
                            {track.title}
                          </span>
                          <span className="block text-micro text-muted-foreground">
                            {track.composers}
                          </span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pl-14">
                      {track.lyrics.length > 0 && (
                        <div className="grid gap-6 font-serif text-h4 leading-snug whitespace-pre-line text-foreground italic">
                          {track.lyrics.map((stanza) => (
                            <p key={stanza}>{stanza}</p>
                          ))}
                        </div>
                      )}
                      {track.lyrics.length === 0 && (
                        <p className="flex items-center gap-2 text-small text-muted-foreground">
                          <MusicNotesIcon
                            aria-hidden="true"
                            className="size-4"
                          />
                          {m.toadas_noLyrics()}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
