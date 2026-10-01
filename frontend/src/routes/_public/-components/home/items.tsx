import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { ItemCard } from '../item-card'
import { SectionAction, SectionHeading } from '../section-heading'
import { ITEMS } from '#/lib/items'
import { m } from '#/paraglide/messages'

/**
 * Os itens oficiais num trilho horizontal: quem dá vida ao boi na arena.
 *
 * Trilho de rolagem nativa (`rail`) e não carrossel com biblioteca: o dedo no
 * celular já sabe arrastar, o teclado já sabe rolar, e o leitor de tela lê a
 * lista como lista.
 */
export function Items(): React.JSX.Element {
  return (
    <section data-slot="home-items" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={m.home_itemsEyebrow()}
          title={
            <>
              {m.home_itemsTitleLead()} <em>{m.home_itemsTitleEm()}</em>.
            </>
          }
          action={
            <SectionAction render={<Link to="/boi/itens" />}>
              {m.home_itemsCta({ count: ITEMS.length })}
            </SectionAction>
          }
        />
      </div>
      <ul className="rail gap-4 px-[max(1rem,calc((100vw-80rem)/2+2rem))] pb-4">
        {ITEMS.slice(0, 8).map((item) => (
          <li key={item.slug} className="w-[78vw] shrink-0 sm:w-80">
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
