import type * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import {
  AirplaneTiltIcon,
  BoatIcon,
  CurrencyCircleDollarIcon,
  GlobeHemisphereWestIcon,
  IdentificationCardIcon,
  SunIcon,
} from '@phosphor-icons/react'

import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { REVEAL, STAGGER } from './-components/reveal'
import { SectionHeading } from './-components/section-heading'
import { ROUTES } from '#/lib/festival'
import type { TravelRoute } from '#/lib/festival'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/visite')({
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

/**
 * Visite Benjamin Constant: como chegar e o que levar para a tríplice
 * fronteira. No Caprichoso esta página é um "em breve"; aqui ela já responde
 * as perguntas que a diretoria ouve todo ano pelo WhatsApp.
 */
function RouteComponent(): React.JSX.Element {
  const tips = [
    {
      icon: IdentificationCardIcon,
      title: m.visit_tipDocsTitle(),
      text: m.visit_tipDocsText(),
    },
    {
      icon: CurrencyCircleDollarIcon,
      title: m.visit_tipMoneyTitle(),
      text: m.visit_tipMoneyText(),
    },
    {
      icon: SunIcon,
      title: m.visit_tipWeatherTitle(),
      text: m.visit_tipWeatherText(),
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={m.nav_groupFestival()}
        title={
          <>
            {m.visit_heroTitleLead()} <em>{m.visit_heroTitleEm()}</em>.
          </>
        }
        lead={m.visit_pageLead()}
        cover={{ kind: 'art', art: 'rio' }}
        crumbs={[{ label: m.nav_groupFestival() }]}
      />

      <section className="py-20 md:py-28">
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
          />
          <ol className="grid gap-4 md:grid-cols-3">
            {ROUTES.map((travel, index) => {
              const Icon = ROUTE_ICONS[travel.key]

              return (
                <li
                  key={travel.key}
                  className={`${REVEAL} rounded-2xl border border-border bg-surface p-7`}
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
          </ol>
        </div>
      </section>

      <section className="stage py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow={m.visit_tipsEyebrow()}
            title={
              <>
                {m.visit_tipsTitleLead()} <em>{m.visit_tipsTitleEm()}</em>.
              </>
            }
            lead={m.visit_tipsLead()}
          />
          <ul className="grid gap-4">
            {tips.map((tip) => (
              <li
                key={tip.title}
                className="flex gap-4 rounded-2xl border border-on-stage/12 bg-on-stage/[0.04] p-6"
              >
                <tip.icon
                  aria-hidden="true"
                  className="size-7 shrink-0 text-brand-gold"
                />
                <div>
                  <h3 className="font-sans text-body-lg font-semibold">
                    {tip.title}
                  </h3>
                  <p className="mt-1 text-small leading-relaxed text-on-stage/70">
                    {tip.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-h2">{m.visit_ctaTitle()}</h2>
            <p className="mt-3 max-w-[60ch] text-body-lg text-muted-foreground">
              {m.visit_ctaText()}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PillButton
              render={<Link to="/agenda">{m.home_agendaCta()}</Link>}
            />
            <PillButton
              tone="outline"
              render={<Link to="/loja">{m.home_joinStoreCta()}</Link>}
            />
          </div>
        </div>
      </section>
    </>
  )
}
