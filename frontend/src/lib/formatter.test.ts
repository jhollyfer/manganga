import { describe, expect, it } from 'vitest'

import {
  exportFileName,
  formatDocument,
  formatNumber,
  formatPercent,
  initials,
  isoToBrDate,
  maskCpf,
  maskDate,
  shortDate,
} from './formatter'

describe('maskCpf', () => {
  it.each([
    ['', ''],
    ['123', '123'],
    ['1234', '123.4'],
    ['1234567', '123.456.7'],
    ['1234567890', '123.456.789-0'],
    ['12345678900', '123.456.789-00'],
  ])('%s vira %s', (input, expected) => {
    expect(maskCpf(input)).toBe(expected)
  })

  it('ignora o que não é dígito e corta o excesso', () => {
    expect(maskCpf('123.456.789-0099')).toBe('123.456.789-00')
    expect(maskCpf('abc')).toBe('')
  })
})

describe('maskDate', () => {
  it.each([
    ['1', '1'],
    ['14', '14'],
    ['140', '14/0'],
    ['1407', '14/07'],
    ['14072', '14/07/2'],
    ['14072008', '14/07/2008'],
    ['140720089', '14/07/2008'],
    ['14/07/2008', '14/07/2008'],
  ])('%s vira %s', (input, expected) => {
    expect(maskDate(input)).toBe(expected)
  })
})

describe('formatDocument', () => {
  it('pontua o CPF de onze dígitos, com ou sem máscara', () => {
    expect(formatDocument('12345678900')).toBe('123.456.789-00')
    expect(formatDocument('123.456.789-00')).toBe('123.456.789-00')
  })

  it('devolve o RG como veio, porque não há máscara nacional', () => {
    expect(formatDocument('1234567')).toBe('1234567')
    expect(formatDocument(' 12.345.678-9 ')).toBe('12.345.678-9')
  })
})

describe('isoToBrDate', () => {
  it('converte por texto, sem cair na véspera pelo fuso', () => {
    expect(isoToBrDate('2008-07-14')).toBe('14/07/2008')
    expect(isoToBrDate('2008-07-14T00:00:00.000Z')).toBe('14/07/2008')
  })

  it('devolve como veio o que não é data ISO', () => {
    expect(isoToBrDate('14/07/2008')).toBe('14/07/2008')
    expect(isoToBrDate('')).toBe('')
  })
})

describe('shortDate', () => {
  it('encurta para dia e mês', () => {
    expect(shortDate('2026-10-01')).toBe('01/10')
    expect(shortDate('Seg')).toBe('Seg')
  })
})

describe('números', () => {
  it('usa o separador de milhar do idioma', () => {
    expect(formatNumber(1234, 'pt-BR')).toBe('1.234')
    expect(formatNumber(1234, 'en')).toBe('1,234')
  })

  it('mostra o percentual com uma casa, sem multiplicar por cem', () => {
    expect(formatPercent(12.5, 'pt-BR')).toBe('12,5%')
    expect(formatPercent(3, 'en')).toBe('3.0%')
  })
})

describe('exportFileName', () => {
  it('monta MEMBROS_ddmmaaaahhmmss.xlsx com zero à esquerda', () => {
    expect(exportFileName(new Date(2026, 0, 5, 9, 3, 7))).toBe(
      'MEMBROS_05012026090307.xlsx',
    )
  })
})

describe('initials', () => {
  it.each([
    ['Maria da Silva', 'MS'],
    ['joão', 'J'],
    ['  Ana   Beatriz  ', 'AB'],
    ['', ''],
  ])('%s vira %s', (input, expected) => {
    expect(initials(input)).toBe(expected)
  })
})
