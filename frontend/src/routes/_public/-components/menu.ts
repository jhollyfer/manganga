import { linkOptions } from '@tanstack/react-router'

import { m } from '#/paraglide/messages'

/**
 * Os destinos do site, tipados contra a árvore de rotas.
 *
 * Cabeçalho, painel do celular e rodapé desenham a **mesma** lista, e
 * escrevê-la três vezes garantiria que elas divergissem no dia em que uma tela
 * mudar de endereço. `linkOptions` preserva o tipo de `to`, então rota removida
 * ou renomeada vira erro de compilação aqui.
 *
 * `label` é função e não texto: a mensagem do paraglide precisa ser lida no
 * render, no idioma de quem visita.
 *
 * A árvore segue a do site do Caprichoso, que é a régua do projeto: "O Boi" e
 * "O Festival" como menus, e o resto como link direto.
 */
export const HOME = linkOptions({ to: '/', label: () => m.nav_home() })

export const HISTORY = linkOptions({
  to: '/boi/historia',
  label: () => m.nav_history(),
  description: () => m.nav_historyDesc(),
})

export const THEME = linkOptions({
  to: '/tema',
  label: () => m.nav_theme(),
  description: () => m.nav_themeDesc(),
})

export const ITEMS = linkOptions({
  to: '/boi/itens',
  label: () => m.nav_items(),
  description: () => m.nav_itemsDesc(),
})

export const TOADAS = linkOptions({
  to: '/boi/toadas',
  label: () => m.nav_toadas(),
  description: () => m.nav_toadasDesc(),
})

export const GALLERY = linkOptions({
  to: '/boi/galeria',
  label: () => m.nav_gallery(),
  description: () => m.nav_galleryDesc(),
})

export const FESTIVAL = linkOptions({
  to: '/festival',
  label: () => m.nav_festival(),
  description: () => m.nav_festivalDesc(),
})

export const AGENDA = linkOptions({
  to: '/agenda',
  label: () => m.nav_agenda(),
  description: () => m.nav_agendaDesc(),
})

export const VISIT = linkOptions({
  to: '/visite',
  label: () => m.nav_visit(),
  description: () => m.nav_visitDesc(),
})

export const NEWS = linkOptions({ to: '/noticias', label: () => m.nav_news() })

export const MEMBER = linkOptions({ to: '/socio', label: () => m.nav_member() })

export const CONTACT = linkOptions({
  to: '/contato',
  label: () => m.nav_contact(),
})

export const STORE = linkOptions({ to: '/loja', label: () => m.nav_store() })

export const PRIVACY = linkOptions({
  to: '/privacidade',
  label: () => m.nav_privacy(),
})

export const TERMS = linkOptions({ to: '/termos', label: () => m.nav_terms() })

export type MenuLink = {
  to: string
  label: () => string
  description?: () => string
}

export type MenuGroup = {
  label: () => string
  links: ReadonlyArray<typeof HISTORY | typeof FESTIVAL>
}

/** "O Boi": quem ele é, o que canta e quem o leva para a arena. */
export const BOI_GROUP = {
  label: () => m.nav_groupBoi(),
  links: [HISTORY, THEME, ITEMS, TOADAS, GALLERY],
} as const

/** "O Festival": a festa, o calendário e como chegar até ela. */
export const FESTIVAL_GROUP = {
  label: () => m.nav_groupFestival(),
  links: [FESTIVAL, AGENDA, VISIT],
} as const

/** Os links diretos da barra, depois dos dois menus. */
export const DIRECT_LINKS = [NEWS, MEMBER, CONTACT] as const

/** As colunas do rodapé, na ordem do Caprichoso. */
export const FOOTER_COLUMNS = [
  { title: () => m.footer_colBoi(), links: [HISTORY, THEME, ITEMS, TOADAS] },
  {
    title: () => m.footer_colFestival(),
    links: [FESTIVAL, AGENDA, VISIT, GALLERY],
  },
  {
    title: () => m.footer_colInstitutional(),
    links: [NEWS, CONTACT, PRIVACY, TERMS],
  },
  { title: () => m.footer_colJoin(), links: [MEMBER, STORE] },
] as const
