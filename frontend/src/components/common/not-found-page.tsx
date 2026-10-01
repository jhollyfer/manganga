import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'

import { BrandStar } from '#/components/common/brand-mark'
import { Button } from '#/components/ui/button'
import { ButtonGroup } from '#/components/ui/button-group'
import { cn } from '#/lib/utils'
import type { Merge } from '#/lib/interfaces'
import { m } from '#/paraglide/messages'

type NotFoundPageProps = Merge<
  React.ComponentProps<'section'>,
  {
    /**
     * O código na pílula. `404` por padrão; a fronteira de erro do router passa
     * `500`, e sem este parâmetro anunciaria "404" para uma falha de servidor.
     */
    code?: React.ReactNode
  }
>

/**
 * A página de saída: endereço que não existe, e também erro não tratado.
 *
 * A mesma API compound do academy (`Title`, `Subtitle`, `Description`,
 * `Actions`, `HomeButton`), com a cara do Mangangá: o palco escuro, a estrela
 * do Besouro e a pílula com o código. Sem children, escreve o 404 genérico; a
 * fronteira de erro troca as partes que quiser.
 */
export function NotFoundPage({
  className,
  code = '404',
  children,
  ...props
}: NotFoundPageProps): React.JSX.Element {
  return (
    <section
      data-slot="not-found-page"
      className={cn(
        'stage relative flex min-h-dvh items-center overflow-hidden px-4 pt-16',
        className,
      )}
      {...props}
    >
      <div className="relative mx-auto flex max-w-3xl flex-col items-center py-24 text-center">
        <BrandStar className="mb-8 size-16 float-gentle motion-reduce:animate-none" />
        <span className="mb-7 inline-flex items-center rounded-full border border-brand-leaf/40 bg-brand-leaf/10 px-3.5 py-1.5 text-micro font-bold text-brand-leaf">
          {code}
        </span>
        {children ?? (
          <>
            <NotFoundPageTitle>{m.notFound_title()}</NotFoundPageTitle>
            <NotFoundPageDescription>
              {m.notFound_description()}
            </NotFoundPageDescription>
            <NotFoundPageActions>
              <NotFoundPageHomeButton />
            </NotFoundPageActions>
          </>
        )}
      </div>
    </section>
  )
}

export function NotFoundPageTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>): React.JSX.Element {
  return (
    <h1
      data-slot="not-found-page-title"
      className={cn('text-display tracking-[-0.02em]', className)}
      {...props}
    />
  )
}

export function NotFoundPageSubtitle({
  className,
  ...props
}: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="not-found-page-subtitle"
      className={cn('mt-4 text-h4 font-semibold text-on-stage', className)}
      {...props}
    />
  )
}

export function NotFoundPageDescription({
  className,
  ...props
}: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="not-found-page-description"
      className={cn('mt-7 max-w-[44ch] text-lead text-on-stage/75', className)}
      {...props}
    />
  )
}

export function NotFoundPageActions({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element | null {
  if (!children) return null

  return (
    // Cada ação num grupo aninhado, como no academy: o `ButtonGroup` cola os
    // filhos diretos, e estas são saídas independentes, não um controle
    // segmentado.
    <ButtonGroup
      data-slot="not-found-page-actions"
      className={cn('mt-10 flex-wrap items-center justify-center', className)}
      {...props}
    >
      {React.Children.map(children, (action) => {
        if (!action) return null

        return <ButtonGroup>{action}</ButtonGroup>
      })}
    </ButtonGroup>
  )
}

/**
 * A saída padrão: voltar ao início.
 *
 * `to` segue prop, porque é destino de navegação e não markup, e como `Link` o
 * botão responde a abrir em nova aba e ao clique do meio.
 */
export function NotFoundPageHomeButton({
  to = '/',
  children,
}: {
  to?: string
  children?: React.ReactNode
}): React.JSX.Element {
  return (
    <Button
      nativeButton={false}
      variant="outline"
      size="lg"
      data-slot="not-found-page-home-button"
      className="w-fit rounded-full border-on-stage/30 bg-transparent px-6 text-on-stage hover:bg-on-stage/10 hover:text-on-stage"
      render={
        <Link to={to}>
          <ArrowLeftIcon />
          {children ?? m.notFound_returnHome()}
        </Link>
      }
    />
  )
}
