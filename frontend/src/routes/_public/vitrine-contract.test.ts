import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { REVEAL } from './-components/reveal'

/**
 * As decisões da vitrine que vivem numa string, e não numa função.
 *
 * As decisões que moram numa classe: `motion-reduce:`, o alvo do "pular para
 * o conteúdo", a ausência do `motion`.
 * Apagar qualquer uma deixaria a suíte verde com a decisão quebrada na tela,
 * então a rede é ler o arquivo, **sem comentário**, para o teste não se
 * satisfazer com o JSDoc que explica a regra.
 */
const here = dirname(fileURLToPath(import.meta.url))
const components = join(here, '-components')

function read(...path: Array<string>): string {
  return readFileSync(join(...path), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
}

describe('movimento respeita quem pediu menos movimento', () => {
  it('a entrada se desliga sozinha', () => {
    expect(REVEAL).toContain('animate-in')
    expect(REVEAL).toContain('motion-reduce:animate-none')
  })

  it('nenhuma peça da vitrine carrega o motion', () => {
    // A animação é CSS. Um import do `motion/react` traria a biblioteca
    // inteira para o bundle da home.
    for (const file of [
      'header.tsx',
      'footer.tsx',
      'page-hero.tsx',
      'artwork.tsx',
      'home/hero.tsx',
      'home/manifesto.tsx',
      'home/agenda.tsx',
      'home/items.tsx',
      'home/toadas.tsx',
      'home/news.tsx',
      'home/history.tsx',
      'home/festival.tsx',
      'home/join.tsx',
    ])
      expect(read(components, file)).not.toContain('motion/react')
  })
})

describe('acessibilidade da casca', () => {
  it('o "pular para o conteúdo" aparece no foco', () => {
    const layout = read(here, 'layout.tsx')

    expect(layout).toContain('focus:not-sr-only')
    expect(layout).toContain('tabIndex={-1}')
  })

  it('o painel do celular tem título e descrição', () => {
    // O leitor de tela anuncia os dois ao abrir o Sheet; sem eles o painel
    // abre mudo.
    const header = read(components, 'header.tsx')

    expect(header).toContain('<SheetTitle>')
    expect(header).toContain('<SheetDescription>')
  })
})
