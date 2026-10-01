/**
 * O evento no formato de calendário (`.ics`), para o botão "adicionar ao
 * calendário" da agenda.
 *
 * Montado no navegador a partir do registro, sem serviço de terceiro: o
 * arquivo tem dez linhas e o celular de quem baixa já sabe abri-lo.
 *
 * A hora vai em UTC (`Z`), convertida do texto ISO com deslocamento. É o
 * único formato que todo calendário lê do mesmo jeito; o aparelho converte de
 * volta para o fuso de quem salvou.
 */
export type IcsEvent = {
  uid: string
  title: string
  description: string
  location: string
  /** ISO 8601 com deslocamento. */
  startsAt: string
  /** Duração em minutos. Os eventos do boi duram a noite, então três horas. */
  durationMinutes?: number
  url: string
}

function stamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

/** Escapa o que o formato reserva: barra, vírgula, ponto e vírgula e quebra. */
function escape(value: string): string {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll(',', '\\,')
    .replaceAll(';', '\\;')
    .replaceAll('\n', '\\n')
}

export function buildIcs(event: IcsEvent, now: Date = new Date()): string {
  const start = new Date(event.startsAt)
  const end = new Date(
    start.getTime() + (event.durationMinutes ?? 180) * 60_000,
  )

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Manganga//Agenda//PT',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.description)}`,
    `LOCATION:${escape(event.location)}`,
    `URL:${event.url}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}
