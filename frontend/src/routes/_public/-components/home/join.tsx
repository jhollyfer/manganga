import type * as React from 'react'
import { Link } from '@tanstack/react-router'

import { PillButton } from '../pill-button'
import { REVEAL } from '../reveal'
import { Scene } from '#/components/common/scenery'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * O convite final, na faixa verde: brincar no boi ou apoiar dos bastidores.
 * É o "Faça parte da nossa história" do site anterior, ligado ao cadastro de
 * verdade.
 *
 * É um dos dois lugares onde a página troca de fundo de propósito (o outro é
 * o rodapé, logo abaixo, que continua o mesmo verde): o fim da página é uma
 * faixa só, e não uma sequência de faixas de cores diferentes.
 */
export function Join(): React.JSX.Element {
  const paths = [
    { title: m.home_joinPerformTitle(), text: m.home_joinPerformText() },
    { title: m.home_joinSupportTitle(), text: m.home_joinSupportText() },
  ]

  return (
    <section data-slot="home-join" className="stage pt-24 pb-20 md:pt-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className={cn(REVEAL, 'lg:col-span-7')}>
          <h2 className="text-h1">
            {m.home_joinTitleLead()} <em>{m.home_joinTitleEm()}</em>
          </h2>
          <p className="mt-8 max-w-[48ch] text-body-lg leading-relaxed text-on-stage/80">
            {m.home_joinLead()}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PillButton
              tone="light"
              render={<Link to="/socio">{m.home_joinCta()}</Link>}
            />
            <Link
              to="/loja"
              className="text-body font-medium underline decoration-on-stage/40 underline-offset-4 transition-colors hover:decoration-on-stage"
            >
              {m.home_joinStoreCta()}
            </Link>
          </div>
        </div>
        <div className={cn(REVEAL, 'delay-150 lg:col-span-4 lg:col-start-9')}>
          <div className="aspect-[4/5] w-full overflow-hidden">
            <Scene scene="bandeirinhas" />
          </div>
          <dl className="mt-8 grid gap-6">
            {paths.map((path) => (
              <div key={path.title}>
                <dt className="text-body font-semibold">{path.title}</dt>
                <dd className="mt-1 text-small leading-relaxed text-on-stage/75">
                  {path.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
