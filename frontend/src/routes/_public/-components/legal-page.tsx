import type * as React from 'react'

import { PageHero } from './page-hero'
import { formatLongDate } from '#/lib/dates'
import { localized } from '#/lib/i18n'
import type { LegalDocument } from '#/lib/legal'
import { m } from '#/paraglide/messages'

/** Privacidade e termos: o mesmo desenho, com índice e seções numeradas. */
export function LegalPage({
  title,
  lead,
  document,
}: {
  title: string
  lead: string
  document: LegalDocument
}): React.JSX.Element {
  return (
    <>
      <PageHero eyebrow={m.legal_eyebrow()} title={title} lead={lead}>
        <p className="mt-6 font-serif text-body-lg text-muted-foreground italic">
          {m.legal_updatedAt({ date: formatLongDate(document.updatedAt) })}
        </p>
      </PageHero>
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav
            aria-label={m.legal_index()}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <ol className="grid gap-2 text-small text-muted-foreground">
              {document.sections.map((section, index) => (
                <li key={localized(section.title)}>
                  <a
                    href={`#secao-${index + 1}`}
                    className="hover:text-foreground"
                  >
                    {index + 1}. {localized(section.title)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="prose max-w-3xl">
            {document.sections.map((section, index) => (
              <section
                key={localized(section.title)}
                id={`secao-${index + 1}`}
                className="scroll-mt-24"
              >
                <h2>
                  {index + 1}. {localized(section.title)}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={localized(paragraph)}>{localized(paragraph)}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
