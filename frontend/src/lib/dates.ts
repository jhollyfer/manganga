import { getLocale } from '#/paraglide/runtime'

/**
 * Datas do site, no idioma de quem lê e no relógio de quem publicou.
 *
 * O texto ISO dos registros carrega a data e a hora da parede do curral
 * (`2026-10-17T20:00:00-05:00`). Formatar com `new Date(iso)` converteria para
 * o fuso do aparelho, e o ensaio das 20h apareceria às 21h para quem está em
 * Manaus. Aqui a data e a hora saem do próprio texto, montadas em UTC e
 * formatadas em UTC, que é o jeito de o `Intl` não mexer nelas.
 */

type Parts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

function parts(iso: string): Parts {
  const [date = '', time = ''] = iso.split('T')
  const [year = 1970, month = 1, day = 1] = date.split('-').map(Number)
  const [hour = 0, minute = 0] = time.slice(0, 5).split(':').map(Number)

  return { year, month, day, hour, minute }
}

function wallClock(iso: string): Date {
  const { year, month, day, hour, minute } = parts(iso)

  return new Date(Date.UTC(year, month - 1, day, hour, minute))
}

function format(iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(getLocale(), {
    ...options,
    timeZone: 'UTC',
  }).format(wallClock(iso))
}

/** "17 de outubro de 2026". */
export function formatLongDate(iso: string): string {
  return format(iso, { day: 'numeric', month: 'long', year: 'numeric' })
}

/** "17 out. 2026". */
export function formatShortDate(iso: string): string {
  return format(iso, { day: 'numeric', month: 'short', year: 'numeric' })
}

/** "sábado". */
export function formatWeekday(iso: string): string {
  return format(iso, { weekday: 'long' })
}

/** "out." para o selo do calendário. */
export function formatMonthShort(iso: string): string {
  return format(iso, { month: 'short' })
}

/** "outubro de 2026", o agrupamento da agenda. */
export function formatMonthYear(iso: string): string {
  return format(iso, { month: 'long', year: 'numeric' })
}

/** O dia do mês, com dois dígitos, para o selo do calendário. */
export function dayOfMonth(iso: string): string {
  return String(parts(iso).day).padStart(2, '0')
}

/** "20:00", sempre no relógio de 24 horas do curral. */
export function formatTime(iso: string): string {
  const { hour, minute } = parts(iso)

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/** A chave `AAAA-MM` de um ISO, para agrupar e filtrar por mês. */
export function monthKey(iso: string): string {
  return iso.slice(0, 7)
}

/** Dias inteiros de `now` até o instante do ISO, nunca negativo. */
export function daysUntil(iso: string, now: number): number {
  const diff = new Date(iso).getTime() - now

  return Math.max(0, Math.ceil(diff / 86_400_000))
}
