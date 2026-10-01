import * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import { Controller, useForm, useWatch } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import {
  BarcodeIcon,
  CreditCardIcon,
  InfoIcon,
  LockSimpleIcon,
  PixLogoIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'

import { CartSkeleton, EmptyCart } from './-components/empty-cart'
import { ShippingOptions } from './-components/shipping'
import { OrderSummary } from './-components/summary'
import { useHydrated } from './-components/use-hydrated'
import { saveOrder } from './-components/use-orders'
import { FIELD, LABEL } from '../-components/form-style'
import { PageHero } from '../-components/page-hero'
import { PillButton } from '../-components/pill-button'
import { ProductArt } from '../-components/product-art'
import { useCart } from '../-components/use-cart'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { PAYMENT_METHODS } from '#/lib/entity'
import type { PaymentMethod } from '#/lib/entity'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { localized } from '#/lib/i18n'
import { PAYMENT_METHOD_LABELS } from '#/lib/labels'
import { lineKey, resolveLines } from '#/lib/store/cart'
import type { Cart } from '#/lib/store/cart'
import { colorOf } from '#/lib/store/catalog'
import {
  MAX_INSTALLMENTS,
  PIX_DISCOUNT_PERCENT,
  formatMoney,
} from '#/lib/store/money'
import { buildOrder, orderCode, summarize } from '#/lib/store/order'
import { formatCep, parseCep, quoteShipping } from '#/lib/store/shipping'
import type { ShippingMethod } from '#/lib/store/shipping'
import { cn } from '#/lib/utils'
import { CheckoutValidator } from '#/lib/validator'
import type { CheckoutPayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_public/loja/checkout')

export const Route = createLazyFileRoute('/_public/loja/checkout')({
  component: RouteComponent,
})

/** O começo do CEP de Benjamin Constant, onde cidade e UF já se sabem. */
const HOME_CEP_PREFIX = '6963'

/**
 * O checkout, numa página só: identificação, entrega e pagamento, com o
 * resumo ao lado.
 *
 * Como o carrinho, espera hidratar antes de decidir entre o formulário e o
 * "carrinho vazio".
 */
function RouteComponent(): React.JSX.Element {
  const hydrated = useHydrated()
  const [cart] = useCart()
  const empty = resolveLines(cart).length === 0

  let body = <CartSkeleton />
  if (hydrated && empty)
    body = (
      <EmptyCart
        title={m.checkout_emptyTitle()}
        lead={m.checkout_emptyLead()}
      />
    )
  if (hydrated && !empty) body = <CheckoutForm cart={cart} />

  return (
    <>
      <PageHero
        eyebrow={m.nav_store()}
        title={
          <>
            {m.checkout_titleStart()} <em>{m.checkout_titleEm()}</em>
          </>
        }
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.store_cartTitle(), to: '/loja/carrinho' },
          { label: m.checkout_title() },
        ]}
        className="md:pb-16"
      />
      <section className="container-x py-12 md:py-16">{body}</section>
    </>
  )
}

type TextName = Exclude<keyof CheckoutPayload, 'payment'>

/**
 * Um campo de texto do checkout, com o rótulo, o estado inválido e a
 * mensagem de erro ligados como em todo formulário do site.
 *
 * Uma peça para os onze campos porque a fiação é a mesma em todos, e onze
 * cópias são onze chances de um `aria-describedby` apontar para o id
 * errado.
 */
function TextField({
  control,
  name,
  label,
  className,
  onValue,
  ...input
}: {
  control: Control<CheckoutPayload>
  name: TextName
  label: string
  className?: string
  /** Chamado a cada mudança, depois do formulário receber o valor. */
  onValue?: (value: string) => void
  type?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  placeholder?: string
  maxLength?: number
}): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={name} className={LABEL}>
            {label}
          </FieldLabel>
          <Input
            {...input}
            {...field}
            value={field.value ?? ''}
            onChange={(event) => {
              field.onChange(event.target.value)
              onValue?.(event.target.value)
            }}
            id={name}
            className={cn(FIELD, 'md:text-body')}
            {...invalidProps(fieldState.invalid, name)}
          />
          {fieldState.error && (
            <FieldError id={errorId(name)}>
              {fieldState.error.message}
            </FieldError>
          )}
        </Field>
      )}
    />
  )
}

/** O cabeçalho numerado de cada etapa. */
function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <fieldset className="grid gap-6 rounded-sm border border-border bg-surface p-6 md:p-8">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden="true" className="flex items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-small font-bold text-primary-foreground">
          {number}
        </span>
        <span className="font-display text-h3">{title}</span>
      </p>
      {children}
    </fieldset>
  )
}

const PAYMENT_ICONS: Record<
  PaymentMethod,
  React.ComponentType<{ className?: string }>
> = {
  pix: PixLogoIcon,
  card: CreditCardIcon,
  boleto: BarcodeIcon,
}

