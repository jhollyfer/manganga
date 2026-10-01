import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

/**
 * A ordem das seções da home, que é o argumento da página e não um detalhe.
 *
 * Lê o texto de `home.tsx` em vez de montar a árvore, porque a pergunta é
 * sobre o que está escrito na composição. E não congela a lista inteira: crava
 * só as relações que a página defende, para que uma seção nova não reprove por
 * existir.
 */
const here = dirname(fileURLToPath(import.meta.url))
const home = join(here, '-components', 'home.tsx')

/** As seções na ordem em que a composição as renderiza. */
function sectionOrder(): Array<string> {
  const source = readFileSync(home, 'utf8')
  const body = source.slice(source.indexOf('export function Home'))
  const found: Array<string> = []

  for (const match of body.matchAll(/<([A-Z][A-Za-z]*)\b/g)) {
    const [, name] = match
    if (name) found.push(name)
  }

  return found
}

describe('composição da home', () => {
  it('encontra as seções', () => {
    // Guarda das guardas: se a extração parar de achar componente, os testes
    // de ordem abaixo comparariam `-1` com `-1` e ficariam verdes.
    expect(sectionOrder().length).toBeGreaterThanOrEqual(8)
  })

  it('abre pelo hero e fecha pelo convite', () => {
    const order = sectionOrder()

    expect(order.at(0)).toBe('Hero')
    expect(order.at(-1)).toBe('Join')
  })

  it('apresenta o tema logo depois do hero', () => {
    // O manifesto é o alvo do "role para descobrir" do hero: separá-los faz a
    // seta levar a outra seção.
    expect(sectionOrder().indexOf('Manifesto')).toBe(1)
  })

  it('mostra a agenda antes das notícias', () => {
    // Quem chega quer saber o que vem pela frente antes do que já aconteceu.
    const order = sectionOrder()

    expect(order.indexOf('Agenda')).toBeLessThan(order.indexOf('News'))
  })
})
