import { describe, expect, it } from 'vitest'

import { alternateLinks, localizedUrl } from './i18n'

describe('localizedUrl', () => {
  it('não prefixa o idioma base', () => {
    expect(localizedUrl('/noticias', 'pt-BR')).toBe(
      'https://manganga.maiyu.com.br/noticias',
    )
  })

  it('prefixa os outros idiomas', () => {
    expect(localizedUrl('/noticias', 'en')).toBe(
      'https://manganga.maiyu.com.br/en/noticias',
    )
  })
})

describe('alternateLinks', () => {
  it('publica um idioma por link, mais o x-default no base', () => {
    const links = alternateLinks('/noticias')

    expect(links.map((link) => link.hrefLang)).toEqual([
      'pt-BR',
      'en',
      'es',
      'x-default',
    ])
    expect(links.at(-1)?.href).toBe('https://manganga.maiyu.com.br/noticias')
  })
})
