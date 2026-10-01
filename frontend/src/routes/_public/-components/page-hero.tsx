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
  /** A foto larga embaixo do título. */
  cover?: Cover
  /** A trilha até aqui, sem a home (que entra sozinha) e sem a própria página. */
  crumbs?: ReadonlyArray<Crumb>
  /** O que vem depois do texto: ações, filtros, metadados. */
  children?: React.ReactNode
  className?: string
}

/**
 * O topo das páginas internas: a trilha, o título, a frase de apoio e, quando
 * a página tem imagem, a foto larga logo abaixo, como a abertura de matéria.
 *
 * A versão cartaz colava a imagem ao lado do título como recorte torto com
 * borda de tinta; antes dela, a foto esmaecida atrás do título sob gradiente.
 * Os dois eram enfeite. Aqui a foto vem inteira, reta, na largura do texto.
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
        'relative border-b border-border pt-28 pb-14 md:pt-36 md:pb-20',
        className,
      )}
    >
      <div className="container-x">
        <nav aria-label={m.a11y_breadcrumb()} className={cn(REVEAL, 'mb-8')}>
          <ol className="flex flex-wrap items-center gap-2 text-small text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                {m.nav_home()}
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {crumb.to && (
                  <Link to={crumb.to} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
                {!crumb.to && <span>{crumb.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-5xl">
          {eyebrow && (
            <p className={cn(REVEAL, 'eyebrow mb-4 text-muted-foreground')}>
              {eyebrow}
            </p>
          )}
          <h1 className={cn(REVEAL, 'text-h1 delay-75')}>{title}</h1>
          {lead && (
            <p
              className={cn(
                REVEAL,
                'mt-6 max-w-[58ch] text-lead leading-snug text-muted-foreground delay-150',
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
              'mt-12 aspect-[16/9] overflow-hidden bg-stage delay-200 md:mt-16 md:aspect-[21/9]',
            )}
          >
            <CoverImage cover={cover} loading="eager" />
          </div>
        )}
      </div>
    </section>
  )
}
