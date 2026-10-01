/**
 * A grade de medidas das camisas da loja.
 *
 * Mora fora do catálogo porque é a mesma régua para todas as camisas adultas
 * (e outra para as infantis): o guia de tamanhos da página do produto e a
 * página de ajuda leem daqui, e uma medida corrigida num lugar só não deixa
 * as duas telas discordando.
 *
 * Medidas em centímetros, com a peça estendida sobre a mesa: o tórax é a
 * circunferência (a largura de axila a axila vezes dois), e o comprimento vai
 * do ponto mais alto do ombro até a barra. Variação de até 2 cm é da costura.
 */
export type SizeRow = {
  size: string
  chest: number
  length: number
}

export const ADULT_SIZE_CHART: ReadonlyArray<SizeRow> = [
  { size: 'P', chest: 100, length: 70 },
  { size: 'M', chest: 106, length: 72 },
  { size: 'G', chest: 112, length: 74 },
  { size: 'GG', chest: 118, length: 76 },
  { size: 'XG', chest: 124, length: 78 },
]

/** A grade infantil, em que o número do tamanho é a idade aproximada. */
export const KIDS_SIZE_CHART: ReadonlyArray<SizeRow> = [
  { size: '2', chest: 60, length: 42 },
  { size: '4', chest: 64, length: 46 },
  { size: '6', chest: 68, length: 50 },
  { size: '8', chest: 72, length: 54 },
  { size: '10', chest: 76, length: 58 },
  { size: '12', chest: 80, length: 62 },
]
