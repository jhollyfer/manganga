import type * as React from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { WhatsappLogoIcon } from '@phosphor-icons/react'

import { Footer } from './-components/footer'
import { Header } from './-components/header'
import { WHATSAPP_URL } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * O site público: a vitrine institucional e a loja, na mesma casca.
 *
 * A loja mora aqui dentro e não num layout próprio de propósito: o Caprichoso
 * manda a loja para outro domínio, com outra cara, e quem atravessa o link
 * sente que saiu do site. Aqui o cabeçalho, o carrinho e o rodapé são os
 * mesmos do começo ao fim da compra.
 *
 * A casca (cabeçalho, conteúdo, rodapé) mora aqui e não no `__root.tsx` para
 * que o 404 e o erro do router, que não passam por este layout, desenhem a
 * tela sozinha e sem menu quebrado.
 */
export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

/** O alvo do "pular para o conteúdo". */
const MAIN_ID = 'conteudo'

function RouteComponent(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/*
        Primeiro elemento focável da página. `sr-only` com `focus:not-sr-only`
        e não `display: none`: escondido de verdade o link não receberia foco.
      */}
      <a
        href={'#'.concat(MAIN_ID)}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-stage focus:px-4 focus:py-2 focus:text-on-stage"
      >
        {m.a11y_skipToContent()}
      </a>
      <Header />
      <main id={MAIN_ID} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      {/*
        O "fale com o boi" flutuante, como no Caprichoso. Fora do `<main>`
        para o leitor de tela não o ler no meio do conteúdo, e com rótulo
        próprio porque o ícone sozinho não diz nada.
      */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={m.footer_whatsappTitle()}
        className="fixed right-4 bottom-4 z-40 inline-flex size-13 items-center justify-center rounded-sm border-2 border-ink bg-brand-gold text-ink shadow-[4px_4px_0_0_var(--ink)] transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none md:right-6 md:bottom-6"
      >
        <WhatsappLogoIcon weight="fill" className="size-6" />
      </a>
    </div>
  )
}
