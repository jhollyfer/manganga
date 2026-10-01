import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { vineResolver } from '@hookform/resolvers/vine'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { EyeIcon, EyeSlashIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group'
import { Spinner } from '#/components/ui/spinner'
import { HttpError } from '#/integrations/tanstack-query/http'
import { signInMutation } from '#/integrations/tanstack-query/mutations'
import { queryKeys } from '#/integrations/tanstack-query/queries'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { SignInValidator } from '#/lib/validator'
import type { SignInPayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/**
 * Os campos da entrada: 44px de altura, porque metade da diretoria abre o
 * painel pelo celular no curral, e os 28px do registry erram debaixo do dedo.
 */
const FIELD = 'h-11 px-3 text-body md:text-body'

/** O texto do erro de envio: 401 é senha errada; o resto é falha nossa. */
function submitError(error: unknown): string {
  if (error instanceof HttpError && error.status === 401)
    return m.signin_errorInvalid()

  return m.signin_errorGeneric()
}

/**
 * O formulário de entrada.
 *
 * O padrão de formulário do site (`Controller`, `mode: 'onTouched'`,
 * `invalidProps` e `FieldError` com `id`). O erro da API não vai para um campo:
 * a API não diz se foi o e-mail ou a senha, e de propósito, então ele aparece
 * acima do botão, num `role="alert"` que o leitor de tela anuncia.
 *
 * Antes de navegar, a entrada do perfil sai do cache: o guarda do painel lê o
 * perfil com `ensureQueryData`, e um 401 guardado de antes do login o mandaria
 * de volta para cá.
 */
export function SignInForm({
  redirect,
}: {
  redirect: string | undefined
}): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<SignInPayload>({
    resolver: vineResolver(SignInValidator),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  const signIn = useMutation({
    ...signInMutation(),
    async onSuccess() {
      queryClient.removeQueries({ queryKey: queryKeys.profile })
      toast.success(m.signin_success(), { id: 'sign-in' })

      if (redirect) {
        await navigate({ href: redirect, replace: true })
        return
      }

      await navigate({ to: '/painel', replace: true })
    },
  })

  function submit(payload: SignInPayload): void {
    signIn.mutate(payload)
  }

  let toggleLabel = m.signin_showPassword()
  if (showPassword) toggleLabel = m.signin_hidePassword()

  let passwordType = 'password'
  if (showPassword) passwordType = 'text'

  return (
    <form
      data-slot="sign-in-form"
      method="post"
      noValidate
      onSubmit={form.handleSubmit(submit)}
    >
      <FieldGroup className="gap-5">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="text-small">
                {m.signin_email()}
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                className={FIELD}
                placeholder={m.signin_emailPlaceholder()}
                {...invalidProps(fieldState.invalid, 'email')}
              />
              {fieldState.error && (
                <FieldError id={errorId('email')}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password" className="text-small">
                {m.signin_password()}
              </FieldLabel>
              <InputGroup className="h-11">
                <InputGroupInput
                  {...field}
                  id="password"
                  type={passwordType}
                  autoComplete="current-password"
                  className="px-3 text-body md:text-body"
                  {...invalidProps(fieldState.invalid, 'password')}
                />
                <InputGroupAddon align="inline-end">
                  {/*
                    `aria-pressed` e rótulo que muda: o leitor de tela precisa
                    saber o estado, e o ícone sozinho não diz qual é.
                  */}
                  <InputGroupButton
                    size="icon-sm"
                    className="size-9"
                    aria-label={toggleLabel}
                    aria-pressed={showPassword}
                    aria-controls="password"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    {showPassword && <EyeSlashIcon className="size-4" />}
                    {!showPassword && <EyeIcon className="size-4" />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.error && (
                <FieldError id={errorId('password')}>
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />

        {signIn.isError && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-small text-destructive"
          >
            <WarningCircleIcon
              aria-hidden="true"
              weight="fill"
              className="mt-0.5 size-4 shrink-0"
            />
            {submitError(signIn.error)}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-full text-small"
          disabled={signIn.isPending}
        >
          {signIn.isPending && <Spinner aria-hidden="true" />}
          {m.signin_submit()}
        </Button>
      </FieldGroup>
    </form>
  )
}
