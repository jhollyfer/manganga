import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from '../artwork'
import { SectionAction, SectionHeading } from '../section-heading'
import { GALLERY } from '#/lib/gallery'
import { localized } from '#/lib/i18n'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O mosaico da galeria: a primeira imagem ocupa dois por dois, as outras
 * preenchem em volta. "Bumbódromo. Curral. Comunidade.", como no Caprichoso,
 * com o nosso curral no lugar.
 */
const TILE: ReadonlyArray<string> = [
  'col-span-2 row-span-2',
  '',
  '',
  'col-span-2 md:col-span-1',
  '',
  'hidden md:block',
]

export function Gallery(): React.JSX.Element {
  return (
    <section data-slot="home-gallery" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={m.home_galleryEyebrow()}
          title={m.home_galleryTitle()}
          action={
            <SectionAction render={<Link to="/boi/galeria" />}>
              {m.home_galleryCta()}
            </SectionAction>
          }
        />
        <ul className="grid auto-rows-[9rem] grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4">
          {GALLERY.slice(0, TILE.length).map((image, index) => (
            <li
              key={image.id}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-stage',
                TILE[index],
              )}
            >
              <CoverImage
                cover={image.cover}
                alt={localized(image.caption)}
                className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05] motion-reduce:transition-none"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
