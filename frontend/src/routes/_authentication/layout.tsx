import type * as React from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'

import { BrandStar } from '#/components/common/brand-mark'
import { ThemeToggle } from '#/components/common/theme-toggle'
import { SITE_TITLE } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * A casca da entrada: o palco escuro inteiro, com a estrela no alto e o
 * cartão no meio.
 *
 * Sem o cabeçalho e o rodapé da vitrine de propósito: quem chega aqui veio
 * trabalhar, e um menu com loja e agenda em volta do formulário de senha só
 * oferece saída para o lugar errado. A única saída é o "voltar ao site".
 *
 * `noindex` em toda a área, e não só na página: a entrada não tem nada que o
 * buscador deva mostrar, e o `robots.txt` sozinho não tira do índice um
 * endereço que alguém já linkou.
 */
export const Route = createFileRoute('/_authentication')({
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: RouteComponent,
})

function RouteComponent(): React.JSX.Element {
  return (
    <div className="stage relative flex min-h-dvh flex-col">
      <header className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-small text-on-stage/75 transition-colors hover:text-on-stage"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          {m.signin_backToSite()}
        </Link>
        <ThemeToggle className="size-11 text-on-stage hover:bg-on-stage/10 hover:text-on-stage" />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-4 pb-16">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <BrandStar className="size-14" />
          <span className="font-display text-h4 font-bold">{SITE_TITLE}</span>
        </div>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
