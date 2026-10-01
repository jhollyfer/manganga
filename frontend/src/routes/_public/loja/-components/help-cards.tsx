import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'

import { PillButton } from '../../-components/pill-button'
import { REVEAL, STAGGER } from '../../-components/reveal'
import { localized } from '#/lib/i18n'
import { CONTACT, WHATSAPP_URL } from '#/lib/site'
import { HELP_TOPICS } from '#/lib/store/help'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O "não achou?" do fim da ajuda: WhatsApp, e-mail da loja e o horário.
 * No palco escuro, para fechar a página como o convite fecha a home.
 */
export function HelpContact({
  className,
}: {
  className?: string
}): React.JSX.Element {
  return (
    <div
      data-slot="help-contact"
      className={cn(
        'band grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-10',
        className,
      )}
    >
      <div className="grid gap-3">
        <h2 className="text-h2 text-on-stage [&_em]:text-primary-glow">
          {m.help_contactTitleStart()} <em>{m.help_contactTitleEm()}</em>
        </h2>
        <p className="max-w-[52ch] text-body-lg text-on-stage/75">
          {m.help_contactLead()}
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-on-stage/60">
          <a
            href={'mailto:'.concat(CONTACT.storeEmail)}
            className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-on-stage"
          >
            <EnvelopeSimpleIcon aria-hidden="true" className="size-4" />
            {CONTACT.storeEmail}
          </a>
          <span>{m.help_contactHours()}</span>
        </p>
      </div>
      <PillButton
        tone="light"
        render={
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />
        }
      >
        <WhatsappLogoIcon />
        {m.help_contactCta()}
      </PillButton>
    </div>
  )
}

/**
 * Os tópicos da central de ajuda em cartões: na vitrine da loja, como
 * atalho, e na própria central, como índice.
 */
export function HelpCards({
  className,
}: {
  className?: string
}): React.JSX.Element {
  return (
    <ul
      data-slot="help-cards"
      className={cn(
        'grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {HELP_TOPICS.map((topic, index) => {
        return (
          <li
            key={topic.slug}
            className={REVEAL}
            style={{ animationDelay: `${index * STAGGER}ms` }}
          >
            <Link
              to="/loja/ajuda/$slug"
              params={{ slug: topic.slug }}
              className="group flex h-full flex-col gap-3 border-b border-foreground/20 py-6 sm:pr-6"
            >
              <span className="font-display font-semibold text-h3 leading-none text-primary-glow">
                {index + 1}.
              </span>
              <span className="grid gap-1.5">
                <span className="font-display text-h4 font-bold transition-colors group-hover:text-primary-glow">
                  {localized(topic.title)}
                </span>
                <span className="text-small leading-relaxed text-muted-foreground">
                  {localized(topic.summary)}
                </span>
              </span>
              <ArrowRightIcon
                aria-hidden="true"
                className="mt-auto size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
