import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { CaretRightIcon } from '@phosphor-icons/react'

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
  /** A imagem de fundo, escurecida pelo palco. Sem ela o palco fica liso. */
  cover?: Cover
  /** A trilha até aqui, sem a home (que entra sozinha) e sem a própria página. */
  crumbs?: ReadonlyArray<Crumb>
  /** O que vem depois do texto: ações, filtros, metadados. */
  children?: React.ReactNode
  className?: string
}

/**
 * O topo das páginas internas, sobre o palco.
 *
 * O desenho do Caprichoso: faixa escura com a imagem esmaecida ao fundo, trilha
 * de navegação, rótulo, título grande em serifa e a frase de apoio. O
 * `padding` de cima desconta o cabeçalho fixo de 64px.
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
        'stage relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24',
        className,
      )}
    >
      {cover && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <CoverImage cover={cover} loading="eager" className="opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(3_20_11/0.55)_0%,rgb(3_20_11/0.92)_80%,var(--stage)_100%)]" />
        </div>
      )}

      <div className="container-x">
        <nav aria-label={m.a11y_breadcrumb()} className={cn(REVEAL, 'mb-8')}>
          <ol className="flex flex-wrap items-center gap-1.5 text-micro text-on-stage/60">
            <li>
              <Link to="/" className="hover:text-on-stage">
                {m.nav_home()}
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <CaretRightIcon aria-hidden="true" className="size-3" />
                {crumb.to && (
                  <Link to={crumb.to} className="hover:text-on-stage">
                    {crumb.label}
                  </Link>
                )}
                {!crumb.to && <span>{crumb.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-4xl">
          {eyebrow && (
            <p className={cn(REVEAL, 'eyebrow mb-5 text-primary-glow')}>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              REVEAL,
              'text-h1 text-on-stage delay-75 [&_em]:text-primary-glow',
            )}
          >
            {title}
          </h1>
          {lead && (
            <p
              className={cn(
                REVEAL,
                'mt-6 max-w-[58ch] text-lead leading-snug text-on-stage/75 delay-150',
              )}
            >
              {lead}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
