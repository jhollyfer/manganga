import * as React from 'react'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TicketIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react'

import { CartSkeleton, EmptyCart } from './-components/empty-cart'
import { QuantityStepper } from './-components/quantity-stepper'
import { ShippingCalculator } from './-components/shipping'
import { OrderSummary } from './-components/summary'
import { useHydrated } from './-components/use-hydrated'
import { PageHero } from '../-components/page-hero'
import { PillButton } from '../-components/pill-button'
import { ProductArt } from '../-components/product-art'
import { useCart } from '../-components/use-cart'
import type { CartActions } from '../-components/use-cart'
import { localized } from '#/lib/i18n'
import {
  COUPONS,
  MAX_PER_LINE,
  isCoupon,
  itemCount,
  lineKey,
  resolveLines,
  subtotal,
} from '#/lib/store/cart'
import type { Cart, ResolvedLine } from '#/lib/store/cart'
import { colorOf } from '#/lib/store/catalog'
import { formatMoney } from '#/lib/store/money'
import type { Cents } from '#/lib/store/money'
import { summarize } from '#/lib/store/order'
import {
  FREE_SHIPPING_FROM,
  missingForFreeShipping,
  quoteShipping,
} from '#/lib/store/shipping'
import type { ShippingMethod } from '#/lib/store/shipping'
import { m } from '#/paraglide/messages'

export const Route = createLazyFileRoute('/_public/loja/carrinho')({
  component: RouteComponent,
})

/**
 * O carrinho: as peças, o frete grátis que falta, o cupom, o CEP e o
 * resumo.
 *
 * O carrinho mora no `localStorage`, então o HTML do servidor não sabe o que
 * há nele. Até hidratar, a tela mostra o esqueleto e não "carrinho vazio":
 * quem tem três camisas no carrinho não pode ver o aviso de vazio piscar.
 */
function RouteComponent(): React.JSX.Element {
  const hydrated = useHydrated()
  const [cart, actions] = useCart()
  const lines = resolveLines(cart)

  let body = <CartSkeleton />
  if (hydrated && lines.length === 0)
    body = (
      <EmptyCart
        title={m.store_cartEmptyTitle()}
        lead={m.store_cartEmptyLead()}
      />
    )
  if (hydrated && lines.length > 0)
    body = <CartContent cart={cart} lines={lines} actions={actions} />

  let lead: string | undefined
  if (hydrated && lines.length > 0)
    lead = m.store_cartCount({ count: itemCount(cart) })

  return (
    <>
      <PageHero
        eyebrow={m.nav_store()}
        title={
          <>
            {m.store_cartTitleStart()} <em>{m.store_cartTitleEm()}</em>
          </>
        }
        lead={lead}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.store_cartTitle() },
        ]}
        className="md:pb-16"
      />
      <section className="container-x py-12 md:py-16">{body}</section>
    </>
  )
}

function CartContent({
  cart,
  lines,
  actions,
}: {
  cart: Cart
  lines: ReadonlyArray<ResolvedLine>
  actions: CartActions
}): React.JSX.Element {
  const [cep, setCep] = React.useState<string | null>(null)
  const [method, setMethod] = React.useState<ShippingMethod | null>(null)

  const gross = subtotal(cart)
  let options: ReturnType<typeof quoteShipping> = []
  if (cep) options = quoteShipping(cep, gross)
  const chosen = options.find((option) => option.method === method)
  const summary = summarize(cart, chosen?.price ?? null)

  /*
   * CEP novo escolhe a primeira opção da lista, que é a mais barata (a
   * retirada em Benjamin Constant, o envio padrão no resto). Sem isto o
   * total ficaria "a calcular" até a pessoa tocar numa opção que ela nem
   * percebeu que precisava escolher.
   */
  function quote(next: string | null): void {
    setCep(next)
    let first: ShippingMethod | null = null
    if (next) first = quoteShipping(next, gross).at(0)?.method ?? null
    setMethod(first)
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
      <div className="grid content-start gap-8">
        <FreeShippingBar subtotal={gross} />

        <ul className="grid divide-y divide-border border-y border-border">
          {lines.map((resolved) => (
            <CartLineItem
              key={lineKey(resolved.line)}
              resolved={resolved}
              actions={actions}
            />
          ))}
        </ul>

        <Link
          to="/loja"
          className="inline-flex w-fit items-center gap-2 text-small font-semibold text-primary"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          {m.store_keepShopping()}
        </Link>
      </div>

      <aside
        aria-label={m.store_summaryTitle()}
        className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="grid gap-6 rounded-sm border border-border bg-surface p-6">
          <h2 className="text-h3">{m.store_summaryTitle()}</h2>
          <CouponForm cart={cart} actions={actions} />
          <ShippingCalculator
            subtotal={gross}
            cep={cep}
            onCepChange={quote}
            selected={method}
            onSelect={setMethod}
          />
          <OrderSummary
            subtotal={summary.subtotal}
            discount={summary.discount}
            coupon={cart.coupon}
            shipping={summary.shipping}
            total={summary.total}
            pixTotal={summary.pixTotal}
            installments={summary.installments}
          />
          <PillButton
            render={
              <Link
                to="/loja/checkout"
                search={{
                  cep: cep ?? undefined,
                  shipping: method ?? undefined,
                }}
              />
            }
          >
            {m.store_checkoutCta()}
            <ArrowRightIcon />
          </PillButton>
        </div>
        <p className="flex items-start gap-2 px-2 text-micro leading-relaxed text-muted-foreground">
          <ShieldCheckIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-primary"
          />
          {m.store_demoNotice()}
        </p>
      </aside>
    </div>
  )
}

