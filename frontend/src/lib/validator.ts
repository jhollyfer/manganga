import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

import { messages } from './validator-messages'

import {
  CONTACT_SUBJECTS,
  MEMBERSHIP_CATEGORIES,
  MEMBER_ROLES,
  PAYMENT_METHODS,
} from './entity'

export * from './entity'

/**
 * Os schemas dos formulários do site.
 *
 * O dialeto é o VineJS, o mesmo da API AdonisJS do Mangangá: os formulários
 * que falam com ela (sócio, entrada no painel, cadastro de membro) validam aqui
 * com a mesma régua que o servidor vai aplicar, e os que ainda não falam
 * (contato, newsletter, checkout da loja) já nascem na forma que ela vai
 * exigir.
 *
 * Quem consome isto num formulário não chama `validate` na mão: passa o
 * validator para `vineResolver()` do `@hookform/resolvers/vine`.
 */

// O `vineResolver` lê `error.messages` no formato do `SimpleErrorReporter`
// padrão. Trocar `vine.errorReporter` por um repórter próprio quebra o resolver
// em silêncio: os erros somem dos campos sem nenhum aviso.
vine.messagesProvider = messages

/**
 * `''` vira `null` antes da validação, e é o que faz os campos opcionais
 * funcionarem: sem isto o complemento vazio chegaria à regra `maxLength` como
 * texto e o nome do pai vazio seria enviado como `""` em vez de ausente.
 *
 * Precisa rodar **antes** de qualquer `vine.create()` abaixo: a flag é lida na
 * compilação do schema, não na validação.
 */
vine.convertEmptyStringsToNull = true

/**
 * O `vine` sai reexportado daqui, e não importado de `@vinejs/vine`, porque as
 * duas linhas acima configuram um **singleton**: um schema criado a partir do
 * pacote cru compilaria sem a flag e com as mensagens em inglês.
 */
export { vine }

// ---------------------------------------------------------------------------
// Regras compartilhadas
// ---------------------------------------------------------------------------

/**
 * Funções e não constantes: reaproveitar o mesmo nó de schema em dois
 * validators compartilharia as opções entre eles.
 */

/** Um e-mail, com o teto que o RFC 5321 dá para o endereço inteiro. */
export function email() {
  return vine.string().trim().email().maxLength(254)
}

/** Um nome de pessoa. */
export function personName() {
  return vine.string().trim().minLength(3).maxLength(120)
}

/*
 * Os formatos, em constante: com a expressão em linha o Prettier quebra a
 * cadeia em várias linhas, e `validator-messages.test.ts` lê cada cadeia de
 * texto do schema numa linha só para cobrar o `maxLength`.
 */
const PHONE = /^[\d\s()+-]{10,20}$/
const BR_DATE = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/
const DOCUMENT = /^[\d.\-/\s]{5,18}$/
const CEP = /^\d{5}-?\d{3}$/
const STATE = /^[A-Za-z]{2}$/

/** Um telefone com DDD, aceito com ou sem máscara. */
export function phone() {
  return vine.string().trim().regex(PHONE).maxLength(20)
}

/** A data no formato que a pessoa digita, `dd/mm/aaaa`. */
export function brazilianDate() {
  return vine.string().trim().regex(BR_DATE).maxLength(10)
}

/** CPF ou RG, com ou sem máscara. */
export function documentNumber() {
  return vine.string().trim().regex(DOCUMENT).maxLength(18)
}

/**
 * `dd/mm/aaaa` vira `aaaa-mm-dd`, que é o que a API guarda.
 *
 * Mora aqui, ao lado da regra que garante o formato de entrada: quem converte
 * só recebe data que o schema já aceitou.
 */
export function toIsoDate(value: string): string {
  return value.split('/').reverse().join('-')
}

/** Tira máscara: `123.456.789-00` vira `12345678900`. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

// ---------------------------------------------------------------------------
// Newsletter e contato
// ---------------------------------------------------------------------------

export const NewsletterCreateValidator = vine.create({
  email: email(),
})

export type NewsletterCreatePayload = Infer<typeof NewsletterCreateValidator>

/**
 * A mensagem da página de contato.
 *
 * O assunto decide para qual caixa a mensagem iria (imprensa, patrocínio,
 * sócio), e o piso de dez caracteres evita a mensagem que não diz o que a
 * pessoa precisa e vira uma pergunta de volta.
 */
export const ContactCreateValidator = vine.create({
  name: personName(),
  email: email(),
  subject: vine.enum(CONTACT_SUBJECTS),
  message: vine.string().trim().minLength(10).maxLength(5000),
})

export type ContactCreatePayload = Infer<typeof ContactCreateValidator>

// ---------------------------------------------------------------------------
// Sócio e brincante
// ---------------------------------------------------------------------------

/**
 * O cadastro público de sócio e brincante, que vai para `POST /members`.
 *
 * Os campos são os do formulário que o site antigo tinha e nunca chegou a
 * mostrar: nome, documento, nascimento, categoria, observações e a filiação.
 * A filiação existe porque boa parte de quem brinca é menor de idade.
 */
export const MembershipCreateValidator = vine.create({
  name: personName(),
  document: documentNumber(),
  birthDate: brazilianDate(),
  category: vine.enum(MEMBERSHIP_CATEGORIES),
  mother: personName(),
  father: personName().nullable(),
  extras: vine.string().trim().maxLength(500).nullable(),
})

export type MembershipCreatePayload = Infer<typeof MembershipCreateValidator>

// ---------------------------------------------------------------------------
// Painel
// ---------------------------------------------------------------------------

export const SignInValidator = vine.create({
  email: email(),
  password: vine.string().minLength(6).maxLength(128),
})

export type SignInPayload = Infer<typeof SignInValidator>

/** O cadastro e a edição de membro pelo painel, em `/administrator/members`. */
export const MemberUpsertValidator = vine.create({
  name: personName(),
  document: documentNumber(),
  birthDate: brazilianDate(),
  role: vine.enum(MEMBER_ROLES),
  mother: personName(),
  father: personName().nullable(),
  extras: vine.string().trim().maxLength(500).nullable(),
})

export type MemberUpsertPayload = Infer<typeof MemberUpsertValidator>

// ---------------------------------------------------------------------------
// Loja
// ---------------------------------------------------------------------------

/**
 * O checkout da loja: quem compra, para onde vai e como paga.
 *
 * O endereço é obrigatório mesmo na retirada no curral: a nota sai com ele, e
 * pedir depois é uma mensagem de WhatsApp a mais para cada pedido.
 */
export const CheckoutValidator = vine.create({
  name: personName(),
  email: email(),
  phone: phone(),
  document: documentNumber(),
  cep: vine.string().trim().regex(CEP).maxLength(9),
  street: vine.string().trim().minLength(3).maxLength(160),
  number: vine.string().trim().maxLength(12),
  complement: vine.string().trim().maxLength(80).nullable(),
  district: vine.string().trim().minLength(2).maxLength(80),
  city: vine.string().trim().minLength(2).maxLength(80),
  state: vine.string().trim().regex(STATE).maxLength(2),
  payment: vine.enum(PAYMENT_METHODS),
})

export type CheckoutPayload = Infer<typeof CheckoutValidator>
