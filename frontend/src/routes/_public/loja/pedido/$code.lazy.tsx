import type * as React from 'react'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import {
  BarcodeIcon,
  CheckIcon,
  CopyIcon,
  CreditCardIcon,
  PackageIcon,
  PixLogoIcon,
  ReceiptIcon,
  TruckIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

import { CartSkeleton } from '../-components/empty-cart'
import {
  SHIPPING_METHOD_LABELS,
  shippingDeadline,
} from '../../-components/store-labels'
import { OrderSummary } from '../-components/summary'
import { useOrder } from '../-components/use-orders'
import { PageHero } from '../../-components/page-hero'
import { PillButton } from '../../-components/pill-button'
import { ProductArt } from '../../-components/product-art'
import {
  NotFoundPage,
  NotFoundPageActions,
  NotFoundPageDescription,
  NotFoundPageHomeButton,
  NotFoundPageTitle,
} from '#/components/common/not-found-page'
import type { PaymentMethod } from '#/lib/entity'
import { localized } from '#/lib/i18n'
import { PAYMENT_METHOD_LABELS } from '#/lib/labels'
import { CONTACT, WHATSAPP_URL } from '#/lib/site'
import { formatMoney } from '#/lib/store/money'
import { orderItemCount } from '#/lib/store/order'
import type { Order } from '#/lib/store/order'
import { formatCep } from '#/lib/store/shipping'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

const route = getRouteApi('/_public/loja/pedido/$code')

export const Route = createLazyFileRoute('/_public/loja/pedido/$code')({
  component: RouteComponent,
  notFoundComponent: OrderNotFound,
})

/**
 * O pedido que não está neste navegador.
 *
 * O caso comum não é código errado: é a pessoa abrindo o link do pedido no
 * celular depois de comprar no computador. Daí a frase explicar onde o
 * pedido fica guardado, e a saída principal ser o WhatsApp, onde a equipe
 * acha o pedido pelo código.
 */
function OrderNotFound(): React.JSX.Element {
  return (
    <NotFoundPage className="min-h-[80dvh]">
      <NotFoundPageTitle>{m.order_notFound()}</NotFoundPageTitle>
      <NotFoundPageDescription>
        {m.order_notFoundLead()}
      </NotFoundPageDescription>
      <NotFoundPageActions>
        <PillButton
          tone="light"
          render={
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" />
          }
        >
          <WhatsappLogoIcon />
          {m.order_whatsappCta()}
        </PillButton>
        <NotFoundPageHomeButton to="/loja">
          {m.store_backToStore()}
        </NotFoundPageHomeButton>
      </NotFoundPageActions>
    </NotFoundPage>
  )
}

function RouteComponent(): React.JSX.Element {
  const { code } = route.useParams()
  const lookup = useOrder(code)

  if (lookup.status === 'missing') return <OrderNotFound />

  if (lookup.status === 'loading')
    return (
      <section className="container-x pt-32 pb-24">
        <CartSkeleton />
      </section>
    )

  return <OrderPage order={lookup.order} />
}

/** O link do WhatsApp com a mensagem já escrita, o código e o total. */
function whatsappHref(order: Order): string {
  const text = m.order_whatsappText({
    code: order.code,
    total: formatMoney(order.totals.total),
  })

  return WHATSAPP_URL.concat('?text=', encodeURIComponent(text))
}

async function copy(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(m.order_copied(), { id: 'copiar' })
  } catch {
    // Sem permissão de área de transferência o texto continua na tela, e
    // segurar o dedo sobre ele ainda copia.
    toast.error(m.order_copyFailed(), { id: 'copiar' })
  }
}

const STEPS = [
  { icon: ReceiptIcon, label: () => m.order_stepReceived() },
  { icon: CreditCardIcon, label: () => m.order_stepPayment() },
  { icon: PackageIcon, label: () => m.order_stepPacking() },
  { icon: TruckIcon, label: () => m.order_stepShipping() },
]

/** A etapa em que todo pedido recém-feito está: esperando o pagamento. */
const CURRENT_STEP = 1

const PAYMENT_ICONS: Record<
  PaymentMethod,
  React.ComponentType<{ className?: string }>
> = {
  pix: PixLogoIcon,
  card: CreditCardIcon,
  boleto: BarcodeIcon,
}

/**
 * O que fazer para pagar, por forma de pagamento. Função e não texto, para
 * a mensagem ler o idioma no render.
 */
const PAYMENT_STEPS: Record<PaymentMethod, () => string> = {
  pix: () => m.order_payPix(),
  card: () => m.order_payCard(),
  boleto: () => m.order_payBoleto(),
}

