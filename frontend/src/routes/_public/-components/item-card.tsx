import type * as React from 'react'

import { localized } from '#/lib/i18n'
import type { OfficialItem } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { cn } from '#/lib/utils'

/** As cores de cada grupo de itens, para o número grande do cartão. */
const GROUP_TONE: Record<OfficialItem['group'], string> = {
  musical: 'text-brand-gold',
  cenico: 'text-brand-leaf',
  artistico: 'text-brand-urucum',
}

/**
 * O cartão de um item oficial: o número, o grupo, o papel e o que ele faz.
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
  return (
    <article
      data-slot="item-card"
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-2xl border border-current/12 bg-current/[0.03] p-6',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-4 -right-1 font-display text-[7rem] leading-none opacity-25',
          GROUP_TONE[item.group],
        )}
      >
        {String(item.number).padStart(2, '0')}
      </span>
      <p className="eyebrow mb-10 text-primary-glow">
        # {String(item.number).padStart(2, '0')} ·{' '}
        {ITEM_GROUP_LABELS[item.group]()}
      </p>
      <h3 className="text-h3 leading-none">{localized(item.name)}</h3>
      {item.performer && (
        <p className="mt-2 text-small font-semibold">{item.performer}</p>
      )}
      <p className="mt-4 text-small leading-relaxed opacity-70">
        {localized(item.description)}
      </p>
    </article>
  )
}
