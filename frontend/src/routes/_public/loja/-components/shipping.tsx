import * as React from 'react'
import { MapPinIcon, StorefrontIcon, TruckIcon } from '@phosphor-icons/react'

import {
  SHIPPING_METHOD_LABELS,
  shippingDeadline,
} from '../../-components/store-labels'
import { formatMoney } from '#/lib/store/money'
import type { Cents } from '#/lib/store/money'
import { formatCep, parseCep, quoteShipping } from '#/lib/store/shipping'
import type { ShippingMethod, ShippingOption } from '#/lib/store/shipping'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/** A busca de CEP dos Correios, para quem não sabe o próprio. */
const CORREIOS_CEP_URL =
  'https://buscacepinter.correios.com.br/app/endereco/index.php'

const METHOD_ICONS: Record<
  ShippingMethod,
  React.ComponentType<{ className?: string }>
> = {
  pickup: StorefrontIcon,
  standard: TruckIcon,
  express: TruckIcon,
}

function OptionPrice({ price }: { price: Cents }): React.JSX.Element {
  if (price === 0)
    return (
      <span className="font-semibold text-primary">
        {m.store_shippingFree()}
      </span>
    )

  return (
    <span className="font-semibold tabular-nums">{formatMoney(price)}</span>
  )
}

/**
 * As opções de entrega de um CEP.
 *
 * Com `onSelect` vira escolha (rádio nativo dentro de um cartão, que o
 * teclado percorre com as setas); sem ele é só a lista de preços e prazos,
 * que é o que a página do produto mostra antes de haver carrinho.
 */
export function ShippingOptions({
  options,
  name,
  selected,
  onSelect,
}: {
  options: ReadonlyArray<ShippingOption>
  /** O `name` do grupo de rádios, único na página. */
  name: string
  selected?: ShippingMethod | null
  onSelect?: (method: ShippingMethod) => void
}): React.JSX.Element {
  return (
    <ul data-slot="shipping-options" className="grid gap-2">
      {options.map((option) => {
        const Icon = METHOD_ICONS[option.method]
        const body = (
          <>
            <Icon className="size-5 shrink-0 text-primary" />
            <span className="grid flex-1 gap-0.5">
              <span className="text-small font-semibold">
                {SHIPPING_METHOD_LABELS[option.method]()}
              </span>
              <span className="text-micro text-muted-foreground">
                {shippingDeadline(option)}
              </span>
            </span>
            <span className="text-small">
              <OptionPrice price={option.price} />
            </span>
          </>
        )

        if (!onSelect)
          return (
            <li
              key={option.method}
              className="flex items-center gap-3 rounded-sm bg-secondary px-4 py-3"
            >
              {body}
            </li>
          )

        return (
          <li key={option.method}>
            <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-foreground/15 px-4 py-3 transition-colors has-checked:border-primary has-checked:bg-primary/[0.06] has-focus-visible:ring-2 has-focus-visible:ring-ring/40 motion-reduce:transition-none">
              <input
                type="radio"
                name={name}
                value={option.method}
                checked={selected === option.method}
                onChange={() => onSelect(option.method)}
                className="size-4 accent-primary"
              />
              {body}
            </label>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * A calculadora de frete: o campo de CEP e as opções que ele dá.
 *
 * O CEP é controlado por quem chama, e não guardado aqui: o carrinho leva o
 * CEP e a entrega escolhida para o checkout pela URL, e a página do produto
 * só quer mostrar. O texto digitado mora aqui dentro, porque meio CEP não
 * interessa a ninguém lá fora.
 */
export function ShippingCalculator({
  subtotal,
  cep,
  onCepChange,
  selected,
  onSelect,
  className,
}: {
  subtotal: Cents
  /** Os oito dígitos do CEP cotado, ou `null` antes de cotar. */
  cep: string | null
  onCepChange: (cep: string | null) => void
  selected?: ShippingMethod | null
  onSelect?: (method: ShippingMethod) => void
  className?: string
}): React.JSX.Element {
  const id = React.useId()
  const [text, setText] = React.useState(() => {
    if (cep) return formatCep(cep)

    return ''
  })
  const [invalid, setInvalid] = React.useState(false)

  let options: Array<ShippingOption> = []
  if (cep) options = quoteShipping(cep, subtotal)

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const parsed = parseCep(text)

    setInvalid(!parsed)
    if (parsed) setText(formatCep(parsed))
    onCepChange(parsed)
  }

  const inputId = id.concat('-cep')
  const errorId = id.concat('-erro')
  let describedBy: string | undefined
  if (invalid) describedBy = errorId

  return (
    <div
      data-slot="shipping-calculator"
      className={cn('grid gap-3', className)}
    >
      <form onSubmit={submit} noValidate className="grid gap-2">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-small font-semibold"
        >
          <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
          {m.store_shippingTitle()}
        </label>
        <div className="flex gap-2">
          <input
            id={inputId}
            value={text}
            onChange={(event) => setText(event.target.value)}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            maxLength={9}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="h-11 w-full min-w-0 flex-1 rounded-sm border-2 border-ink/70 bg-surface px-4 text-body tabular-nums outline-none placeholder:text-foreground/40 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/20 aria-invalid:border-destructive"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-sm border-2 border-ink px-5 text-small font-semibold transition-colors hover:border-primary/60 motion-reduce:transition-none"
          >
            {m.store_shippingCalculate()}
          </button>
        </div>
        {invalid && (
          <p id={errorId} role="alert" className="text-micro text-destructive">
            {m.store_shippingInvalidCep()}
          </p>
        )}
        <a
          href={CORREIOS_CEP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-micro text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {m.store_shippingFindCep()}
        </a>
      </form>

      {options.length > 0 && (
        <ShippingOptions
          options={options}
          name={id.concat('-entrega')}
          selected={selected}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}
