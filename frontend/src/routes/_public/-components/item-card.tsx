import type * as React from 'react'

import { localized } from '#/lib/i18n'
import type { OfficialItem } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { cn } from '#/lib/utils'

/** A tinta de cada grupo de itens, na faixa do topo da figurinha. */
const GROUP_TONE: Record<OfficialItem['group'], string> = {
  musical: 'bg-brand-gold text-ink',
  cenico: 'bg-brand-forest text-brand-bone',
  artistico: 'bg-brand-urucum text-brand-bone',
}

/**
 * Um item oficial como figurinha de álbum: a faixa colorida do grupo, o
 * número grande, o papel e o que ele faz.
 *
 * Sem foto e sem nome de pessoa por padrão: o elenco muda a cada temporada e
 * entra pelo campo `performer` quando a diretoria o anuncia.
 */
export function ItemCard({
  item,
  className,
}: {
  item: OfficialItem
  className?: string
}): React.JSX.Element {
  const number = String(item.number).padStart(2, '0')

  return (
    <article
      data-slot="item-card"
      className={cn('sticker flex h-full flex-col overflow-hidden', className)}
    >
      <p
        className={cn(
          'flex items-center justify-between px-4 py-2 text-micro font-bold tracking-[0.12em] uppercase',
          GROUP_TONE[item.group],
        )}
      >
        <span>{ITEM_GROUP_LABELS[item.group]()}</span>
        <span>Nº {number}</span>
      </p>
      <div className="flex flex-1 flex-col p-5">
        <span
          aria-hidden="true"
          className="font-display text-[5.5rem] leading-[0.8] font-black text-ink/10"
        >
          {number}
        </span>
        <h3 className="mt-2 text-h3">{localized(item.name)}</h3>
        {item.performer && (
          <p className="mt-1 font-serif text-body-lg text-primary-glow italic">
            {item.performer}
          </p>
        )}
        <p className="mt-3 text-small leading-relaxed text-muted-foreground">
          {localized(item.description)}
        </p>
      </div>
    </article>
  )
}
