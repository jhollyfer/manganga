import { describe, expect, it } from 'vitest'

import { toMemberFormValues, toMemberPayload } from './-member-payload'
import type { Member } from '#/lib/model'

const MEMBER: Member = {
  id: 'm1',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  document: '12345678900',
  birthDate: '2008-07-14T00:00:00.000Z',
  extras: null,
  registeredById: 'u0',
  userId: 'u1',
  user: {
    id: 'u1',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    name: 'João da Silva',
    email: null,
    role: 'PARTICIPANT',
    responsible: {
      id: 'r1',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      mother: 'Ana da Silva',
      father: null,
      userId: 'u1',
    },
  },
}

describe('toMemberPayload', () => {
  it('monta o corpo da API: dígitos, data ISO e filiação aninhada', () => {
    expect(
      toMemberPayload({
        name: 'João da Silva',
        document: '123.456.789-00',
        birthDate: '14/07/2008',
        role: 'SPONSOR',
        mother: 'Ana da Silva',
        father: null,
        extras: null,
      }),
    ).toEqual({
      name: 'João da Silva',
      document: '12345678900',
      birthDate: '2008-07-14',
      role: 'SPONSOR',
      extras: null,
      responsible: { mother: 'Ana da Silva', father: null },
    })
  })
})

describe('toMemberFormValues', () => {
  it('abre a edição na língua de quem digita', () => {
    expect(toMemberFormValues(MEMBER)).toEqual({
      name: 'João da Silva',
      document: '12345678900',
      birthDate: '14/07/2008',
      role: 'PARTICIPANT',
      mother: 'Ana da Silva',
      father: null,
      extras: null,
    })
  })

  it('não quebra com registro sem conta ligada', () => {
    expect(toMemberFormValues({ ...MEMBER, user: null })).toMatchObject({
      name: '',
      role: 'PARTICIPANT',
      mother: '',
      father: null,
    })
  })

  it('ida e volta devolve o mesmo corpo', () => {
    expect(toMemberPayload(toMemberFormValues(MEMBER))).toEqual({
      name: 'João da Silva',
      document: '12345678900',
      birthDate: '2008-07-14',
      role: 'PARTICIPANT',
      extras: null,
      responsible: { mother: 'Ana da Silva', father: null },
    })
  })
})