/**
 * A barra do frete grátis. O texto diz o número, e a barra é enfeite
 * (`aria-hidden`): "faltam R$ 40" é a informação, e o comprimento da barra
 * só a repete para o olho.
 */
function FreeShippingBar({
  subtotal: value,
}: {
  subtotal: Cents
}): React.JSX.Element {
  const missing = missingForFreeShipping(value)
  const percent = Math.min(100, Math.round((value / FREE_SHIPPING_FROM) * 100))

  let text = m.store_freeShippingReached()
  if (missing > 0)
    text = m.store_freeShippingMissing({ amount: formatMoney(missing) })

  return (
    <div className="grid gap-3 rounded-sm bg-secondary p-5">
      <p className="text-small font-medium">{text}</p>
      <div
        aria-hidden="true"
        className="h-2 overflow-hidden rounded-full bg-background"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function CartLineItem({
  resolved,
  actions,
}: {
  resolved: ResolvedLine
  actions: CartActions
}): React.JSX.Element {
  const { line, product, total } = resolved
  const color = colorOf(product, line.color)
  const name = localized(product.name)
  const max = Math.max(1, Math.min(MAX_PER_LINE, product.stock))

  return (
    <li className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
      <Link
        to="/loja/produto/$slug"
        params={{ slug: product.slug }}
        tabIndex={-1}
        aria-hidden="true"
        className="block aspect-square overflow-hidden rounded-sm"
      >
        <ProductArt
          art={product.art}
          color={color?.hex ?? '#f7f6f0'}
          className="p-2"
        />
      </Link>
      <div className="grid gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <Link
              to="/loja/produto/$slug"
              params={{ slug: product.slug }}
              className="text-body font-semibold hover:text-primary"
            >
              {name}
            </Link>
            <p className="text-micro text-muted-foreground">
              {line.size && (
                <span>
                  {m.product_size()}: {line.size}
                  {color && ', '}
                </span>
              )}
              {color && (
                <span>
                  {m.product_color()}: {localized(color.name)}
                </span>
              )}
            </p>
            <p className="text-micro text-muted-foreground tabular-nums">
              {m.store_unitPrice({ price: formatMoney(product.price) })}
            </p>
          </div>
          <p className="text-body font-semibold tabular-nums">
            {formatMoney(total)}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantityStepper
            value={line.quantity}
            onChange={(next) => actions.update(line, next)}
            max={max}
            label={name}
            className="h-11"
          />
          <button
            type="button"
            onClick={() => actions.remove(line)}
            className="inline-flex h-10 items-center gap-1.5 rounded-sm px-3 text-small text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive motion-reduce:transition-none"
          >
            <TrashIcon aria-hidden="true" className="size-4" />
            {m.store_remove()}
            <span className="sr-only">{name}</span>
          </button>
        </div>
      </div>
    </li>
  )
}

/**
 * O cupom. A validação é a tabela de `cart.ts`, e o erro aparece sob o
 * campo, ligado a ele por `aria-describedby`, como nos formulários do site.
 */
function CouponForm({
  cart,
  actions,
}: {
  cart: Cart
  actions: CartActions
}): React.JSX.Element {
  const [code, setCode] = React.useState('')
  const [invalid, setInvalid] = React.useState(false)

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!isCoupon(code)) {
      setInvalid(true)

      return
    }

    setInvalid(false)
    setCode('')
    actions.coupon(code)
  }

  if (cart.coupon)
    return (
      <div className="flex items-center justify-between gap-3 rounded-sm bg-primary/[0.08] px-4 py-3 text-small">
        <span className="flex items-center gap-2">
          <TicketIcon aria-hidden="true" className="size-5 text-primary" />
          <span>
            {m.store_couponApplied({
              code: cart.coupon,
              percent: COUPONS[cart.coupon] ?? 0,
            })}
          </span>
        </span>
        <button
          type="button"
          onClick={() => actions.coupon(null)}
          aria-label={m.store_couponRemove()}
          className="inline-flex size-8 items-center justify-center rounded-full hover:bg-background"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    )

  let describedBy: string | undefined
  if (invalid) describedBy = 'cupom-erro'

  return (
    <form onSubmit={submit} noValidate className="grid gap-2">
      <label
        htmlFor="cupom"
        className="flex items-center gap-2 text-small font-semibold"
      >
        <TicketIcon aria-hidden="true" className="size-4 text-primary" />
        {m.store_couponLabel()}
      </label>
      <div className="flex gap-2">
        <input
          id="cupom"
          value={code}
          onChange={(event) => {
            setCode(event.target.value)
            setInvalid(false)
          }}
          autoCapitalize="characters"
          autoComplete="off"
          maxLength={24}
          placeholder={m.store_couponPlaceholder()}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className="h-11 w-full min-w-0 flex-1 rounded-sm border-2 border-ink/70 bg-background px-4 text-body uppercase outline-none placeholder:normal-case placeholder:text-foreground/40 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/20 aria-invalid:border-destructive"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-sm border-2 border-ink px-5 text-small font-semibold transition-colors hover:border-primary/60 motion-reduce:transition-none"
        >
          {m.store_couponApply()}
        </button>
      </div>
      {invalid && (
        <p id="cupom-erro" role="alert" className="text-micro text-destructive">
          {m.store_couponInvalid()}
        </p>
      )}
    </form>
  )
}
