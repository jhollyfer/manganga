/**
 * O vocabulário do site: os valores fechados que formulário, dado e tela
 * compartilham.
 *
 * Mora fora de `validator.ts` porque aquele arquivo configura o `vine` no topo
 * do módulo, e o Rollup não poda módulo com efeito no topo. A lista de
 * categorias de notícia importada de lá arrastaria o VineJS inteiro para o
 * bundle da home, que não valida formulário nenhum.
 *
 * Aqui não entra nada que dependa de `vine`. `validator.ts` reexporta tudo, e
 * código que só precisa do vocabulário importa **deste** arquivo.
 */

/** As editorias das notícias. "Todas" não é editoria: é a ausência de filtro. */
export const NEWS_CATEGORIES = [
  'festival',
  'toadas',
  'itens',
  'bastidores',
  'comunidade',
] as const

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

/** Os tipos de evento da agenda. */
export const EVENT_TYPES = [
  'festival',
  'ensaio',
  'show',
  'festa',
  'institucional',
] as const

export type EventType = (typeof EVENT_TYPES)[number]

/** Os três grupos de itens do julgamento, como no regulamento do festival. */
export const ITEM_GROUPS = ['musical', 'cenico', 'artistico'] as const

export type ItemGroup = (typeof ITEM_GROUPS)[number]

/** Para onde vai a mensagem da página de contato. */
export const CONTACT_SUBJECTS = [
  'geral',
  'imprensa',
  'patrocinio',
  'socio',
  'loja',
] as const

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]

/**
 * O que quem se cadastra pelo site pode ser. Fundador e administrador ficam
 * de fora: são papéis que só o painel atribui.
 */
export const MEMBERSHIP_CATEGORIES = [
  'PARTICIPANT',
  'COLLABORATOR',
  'SPONSOR',
] as const

export type MembershipCategory = (typeof MEMBERSHIP_CATEGORIES)[number]

/** Os papéis de um membro, na forma em que a API os guarda. */
export const MEMBER_ROLES = [
  'FOUNDER',
  'SPONSOR',
  'COLLABORATOR',
  'PARTICIPANT',
  'ADMINISTRATOR',
] as const

export type MemberRole = (typeof MEMBER_ROLES)[number]

/** Como se paga na loja. */
export const PAYMENT_METHODS = ['pix', 'card', 'boleto'] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]
