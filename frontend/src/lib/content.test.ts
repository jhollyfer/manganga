import { describe, expect, it } from 'vitest'

import { EVENTS } from './events'
import { GLOSSARY, QUESTIONS, ROUTES } from './festival'
import { GALLERY } from './gallery'
import { MILESTONES, PILLARS } from './history'
import { ITEMS } from './items'
import { PRIVACY, TERMS } from './legal'
import { NEWS } from './news'
import { CATEGORIES, PRODUCTS } from './store/catalog'
import { THEME } from './theme'
import { ALBUMS } from './toadas'

/**
 * O conteúdo de `lib/`, que não passa pelo paraglide.
 *
 * O `messages.test.ts` cobra as mensagens de interface nos três idiomas, mas
 * texto de registro (título de notícia, resumo de produto) mora no próprio
 * registro, e um idioma esquecido ali só aparece quando alguém abre a página
 * em espanhol e lê `undefined`. Este teste percorre os registros e cobra.
 */
const LOCALES = ['pt-BR', 'en', 'es'] as const

function isLocalized(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false

  return 'pt-BR' in value
}

/** Todo `LocalizedText` dentro de um valor, com o caminho até ele. */
function localizedTexts(
  value: unknown,
  path: string,
): Array<[string, Record<string, unknown>]> {
  if (isLocalized(value)) return [[path, value]]
  if (Array.isArray(value))
    return value.flatMap((each, index) =>
      localizedTexts(each, `${path}[${index}]`),
    )
  if (typeof value === 'object' && value !== null)
    return Object.entries(value).flatMap(([key, each]) =>
      localizedTexts(each, `${path}.${key}`),
    )

  return []
}

const CONTENT = {
  NEWS,
  EVENTS,
  ITEMS,
  ALBUMS,
  MILESTONES,
  PILLARS,
  QUESTIONS,
  ROUTES,
  GLOSSARY,
  GALLERY,
  THEME,
  PRIVACY,
  TERMS,
  CATEGORIES,
  PRODUCTS,
}

describe('conteúdo nos três idiomas', () => {
  const texts = localizedTexts(CONTENT, 'conteudo')

  it('encontra os textos', () => {
    // Guarda das guardas: se a busca parar de achar, o teste abaixo passa vazio.
    expect(texts.length).toBeGreaterThan(100)
  })

  it('nenhum texto falta ou fica vazio em algum idioma', () => {
    const faltando = texts.flatMap(([path, text]) =>
      LOCALES.filter((locale) => {
        const value = text[locale]

        return typeof value !== 'string' || !value.trim()
      }).map((locale) => `${path} (${locale})`),
    )

    expect(faltando).toEqual([])
  })
})

describe('endereços', () => {
  it.each([
    ['notícias', NEWS.map((each) => each.slug)],
    ['eventos', EVENTS.map((each) => each.slug)],
    ['itens', ITEMS.map((each) => each.slug)],
    ['produtos', PRODUCTS.map((each) => each.slug)],
    ['galeria', GALLERY.map((each) => each.id)],
  ])('%s não repetem slug e só usam a-z, dígito e hífen', (_, slugs) => {
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.filter((slug) => !/^[a-z0-9-]+$/.test(slug))).toEqual([])
  })
})

describe('agenda', () => {
  it('toda data traz o deslocamento do fuso', () => {
    // Sem o deslocamento, `new Date()` leria a hora no fuso do servidor.
    const semFuso = EVENTS.filter(
      (event) => !/[+-]\d{2}:\d{2}$/.test(event.startsAt),
    ).map((event) => event.slug)

    expect(semFuso).toEqual([])
  })
})

describe('loja', () => {
  it('todo produto tem ao menos uma cor e preço positivo', () => {
    const quebrados = PRODUCTS.filter(
      (product) => product.colors.length === 0 || product.price <= 0,
    ).map((product) => product.slug)

    expect(quebrados).toEqual([])
  })

  it('preço de antes, quando existe, é maior que o atual', () => {
    const errados = PRODUCTS.filter(
      (product) =>
        product.compareAt !== undefined && product.compareAt <= product.price,
    ).map((product) => product.slug)

    expect(errados).toEqual([])
  })
})
