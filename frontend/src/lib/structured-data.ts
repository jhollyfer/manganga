import {
  CONTACT,
  FOUNDED_YEAR,
  SITE_IMAGE,
  SITE_LEGAL_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIALS,
} from './site'

/**
 * O JSON-LD que o site publica, montado num lugar só.
 *
 * Uma função por tipo, testada, e a rota só decide
 * quando injetar. Nenhuma função devolve string; quem serializa é
 * `jsonLdScript`, porque um objeto é o que dá para inspecionar num teste sem
 * reparsear.
 */

/**
 * Um nó de JSON-LD. `unknown` no valor, e não um tipo por schema: o
 * vocabulário do schema.org não é nosso, e redeclará-lo aqui seria uma segunda
 * definição para manter em dia.
 */
export type JsonLd = Record<string, unknown>

/**
 * O Mangangá como grupo artístico.
 *
 * `PerformingGroup` e não `Organization`: é o tipo que o buscador usa para
 * quem se apresenta, e é o que liga o nome do boi aos eventos da agenda.
 *
 * Mora na **raiz**, e não na home: é a identidade do site inteiro, e quem
 * chega por uma notícia compartilhada precisa que o rastreador saiba de quem é
 * a página.
 */
export function organizationJsonLd(description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: SITE_TITLE,
    legalName: SITE_LEGAL_NAME,
    description,
    url: SITE_URL,
    logo: SITE_IMAGE,
    image: SITE_IMAGE,
    foundingDate: String(FOUNDED_YEAR),
    email: CONTACT.email,
    telephone: CONTACT.phoneHref.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.street,
      addressLocality: 'Benjamin Constant',
      addressRegion: 'AM',
      postalCode: CONTACT.postalCode,
      addressCountry: 'BR',
    },
    sameAs: SOCIALS.map((social) => social.href),
  }
}

/** Um degrau da trilha: o nome que se lê e o caminho absoluto para onde leva. */
export type Crumb = {
  name: string
  url: string
}

/**
 * A trilha de navegação de uma rota de detalhe, com a home sempre no primeiro
 * degrau.
 *
 * Recebe URL já absoluta, e não caminho: o endereço depende do idioma
 * (`/en/noticias/...`), e quem sabe o idioma é a rota.
 *
 * Trilha vazia devolve lista vazia: um `BreadcrumbList` de um degrau só não
 * informa hierarquia nenhuma.
 */
export function breadcrumbListJsonLd(
  home: Crumb,
  trail: ReadonlyArray<Crumb>,
): Array<JsonLd> {
  if (trail.length === 0) return []

  const crumbs = [home, ...trail]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ]
}

/** Os campos de uma notícia que o `NewsArticle` publica. */
export type ArticleEntry = {
  title: string
  description: string
  url: string
  image: string
  author: string
  publishedAt: string
}

/**
 * Uma notícia.
 *
 * `NewsArticle` é o que faz o buscador mostrar data e autor no resultado, e é
 * a data que diz a quem procura se a notícia ainda vale.
 */
export function newsArticleJsonLd(article: ArticleEntry): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      logo: { '@type': 'ImageObject', url: SITE_IMAGE },
    },
  }
}

/** Os campos de um evento da agenda que o `Event` publica. */
export type EventEntry = {
  name: string
  description: string
  url: string
  startDate: string
  location: string
}

/**
 * Um evento da agenda. É o que põe o ensaio no quadro de eventos do buscador
 * de quem procura "o que fazer em Benjamin Constant".
 */
export function eventJsonLd(event: EventEntry): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    url: event.url,
    startDate: event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Benjamin Constant',
        addressRegion: 'AM',
        addressCountry: 'BR',
      },
    },
    performer: { '@type': 'PerformingGroup', name: SITE_TITLE },
    organizer: { '@type': 'Organization', name: SITE_TITLE, url: SITE_URL },
  }
}

/** Os campos de um produto que o `Product` publica. */
export type ProductEntry = {
  name: string
  description: string
  url: string
  image: string
  sku: string
  price: number
  inStock: boolean
}

/**
 * Um produto da loja, com a oferta. Preço em reais com ponto decimal, que é o
 * formato que o schema.org pede, e não em centavos como a loja guarda.
 */
export function productJsonLd(product: ProductEntry): JsonLd {
  let availability = 'https://schema.org/OutOfStock'
  if (product.inStock) availability = 'https://schema.org/InStock'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { '@type': 'Brand', name: SITE_TITLE },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'BRL',
      price: (product.price / 100).toFixed(2),
      availability,
    },
  }
}

/**
 * Um objeto de JSON-LD na forma que o `scripts` do `head` recebe.
 *
 * Existe para que nenhuma rota escreva o `type` à mão: um `application/json`
 * digitado por engano é ignorado pelo buscador sem erro nenhum.
 */
export function jsonLdScript(data: JsonLd): {
  type: string
  children: string
} {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data),
  }
}
