import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { CoverImage } from './artwork'
import { REVEAL } from './reveal'
import type { Cover } from '#/lib/media'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

export type Crumb = {
  label: string
  to?: string
}

type PageHeroProps = {
  /** O `h1` da página. A palavra que canta vai em `<em>`. */
  title: React.ReactNode
  eyebrow?: string
  lead?: React.ReactNode
  /** A imagem colada ao lado do título, como recorte no cartaz. */
  cover?: Cover
  /** A trilha até aqui, sem a home (que entra sozinha) e sem a própria página. */
  crumbs?: ReadonlyArray<Crumb>
  /** O que vem depois do texto: ações, filtros, metadados. */
  children?: React.ReactNode
  className?: string
}

/**
 * O topo das páginas internas: papel, título de cartaz e o recorte colado.
 *
 * A primeira versão punha a foto esmaecida atrás do título, sob um gradiente
 * escuro, que é o topo de página de todo site montado no automático. Aqui a
 * imagem é um recorte com borda de tinta, levemente torto, ao lado do texto,
 * e o título ocupa a largura que quiser. A folha verde fica para a home e
 * para as faixas de destaque, e a página interna abre clara.
 *
 * A trilha é desenhada aqui e o JSON-LD dela fica com a rota, que sabe o
 * endereço absoluto no idioma da requisição.
 */
export function PageHero({
  title,
  eyebrow,
  lead,
  cover,
  crumbs = [],
  children,
  className,
}: PageHeroProps): React.JSX.Element {
  return (
    <section
      data-slot="page-hero"
      className={cn(
        'relative overflow-hidden border-b-2 border-ink pt-28 pb-14 md:pt-36 md:pb-20',
        className,
      )}
    >
      <div className="container-x grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <nav aria-label={m.a11y_breadcrumb()} className={cn(REVEAL, 'mb-6')}>
            <ol className="flex flex-wrap items-center gap-2 text-micro font-bold tracking-[0.1em] text-muted-foreground uppercase">
              <li>
                <Link to="/" className="hover:text-primary-glow">
                  {m.nav_home()}
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {crumb.to && (
                    <Link to={crumb.to} className="hover:text-primary-glow">
                      {crumb.label}
                    </Link>
                  )}
                  {!crumb.to && <span>{crumb.label}</span>}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && (
            <p className={cn(REVEAL, 'eyebrow mb-4 text-primary-glow')}>
              {eyebrow}
            </p>
          )}
          <h1 className={cn(REVEAL, 'text-h1 delay-75')}>{title}</h1>
          {lead && (
            <p
              className={cn(
                REVEAL,
                'mt-6 max-w-[56ch] text-lead leading-snug text-muted-foreground delay-150',
              )}
            >
              {lead}
            </p>
          )}
          {children}
        </div>

        {cover && (
          <div
            aria-hidden="true"
            className={cn(
              REVEAL,
              'sticker hidden aspect-[4/5] w-72 rotate-2 overflow-hidden p-0 delay-200 lg:block xl:w-80',
            )}
          >
            <CoverImage cover={cover} loading="eager" />
          </div>
        )}
      </div>
    </section>
  )
}
