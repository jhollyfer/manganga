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
        cover={{ kind: 'art', art: 'estrela' }}
        crumbs={[{ label: m.nav_groupBoi() }]}
      >
        <div className="mt-10">
          <PillButton render={<a href="#manifesto">{m.theme_readCta()}</a>} />
        </div>
      </PageHero>

      {/*
        Os capítulos em duas colunas desencontradas, a da direita descida meia
        altura, como páginas de revista abertas. A versão anterior alternava
        foto e texto de um lado e do outro, quatro vezes seguidas, e o
        zigue-zague repetido é o desenho de página gerada em série.
      */}
      <div id="manifesto" className="scroll-mt-16 py-20 md:py-28">
        <ol className="container-x grid gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
          {THEME.chapters.map((chapter, index) => (
            <li
              key={chapter.numeral}
              data-offset={index % 2 === 1}
              className={cn(REVEAL, 'md:data-[offset=true]:mt-32')}
            >
              <article>
                <div className="aspect-[3/2] overflow-hidden bg-stage">
                  <CoverImage cover={chapter.cover} />
                </div>
                <p className="mt-6 text-small text-muted-foreground">
                  {localized(chapter.eyebrow)}
                </p>
                <h2 className="mt-2 text-h2">{localized(chapter.title)}</h2>
                <p className="mt-4 max-w-[56ch] text-body-lg leading-relaxed text-muted-foreground">
                  {localized(chapter.text)}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>

      <section className="band py-24 md:py-32">
        <div className="container-x max-w-5xl">
          <p className="font-display font-semibold text-h2 leading-[1.05]">
            “{localized(THEME.closing)}”
          </p>
        </div>
        <ul className="container-x mt-20 grid border-t border-on-stage/40 md:grid-cols-3">
          {next.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex h-full flex-col border-b border-on-stage/40 py-6 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-display text-h3 font-bold transition-colors group-hover:text-primary-glow">
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