function CheckoutForm({ cart }: { cart: Cart }): React.JSX.Element {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [, actions] = useCart()

  let initialCep = ''
  if (search.cep) initialCep = formatCep(search.cep)

  const form = useForm<CheckoutPayload>({
    resolver: vineResolver(CheckoutValidator),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      document: '',
      cep: initialCep,
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
      payment: 'pix',
    },
  })

  const [method, setMethod] = React.useState<ShippingMethod | null>(
    search.shipping ?? null,
  )
  const [shippingMissing, setShippingMissing] = React.useState(false)

  const cepValue = useWatch({ control: form.control, name: 'cep' })
  const payment = useWatch({ control: form.control, name: 'payment' })

  const lines = resolveLines(cart)
  const base = summarize(cart, null)
  const cep = parseCep(cepValue)
  let options: ReturnType<typeof quoteShipping> = []
  if (cep) options = quoteShipping(cep, base.subtotal)
  /*
   * A entrega escolhida no carrinho, se ela existe para este CEP; senão a
   * primeira, que é a mais barata. Derivada a cada render, e não guardada:
   * trocar o CEP troca as opções, e uma escolha guardada apontaria para uma
   * entrega que o CEP novo não tem.
   */
  const chosen =
    options.find((option) => option.method === method) ?? options.at(0)
  const summary = summarize(cart, chosen?.price ?? null)

  let total = summary.total
  let pixDiscount = 0
  if (payment === 'pix') {
    total = summary.pixTotal
    pixDiscount = summary.total - summary.pixTotal
  }

  // As parcelas só fazem sentido sob o total de quem paga no cartão.
  let cardPlan: typeof summary.installments | undefined
  if (payment === 'card') cardPlan = summary.installments

  // O aviso vira alerta só depois da tentativa de fechar sem frete.
  let hintRole: 'alert' | undefined
  if (shippingMissing) hintRole = 'alert'

  /** CEP de Benjamin Constant já sabe a cidade e a UF. */
  function fillHome(value: string): void {
    const digits = parseCep(value)
    if (!digits?.startsWith(HOME_CEP_PREFIX)) return
    if (!form.getValues('city'))
      form.setValue('city', 'Benjamin Constant', { shouldValidate: true })
    if (!form.getValues('state'))
      form.setValue('state', 'AM', { shouldValidate: true })
  }

  async function submit(payload: CheckoutPayload): Promise<void> {
    if (!chosen) {
      setShippingMissing(true)
      form.setFocus('cep')

      return
    }

    const code = orderCode()
    saveOrder(
      buildOrder({ cart, payload, shipping: chosen, code, now: new Date() }),
    )
    /*
     * Navega antes de esvaziar o carrinho: na ordem inversa esta tela
     * desenharia "carrinho vazio" no instante entre as duas coisas.
     */
    await navigate({ to: '/loja/pedido/$code', params: { code } })
    actions.clear()
  }

  const PAYMENT_NOTES: Record<PaymentMethod, string> = {
    pix: m.checkout_paymentPixNote({
      percent: PIX_DISCOUNT_PERCENT,
      price: formatMoney(summary.pixTotal),
    }),
    card: m.checkout_paymentCardNote({
      count: summary.installments.count,
      value: formatMoney(summary.installments.value),
      max: MAX_INSTALLMENTS,
    }),
    boleto: m.checkout_paymentBoletoNote(),
  }

  return (
    <form
      method="post"
      noValidate
      onSubmit={form.handleSubmit(submit)}
      className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14"
    >
      <div className="grid content-start gap-6">
        <p className="flex items-start gap-3 rounded-sm border border-brand-gold/40 bg-brand-gold/10 p-4 text-small leading-relaxed">
          <InfoIcon
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-warning"
          />
          {m.checkout_demoNotice()}
        </p>

        <Step number={1} title={m.checkout_stepIdentification()}>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              control={form.control}
              name="name"
              label={m.checkout_name()}
              autoComplete="name"
              className="md:col-span-2"
            />
            <TextField
              control={form.control}
              name="email"
              label={m.checkout_email()}
              type="email"
              autoComplete="email"
              inputMode="email"
            />
            <TextField
              control={form.control}
              name="phone"
              label={m.checkout_phone()}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="(97) 98431-7149"
            />
            <TextField
              control={form.control}
              name="document"
              label={m.checkout_document()}
              inputMode="numeric"
              placeholder="000.000.000-00"
              className="md:col-span-2"
            />
          </div>
        </Step>

        <Step number={2} title={m.checkout_stepDelivery()}>
          <div className="grid gap-5 md:grid-cols-6">
            <TextField
              control={form.control}
              name="cep"
              label={m.checkout_cep()}
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="00000-000"
              maxLength={9}
              onValue={(value) => {
                setShippingMissing(false)
                fillHome(value)
              }}
              className="md:col-span-2"
            />
            <TextField
              control={form.control}
              name="street"
              label={m.checkout_street()}
              autoComplete="address-line1"
              className="md:col-span-4"
            />
            <TextField
              control={form.control}
              name="number"
              label={m.checkout_number()}
              className="md:col-span-2"
            />
            <TextField
              control={form.control}
              name="complement"
              label={m.checkout_complement()}
              autoComplete="address-line2"
              className="md:col-span-4"
            />
            <TextField
              control={form.control}
              name="district"
              label={m.checkout_district()}
              className="md:col-span-2"
            />
            <TextField
              control={form.control}
              name="city"
              label={m.checkout_city()}
              autoComplete="address-level2"
              className="md:col-span-3"
            />
            <TextField
              control={form.control}
              name="state"
              label={m.checkout_state()}
              autoComplete="address-level1"
              maxLength={2}
              placeholder="AM"
            />
          </div>

          <div className="grid gap-3">
            <p className="text-small font-semibold">
              {m.checkout_shippingTitle()}
            </p>
            {options.length > 0 && (
              <ShippingOptions
                options={options}
                name="checkout-entrega"
                selected={chosen?.method}
                onSelect={setMethod}
              />
            )}
            {options.length === 0 && (
              <p
                className={cn(
                  'flex items-center gap-2 rounded-sm bg-secondary px-4 py-3 text-small text-muted-foreground',
                  shippingMissing && 'bg-destructive/10 text-destructive',
                )}
                role={hintRole}
              >
                <WarningCircleIcon aria-hidden="true" className="size-4" />
                {m.checkout_shippingHint()}
              </p>
            )}
          </div>
        </Step>

        <Step number={3} title={m.checkout_stepPayment()}>
          <Controller
            control={form.control}
            name="payment"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-label={m.checkout_stepPayment()}
                className="grid gap-3"
              >
                {PAYMENT_METHODS.map((each) => {
                  const Icon = PAYMENT_ICONS[each]

                  return (
                    <label
                      key={each}
                      className="flex cursor-pointer items-start gap-4 rounded-sm border border-foreground/15 p-4 transition-colors has-checked:border-primary has-checked:bg-primary/[0.06] has-focus-visible:ring-2 has-focus-visible:ring-ring/40 motion-reduce:transition-none"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={each}
                        checked={field.value === each}
                        onChange={() => field.onChange(each)}
                        onBlur={field.onBlur}
                        className="mt-1 size-4 accent-primary"
                      />
                      <Icon className="mt-0.5 size-6 shrink-0 text-primary" />
                      <span className="grid gap-1">
                        <span className="text-body font-semibold">
                          {PAYMENT_METHOD_LABELS[each]()}
                        </span>
                        <span className="text-small leading-relaxed text-muted-foreground">
                          {PAYMENT_NOTES[each]}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          />
        </Step>
      </div>

      <aside
        aria-label={m.store_summaryTitle()}
        className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="grid gap-6 rounded-sm border border-border bg-surface p-6">
          <h2 className="text-h3">{m.store_summaryTitle()}</h2>
          <ul className="grid gap-4">
            {lines.map(({ line, product, total: lineTotal }) => {
              const color = colorOf(product, line.color)

              return (
                <li
                  key={lineKey(line)}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <span className="relative block aspect-square">
                    <ProductArt
                      art={product.art}
                      color={color?.hex ?? '#f7f6f0'}
                      className="rounded-sm p-1"
                    />
                    <span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-foreground text-2xs font-bold text-background">
                      {line.quantity}
                    </span>
                  </span>
                  <span className="grid gap-0.5">
                    <span className="truncate text-small font-medium">
                      {localized(product.name)}
                    </span>
                    <span className="text-micro text-muted-foreground">
                      {[line.size, color && localized(color.name)]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </span>
                  <span className="text-small tabular-nums">
                    {formatMoney(lineTotal)}
                  </span>
                </li>
              )
            })}
          </ul>
          <OrderSummary
            subtotal={summary.subtotal}
            discount={summary.discount}
            coupon={cart.coupon}
            pixDiscount={pixDiscount}
            shipping={summary.shipping}
            total={total}
            installments={cardPlan}
          />
          <PillButton type="submit" disabled={form.formState.isSubmitting}>
            <LockSimpleIcon weight="bold" />
            {m.checkout_submit()}
          </PillButton>
          <Link
            to="/loja/carrinho"
            className="text-center text-small font-medium text-primary underline underline-offset-4"
          >
            {m.checkout_backToCart()}
          </Link>
        </div>
        <p className="px-2 text-micro leading-relaxed text-muted-foreground">
          {m.checkout_privacy()}{' '}
          <Link to="/privacidade" className="underline underline-offset-4">
            {m.nav_privacy()}
          </Link>
          .
        </p>
      </aside>
    </form>
  )
}
