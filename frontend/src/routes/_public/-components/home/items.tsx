import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { REVEAL, STAGGER } from '../reveal'
import { SectionAction } from '../section-heading'
import { localized } from '#/lib/i18n'
import { ITEMS } from '#/lib/items'
import type { OfficialItem } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const GROUPS: ReadonlyArray<OfficialItem['group']> = [
  'musical',
  'cenico',
  'artistico',
]

/**
 * Os itens oficiais como o índice de um programa de espetáculo: os três
 * grupos do julgamento em colunas, e em cada uma os nomes dos papéis.
 *
 * Índice e não trilho de figurinhas: sem foto de cada item, a figurinha era
 * um quadrado colorido com um número enorme apagado ao fundo, enfeite que
 * ocupava a tela inteira para dizer quinze nomes. O nome de cada papel já é
 * o conteúdo.
 */
export function Items(): React.JSX.Element {
  return (
    <section
      data-slot="home-items"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className={cn(REVEAL, 'lg:col-span-4')}>
          <h2 className="text-h2">
            {m.home_itemsTitleLead()} <em>{m.home_itemsTitleEm()}</em>
          </h2>
          <div className="mt-8">
            <SectionAction render={<Link to="/boi/itens" />}>
              {m.home_itemsCta({ count: ITEMS.length })}
            </SectionAction>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {GROUPS.map((group, index) => (
            <div
              key={group}
              className={REVEAL}
              style={{ animationDelay: `${index * STAGGER}ms` }}
            >
              <h3 className="border-b border-foreground pb-3 font-sans text-small font-semibold [font-stretch:100%]">
                {ITEM_GROUP_LABELS[group]()}
              </h3>
              <ul className="mt-4 grid gap-3">
                {ITEMS.filter((item) => item.group === group).map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/boi/itens"
                      hash={item.slug}
                      className="font-display text-h4 font-semibold [font-stretch:85%] transition-colors hover:text-primary-glow"
                    >
                      {localized(item.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
