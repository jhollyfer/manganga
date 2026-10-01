import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from '../artwork'
import { SectionAction, SectionHeading } from '../section-heading'
import { GALLERY } from '#/lib/gallery'
import { localized } from '#/lib/i18n'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A galeria como mural de fotos coladas: tamanhos diferentes, cada uma um
 * pouco torta, com a borda de tinta. O mosaico perfeito de quadrados iguais
 * foi a primeira versão, e é o que todo modelo de site desenha.
 */
const TILES: ReadonlyArray<string> = [
  'col-span-2 row-span-2 -rotate-1',
  'rotate-2',
  '-rotate-2',
  'col-span-2 md:col-span-1 rotate-1',
  '-rotate-1',
  'hidden md:block rotate-2',
]

export function Gallery(): React.JSX.Element {
  return (
    <section data-slot="home-gallery" className="bg-secondary py-24 md:py-32">
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
        <ul className="grid auto-rows-[9rem] grid-cols-2 gap-5 md:auto-rows-[12rem] md:grid-cols-4">
          {GALLERY.slice(0, TILES.length).map((image, index) => (
            <li
              key={image.id}
              className={cn(
                'group relative overflow-hidden rounded-sm border-2 border-ink bg-stage shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:rotate-0',
                TILES[index],
              )}
            >
              <CoverImage cover={image.cover} alt={localized(image.caption)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
