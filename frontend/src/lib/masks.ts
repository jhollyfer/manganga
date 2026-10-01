/**
 * Máscaras de digitação, como funções puras.
 *
 * Funções e não a biblioteca de máscara: o `Input` do Base UI não repassa
 * `ref`, que é por onde as bibliotecas se penduram no campo. Aqui a máscara
 * roda no `onChange` do `Controller`, recebe o que a pessoa digitou e devolve
 * o texto formatado, e o cursor vai para o fim, que é onde ele já estava.
 */

/** `14072008` vira `14/07/2008`, aceitando o texto parcial no caminho. */
export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)]

  return parts.filter(Boolean).join('/')
}

/** `69630000` vira `69630-000`. */
export function maskCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits

  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

/** `97984317149` vira `(97) 98431-7149`; fixo de dez dígitos também passa. */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits

  const area = digits.slice(0, 2)
  const rest = digits.slice(2)
  const split = rest.length - 4
  if (split <= 0) return `(${area}) ${rest}`

  return `(${area}) ${rest.slice(0, split)}-${rest.slice(split)}`
}

/** `12345678900` vira `123.456.789-00`. RG com outro tamanho fica só dígitos. */
export function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 11) return digits

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}
