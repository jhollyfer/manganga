import * as React from 'react'
import {
  Link,
  createLazyFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import {
  CaretRightIcon,
  CheckCircleIcon,
  LightningIcon,
  ShoppingBagIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

import { InstallmentsDialog } from '../-components/installments-dialog'
import { ProductBadges } from '../-components/product-badges'
import { ProductPrice } from '../-components/product-price'
import { ProductRail } from '../-components/product-rail'
import { QuantityStepper } from '../-components/quantity-stepper'
import { ShippingCalculator } from '../-components/shipping'
import { SizeGuideDialog } from '../-components/size-guide'
import { StoreNav } from '../-components/store-nav'
import { PillButton } from '../../-components/pill-button'
import { ProductArt } from '../../-components/product-art'
import { REVEAL } from '../../-components/reveal'
import { useCart } from '../../-components/use-cart'
import {
  NotFoundPage,
  NotFoundPageActions,
  NotFoundPageDescription,
  NotFoundPageHomeButton,
  NotFoundPageTitle,
} from '#/components/common/not-found-page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { localized } from '#/lib/i18n'
import { WHATSAPP_URL } from '#/lib/site'
import { MAX_PER_LINE } from '#/lib/store/cart'
import { findCategory, relatedTo, stockLevel } from '#/lib/store/catalog'
import type { Product } from '#/lib/store/catalog'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_public/loja/produto/$slug')

export const Route = createLazyFileRoute('/_public/loja/produto/$slug')({
  component: RouteComponent,
  notFoundComponent: ProductNotFound,
})

/**
 * O produto que não existe, ou que saiu da loja. Quem chega aqui veio de um
 * link compartilhado de uma peça que acabou, e o que interessa é que há
 * outras.
 */
function ProductNotFound(): React.JSX.Element {
  return (
    <NotFoundPage className="min-h-[80dvh]">
      <NotFoundPageTitle>{m.product_notFound()}</NotFoundPageTitle>
      <NotFoundPageDescription>
        {m.product_notFoundLead()}
      </NotFoundPageDescription>
      <NotFoundPageActions>
        <NotFoundPageHomeButton to="/loja">
          {m.store_backToStore()}
        </NotFoundPageHomeButton>
      </NotFoundPageActions>
    </NotFoundPage>
  )
}

/**
 * `key` no endereço do produto: tocar num relacionado troca o produto sem
 * desmontar a rota, e a cor, o tamanho e a quantidade escolhidos para a
 * camisa não podem passar para o boné.
 */
function RouteComponent(): React.JSX.Element {
  const product = route.useLoaderData()

  return <ProductPage key={product.slug} product={product} />
}

const CHIP =
  'inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-foreground/15 px-3.5 text-small font-semibold transition-colors hover:border-foreground/45 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background motion-reduce:transition-none'

/** Os tamanhos infantis são números; os adultos, letras. */
function isKidsGrid(product: Product): boolean {
  return product.sizes.some((size) => /^\d+$/.test(size))
}

function ProductPage({ product }: { product: Product }): React.JSX.Element {
  const navigate = useNavigate()
  const [, cart] = useCart()
  const category = findCategory(product.category)
  const level = stockLevel(product)
  const soldOut = level === 'out'
  const name = localized(product.name)

  const [colorId, setColorId] = React.useState(product.colors.at(0)?.id ?? '')
  const [size, setSize] = React.useState<string | null>(null)
  const [sizeMissing, setSizeMissing] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)
  const [cep, setCep] = React.useState<string | null>(null)
  const sizesRef = React.useRef<HTMLDivElement>(null)

  const color =
    product.colors.find((each) => each.id === colorId) ?? product.colors.at(0)
  const needsSize = product.sizes.length > 0
  const max = Math.max(1, Math.min(MAX_PER_LINE, product.stock))

  /**
   * Põe a variação no carrinho, ou aponta o tamanho que falta.
   *
   * O foco vai para a grade de tamanhos quando ela falta: o aviso em vermelho
   * pode estar fora da tela no celular, e quem usa leitor de tela precisa
   * chegar ao campo que impede a compra.
   */
  function add(): boolean {
    if (soldOut) return false
    if (needsSize && !size) {
      setSizeMissing(true)
      sizesRef.current?.querySelector('button')?.focus()

      return false
    }

    cart.add({ slug: product.slug, size, color: colorId, quantity })

    return true
  }

  function addToCart(): void {
    if (!add()) return

    toast.success(m.product_addedToast({ name }), {
      id: 'carrinho',
      action: {
        label: m.product_viewCart(),
        onClick: () => void navigate({ to: '/loja/carrinho' }),
      },
    })
  }

  function buyNow(): void {
    if (!add()) return

    void navigate({ to: '/loja/checkout' })
  }

  return (
    <>
      <div className="pt-16">
        <StoreNav />
      </div>

      <section className="container-x pt-8 pb-16 md:pt-10 md:pb-24">
        <nav aria-label={m.a11y_breadcrumb()} className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-micro text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                {m.nav_home()}
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <CaretRightIcon aria-hidden="true" className="size-3" />
              <Link to="/loja" className="hover:text-foreground">
                {m.nav_store()}
              </Link>
            </li>
            {category && (
              <li className="flex items-center gap-1.5">
                <CaretRightIcon aria-hidden="true" className="size-3" />
                <Link
                  to="/loja/categoria/$slug"
                  params={{ slug: category.slug }}
                  className="hover:text-foreground"
                >
                  {localized(category.name)}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <CaretRightIcon aria-hidden="true" className="size-3" />
              <span aria-current="page" className="text-foreground">
                {name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div
            className={cn(REVEAL, 'min-w-0 lg:sticky lg:top-40 lg:self-start')}
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
              <ProductArt
                art={product.art}
                color={color?.hex ?? '#f7f6f0'}
                label={m.product_artLabel({
                  name,
                  color: localized(color?.name ?? product.name),
                })}
                className="p-8 md:p-14"
              />
              <ProductBadges
                product={product}
                className="absolute top-4 left-4"
              />
            </div>
            {product.colors.length > 1 && (
              <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.colors.map((each) => (
                  <li key={each.id}>
                    <button
                      type="button"
                      aria-pressed={each.id === colorId}
                      aria-label={localized(each.name)}
                      onClick={() => setColorId(each.id)}
                      className="block aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-border transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground motion-reduce:transition-none"
                    >
                      <ProductArt
                        art={product.art}
                        color={each.hex}
                        className="p-2"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cn(REVEAL, 'grid min-w-0 content-start gap-7 delay-100')}
          >
            <div className="grid gap-4">
              {category && (
                <Link
                  to="/loja/categoria/$slug"
                  params={{ slug: category.slug }}
                  className="eyebrow w-fit text-primary-glow"
                >
                  <span aria-hidden="true" className="h-px w-8 bg-current" />
                  {localized(category.name)}
                </Link>
              )}
              <h1 className="text-h1">{name}</h1>
              <p className="text-body-lg leading-relaxed text-muted-foreground">
                {localized(product.summary)}
              </p>
            </div>

            <div className="grid gap-3">
              <ProductPrice product={product} size="page" />
              <InstallmentsDialog price={product.price} />
            </div>

            {product.colors.length > 0 && (
              <fieldset className="grid gap-3">
                <legend className="mb-3 text-small">
                  <span className="font-semibold">{m.product_color()}:</span>{' '}
                  <span className="text-muted-foreground">
                    {localized(color?.name ?? product.name)}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((each) => (
                    <button
                      key={each.id}
                      type="button"
                      aria-pressed={each.id === colorId}
                      aria-label={localized(each.name)}
                      title={localized(each.name)}
                      onClick={() => setColorId(each.id)}
                      className="size-10 rounded-full ring-1 ring-foreground/20 ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground motion-reduce:transition-none"
                      style={{ backgroundColor: each.hex }}
                    />
                  ))}
                </div>
              </fieldset>
            )}

            {needsSize && (
              <fieldset className="grid gap-3">
                <legend className="mb-3 text-small font-semibold">
                  {m.product_size()}
                </legend>
                <div ref={sizesRef} className="flex flex-wrap gap-2">
                  {product.sizes.map((each) => (
                    <button
                      key={each}
                      type="button"
                      aria-pressed={each === size}
                      onClick={() => {
                        setSize(each)
                        setSizeMissing(false)
                      }}
                      className={CHIP}
                    >
                      {each}
                    </button>
                  ))}
                </div>
                {sizeMissing && (
                  <p
                    role="alert"
                    className="flex items-center gap-1.5 text-small text-destructive"
                  >
                    <WarningCircleIcon aria-hidden="true" className="size-4" />
                    {m.product_sizeMissing()}
                  </p>
                )}
                <SizeGuideDialog kids={isKidsGrid(product)} />
              </fieldset>
            )}

            <div className="grid gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={max}
                  label={name}
                />
                <StockHint level={level} />
              </div>

              {!soldOut && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <PillButton type="button" onClick={addToCart}>
                    <ShoppingBagIcon weight="bold" />
                    {m.product_addToCart()}
                  </PillButton>
                  <PillButton type="button" tone="outline" onClick={buyNow}>
                    <LightningIcon weight="bold" />
                    {m.product_buyNow()}
                  </PillButton>
                </div>
              )}
              {soldOut && (
                <div className="grid gap-3 rounded-2xl bg-secondary p-5">
                  <PillButton type="button" disabled>
                    {m.product_soldOut()}
                  </PillButton>
                  <p className="text-small text-muted-foreground">
                    {m.product_soldOutLead()}{' '}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary underline underline-offset-4"
                    >
                      {m.product_soldOutWhatsapp()}
                    </a>
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-border p-5">
              <ShippingCalculator
                subtotal={product.price * quantity}
                cep={cep}
                onCepChange={setCep}
              />
            </div>

            <Accordion
              defaultValue={['detalhes']}
              className="rounded-none border-x-0 border-b-0"
            >
              <AccordionItem
                value="detalhes"
                className="data-open:bg-transparent"
              >
                <AccordionTrigger className="font-sans px-0 py-4 text-body font-semibold hover:no-underline">
                  {m.product_tabDetails()}
                </AccordionTrigger>
                <AccordionContent className="grid gap-4 px-0 text-body leading-relaxed text-muted-foreground">
                  <p>{localized(product.description)}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small">
                    {category && (
                      <>
                        <dt className="font-semibold text-foreground">
                          {m.product_detailCategory()}
                        </dt>
                        <dd>{localized(category.name)}</dd>
                      </>
                    )}
                    <dt className="font-semibold text-foreground">
                      {m.product_detailColors()}
                    </dt>
                    <dd>
                      {product.colors
                        .map((each) => localized(each.name))
                        .join(', ')}
                    </dd>
                    <dt className="font-semibold text-foreground">
                      {m.product_detailSizes()}
                    </dt>
                    <dd>
                      {product.sizes.join(', ') || m.product_detailOneSize()}
                    </dd>
                    <dt className="font-semibold text-foreground">
                      {m.product_detailCode()}
                    </dt>
                    <dd className="font-mono text-micro">{product.slug}</dd>
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="entrega"
                className="data-open:bg-transparent"
              >
                <AccordionTrigger className="font-sans px-0 py-4 text-body font-semibold hover:no-underline">
                  {m.product_tabDelivery()}
                </AccordionTrigger>
                <AccordionContent className="grid gap-3 px-0 text-body leading-relaxed text-muted-foreground">
                  <p>{m.product_deliveryText()}</p>
                  <Link
                    to="/loja/ajuda/$slug"
                    params={{ slug: 'entregas-e-prazos' }}
                    className="w-fit text-small font-semibold text-primary"
                  >
                    {m.product_deliveryLink()}
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="trocas"
                className="data-open:bg-transparent"
              >
                <AccordionTrigger className="font-sans px-0 py-4 text-body font-semibold hover:no-underline">
                  {m.product_tabExchanges()}
                </AccordionTrigger>
                <AccordionContent className="grid gap-3 px-0 text-body leading-relaxed text-muted-foreground">
                  <p>{m.product_exchangesText()}</p>
                  <Link
                    to="/loja/ajuda/$slug"
                    params={{ slug: 'trocas-e-devolucoes' }}
                    className="w-fit text-small font-semibold text-primary"
                  >
                    {m.product_exchangesLink()}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <ProductRail
        id="produto-relacionados"
        eyebrow={m.product_relatedEyebrow()}
        title={
          <>
            {m.product_relatedTitleStart()}{' '}
            <em>{m.product_relatedTitleEm()}</em>.
          </>
        }
        products={relatedTo(product, 8)}
        className="border-t border-border bg-surface"
      />
    </>
  )
}

/** O aviso de estoque ao lado da quantidade. */
function StockHint({
  level,
}: {
  level: ReturnType<typeof stockLevel>
}): React.JSX.Element {
  if (level === 'out')
    return (
      <p className="text-small font-semibold text-destructive">
        {m.product_soldOut()}
      </p>
    )

  if (level === 'low')
    return (
      <p className="flex items-center gap-2 text-small font-semibold text-brand-urucum">
        <span className="size-2 animate-pulse rounded-full bg-brand-urucum motion-reduce:animate-none" />
        {m.product_lowStock()}
      </p>
    )

  return (
    <p className="flex items-center gap-1.5 text-small text-muted-foreground">
      <CheckCircleIcon aria-hidden="true" className="size-4 text-primary" />
      {m.product_inStock()}
    </p>
  )
}
