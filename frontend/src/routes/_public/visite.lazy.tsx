import type * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { REVEAL, STAGGER } from './-components/reveal'
import { SectionHeading } from './-components/section-heading'
import { TravelRoutes } from './-components/travel-routes'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/visite')({
  component: RouteComponent,
})

/**
 * Visite Benjamin Constant: como chegar e o que levar para a tríplice
 * fronteira. No Caprichoso esta página é um "em breve"; aqui ela já responde
 * as perguntas que a diretoria ouve todo ano pelo WhatsApp.
 */
function RouteComponent(): React.JSX.Element {
  const tips = [
    { title: m.visit_tipDocsTitle(), text: m.visit_tipDocsText() },
    { title: m.visit_tipMoneyTitle(), text: m.visit_tipMoneyText() },
    { title: m.visit_tipWeatherTitle(), text: m.visit_tipWeatherText() },
  ]

  return (
    <>
      <PageHero
        eyebrow={m.nav_groupFestival()}
        title={
          <>
            {m.visit_heroTitleLead()} <em>{m.visit_heroTitleEm()}</em>
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
                <em>{m.festival_arriveTitleEm()}</em>
              </>
            }
            lead={m.festival_arriveLead()}
          />
          <TravelRoutes />
        </div>
      </section>

      <section className="stage zigzag-y py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={m.visit_tipsEyebrow()}
            title={
              <>
                {m.visit_tipsTitleLead()} <em>{m.visit_tipsTitleEm()}</em>
              </>
            }
            lead={m.visit_tipsLead()}
          />
          <ul className="border-t-2 border-on-stage/40">
            {tips.map((tip, index) => (
              <li
                key={tip.title}
                className={`${REVEAL} grid grid-cols-[3rem_1fr] gap-4 border-b-2 border-on-stage/40 py-6`}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <span className="font-serif text-h3 leading-none text-primary-glow italic">
                  {index + 1}.
                </span>
                <div>
                  <h3 className="text-h4">{tip.title}</h3>
                  <p className="mt-2 text-body leading-relaxed opacity-80">
                    {tip.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-h2">{m.visit_ctaTitle()}</h2>
            <p className="mt-4 max-w-[56ch] text-body-lg text-muted-foreground">
              {m.visit_ctaText()}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
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
