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
          <PillButton
            tone="light"
            render={<a href="#manifesto">{m.theme_readCta()}</a>}
          />
        </div>
      </PageHero>

      <div id="manifesto" className="scroll-mt-16">
        {THEME.chapters.map((chapter, index) => (
          <section
            key={chapter.numeral}
            data-flip={index % 2 === 1}
            className="group py-20 odd:bg-background even:bg-secondary md:py-28"
          >
            <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div
                className={cn(
                  REVEAL,
                  'relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stage md:group-data-[flip=true]:order-2',
                )}
              >
                <CoverImage cover={chapter.cover} />
                <span className="absolute bottom-4 left-5 font-display text-[6rem] leading-none text-on-stage/80">
                  {chapter.numeral}
                </span>
              </div>
              <div className={cn(REVEAL, 'delay-100')}>
                <p className="eyebrow mb-4 text-primary">
                  {localized(chapter.eyebrow)}
                </p>
                <h2 className="text-h2">{localized(chapter.title)}.</h2>
                <p className="mt-6 text-body-lg leading-relaxed text-muted-foreground">
                  {localized(chapter.text)}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="stage py-24 md:py-32">
        <div className="container-x max-w-4xl text-center">
          <p className="font-display text-h2 leading-tight italic">
            {localized(THEME.closing)}
          </p>
        </div>
        <ul className="container-x mt-16 grid gap-4 md:grid-cols-3">
          {next.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full flex-col rounded-2xl border border-on-stage/12 bg-on-stage/[0.04] p-6 transition-colors hover:border-brand-leaf/50"
              >
                <span className="text-h4">{item.label}</span>
                <span className="mt-2 flex-1 text-small text-on-stage/65">
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
