import type * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import { toast } from 'sonner'

import { FIELD_ON_STAGE } from './form-style'
import { PillButton } from './pill-button'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { cn } from '#/lib/utils'
import { NewsletterCreateValidator } from '#/lib/validator'
import type { NewsletterCreatePayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/**
 * A inscrição na newsletter, no rodapé de toda página.
 *
 * **Confirma na tela e não envia nada** por enquanto: a API ainda não tem a
 * lista de e-mails. Quando tiver, o `submit` ganha a mutation e o resto do
 * formulário fica como está.
 */
export function NewsletterForm({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const form = useForm<NewsletterCreatePayload>({
    resolver: vineResolver(NewsletterCreateValidator),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  function submit(): void {
    // `id` fixo: dois envios seguidos trocam o aviso em vez de empilhar dois.
    toast.success(m.footer_newsletterSuccess(), { id: 'newsletter' })
    form.reset()
  }

  return (
    <form
      data-slot="newsletter-form"
      method="post"
      noValidate
      onSubmit={form.handleSubmit(submit)}
      className={className}
    >
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="newsletter-email" className="sr-only">
              {m.footer_newsletterPlaceholder()}
            </FieldLabel>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                {...field}
                id="newsletter-email"
                type="email"
                autoComplete="email"
                className={cn(FIELD_ON_STAGE, 'flex-1')}
                placeholder={m.footer_newsletterPlaceholder()}
                {...invalidProps(fieldState.invalid, 'newsletter-email')}
              />
              <PillButton type="submit" tone="light" className="shrink-0">
                {m.footer_newsletterButton()}
              </PillButton>
            </div>
            {fieldState.error && (
              <FieldError
                id={errorId('newsletter-email')}
                className="text-brand-gold"
              >
                {fieldState.error.message}
              </FieldError>
            )}
          </Field>
        )}
      />
      <p className="mt-3 text-micro text-on-stage/70">
        {m.footer_newsletterPrivacy()}
      </p>
    </form>
  )
}
