/**
 * O que identifica o site nos metadados de toda rota.
 *
 * As constantes aparecem no `head` da raiz, que é o padrão, e no `head` das
 * rotas que escrevem o seu. Escrevê-las à mão nos dois lugares faria o cartão
 * de link de uma página anunciar outra coisa que a home.
 */

/** O nome do boi, e o que fica no fim de todo título. */
export const SITE_TITLE = 'Mangangá'

/** O nome completo, para o JSON-LD e o rodapé. */
export const SITE_LEGAL_NAME = 'Associação Folclórica Boi Bumbá Mangangá'

/**
 * O endereço público, sem barra no fim.
 *
 * Só para o que precisa de URL absoluta: sitemap, `canonical` e cartão de
 * link. Link interno é caminho relativo, e cravar o domínio neles quebraria a
 * navegação em qualquer ambiente que não fosse produção.
 */
export const SITE_URL = 'https://manganga.maiyu.com.br'

/**
 * A imagem do cartão de link, absoluta porque quem a lê é um rastreador de
 * fora: caminho relativo em `og:image` resolveria contra o domínio de quem
 * raspa.
 */
export const SITE_IMAGE = `${SITE_URL}/og-image.png`

/** O caminho vira endereço absoluto, para `canonical` e `og:url`. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}

/** O ano de fundação, que a história, o rodapé e o JSON-LD repetem. */
export const FOUNDED_YEAR = 1992

/**
 * O ano do espetáculo em cartaz. Tema, itens, toadas e a coleção da loja
 * apontam para ele, e virar a temporada é trocar este número.
 */
export const SEASON_YEAR = 2026

/** O WhatsApp do boi, só dígitos com o código do país. */
export const WHATSAPP_NUMBER = '5597984317149'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const CONTACT = {
  email: 'contato@manganga.com.br',
  pressEmail: 'imprensa@manganga.com.br',
  sponsorEmail: 'patrocinio@manganga.com.br',
  storeEmail: 'loja@manganga.com.br',
  phone: '+55 (97) 9 8431-7149',
  phoneHref: 'tel:+5597984317149',
  street: 'Beco 50, Bairro Coaban (Javarizinho)',
  district: 'Benjamin Constant, AM',
  postalCode: '69630-000',
} as const

export const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/boimanganga' },
  { name: 'Facebook', href: 'https://facebook.com/boimanganga' },
  { name: 'YouTube', href: 'https://youtube.com/@boimanganga' },
] as const
