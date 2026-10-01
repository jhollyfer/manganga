import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { HELP_ICONS, HelpContact } from '../-components/help-cards'
import { SizeTables } from '../-components/size-guide'
import { StoreNav } from '../-components/store-nav'
import { PageHero } from '../../-components/page-hero'
import { REVEAL } from '../../-components/reveal'
import {
  NotFoundPage,
  NotFoundPageActions,
  NotFoundPageHomeButton,
  NotFoundPageTitle,
} from '#/components/common/not-found-page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { localized } from '#/lib/i18n'
import { HELP_TOPICS } from '#/lib/store/help'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_public/loja/ajuda/$slug')

export const Route = createLazyFileRoute('/_public/loja/ajuda/$slug')({
  component: RouteComponent,
  notFoundComponent: TopicNotFound,
})

function TopicNotFound(): React.JSX.Element {
  return (
    <NotFoundPage className="min-h-[80dvh]">
      <NotFoundPageTitle>{m.help_notFound()}</NotFoundPageTitle>
      <NotFoundPageActions>
        <NotFoundPageHomeButton to="/loja/ajuda">
          {m.help_backToHelp()}
        </NotFoundPageHomeButton>
      </NotFoundPageActions>
    </NotFoundPage>
  )
}

/**
 * Um tópico da ajuda: o menu de tópicos ao lado, o texto, as perguntas e o
 * contato.
 *
 * O menu lateral repete os seis tópicos em toda página porque quem lê
 * "entregas" quase sempre quer ler "trocas" em seguida, e voltar ao índice
 * para isso é um toque a mais no celular.
 */
function RouteComponent(): React.JSX.Element {
  const topic = route.useLoaderData()
  const title = localized(topic.title)

  return (
    <>
      <PageHero
        eyebrow={m.help_title()}
        title={
          <>
            <em>{title}</em>.
          </>
        }
        lead={localized(topic.summary)}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.help_title(), to: '/loja/ajuda' },
          { label: title },
        ]}
        className="md:pb-16"
      />
      <StoreNav />
      <section className="container-x grid gap-12 py-12 md:py-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <nav
          aria-label={m.help_topicsLabel()}
          className="lg:sticky lg:top-40 lg:self-start"
        >
          <ul className="grid gap-1">
            {HELP_TOPICS.map((each) => {
              const Icon = HELP_ICONS[each.slug]

              return (
                <li key={each.slug}>
                  <Link
                    to="/loja/ajuda/$slug"
                    params={{ slug: each.slug }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-small font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground motion-reduce:transition-none"
                  >
                    <Icon className="size-5 text-primary" />
                    {localized(each.title)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <article key={topic.slug} className={cn(REVEAL, 'grid gap-10')}>
          <div className="grid max-w-[68ch] gap-5">
            {topic.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-body-lg leading-[1.75] text-foreground/85"
              >
                {localized(paragraph)}
              </p>
            ))}
          </div>

          {topic.sizeChart && (
            <div className="max-w-xl rounded-3xl border border-border bg-surface p-6">
              <SizeTables />
            </div>
          )}

          {topic.faq && topic.faq.length > 0 && (
            <div className="grid max-w-[68ch] gap-4">
              <h2 className="text-h3">{m.help_faqTitle()}</h2>
              <Accordion className="rounded-3xl border-border bg-surface">
                {topic.faq.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={index}
                    className="px-5 data-open:bg-transparent"
                  >
                    <AccordionTrigger className="font-sans py-4 text-body font-semibold hover:no-underline">
                      {localized(item.question)}
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed text-muted-foreground">
                      {localized(item.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <HelpContact />
        </article>
      </section>
    </>
  )
}
