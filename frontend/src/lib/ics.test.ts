import { describe, expect, it } from 'vitest'

import { buildIcs } from './ics'

const EVENT = {
  uid: 'ensaio@manganga',
  title: 'Ensaio geral, no curral',
  description: 'Tribos; Marujada',
  location: 'Curral do Mangangá',
  startsAt: '2026-10-17T20:00:00-05:00',
  url: 'https://manganga.maiyu.com.br/agenda/ensaio',
}

describe('calendário', () => {
  it('converte a hora do curral para UTC', () => {
    // 20h em UTC-5 é 1h do dia seguinte em UTC.
    expect(buildIcs(EVENT)).toContain('DTSTART:20261018T010000Z')
  })

  it('dura três horas por padrão', () => {
    expect(buildIcs(EVENT)).toContain('DTEND:20261018T040000Z')
  })

  it('escapa vírgula e ponto e vírgula', () => {
    const ics = buildIcs(EVENT)

    expect(ics).toContain('SUMMARY:Ensaio geral\\, no curral')
    expect(ics).toContain('DESCRIPTION:Tribos\\; Marujada')
  })
})
