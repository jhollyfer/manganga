import { describe, expect, it } from 'vitest'

import { dayOfMonth, daysUntil, formatTime, monthKey } from './dates'

/**
 * O que a agenda promete: a hora do curral, e não a do aparelho. Os testes
 * fixam o texto ISO com deslocamento e conferem que a hora não andou.
 */
describe('datas da agenda', () => {
  it('mostra a hora da parede do curral', () => {
    expect(formatTime('2026-10-17T20:00:00-05:00')).toBe('20:00')
  })

  it('não troca o dia perto da meia-noite', () => {
    // Convertido para UTC, 22h de Benjamin Constant já é o dia seguinte.
    expect(dayOfMonth('2026-10-17T22:30:00-05:00')).toBe('17')
  })

  it('agrupa pelo mês do texto', () => {
    expect(monthKey('2026-12-05T18:00:00-05:00')).toBe('2026-12')
  })

  it('conta os dias até o evento sem ficar negativo', () => {
    const now = new Date('2026-10-01T12:00:00-05:00').getTime()

    expect(daysUntil('2026-10-03T12:00:00-05:00', now)).toBe(2)
    expect(daysUntil('2026-09-01T12:00:00-05:00', now)).toBe(0)
  })
})
