import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  WhatsappLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'

import { FOOTER_COLUMNS } from './menu'
import { navLinkVariants } from './nav-link'
import { NewsletterForm } from './newsletter-form'
import { BrandStar } from '#/components/common/brand-mark'
import {
  CONTACT,
  FOUNDED_YEAR,
  SITE_LEGAL_NAME,
  SITE_TITLE,
  SOCIALS,
  WHATSAPP_URL,
} from '#/lib/site'
import { m } from '#/paraglide/messages'

/** O ícone de cada rede, pelo nome que `SOCIALS` usa. */
const SOCIAL_ICONS: Record<
  (typeof SOCIALS)[number]['name'],
  React.ComponentType<{ className?: string }>
> = {
  Instagram: InstagramLogoIcon,
  Facebook: FacebookLogoIcon,
  YouTube: YoutubeLogoIcon,
}

/**
 * O rodapé, na folha verde do cartaz.
 *
 * Três andares: a newsletter com o WhatsApp, as colunas de links com o bloco
 * institucional, e a linha de direitos, redes e o voltar ao topo. O
 * "MANGANGÁ" gigante apagado no fundo saiu: letreiro decorativo atrás do
 * rodapé é o enfeite que todo modelo pronto traz.
 *
 * A newsletter mora aqui e não numa seção da home porque é a última pergunta
 * de **toda** página: quem leu uma notícia inteira é exatamente quem quer a
 * próxima.
 */
export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear()

  return (
    <footer data-slot="site-footer" className="stage relative overflow-hidden">
      <section className="container-x grid gap-10 border-b border-on-stage/20 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="text-h2">{m.footer_newsletterTitle()}</h2>
          <p className="mt-4 max-w-[52ch] text-body-lg text-on-stage/70">
            {m.footer_newsletterLead()}
          </p>
          <NewsletterForm className="mt-8 max-w-xl" />
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 border border-on-stage/40 p-5 transition-colors hover:bg-on-stage hover:text-stage"
        >
          <span className="inline-flex size-11 shrink-0 items-center justify-center bg-on-stage text-stage">
            <WhatsappLogoIcon weight="fill" className="size-6" />
          </span>
          <span>
            <span className="flex items-center gap-1 text-body-lg font-semibold">
              {m.footer_whatsappTitle()}
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="mt-1 block text-small opacity-75">
              {m.footer_whatsappLead()}
            </span>
          </span>
        </a>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandStar className="size-10" />
            <span className="font-display text-3xl font-extrabold uppercase [font-stretch:72%]">
              {SITE_TITLE}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-small leading-relaxed text-on-stage/65">
            {SITE_LEGAL_NAME}. {m.footer_founded({ year: FOUNDED_YEAR })}.
          </p>
          <dl className="mt-6 grid gap-4 text-small text-on-stage/75">
            <div>
              <dt className="mb-1 font-semibold text-on-stage">
                {m.footer_address()}
              </dt>
              <dd>
                {CONTACT.street}
                <br />
                {CONTACT.district}, {CONTACT.postalCode}
              </dd>
            </div>
            <div>
              <dt className="mb-1 font-semibold text-on-stage">
                {m.footer_contact()}
              </dt>
              <dd className="flex flex-col">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={navLinkVariants({ tone: 'footer' })}
                >
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className={navLinkVariants({ tone: 'footer' })}
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <nav
          aria-label={m.a11y_mainNav()}
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title()}>
              <h3 className="mb-4 font-sans text-small font-semibold text-on-stage [font-stretch:100%]">
                {column.title()}
              </h3>
              <ul className="grid gap-0.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={navLinkVariants({ tone: 'footer' })}
                    >
                      {link.label()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </section>

      <div className="container-x flex flex-col items-center gap-6 border-t border-on-stage/20 py-8 md:flex-row md:justify-between">
        <p className="text-center text-micro text-on-stage/55 md:text-left">
          © {year} {SITE_TITLE}. {m.footer_rights()}. {m.footer_signoff()}
        </p>
        <div className="flex items-center gap-2">
          <ul
            aria-label={m.footer_social()}
            className="flex items-center gap-1"
          >
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name]

              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex size-10 items-center justify-center rounded-sm text-on-stage/80 transition-colors hover:bg-on-stage hover:text-stage"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={m.footer_backToTop()}
            className="ml-2 inline-flex size-10 items-center justify-center rounded-sm bg-on-stage text-stage transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
          >
            <ArrowUpIcon className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