function OrderPage({ order }: { order: Order }): React.JSX.Element {
  const firstName = order.customer.name.split(/\s+/).at(0) ?? ''
  const date = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(order.createdAt))
  const PaymentIcon = PAYMENT_ICONS[order.payment]

  return (
    <>
      <PageHero
        eyebrow={m.order_eyebrow()}
        title={
          <>
            {m.order_titleStart()} <em>{firstName}</em>
          </>
        }
        lead={m.order_lead({ count: orderItemCount(order) })}
        crumbs={[
          { label: m.nav_store(), to: '/loja' },
          { label: m.order_title() },
        ]}
        className="md:pb-16"
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-3 rounded-sm border-2 border-on-stage/40 bg-on-stage/[0.06] py-1.5 pr-1.5 pl-5 text-on-stage">
            <span className="text-micro tracking-[0.14em] text-on-stage/70 uppercase">
              {m.order_code()}
            </span>
            <span className="font-mono text-body-lg font-semibold tracking-wider">
              {order.code}
            </span>
            <button
              type="button"
              onClick={() => void copy(order.code)}
              aria-label={m.order_copyCode()}
              className="inline-flex size-9 items-center justify-center rounded-full bg-on-stage text-stage"
            >
              <CopyIcon className="size-4" />
            </button>
          </p>
          <p className="text-small text-on-stage/60">
            <time dateTime={order.createdAt}>{date}</time>
          </p>
        </div>
      </PageHero>

      <section className="container-x py-12 md:py-16">
        <ol
          aria-label={m.order_statusLabel()}
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STEPS.map((step, index) => {
            const done = index < CURRENT_STEP
            const current = index === CURRENT_STEP

            let state = m.order_stepPending()
            if (done) state = m.order_stepDone()
            if (current) state = m.order_stepCurrent()

            let ariaCurrent: 'step' | undefined
            if (current) ariaCurrent = 'step'

            return (
              <li
                key={index}
                aria-current={ariaCurrent}
                className={cn(
                  'grid gap-3 rounded-sm border border-border p-4',
                  current && 'border-primary bg-primary/[0.06]',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground',
                    done && 'bg-primary text-primary-foreground',
                    current && 'bg-brand-gold text-stage',
                  )}
                >
                  {done && <CheckIcon weight="bold" className="size-5" />}
                  {!done && <step.icon className="size-5" />}
                </span>
                <span className="grid gap-0.5">
                  <span className="text-small font-semibold">
                    {step.label()}
                  </span>
                  <span className="text-micro text-muted-foreground">
                    {state}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14">
          <div className="grid content-start gap-6">
            <article className="grid gap-5 rounded-sm border border-border bg-surface p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-h3">
                <PaymentIcon className="size-7 text-primary" />
                {PAYMENT_METHOD_LABELS[order.payment]()}
              </h2>
              <p className="text-body leading-relaxed text-muted-foreground">
                {PAYMENT_STEPS[order.payment]()}
              </p>
              {order.payment === 'pix' && (
                <div className="grid gap-3 rounded-sm bg-secondary p-4">
                  <p className="text-small font-semibold">{m.order_pixKey()}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="rounded-sm bg-background px-3 py-2 font-mono text-small">
                      {CONTACT.storeEmail}
                    </code>
                    <button
                      type="button"
                      onClick={() => void copy(CONTACT.storeEmail)}
                      className="inline-flex h-10 items-center gap-2 rounded-sm border-2 border-ink px-4 text-small font-semibold"
                    >
                      <CopyIcon aria-hidden="true" className="size-4" />
                      {m.order_copyKey()}
                    </button>
                  </div>
                  <p className="text-small">
                    {m.order_pixAmount({
                      total: formatMoney(order.totals.total),
                    })}
                  </p>
                </div>
              )}
              <p className="rounded-sm border border-brand-gold/40 bg-brand-gold/10 p-4 text-small leading-relaxed">
                {m.checkout_demoNotice()}
              </p>
              <PillButton
                className="w-fit"
                render={
                  <a
                    href={whatsappHref(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <WhatsappLogoIcon />
                {m.order_whatsappCta()}
              </PillButton>
            </article>

            <article className="grid gap-5 rounded-sm border border-border bg-surface p-6 md:p-8">
              <h2 className="text-h3">{m.order_deliveryTitle()}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid content-start gap-1 text-small">
                  <p className="font-semibold">
                    {SHIPPING_METHOD_LABELS[order.shipping.method]()}
                  </p>
                  <p className="text-muted-foreground">
                    {shippingDeadline(order.shipping)}
                  </p>
                </div>
                <address className="grid content-start gap-1 text-small text-muted-foreground not-italic">
                  <span className="font-semibold text-foreground">
                    {order.customer.name}
                  </span>
                  <span>
                    {order.address.street}, {order.address.number}
                    {order.address.complement &&
                      ', '.concat(order.address.complement)}
                  </span>
                  <span>
                    {order.address.district}, {order.address.city} /{' '}
                    {order.address.state}
                  </span>
                  <span>
                    {m.checkout_cep()}{' '}
                    {formatCep(order.address.cep.replace(/\D/g, ''))}
                  </span>
                  <span>
                    {order.customer.email}, {order.customer.phone}
                  </span>
                </address>
              </div>
            </article>
          </div>

          <aside
            aria-label={m.store_summaryTitle()}
            className="grid content-start gap-6 rounded-sm border border-border bg-surface p-6 lg:sticky lg:top-24 lg:self-start"
          >
            <h2 className="text-h3">{m.store_summaryTitle()}</h2>
            <ul className="grid gap-4">
              {order.lines.map((line) => (
                <li
                  key={[line.slug, line.size, line.color.id].join(':')}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <span className="relative block aspect-square">
                    <ProductArt
                      art={line.art}
                      color={line.color.hex}
                      className="rounded-sm p-1"
                    />
                    <span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-foreground text-2xs font-bold text-background">
                      {line.quantity}
                    </span>
                  </span>
                  <span className="grid gap-0.5">
                    <Link
                      to="/loja/produto/$slug"
                      params={{ slug: line.slug }}
                      className="truncate text-small font-medium hover:text-primary"
                    >
                      {localized(line.name)}
                    </Link>
                    <span className="text-micro text-muted-foreground">
                      {[line.size, localized(line.color.name)]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </span>
                  <span className="text-small tabular-nums">
                    {formatMoney(line.unitPrice * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <OrderSummary
              subtotal={order.totals.subtotal}
              discount={order.totals.discount}
              coupon={order.coupon}
              pixDiscount={order.totals.pixDiscount}
              shipping={order.totals.shipping}
              total={order.totals.total}
            />
            <PillButton tone="outline" render={<Link to="/loja" />}>
              {m.order_keepShopping()}
            </PillButton>
          </aside>
        </div>
      </section>
    </>
  )
}
