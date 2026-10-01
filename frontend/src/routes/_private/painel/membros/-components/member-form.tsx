import type * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { HttpError } from '#/integrations/tanstack-query/http'
import { MEMBER_ALREADY_EXISTS } from '#/integrations/tanstack-query/mutations'
import { MEMBER_ROLES } from '#/lib/entity'
import type { MemberRole } from '#/lib/entity'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { maskDate } from '#/lib/formatter'
import { MEMBER_ROLE_LABELS } from '#/lib/labels'
import { MemberUpsertValidator, digitsOnly } from '#/lib/validator'
import type { MemberUpsertPayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/**
 * Os campos do painel: 36px, um degrau acima dos 28px do registry. A folha
 * lateral é onde a diretoria passa mais tempo digitando, e no celular ela
 * ocupa a tela inteira.
 */
const FIELD = 'h-9 text-body md:text-small'
const LABEL = 'text-small'

/**
 * Os papéis que o formulário oferece.
 *
 * Administrador fica de fora, como no painel antigo: é acesso ao painel, não
 * categoria de brincante, e dar esse papel por engano numa lista suspensa é
 * entregar a senha da diretoria. Só aparece quando o membro editado **já** é
 * administrador, para que salvar outra mudança não o rebaixe em silêncio.
 */
function roleOptions(current: MemberRole): ReadonlyArray<MemberRole> {
  return MEMBER_ROLES.filter(
    (role) => role !== 'ADMINISTRATOR' || current === 'ADMINISTRATOR',
  )
}

type MemberFormProps = {
  /** O id do `<form>`, para o botão de envio que mora no rodapé da folha. */
  id: string
  defaultValues: MemberUpsertPayload
  /**
   * Quem chama faz a requisição e devolve a promessa. O erro volta para cá,
   * porque é o formulário quem sabe acusar o campo.
   */
  onSubmit: (values: MemberUpsertPayload) => Promise<unknown>
}

/**
 * O formulário de membro, o mesmo no cadastro e na edição.
 *
 * Um só para os dois porque são o mesmo contrato (`MemberUpsertValidator` e o
 * mesmo corpo na API), e no painel antigo eram duas cópias que já tinham
 * divergido: a edição dizia "Adicionar membro" no título.
 *
 * O 409 com `MEMBER_ALREADY_EXISTS` vira erro **no campo** de documento, que é
 * onde está o que a pessoa precisa mudar; qualquer outra falha vira aviso,
 * porque não há campo para culpar.
 */
export function MemberForm({
  id,
  defaultValues,
  onSubmit,
}: MemberFormProps): React.JSX.Element {
  const form = useForm<MemberUpsertPayload>({
    resolver: vineResolver(MemberUpsertValidator),
    mode: 'onTouched',
    defaultValues,
  })

  async function submit(values: MemberUpsertPayload): Promise<void> {
    try {
      await onSubmit(values)
    } catch (error) {
      if (
        error instanceof HttpError &&
        error.status === 409 &&
        error.reason === MEMBER_ALREADY_EXISTS
      ) {
        form.setError(
          'document',
          { message: m.admin_member_documentTaken() },
          { shouldFocus: true },
        )
        return
      }

      toast.error(m.admin_member_saveError(), { id: 'member-save' })
    }
  }

  const roles = roleOptions(defaultValues.role)

  return (
    <form
      id={id}
      data-slot="member-form"
      method="post"
      noValidate
      onSubmit={form.handleSubmit(submit)}
    >
      <FieldGroup className="gap-5">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${id}-name`} className={LABEL}>
                {m.admin_member_name()}
              </FieldLabel>
              <Input
                {...field}
                id={`${id}-name`}
                autoComplete="off"
                className={FIELD}
                {...invalidProps(fieldState.invalid, `${id}-name`)}
              />
              {fieldState.error && (
                <FieldError id={errorId(`${id}-name`)}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="document"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-document`} className={LABEL}>
                  {m.admin_member_document()}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-document`}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={18}
                  className={FIELD}
                  // Só dígitos, como no painel antigo: CPF e RG chegam do
                  // documento físico com pontuações diferentes, e a API guarda
                  // só os números.
                  onChange={(event) =>
                    field.onChange(digitsOnly(event.currentTarget.value))
                  }
                  {...invalidProps(fieldState.invalid, `${id}-document`)}
                />
                {fieldState.error && (
                  <FieldError id={errorId(`${id}-document`)}>
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-birthDate`} className={LABEL}>
                  {m.admin_member_birthDate()}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-birthDate`}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={10}
                  placeholder={m.admin_member_birthDatePlaceholder()}
                  className={FIELD}
                  onChange={(event) =>
                    field.onChange(maskDate(event.currentTarget.value))
                  }
                  {...invalidProps(fieldState.invalid, `${id}-birthDate`)}
                />
                {fieldState.error && (
                  <FieldError id={errorId(`${id}-birthDate`)}>
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${id}-role`} className={LABEL}>
                {m.admin_member_role()}
              </FieldLabel>
              <NativeSelect
                {...field}
                id={`${id}-role`}
                className="w-full [&>select]:h-9 [&>select]:text-body md:[&>select]:text-small"
                {...invalidProps(fieldState.invalid, `${id}-role`)}
              >
                {roles.map((role) => (
                  <NativeSelectOption key={role} value={role}>
                    {MEMBER_ROLE_LABELS[role]()}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {fieldState.error && (
                <FieldError id={errorId(`${id}-role`)}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="extras"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${id}-extras`} className={LABEL}>
                {m.admin_member_extras()}{' '}
                <span className="font-normal text-muted-foreground">
                  {m.admin_member_optional()}
                </span>
              </FieldLabel>
              <Textarea
                {...field}
                value={field.value ?? ''}
                id={`${id}-extras`}
                rows={3}
                maxLength={500}
                className="min-h-20 text-body md:text-small"
                placeholder={m.admin_member_extrasPlaceholder()}
                {...invalidProps(fieldState.invalid, `${id}-extras`)}
              />
              {fieldState.error && (
                <FieldError id={errorId(`${id}-extras`)}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        <FieldSet className="gap-4">
          <FieldLegend className="text-small font-semibold">
            {m.admin_member_filiation()}
          </FieldLegend>
          <FieldDescription className="text-micro">
            {m.admin_member_filiationHint()}
          </FieldDescription>

          <Controller
            control={form.control}
            name="mother"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-mother`} className={LABEL}>
                  {m.admin_member_mother()}
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-mother`}
                  autoComplete="off"
                  className={FIELD}
                  {...invalidProps(fieldState.invalid, `${id}-mother`)}
                />
                {fieldState.error && (
                  <FieldError id={errorId(`${id}-mother`)}>
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="father"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-father`} className={LABEL}>
                  {m.admin_member_father()}{' '}
                  <span className="font-normal text-muted-foreground">
                    {m.admin_member_optional()}
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  id={`${id}-father`}
                  autoComplete="off"
                  className={FIELD}
                  {...invalidProps(fieldState.invalid, `${id}-father`)}
                />
                {fieldState.error && (
                  <FieldError id={errorId(`${id}-father`)}>
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />
        </FieldSet>
      </FieldGroup>
    </form>
  )
}

/**
 * O botão de envio, fora do `<form>` e ligado a ele pelo atributo `form`.
 *
 * Fora porque mora no rodapé fixo da folha: com a filiação aberta o formulário
 * passa da altura do celular, e o botão no fim da rolagem some de vista.
 */
export function MemberFormSubmit({
  form,
  pending,
  disabled = false,
  children,
}: {
  form: string
  pending: boolean
  /** Fora do envio: a edição ainda carregando o membro, sem formulário para enviar. */
  disabled?: boolean
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <Button
      type="submit"
      form={form}
      size="lg"
      className="h-10 w-full rounded-full text-small"
      disabled={pending || disabled}
    >
      {pending && <Spinner aria-hidden="true" />}
      {children}
    </Button>
  )
}
