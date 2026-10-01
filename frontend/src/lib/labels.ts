import { m } from '#/paraglide/messages'

import type {
  ContactSubject,
  EventType,
  ItemGroup,
  MemberRole,
  MembershipCategory,
  NewsCategory,
  PaymentMethod,
} from './entity'

/**
 * Os rótulos de cada valor do vocabulário, no idioma da requisição.
 *
 * Separado de `entity.ts` porque lá o valor é identificador e aqui é texto de
 * interface. O valor é **função** e não string: a mensagem do paraglide
 * precisa ser lida no render, no idioma de quem visita, e uma string resolvida
 * no carregamento do módulo congelaria o idioma da primeira requisição do
 * servidor.
 *
 * `Record` com a chave fechada, então valor novo no vocabulário sem rótulo
 * aqui não compila.
 */

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, () => string> = {
  festival: () => m.label_news_festival(),
  toadas: () => m.label_news_toadas(),
  itens: () => m.label_news_itens(),
  bastidores: () => m.label_news_bastidores(),
  comunidade: () => m.label_news_comunidade(),
}

export const EVENT_TYPE_LABELS: Record<EventType, () => string> = {
  festival: () => m.label_event_festival(),
  ensaio: () => m.label_event_ensaio(),
  show: () => m.label_event_show(),
  festa: () => m.label_event_festa(),
  institucional: () => m.label_event_institucional(),
}

export const ITEM_GROUP_LABELS: Record<ItemGroup, () => string> = {
  musical: () => m.label_item_musical(),
  cenico: () => m.label_item_cenico(),
  artistico: () => m.label_item_artistico(),
}

export const CONTACT_SUBJECT_LABELS: Record<ContactSubject, () => string> = {
  geral: () => m.label_subject_geral(),
  imprensa: () => m.label_subject_imprensa(),
  patrocinio: () => m.label_subject_patrocinio(),
  socio: () => m.label_subject_socio(),
  loja: () => m.label_subject_loja(),
}

export const MEMBERSHIP_CATEGORY_LABELS: Record<
  MembershipCategory,
  () => string
> = {
  PARTICIPANT: () => m.label_role_participant(),
  COLLABORATOR: () => m.label_role_collaborator(),
  SPONSOR: () => m.label_role_sponsor(),
}

export const MEMBER_ROLE_LABELS: Record<MemberRole, () => string> = {
  FOUNDER: () => m.label_role_founder(),
  SPONSOR: () => m.label_role_sponsor(),
  COLLABORATOR: () => m.label_role_collaborator(),
  PARTICIPANT: () => m.label_role_participant(),
  ADMINISTRATOR: () => m.label_role_administrator(),
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, () => string> = {
  pix: () => m.label_payment_pix(),
  card: () => m.label_payment_card(),
  boleto: () => m.label_payment_boleto(),
}
