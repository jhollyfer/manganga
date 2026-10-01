import * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import {
  AirplaneTiltIcon,
  BoatIcon,
  GlobeHemisphereWestIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react'

import { FIELD } from './-components/form-style'
import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { REVEAL, STAGGER } from './-components/reveal'
import { SectionHeading } from './-components/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Input } from '#/components/ui/input'
import { ITEM_GROUPS } from '#/lib/entity'
import { FESTIVAL_STATS, GLOSSARY, QUESTIONS, ROUTES } from '#/lib/festival'
import type { TravelRoute } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { ITEMS } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { normalize } from '#/lib/store/listing'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/festival')({
  component: RouteComponent,
})

const ROUTE_ICONS: Record<
  TravelRoute['key'],
  React.ComponentType<{ className?: string }>
> = {
  plane: AirplaneTiltIcon,
  boat: BoatIcon,
  border: GlobeHemisphereWestIcon,
}

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
            {m.festival_heroTitleLead()} <em>{m.festival_heroTitleEm()}</em>.
          </>
        }
        lead={m.festival_pageLead()}
        cover={{ kind: 'art', art: 'bandeirinhas' }}
        crumbs={[{ label: m.nav_groupFestival() }]}
      />

      <nav
        aria-label={m.festival_navLabel()}
        className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur"
      >
        <ul className="container-x rail gap-1 py-2">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="inline-flex h-10 items-center rounded-full px-4 text-small font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
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
                  <em className="text-primary">{m.festival_aboutTitleEm()}</em>.
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
                className="flex items-baseline gap-4 rounded-2xl border border-border bg-surface p-6"
              >
                <dt className="sr-only">{localized(stat.label)}</dt>
                <dd className="font-display text-h1 text-primary">
                  {stat.value}
                </dd>
                <dd
                  aria-hidden="true"
                  className="text-body text-muted-foreground"
                >
                  {localized(stat.label)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="como-funciona" className="stage scroll-mt-32 py-20 md:py-28">
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
                  className="flex items-center justify-between rounded-2xl border border-on-stage/12 bg-on-stage/[0.04] px-5 py-4"
                >
                  <span className="font-semibold">
                    {ITEM_GROUP_LABELS[group]()}
                  </span>
                  <Link
                    to="/boi/itens"
                    search={{ grupo: group }}
                    className="text-small text-on-stage/70 underline underline-offset-4 hover:text-on-stage"
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
          <Accordion className="self-start rounded-2xl border border-on-stage/12">
            {QUESTIONS.map((question) => (
              <AccordionItem
                key={question.slug}
                value={question.slug}
                id={question.slug}
                className="scroll-mt-32 border-on-stage/12 px-5"
              >
                <AccordionTrigger className="py-5 text-body font-semibold text-on-stage hover:no-underline">
                  {localized(question.question)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-body leading-relaxed text-on-stage/70">
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
                <em className="text-primary">{m.festival_arriveTitleEm()}</em>.
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
          <ul className="grid gap-4 md:grid-cols-3">
            {ROUTES.map((travel, index) => {
              const Icon = ROUTE_ICONS[travel.key]

              return (
                <li
                  key={travel.key}
                  className={cn(
                    REVEAL,
                    'rounded-2xl border border-border bg-surface p-7',
                  )}
                  style={{ animationDelay: `${index * STAGGER}ms` }}
                >
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-6 font-sans text-h4 font-semibold">
                    {localized(travel.title)}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                    {localized(travel.text)}
                  </p>
                </li>
              )
            })}
          </ul>
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
              <em className="text-primary">{m.festival_glossaryTitleEm()}</em>.
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
                className="inline-flex size-9 items-center justify-center rounded-full text-small font-semibold text-muted-foreground hover:bg-background aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              >
                {each}
              </button>
            ))}
          </div>
        </div>

        {entries.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
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
