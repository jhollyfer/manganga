import type * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import { toast } from 'sonner'

import { FIELD, LABEL } from './form-style'
import { PillButton } from './pill-button'
import { TextField } from './text-field'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { CONTACT_SUBJECT_LABELS } from '#/lib/labels'
import { CONTACT } from '#/lib/site'
import { CONTACT_SUBJECTS, ContactCreateValidator } from '#/lib/validator'
import type { ContactCreatePayload, ContactSubject } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/** A caixa de cada assunto. */
export const SUBJECT_EMAILS: Record<ContactSubject, string> = {
  geral: CONTACT.email,
  imprensa: CONTACT.pressEmail,
  patrocinio: CONTACT.sponsorEmail,
  socio: CONTACT.email,
  loja: CONTACT.storeEmail,
}

/**
 * O formulário de contato.
 *
 * A API ainda não recebe mensagens, então o envio abre o e-mail de quem
 * escreve já endereçado à caixa do assunto, com o texto preenchido. É o
 * caminho que chega de verdade a alguém, ao contrário de uma confirmação na
 * tela que não manda nada. Quando a API tiver o endpoint, ele entra em
 * `submit` e o resto fica.
 */
export function ContactForm({
  subject = 'geral',
}: {
  subject?: ContactSubject
}): React.JSX.Element {
  const form = useForm<ContactCreatePayload>({
    resolver: vineResolver(ContactCreateValidator),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', subject, message: '' },
  })

  function submit(payload: ContactCreatePayload): void {
    const to = SUBJECT_EMAILS[payload.subject]
    const title = `[${CONTACT_SUBJECT_LABELS[payload.subject]()}] ${payload.name}`
    const body = `${payload.message}\n\n${payload.name} <${payload.email}>`

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
    toast.success(m.contact_success(), { id: 'contact' })
  }

  return (
    <form
      data-slot="contact-form"
      method="post"
      noValidate
      onSubmit={form.handleSubmit(submit)}
    >
      <FieldGroup className="gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="name"
            label={m.contact_name()}
            autoComplete="name"
          />
          <TextField
            control={form.control}
            name="email"
            type="email"
            label={m.contact_email()}
            autoComplete="email"
          />
        </div>
        <Controller
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subject" className={LABEL}>
                {m.contact_subject()}
              </FieldLabel>
              <NativeSelect
                id="subject"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.value)}
                className={FIELD}
                {...invalidProps(fieldState.invalid, 'subject')}
              >
                {CONTACT_SUBJECTS.map((each) => (
                  <NativeSelectOption key={each} value={each}>
                    {CONTACT_SUBJECT_LABELS[each]()}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {fieldState.error && (
                <FieldError id={errorId('subject')}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />
        <TextField
          control={form.control}
          name="message"
          label={m.contact_message()}
          multiline
        />
        <div>
          <PillButton type="submit" className="px-8">
            {m.contact_submit()}
          </PillButton>
        </div>
      </FieldGroup>
    </form>
  )
}
