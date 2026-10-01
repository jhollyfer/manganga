import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { ProductRail } from '../product-rail'
import { SectionAction } from '../section-heading'
import { PRODUCTS } from '#/lib/store/catalog'
import { m } from '#/paraglide/messages'

/**
 * A loja na home: os mais vendidos num trilho, entre as notícias e a
 * história. Quem chega pelo tema e pela agenda passa pela camisa antes de
 * terminar a página, sem precisar achar o link da loja no cabeçalho.
 */
export function Store(): React.JSX.Element | null {
  const bestsellers = [...PRODUCTS].sort((a, b) => a.rank - b.rank).slice(0, 8)

  return (
    <ProductRail
      id="home-loja"
      className="border-y-2 border-ink bg-secondary"
      eyebrow={m.home_storeEyebrow()}
      title={
        <>
          {m.home_storeTitleLead()} <em>{m.home_storeTitleEm()}</em>
        </>
      }
      action={
        <SectionAction render={<Link to="/loja" />}>
          {m.home_storeCta()}
        </SectionAction>
      }
      products={bestsellers}
    />
  )
}
