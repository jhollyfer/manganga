import { createFileRoute } from '@tanstack/react-router'

import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

/**
 * A home. O conteúdo mora em `lib/`, e o `loader` só fixa o "agora" no
 * servidor, para a agenda e a contagem do festival saírem iguais no HTML e na
 * hidratação.
 *
 * O título é só o nome do site, e não "Início · Mangangá": é a página que o
 * buscador mostra para quem procura o boi pelo nome.
 */
export const Route = createFileRoute('/_public/')({
  loader: () => ({ now: Date.now() }),
  head: () =>
    pageHead({ path: '/', title: null, description: m.meta_description() }),
})
