import * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { CoverImage } from '../-components/artwork'
import { FilterChip } from '../-components/filter-chip'
import { PageHero } from '../-components/page-hero'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { GALLERY, GALLERY_TAGS } from '#/lib/gallery'
import type { GalleryImage, GalleryTag } from '#/lib/gallery'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/boi/galeria')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/boi/galeria')

const TAG_LABELS: Record<GalleryTag, () => string> = {
  arena: () => m.gallery_tagArena(),
  curral: () => m.gallery_tagCurral(),
  comunidade: () => m.gallery_tagCommunity(),
}

/**
 * A galeria: o filtro por tema na URL, o mosaico e a imagem ampliada num
 * diálogo, com a legenda como título acessível.
 */
function RouteComponent(): React.JSX.Element {
  const { tag } = route.useSearch()
  const [open, setOpen] = React.useState<GalleryImage | null>(null)
  const images = GALLERY.filter((image) => !tag || image.tag === tag)

  return (
    <>
      <PageHero
        eyebrow={m.gallery_pageTitle()}
        title={m.home_galleryTitle()}
        lead={m.gallery_pageLead()}
        cover={{ kind: 'photo', photo: 'festival', focus: '50% 70%' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <nav
            aria-label={m.gallery_filterLabel()}
            className="mb-10 flex flex-wrap gap-2"
          >
            <FilterChip
              active={!tag}
              render={<Link to="." search={{}} resetScroll={false} />}
            >
              {m.gallery_tagAll()}
            </FilterChip>
            {GALLERY_TAGS.map((each) => (
              <FilterChip
                key={each}
                active={tag === each}
                render={
                  <Link to="." search={{ tag: each }} resetScroll={false} />
                }
              >
                {TAG_LABELS[each]()}
              </FilterChip>
            ))}
          </nav>

          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <li key={image.id} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(image)}
                  data-tall={index % 3 === 0}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm border-2 border-ink bg-stage text-left shadow-[5px_5px_0_0_var(--ink)] data-[tall=true]:aspect-[3/4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <CoverImage
                    cover={image.cover}
                    alt={localized(image.caption)}
                    className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink p-3 text-small text-background transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                    {localized(image.caption)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Dialog
        open={open !== null}
        onOpenChange={(next) => {
          if (!next) setOpen(null)
        }}
      >
        <DialogContent className="max-w-4xl overflow-hidden p-0 sm:max-w-4xl">
          {open && (
            <figure>
              <div className="aspect-[4/3] bg-stage">
                <CoverImage cover={open.cover} loading="eager" />
              </div>
              <figcaption className="p-5">
                <DialogTitle className="text-body font-semibold">
                  {localized(open.caption)}
                </DialogTitle>
                <DialogDescription className="mt-1 text-small">
                  {TAG_LABELS[open.tag]()}
                </DialogDescription>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
