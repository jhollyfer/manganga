import { describe, expect, it } from 'vitest'

import { maskCep, maskCpf, maskDate, maskPhone } from './masks'

describe('máscaras', () => {
  it('formata a data enquanto se digita', () => {
    expect(maskDate('14')).toBe('14')
    expect(maskDate('1407')).toBe('14/07')
    expect(maskDate('14072008')).toBe('14/07/2008')
    expect(maskDate('14/07/20089')).toBe('14/07/2008')
  })

  it('formata o CEP', () => {
    expect(maskCep('69630')).toBe('69630')
    expect(maskCep('69630000')).toBe('69630-000')
  })

  it('formata celular e fixo', () => {
    expect(maskPhone('97984317149')).toBe('(97) 98431-7149')
    expect(maskPhone('9734151234')).toBe('(97) 3415-1234')
  })

  it('só formata CPF completo', () => {
    expect(maskCpf('1234567')).toBe('1234567')
    expect(maskCpf('12345678900')).toBe('123.456.789-00')
  })
})
