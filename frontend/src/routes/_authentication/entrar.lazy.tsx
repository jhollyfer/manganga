import type * as React from 'react'
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router'

import { SignInForm } from './-components/sign-in-form'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_authentication/entrar')

export const Route = createLazyFileRoute('/_authentication/entrar')({
  component: RouteComponent,
})

/**
 * O cartão da entrada, sobre o palco do layout.
 *
 * O cartão volta para as cores do tema (`bg-card`) em vez de herdar o texto
 * claro do palco: é um formulário, e campo claro com texto claro some.
 */
function RouteComponent(): React.JSX.Element {
  const { redirect } = route.useSearch()

  return (
    <section className="bg-card p-6 text-card-foreground sm:p-8">
      <p className="eyebrow text-primary">{m.signin_eyebrow()}</p>
      <h1 className="mt-2 text-h3">
        {m.signin_headingStart()} <em>{m.signin_headingEm()}</em>.
      </h1>
      <p className="mt-2 mb-6 text-small text-muted-foreground">
        {m.signin_lead()}
      </p>
      <SignInForm redirect={redirect} />
    </section>
  )
}
