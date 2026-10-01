import { describe, expect, it } from 'vitest'

import { buildSitemap } from './sitemap'

describe('buildSitemap', () => {
  it('monta a URL absoluta sem barra dupla', () => {
    const xml = buildSitemap('https://manganga.maiyu.com.br/', [
      { path: '/noticias' },
    ])

    expect(xml).toContain('<loc>https://manganga.maiyu.com.br/noticias</loc>')
  })

  it('a home fica sem barra no fim', () => {
    const xml = buildSitemap('https://manganga.maiyu.com.br', [{ path: '/' }])

    expect(xml).toContain('<loc>https://manganga.maiyu.com.br</loc>')
  })

  it('escapa o & de uma query string', () => {
    const xml = buildSitemap('https://manganga.maiyu.com.br', [
      { path: '/noticias?a=1&b=2' },
    ])

    expect(xml).toContain('a=1&amp;b=2')
    expect(xml).not.toContain('a=1&b=2')
  })

  it('escreve lastmod e prioridade só quando existem', () => {
    const xml = buildSitemap('https://manganga.maiyu.com.br', [
      { path: '/noticias/x', lastModified: '2024-05-15', priority: 0.5 },
      { path: '/contact' },
    ])

    expect(xml).toContain('<lastmod>2024-05-15</lastmod>')
    expect(xml).toContain('<priority>0.5</priority>')
    expect(xml.match(/<lastmod>/g)).toHaveLength(1)
  })
})
