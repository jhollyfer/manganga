import type * as React from 'react'

import { localized } from '#/lib/i18n'
import type { OfficialItem } from '#/lib/items'
import { ITEM_GROUP_LABELS } from '#/lib/labels'
import { cn } from '#/lib/utils'

/**
 * Um item oficial como verbete: o número, o nome do papel, o grupo do
 * julgamento e o que ele faz na arena, numa linha com fio fino em cima.
 *
 * Verbete e não figurinha: sem foto de cada item, a figurinha era um quadrado
 * colorido com um número gigante apagado ao fundo, e quinze quadrados iguais
 * em grade são o desenho que todo gerador entrega. O `id` é o `slug`, para a
 * home apontar direto para o item.
 *
 * Sem nome de pessoa por padrão: o elenco muda a cada temporada e entra pelo
 * campo `performer` quando a diretoria o anuncia.
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
      id={item.slug}
      data-slot="item-card"
      className={cn(
        'grid scroll-mt-24 gap-3 border-t border-border py-8 md:grid-cols-[4rem_1fr_1.2fr] md:gap-8',
        className,
      )}
    >
      <p className="text-small text-muted-foreground tabular-nums">
        {String(item.number).padStart(2, '0')}
      </p>
      <div>
        <h3 className="text-h3">{localized(item.name)}</h3>
        <p className="mt-1 text-small text-muted-foreground">
          {ITEM_GROUP_LABELS[item.group]()}
          {item.performer && (
            <span className="text-primary-glow"> · {item.performer}</span>
          )}
        </p>
      </div>
      <p className="max-w-[56ch] text-body leading-relaxed text-muted-foreground">
        {localized(item.description)}
      </p>
    </article>
  )
}
