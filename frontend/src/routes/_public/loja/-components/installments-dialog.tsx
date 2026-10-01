import type * as React from 'react'
import { CreditCardIcon } from '@phosphor-icons/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  PIX_DISCOUNT_PERCENT,
  formatMoney,
  installmentTable,
  pixPrice,
} from '#/lib/store/money'
import type { Cents } from '#/lib/store/money'
import { m } from '#/paraglide/messages'

/**
 * "Ver parcelas": a tabela inteira do cartão, de 1x até o teto, e o Pix no
 * topo para comparação.
 *
 * A linha de parcelas sob o preço só diz o máximo; quem quer pagar em 3x
 * precisa ver o valor de 3x sem fazer conta, e é isso que a tabela resolve.
 */
export function InstallmentsDialog({
  price,
}: {
  price: Cents
}): React.JSX.Element {
  const table = installmentTable(price)

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-1.5 text-small font-medium text-primary underline underline-offset-4">
        <CreditCardIcon aria-hidden="true" className="size-4" />
        {m.product_installmentsSee()}
      </DialogTrigger>
      <DialogContent className="gap-5 rounded-sm p-6 text-body sm:max-w-md">
        <DialogHeader className="gap-2">
          <DialogTitle className="font-display text-h3 font-normal">
            {m.product_installmentsTitle()}
          </DialogTitle>
          <DialogDescription className="text-small leading-relaxed">
            {m.product_installmentsLead()}
          </DialogDescription>
        </DialogHeader>
        <p className="flex items-center justify-between rounded-sm bg-primary/[0.08] px-4 py-3 text-small">
          <span className="font-semibold">
            {m.store_pixLabel({ percent: PIX_DISCOUNT_PERCENT })}
          </span>
          <span className="font-semibold text-primary tabular-nums">
            {formatMoney(pixPrice(price))}
          </span>
        </p>
        <table className="w-full text-small">
          <caption className="sr-only">{m.product_installmentsTitle()}</caption>
          <tbody>
            {table.map((row) => (
              <tr key={row.count} className="border-b border-border/60">
                <th scope="row" className="py-2.5 text-left font-medium">
                  {m.product_installmentRow({
                    count: row.count,
                    value: formatMoney(row.value),
                  })}
                </th>
                <td className="py-2.5 text-right text-muted-foreground tabular-nums">
                  {formatMoney(row.value * row.count)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  )
}
