/**
 * As máscaras e formatos do painel: documento, data e número.
 *
 * Funções puras e sem `Intl` escondido no topo do módulo: o idioma entra por
 * parâmetro, porque no servidor o módulo é compartilhado por todas as
 * requisições, e um formatador criado no carregamento congelaria o idioma da
 * primeira.
 *
 * As máscaras de digitação (`maskCpf`, `maskDate`) são **progressivas**: cada
 * tecla devolve o texto já pontuado até onde dá, e o que passa do tamanho é
 * cortado. É o comportamento do `Formatter` do site anterior, que a diretoria
 * já conhece.
 */

function digits(value: string): string {
  return value.replace(/\D/g, '')
}

/** `12345678900` vira `123.456.789-00`, um pedaço por vez. */
export function maskCpf(value: string): string {
  const limit = digits(value).slice(0, 11)

  if (limit.length <= 3) return limit
  if (limit.length <= 6) return limit.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  if (limit.length <= 9)
    return limit.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')

  return limit.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
}

/** `14072008` vira `14/07/2008`, um pedaço por vez. */
export function maskDate(value: string): string {
  const limit = digits(value).slice(0, 8)

  if (limit.length <= 2) return limit
  if (limit.length <= 4) return limit.replace(/(\d{2})(\d{1,2})/, '$1/$2')

  return limit.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
}

/**
 * O documento como a tabela mostra: CPF com máscara, RG como veio.
 *
 * Onze dígitos é CPF; o resto é RG, e o RG não tem máscara nacional (cada
 * estado pontua de um jeito, e o do Amazonas não é o do Peru de quem cruza a
 * fronteira). Inventar uma máscara para ele mostraria um número que não está
 * no documento de ninguém.
 */
export function formatDocument(value: string): string {
  const onlyDigits = digits(value)
  if (onlyDigits.length === 11) return maskCpf(onlyDigits)

  return value.trim()
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})/

/**
 * `aaaa-mm-dd` (com ou sem hora) vira `dd/mm/aaaa`.
 *
 * Por texto e nunca por `new Date()`: a API devolve o nascimento como meia-noite
 * UTC, e em Benjamin Constant (UTC-5) o `Date` recuaria para a véspera. Quem
 * nasceu no dia 14 apareceria no dia 13. Texto fora do formato volta como veio.
 */
export function isoToBrDate(value: string): string {
  const match = ISO_DATE.exec(value)
  if (!match) return value

  return `${match[3]}/${match[2]}/${match[1]}`
}

/** `aaaa-mm-dd` vira `dd/mm`, o rótulo curto do eixo do gráfico. */
export function shortDate(value: string): string {
  const match = ISO_DATE.exec(value)
  if (!match) return value

  return `${match[3]}/${match[2]}`
}

/** Um inteiro com o separador de milhar do idioma (`1.234`, `1,234`). */
export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Um percentual com uma casa (`12,5%`).
 *
 * O valor chega em pontos percentuais (`12.5`), e não em fração (`0.125`):
 * é o que a API manda, e o `style: 'percent'` do `Intl` multiplicaria por cem.
 */
export function formatPercent(value: number, locale: string): string {
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)

  return `${number}%`
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * O nome da planilha exportada: `MEMBROS_ddmmaaaahhmmss.xlsx`.
 *
 * O mesmo formato do site anterior, de propósito: a diretoria guarda as
 * planilhas numa pasta e ordena pelo nome. Montado à mão e não com
 * `toLocaleString`, cuja pontuação muda de navegador para navegador.
 */
export function exportFileName(date: Date): string {
  const stamp = [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    String(date.getFullYear()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('')

  return `MEMBROS_${stamp}.xlsx`
}

/** As iniciais do avatar: primeiro e último nome, `Maria da Silva` vira `MS`. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''

  const first = parts[0].charAt(0)
  if (parts.length === 1) return first.toUpperCase()

  const last = parts[parts.length - 1].charAt(0)

  return (first + last).toUpperCase()
}
