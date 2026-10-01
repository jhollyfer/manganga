import * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { FIELD } from './-components/form-style'
import { PageHero } from './-components/page-hero'
import { TravelRoutes } from './-components/travel-routes'
import { PillButton } from './-components/pill-button'
import { REVEAL } from './-components/reveal'
import { SectionHeading } from './-components/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Input } from '#/components/ui/input'
import { ITEM_GROUPS } from '#/lib/entity'
import { FESTIVAL_STATS, GLOSSARY, QUESTIONS } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { ITEMS } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { normalize } from '#/lib/store/listing'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/festival')({
  component: RouteComponent,
})

function RouteComponent(): React.JSX.Element {
  const sections = [
    { id: 'o-festival', label: m.festival_navAbout() },
    { id: 'como-funciona', label: m.festival_navHow() },
    { id: 'como-chegar', label: m.festival_navArrive() },
    { id: 'glossario', label: m.festival_navGlossary() },
  ]

  return (
    <>
      <PageHero
        eyebrow={m.nav_groupFestival()}
        title={
          <>
            {m.festival_heroTitleLead()} <em>{m.festival_heroTitleEm()}</em>
          </>
        }
        lead={m.festival_pageLead()}
        cover={{ kind: 'art', art: 'bandeirinhas' }}
        crumbs={[{ label: m.nav_groupFestival() }]}
      />

      <nav
        aria-label={m.festival_navLabel()}
        className="sticky top-16 z-30 border-b border-foreground bg-background"
      >
        <ul className="container-x rail gap-1 py-2">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="inline-flex h-10 items-center px-3 text-micro font-bold hover:text-primary-glow"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="o-festival" className="scroll-mt-32 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className={REVEAL}>
            <SectionHeading
              className="mb-6 md:mb-6"
              eyebrow={m.festival_aboutEyebrow()}
              title={
                <>
                  {m.festival_aboutTitleLead()}{' '}
                  <em>{m.festival_aboutTitleEm()}</em>
                </>
              }
            />
            <div className="grid gap-4 text-body-lg leading-relaxed text-muted-foreground">
              <p>{m.festival_aboutP1()}</p>
              <p>{m.festival_aboutP2()}</p>
            </div>
          </div>
          <dl className="grid content-start gap-4">
            {FESTIVAL_STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex items-baseline gap-4 border-b border-foreground/20 py-4 first:border-t first:border-t-ink"
              >
                <dt className="sr-only">{localized(stat.label)}</dt>
                <dd className="w-36 shrink-0 font-display text-h1 text-primary-glow">
                  {stat.value}
                </dd>
                <dd
                  aria-hidden="true"
                  className="font-display font-semibold text-h4"
                >
                  {localized(stat.label)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="como-funciona" className="band scroll-mt-32 py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={m.festival_howEyebrow()}
              title={
                <>
                  {m.festival_howTitleLead()} <em>{m.festival_howTitleEm()}</em>
                  .
                </>
              }
              lead={m.festival_howLead()}
            />
            <ul className="grid gap-3">
              {ITEM_GROUPS.map((group) => (
                <li
                  key={group}
                  className="flex items-center justify-between border-b border-on-stage/30 py-4 first:border-t"
                >
                  <span className="font-semibold">
                    {ITEM_GROUP_LABELS[group]()}
                  </span>
                  <Link
                    to="/boi/itens"
                    search={{ grupo: group }}
                    className="text-micro font-bold underline decoration-2 underline-offset-4 hover:text-primary-glow"
                  >
                    {m.festival_howItems({
                      count: ITEMS.filter((item) => item.group === group)
                        .length,
                    })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Accordion className="self-start border-t border-on-stage/40">
            {QUESTIONS.map((question) => (
              <AccordionItem
                key={question.slug}
                value={question.slug}
                id={question.slug}
                className="scroll-mt-32 border-b border-on-stage/40"
              >
                <AccordionTrigger className="py-5 font-display text-h4 font-bold text-on-stage hover:no-underline">
                  {localized(question.question)}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-body leading-relaxed text-on-stage/80">
                  {localized(question.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="como-chegar" className="scroll-mt-32 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={m.festival_arriveEyebrow()}
            title={
              <>
                {m.festival_arriveTitleLead()}{' '}
                <em>{m.festival_arriveTitleEm()}</em>
              </>
            }
            lead={m.festival_arriveLead()}
            action={
              <PillButton
                tone="outline"
                render={<Link to="/visite">{m.festival_arriveCta()}</Link>}
              />
            }
          />
          <TravelRoutes />
        </div>
      </section>

      <Glossary />
    </>
  )
}

/**
 * O glossário, com busca e índice de letras.
 *
 * Busca em estado local e não na URL: é filtro de leitura, que ninguém
 * compartilha, e escrever na URL a cada tecla encheria o histórico do
 * navegador.
 */
function Glossary(): React.JSX.Element {
  const [query, setQuery] = React.useState('')
  const [letter, setLetter] = React.useState<string | null>(null)

  const letters = [
    ...new Set(
      GLOSSARY.map((entry) => normalize(entry.term).charAt(0).toUpperCase()),
    ),
  ]

  const entries = GLOSSARY.filter((entry) => {
    const term = normalize(entry.term)
    if (letter && term.charAt(0).toUpperCase() !== letter) return false
    if (!query) return true

    const needle = normalize(query)

    return (
      term.includes(needle) ||
      normalize(localized(entry.definition)).includes(needle)
    )
  })

  return (
    <section
      id="glossario"
      className="scroll-mt-32 bg-secondary py-20 md:py-28"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={m.festival_glossaryEyebrow()}
          title={
            <>
              {m.festival_glossaryTitleLead()}{' '}
              <em>{m.festival_glossaryTitleEm()}</em>
            </>
          }
        />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-sm">
            <span className="sr-only">{m.festival_glossarySearch()}</span>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={m.festival_glossarySearch()}
              className={cn(FIELD, 'pl-10')}
            />
          </label>
          <div
            role="group"
            aria-label={m.festival_glossaryLetters()}
            className="flex flex-wrap gap-1"
          >
            {letters.map((each) => (
              <button
                key={each}
                type="button"
                aria-pressed={letter === each}
                onClick={() => {
                  if (letter === each) {
                    setLetter(null)
                    return
                  }
                  setLetter(each)
                }}
                className="inline-flex size-9 items-center justify-center rounded-sm font-display text-xl font-bold hover:text-primary-glow aria-pressed:bg-ink aria-pressed:text-background"
              >
                {each}
              </button>
            ))}
          </div>
        </div>

        {entries.length === 0 && (
          <p className="border border-dashed border-border p-10 font-display font-semibold text-h4 text-muted-foreground">
            {m.festival_glossaryEmpty()}
          </p>
        )}
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.term} className="border-t border-border pt-5">
              <dt className="font-display text-h4">{entry.term}</dt>
              <dd className="mt-1 text-body leading-relaxed text-muted-foreground">
                {localized(entry.definition)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
