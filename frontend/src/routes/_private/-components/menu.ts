import { ChartLineIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

import { m } from '#/paraglide/messages'

/**
 * Os destinos do painel, lidos pelo menu lateral e pela trilha do cabeçalho.
 *
 * Uma lista só para os dois: com o rótulo escrito em cada um, a trilha dizia
 * "Membros" e o menu "Sócios" na primeira vez que alguém trocasse uma palavra.
 *
 * `fuzzy` decide quem acende no menu. O Dashboard é a raiz do painel e
 * acenderia em toda página se casasse por prefixo; Membros casa por prefixo
 * para continuar aceso quando a lista ganhar subpáginas.
 *
 * `label` é função, e não texto, pelo motivo de `lib/labels.ts`: a mensagem é
 * lida no render, no idioma de quem está logado.
 */
export type PanelDestination = {
  to: '/painel'
  label: () => string
  icon: Icon
  fuzzy: boolean
}

export const PANEL_MENU: ReadonlyArray<PanelDestination> = [
  {
    to: '/painel',
    label: () => m.admin_nav_dashboard(),
    icon: ChartLineIcon,
    fuzzy: false,
  },
]
