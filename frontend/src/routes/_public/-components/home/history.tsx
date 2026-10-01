import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { MILESTONES } from '#/lib/history'
import { localized } from '#/lib/i18n'
import { m } from '#/paraglide/messages'

/**
 * A história em uma frase e uma régua: o título e o parágrafo empilhados, e
 * os marcos lado a lado, cada um com o ano em cima de um fio fino.
 *
 * Sem o "1992" em tamanho de fachada e sem o losango em cada marco: o número
 * gigante com rótulo pequeno e o enfeite repetido em cada item são os dois
 * cacoetes que este redesenho tira.
 */
export function History(): React.JSX.Element {
  return (
    <section
      data-slot="home-history"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="container-x">
        <div className={`${REVEAL} max-w-3xl`}>
          <h2 className="text-h2">
            {m.home_historyTitleLead()} <em>{m.home_historyTitleEm()}</em>
          </h2>
          <p className="mt-6 max-w-[58ch] text-body-lg leading-relaxed text-muted-foreground">
            {m.home_historyLead()}
          </p>
        </div>

        <ol className="rail mt-16 gap-8 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible">
          {MILESTONES.map((milestone, index) => (
            <li
              key={localized(milestone.when)}
              className={`${REVEAL} w-64 shrink-0 border-t border-foreground pt-5 md:w-auto`}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <p className="text-small text-muted-foreground tabular-nums">
                {localized(milestone.when)}
              </p>
              <h3 className="mt-2 text-h4">{localized(milestone.title)}</h3>
              <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                {localized(milestone.text)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <SectionAction render={<Link to="/boi/historia" />}>
            {m.home_historyCta()}
          </SectionAction>
        </div>
      </div>
    </section>
  )
}
