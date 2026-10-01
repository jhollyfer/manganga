import type * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

import { HelpCards, HelpContact } from '../-components/help-cards'
import { StoreNav } from '../-components/store-nav'
import { PageHero } from '../../-components/page-hero'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/loja/ajuda/')({
  component: RouteComponent,
})

/**
 * A central de ajuda: os seis tópicos em cartões e o contato no fim, para
 * quem não achou a resposta ir direto à conversa.
 */
function RouteComponent(): React.JSX.Element {
  return (
    <>
      <PageHero
        eyebrow={m.nav_store()}
        title={
          <>
            {m.help_titleStart()} <em>{m.help_titleEm()}</em>
          </>
        }
        lead={m.help_lead()}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.help_title() },
        ]}
        className="md:pb-16"
      />
      <StoreNav />
      <section className="container-x grid gap-12 py-12 md:py-20">
        <HelpCards />
        <HelpContact />
      </section>
    </>
  )
}
