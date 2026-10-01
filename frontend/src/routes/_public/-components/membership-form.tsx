import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import { useMutation } from '@tanstack/react-query'
import { CheckCircleIcon } from '@phosphor-icons/react'

import { LABEL } from './form-style'
import { PillButton } from './pill-button'
import { TextField } from './text-field'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '#/components/ui/field'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import { HttpError, http } from '#/integrations/tanstack-query/http'
import { errorId } from '#/lib/form-a11y'
import { MEMBERSHIP_CATEGORY_LABELS } from '#/lib/labels'
import { maskDate } from '#/lib/masks'
import {
  MEMBERSHIP_CATEGORIES,
  MembershipCreateValidator,
  digitsOnly,
  toIsoDate,
} from '#/lib/validator'
import type { MembershipCreatePayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/**
 * O corpo que `POST /members` espera: o mesmo do formulário que o site antigo
 * tinha pronto e nunca chegou a mostrar.
 */
type MemberRequest = {
  name: string
  document: string
  birthDate: string
  category: MembershipCreatePayload['category']
  extras: string | null
  responsible: { mother: string; father: string | null }
}

function toRequest(payload: MembershipCreatePayload): MemberRequest {
  return {
    name: payload.name,
    document: digitsOnly(payload.document),
    birthDate: toIsoDate(payload.birthDate),
    category: payload.category,
    extras: payload.extras,
    responsible: { mother: payload.mother, father: payload.father },
  }
}

const CATEGORY_HINTS: Record<
  MembershipCreatePayload['category'],
  () => string
> = {
  PARTICIPANT: () => m.member_categoryParticipantHint(),
  COLLABORATOR: () => m.member_categoryCollaboratorHint(),
  SPONSOR: () => m.member_categorySponsorHint(),
}

/**
 * O cadastro de sócio e brincante, que vai para a API de verdade.
 *
 * O 409 com `MEMBER_ALREADY_EXISTS` vira erro no campo do documento, e não um
 * aviso solto: é ali que a pessoa precisa olhar. Qualquer outra falha vira o
 * aviso geral no fim do formulário, com o WhatsApp como saída.
 */
export function MembershipForm(): React.JSX.Element {
  const form = useForm<MembershipCreatePayload>({
    resolver: vineResolver(MembershipCreateValidator),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      document: '',
      birthDate: '',
      category: 'PARTICIPANT',
      mother: '',
      father: '',
      extras: '',
    },
  })

  const create = useMutation({
    mutationFn: (payload: MembershipCreatePayload) =>
      http<unknown>('/members', { method: 'POST', body: toRequest(payload) }),
    onError(error) {
      if (
        error instanceof HttpError &&
        error.reason === 'MEMBER_ALREADY_EXISTS'
      )
        form.setError('document', { message: m.member_alreadyExists() })
    },
  })

  if (create.isSuccess)
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-accent p-8"
      >
        <CheckCircleIcon weight="fill" className="size-10 text-primary" />
        <h3 className="text-h3">{m.member_successTitle()}</h3>
        <p className="text-body text-muted-foreground">
          {m.member_successText()}
        </p>
        <PillButton
          tone="outline"
          scale="md"
          onClick={() => {
            create.reset()
            form.reset()
          }}
        >
          {m.member_successAnother()}
        </PillButton>
      </div>
    )

  let generalError = false
  if (create.isError) {
    generalError = true
    if (
      create.error instanceof HttpError &&
      create.error.reason === 'MEMBER_ALREADY_EXISTS'
    )
      generalError = false
  }

  return (
    <form
      data-slot="membership-form"
      method="post"
      noValidate
      onSubmit={form.handleSubmit((payload) => create.mutate(payload))}
    >
      <FieldGroup className="gap-6">
        <Controller
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend className={LABEL}>
                {m.member_categoryLabel()}
              </FieldLegend>
              <RadioGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="grid gap-3 sm:grid-cols-3"
              >
                {MEMBERSHIP_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer gap-3 rounded-xl border border-border bg-surface p-4 has-[[data-checked]]:border-primary has-[[data-checked]]:bg-accent"
                  >
                    <RadioGroupItem value={category} className="mt-0.5" />
                    <span>
                      <span className="block text-small font-semibold">
                        {MEMBERSHIP_CATEGORY_LABELS[category]()}
                      </span>
                      <span className="mt-1 block text-micro leading-snug text-muted-foreground">
                        {CATEGORY_HINTS[category]()}
                      </span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              {fieldState.error && (
                <FieldError id={errorId('category')}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </FieldSet>
          )}
        />

        <TextField
          control={form.control}
          name="name"
          label={m.member_name()}
          autoComplete="name"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="document"
            label={m.member_document()}
            hint={m.member_documentHint()}
            inputMode="numeric"
          />
          <TextField
            control={form.control}
            name="birthDate"
            label={m.member_birthDate()}
            placeholder="dd/mm/aaaa"
            inputMode="numeric"
            autoComplete="bday"
            mask={maskDate}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="mother"
            label={m.member_mother()}
          />
          <TextField
            control={form.control}
            name="father"
            label={m.member_father()}
            hint={m.form_optional()}
          />
        </div>
        <TextField
          control={form.control}
          name="extras"
          label={m.member_extras()}
          hint={m.member_extrasHint()}
          multiline
        />

        {generalError && (
          <Field>
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 p-4 text-small text-destructive"
            >
              {m.member_errorGeneral()}
            </p>
          </Field>
        )}

        <p className="text-micro text-muted-foreground">{m.member_privacy()}</p>

        <div>
          <PillButton
            type="submit"
            disabled={create.isPending}
            className="px-8"
          >
            {m.member_submit()}
          </PillButton>
        </div>
      </FieldGroup>
    </form>
  )
}
