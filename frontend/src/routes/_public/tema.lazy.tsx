import type * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { CoverImage } from './-components/artwork'
import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { REVEAL } from './-components/reveal'
import { localized } from '#/lib/i18n'
import { SEASON_YEAR } from '#/lib/site'
import { THEME } from '#/lib/theme'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/tema')({
  component: RouteComponent,
})

/**
 * O manifesto em capítulos, como a página do tema do Caprichoso: hero, os
 * capítulos alternando imagem e texto, a frase de fechamento e os caminhos
 * para itens, toadas e agenda.
 */
function RouteComponent(): React.JSX.Element {
  const next = [
    {
      to: '/boi/itens',
      label: m.theme_nextItems(),
      text: m.theme_nextItemsText(),
    },
    {
      to: '/boi/toadas',
      label: m.theme_nextToadas(),
      text: m.theme_nextToadasText(),
    },
    {
      to: '/agenda',
      label: m.theme_nextAgenda(),
      text: m.theme_nextAgendaText(),
    },
  ] as const

  return (
    <>
      <PageHero
        eyebrow={m.theme_pageTitle({ year: SEASON_YEAR })}
        title={localized(THEME.title)}
        lead={localized(THEME.lead)}
        cover={{ kind: 'photo', photo: 'festival', focus: '50% 30%' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      >
        <div className="mt-10">
          <PillButton render={<a href="#manifesto">{m.theme_readCta()}</a>} />
        </div>
      </PageHero>

      <div id="manifesto" className="scroll-mt-16">
        {THEME.chapters.map((chapter, index) => (
          <section
            key={chapter.numeral}
            data-flip={index % 2 === 1}
            className="group border-b-2 border-ink/15 py-20 md:py-28"
          >
            <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div
                className={cn(
                  REVEAL,
                  'sticker relative aspect-[4/3] -rotate-1 overflow-hidden p-0 md:group-data-[flip=true]:order-2 md:group-data-[flip=true]:rotate-1',
                )}
              >
                <CoverImage cover={chapter.cover} />
                <span className="absolute bottom-0 left-0 bg-ink px-4 py-1 font-display text-5xl font-black text-background">
                  {chapter.numeral}
                </span>
              </div>
              <div className={cn(REVEAL, 'delay-100')}>
                <p className="eyebrow mb-4 text-primary">
                  {localized(chapter.eyebrow)}
                </p>
                <h2 className="text-h1">{localized(chapter.title)}</h2>
                <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
                  {localized(chapter.text)}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="stage zigzag-top py-24 md:py-32">
        <div className="container-x max-w-5xl">
          <p className="font-serif text-h2 leading-[1.05] normal-case italic">
            “{localized(THEME.closing)}”
          </p>
        </div>
        <ul className="container-x mt-20 grid border-t-2 border-on-stage/40 md:grid-cols-3">
          {next.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full flex-col border-b-2 border-on-stage/40 py-6 md:border-r-2 md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-display text-h3 font-extrabold uppercase transition-colors group-hover:text-primary-glow">
                  {item.label}
                </span>
                <span className="mt-2 flex-1 text-small opacity-75">
                  {item.text}
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="mt-6 size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
