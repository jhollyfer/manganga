import { describe, expect, it } from 'vitest'

import {
  CheckoutValidator,
  ContactCreateValidator,
  MembershipCreateValidator,
  digitsOnly,
  toIsoDate,
} from './validator'

/**
 * O que o schema **decide**, não o que o VineJS faz: o piso da mensagem, o
 * nome do pai opcional que chega como texto vazio, a data no formato que a
 * pessoa digita e o CEP com ou sem hífen. Formato de e-mail fica de fora,
 * porque testá-lo é testar a biblioteca.
 */

/** Os campos que um erro acusou, para comparar por nome em vez de por posição. */
function fieldsOf(error: { messages: Array<{ field: string }> } | null) {
  if (!error) return []

  return error.messages.map((each) => each.field).sort()
}

const CONTACT = {
  name: 'Maria Souza',
  email: 'maria@mail.com',
  subject: 'imprensa',
  message: 'Queremos entrevistar o amo do boi.',
}

const MEMBERSHIP = {
  name: 'João da Silva',
  document: '123.456.789-00',
  birthDate: '14/07/2008',
  category: 'PARTICIPANT',
  mother: 'Ana da Silva',
  father: '',
  extras: '',
}

const CHECKOUT = {
  name: 'Maria Souza',
  email: 'maria@mail.com',
  phone: '(97) 98431-7149',
  document: '123.456.789-00',
  cep: '69630-000',
  street: 'Beco 50',
  number: '12',
  complement: '',
  district: 'Coaban',
  city: 'Benjamin Constant',
  state: 'AM',
  payment: 'pix',
}

describe('contato', () => {
  it('aceita a mensagem completa', async () => {
    const [error] = await ContactCreateValidator.tryValidate(CONTACT)

    expect(fieldsOf(error)).toEqual([])
  })

  it('recusa mensagem com menos de dez caracteres', async () => {
    const [error] = await ContactCreateValidator.tryValidate({
      ...CONTACT,
      message: 'Oi',
    })

    expect(fieldsOf(error)).toEqual(['message'])
  })

  it('recusa assunto fora da lista', async () => {
    const [error] = await ContactCreateValidator.tryValidate({
      ...CONTACT,
      subject: 'vendas',
    })

    expect(fieldsOf(error)).toEqual(['subject'])
  })
})

describe('sócio', () => {
  it('aceita o pai e as observações em branco', async () => {
    const [error, payload] =
      await MembershipCreateValidator.tryValidate(MEMBERSHIP)

    expect(fieldsOf(error)).toEqual([])
    expect(payload?.father).toBeNull()
    expect(payload?.extras).toBeNull()
  })

  it('recusa data fora do formato dd/mm/aaaa', async () => {
    const [error] = await MembershipCreateValidator.tryValidate({
      ...MEMBERSHIP,
      birthDate: '2008-07-14',
    })

    expect(fieldsOf(error)).toEqual(['birthDate'])
  })

  it('não deixa o site cadastrar fundador', async () => {
    // Fundador e administrador são papéis do painel, e o cadastro público
    // não pode se promover sozinho.
    const [error] = await MembershipCreateValidator.tryValidate({
      ...MEMBERSHIP,
      category: 'FOUNDER',
    })

    expect(fieldsOf(error)).toEqual(['category'])
  })
})

describe('checkout', () => {
  it('aceita o CEP com e sem hífen', async () => {
    const [comHifen] = await CheckoutValidator.tryValidate(CHECKOUT)
    const [semHifen] = await CheckoutValidator.tryValidate({
      ...CHECKOUT,
      cep: '69630000',
    })

    expect(fieldsOf(comHifen)).toEqual([])
    expect(fieldsOf(semHifen)).toEqual([])
  })

  it('recusa UF com mais de duas letras', async () => {
    const [error] = await CheckoutValidator.tryValidate({
      ...CHECKOUT,
      state: 'AMZ',
    })

    expect(fieldsOf(error)).toEqual(['state'])
  })
})

describe('conversões', () => {
  it('a data digitada vira a data da API', () => {
    expect(toIsoDate('14/07/2008')).toBe('2008-07-14')
  })

  it('o documento perde a máscara', () => {
    expect(digitsOnly('123.456.789-00')).toBe('12345678900')
  })
})
