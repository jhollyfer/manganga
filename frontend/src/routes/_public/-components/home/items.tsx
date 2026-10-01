import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { ItemCard } from '../item-card'
import { SectionAction, SectionHeading } from '../section-heading'
import { ITEMS } from '#/lib/items'
import { m } from '#/paraglide/messages'

/**
 * Os itens oficiais como um álbum de figurinhas aberto: o trilho horizontal
 * com uma figurinha de cada papel, levemente tortas como coladas à mão.
 *
 * Trilho de rolagem nativa (`rail`) e não carrossel com biblioteca: o dedo no
 * celular já sabe arrastar, o teclado já sabe rolar, e o leitor de tela lê a
 * lista como lista.
 */
const TILT = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-2', 'rotate-2']

export function Items(): React.JSX.Element {
  return (
    <section data-slot="home-items" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={m.home_itemsEyebrow()}
          title={
            <>
              {m.home_itemsTitleLead()} <em>{m.home_itemsTitleEm()}</em>
            </>
          }
          action={
            <SectionAction render={<Link to="/boi/itens" />}>
              {m.home_itemsCta({ count: ITEMS.length })}
            </SectionAction>
          }
        />
      </div>
      <ul className="rail gap-6 px-[max(1rem,calc((100vw-84rem)/2+2.5rem))] pt-2 pb-8">
        {ITEMS.slice(0, 8).map((item, index) => (
          <li
            key={item.slug}
            className={`w-[76vw] shrink-0 sm:w-72 ${TILT[index % TILT.length]}`}
          >
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
