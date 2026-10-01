import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { RulerIcon } from '@phosphor-icons/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { ADULT_SIZE_CHART, KIDS_SIZE_CHART } from '#/lib/store/sizes'
import type { SizeRow } from '#/lib/store/sizes'
import { m } from '#/paraglide/messages'

function SizeTable({
  caption,
  rows,
}: {
  caption: string
  rows: ReadonlyArray<SizeRow>
}): React.JSX.Element {
  return (
    <table className="w-full text-left text-small">
      <caption className="mb-2 text-left text-small font-semibold">
        {caption}
      </caption>
      <thead>
        <tr className="border-b border-border text-micro text-muted-foreground">
          <th scope="col" className="py-2 pr-4 font-semibold">
            {m.product_sizeColumn()}
          </th>
          <th scope="col" className="py-2 pr-4 font-semibold">
            {m.product_chestColumn()}
          </th>
          <th scope="col" className="py-2 font-semibold">
            {m.product_lengthColumn()}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.size} className="border-b border-border/60">
            <th scope="row" className="py-2 pr-4 font-semibold">
              {row.size}
            </th>
            <td className="py-2 pr-4 tabular-nums">{row.chest} cm</td>
            <td className="py-2 tabular-nums">{row.length} cm</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * As duas tabelas de medidas, adulta e infantil. A mesma peça desenha o guia
 * da página do produto e o tópico da central de ajuda.
 */
export function SizeTables({
  kids,
}: {
  /** Só a grade infantil, ou só a adulta. Sem o campo, as duas. */
  kids?: boolean
}): React.JSX.Element {
  return (
    <div data-slot="size-tables" className="grid gap-8">
      {kids !== true && (
        <SizeTable caption={m.product_sizeAdult()} rows={ADULT_SIZE_CHART} />
      )}
      {kids !== false && (
        <SizeTable caption={m.product_sizeKids()} rows={KIDS_SIZE_CHART} />
      )}
    </div>
  )
}

/**
 * O "Guia de tamanhos" da página do produto, num diálogo.
 *
 * Diálogo e não link para a ajuda: quem está escolhendo o tamanho não quer
 * perder a peça, a cor e a quantidade que já marcou. O link para a ajuda
 * fica no rodapé do diálogo, para quem quer saber como medir.
 */
export function SizeGuideDialog({
  kids,
}: {
  kids: boolean
}): React.JSX.Element {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-1.5 text-small font-medium text-primary underline underline-offset-4">
        <RulerIcon aria-hidden="true" className="size-4" />
        {m.product_sizeGuide()}
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] gap-6 overflow-y-auto rounded-sm p-6 text-body sm:max-w-lg">
        <DialogHeader className="gap-2">
          <DialogTitle className="font-display text-h3 font-normal">
            {m.product_sizeGuide()}
          </DialogTitle>
          <DialogDescription className="text-small leading-relaxed">
            {m.product_sizeGuideLead()}
          </DialogDescription>
        </DialogHeader>
        <SizeTables kids={kids} />
        <Link
          to="/loja/ajuda/$slug"
          params={{ slug: 'guia-de-tamanhos' }}
          className="w-fit text-small font-medium text-primary underline underline-offset-4"
        >
          {m.product_sizeGuideHelp()}
        </Link>
      </DialogContent>
    </Dialog>
  )
}
