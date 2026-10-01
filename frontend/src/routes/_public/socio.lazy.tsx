import type * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import {
  ConfettiIcon,
  MegaphoneIcon,
  TShirtIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react'

import { MembershipForm } from './-components/membership-form'
import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { REVEAL, STAGGER } from './-components/reveal'
import { SectionHeading } from './-components/section-heading'
import { WHATSAPP_URL } from '#/lib/site'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/socio')({
  component: RouteComponent,
})

/**
 * Seja sócio: o que se ganha, como participar e o cadastro, que vai para a
 * API. É a página "Sócio" do Caprichoso com o formulário dentro do site, e não
 * num portal à parte.
 */
function RouteComponent(): React.JSX.Element {
  const benefits = [
    {
      icon: UsersThreeIcon,
      title: m.member_benefit1Title(),
      text: m.member_benefit1Text(),
    },
    {
      icon: ConfettiIcon,
      title: m.member_benefit2Title(),
      text: m.member_benefit2Text(),
    },
    {
      icon: TShirtIcon,
      title: m.member_benefit3Title(),
      text: m.member_benefit3Text(),
    },
    {
      icon: MegaphoneIcon,
      title: m.member_benefit4Title(),
      text: m.member_benefit4Text(),
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={m.nav_member()}
        title={
          <>
            {m.member_heroTitleLead()} <em>{m.member_heroTitleEm()}</em>
          </>
        }
        lead={m.member_pageLead()}
        cover={{ kind: 'photo', photo: 'festival', focus: '85% 55%' }}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <PillButton
            tone="ink"
            render={<a href="#cadastro">{m.member_heroCta()}</a>}
          />
          <PillButton
            tone="outline"
            render={
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {m.member_heroHelp()}
              </a>
            }
          />
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={m.member_benefitsEyebrow()}
            title={
              <>
                {m.member_benefitsTitleLead()}{' '}
                <em>{m.member_benefitsTitleEm()}</em>
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className={`${REVEAL} rounded-2xl border border-border bg-surface p-6`}
                style={{ animationDelay: `${index * STAGGER}ms` }}
              >
                <benefit.icon className="size-8 text-primary" />
                <h3 className="mt-5 font-sans text-body-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                  {benefit.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="cadastro"
        className="scroll-mt-16 bg-secondary py-20 md:py-28"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              className="mb-6 md:mb-6"
              eyebrow={m.member_formEyebrow()}
              title={
                <>
                  {m.member_formTitleLead()} <em>{m.member_formTitleEm()}</em>
                </>
              }
              lead={m.member_formLead()}
            />
            <ol className="grid gap-4 text-small text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-display text-h4 text-primary">1</span>
                {m.member_step1()}
              </li>
              <li className="flex gap-3">
                <span className="font-display text-h4 text-primary">2</span>
                {m.member_step2()}
              </li>
              <li className="flex gap-3">
                <span className="font-display text-h4 text-primary">3</span>
                {m.member_step3()}
              </li>
            </ol>
          </div>
          <div className="sticker p-6 md:p-10">
            <MembershipForm />
          </div>
        </div>
      </section>
    </>
  )
}
