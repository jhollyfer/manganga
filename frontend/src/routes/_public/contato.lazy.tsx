import type * as React from 'react'
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'

import { ContactForm, SUBJECT_EMAILS } from './-components/contact-form'
import { PageHero } from './-components/page-hero'
import { PillButton } from './-components/pill-button'
import { CONTACT_SUBJECTS } from '#/lib/entity'
import { CONTACT_SUBJECT_LABELS } from '#/lib/labels'
import { CONTACT, WHATSAPP_URL } from '#/lib/site'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/contato')({
  component: RouteComponent,
})

const route = getRouteApi('/_public/contato')

/**
 * O contato: o WhatsApp em destaque, as caixas por assunto ("fale com o time
 * certo", como no Caprichoso), o formulário e o endereço do curral.
 */
function RouteComponent(): React.JSX.Element {
  const { assunto } = route.useSearch()
  const departments = CONTACT_SUBJECTS.filter((subject) => subject !== 'geral')

  return (
    <>
      <PageHero
        eyebrow={m.nav_contact()}
        title={
          <>
            {m.contact_heroTitleLead()} <em>{m.contact_heroTitleEm()}</em>?
          </>
        }
        lead={m.contact_pageLead()}
        cover={{ kind: 'art', art: 'rio' }}
      >
        <div className="mt-10">
          <PillButton
            tone="ink"
            render={
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon weight="fill" />
                {m.footer_whatsappTitle()}
              </a>
            }
          />
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <h2 className="mb-8 text-h2">{m.contact_departmentsTitle()}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((subject) => (
              <li key={subject}>
                <a
                  href={`mailto:${SUBJECT_EMAILS[subject]}`}
                  className="group flex h-full flex-col border-t-4 border-ink pt-5 transition-colors hover:text-primary-glow"
                >
                  <EnvelopeSimpleIcon className="size-7 text-primary" />
                  <span className="mt-5 text-body-lg font-semibold">
                    {CONTACT_SUBJECT_LABELS[subject]()}
                  </span>
                  <span className="mt-1 text-small break-all text-muted-foreground group-hover:text-foreground">
                    {SUBJECT_EMAILS[subject]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-h2">{m.contact_formTitle()}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {m.contact_formLead()}
            </p>
            <ul className="mt-10 grid gap-5 text-body">
              <li className="flex gap-3">
                <MapPinIcon
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.district}, {CONTACT.postalCode}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <a href={CONTACT.phoneHref} className="hover:text-primary">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <EnvelopeSimpleIcon
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="sticker p-6 md:p-10">
            <ContactForm key={assunto} subject={assunto} />
          </div>
        </div>
      </section>
    </>
  )
}
