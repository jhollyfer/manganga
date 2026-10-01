import type * as React from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

import { FIELD, LABEL } from './form-style'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'
import { errorId, invalidProps } from '#/lib/form-a11y'
import { cn } from '#/lib/utils'

type TextFieldProps<TValues extends FieldValues> = {
  control: Control<TValues>
  name: Path<TValues>
  label: string
  hint?: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'password'
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  /** A máscara de digitação, de `lib/masks.ts`. */
  mask?: (value: string) => string
  /** `textarea` em vez de `input`, para observações e mensagens. */
  multiline?: boolean
  className?: string
}

/**
 * Um campo de texto do site, com rótulo, dica, máscara e erro já ligados.
 *
 * O padrão de formulário é o do maiyu (`Controller`, `invalidProps`,
 * `FieldError` com `id`), e ele se repete por campo. Os formulários daqui
 * (sócio, contato, checkout) somam mais de vinte campos de texto, e escrever o
 * mesmo bloco vinte vezes é garantir que um deles esqueça o `aria-describedby`.
 * O componente é a fiação; o formulário continua decidindo nome, rótulo e
 * validação.
 *
 * O valor nulo (campo opcional que o VineJS converteu) vira `''` na tela, e o
 * React não reclama de campo que troca de não controlado para controlado.
 */
export function TextField<TValues extends FieldValues>({
  control,
  name,
  label,
  hint,
  placeholder,
  type = 'text',
  autoComplete,
  inputMode,
  mask,
  multiline = false,
  className,
}: TextFieldProps<TValues>): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value: unknown = field.value
        let text = ''
        if (typeof value === 'string') text = value

        function change(next: string): void {
          if (mask) {
            field.onChange(mask(next))
            return
          }
          field.onChange(next)
        }

        const shared = {
          id: name,
          name: field.name,
          value: text,
          onBlur: field.onBlur,
          placeholder,
          ...invalidProps(fieldState.invalid, name),
        }

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            <FieldLabel htmlFor={name} className={LABEL}>
              {label}
            </FieldLabel>
            {multiline && (
              <Textarea
                {...shared}
                rows={5}
                onChange={(event) => change(event.target.value)}
                className={cn(FIELD, 'h-auto resize-none py-3')}
              />
            )}
            {!multiline && (
              <Input
                {...shared}
                type={type}
                autoComplete={autoComplete}
                inputMode={inputMode}
                onChange={(event) => change(event.target.value)}
                className={FIELD}
              />
            )}
            {hint && !fieldState.error && (
              <FieldDescription>{hint}</FieldDescription>
            )}
            {fieldState.error && (
              <FieldError id={errorId(name)}>
                {fieldState.error.message}
              </FieldError>
            )}
          </Field>
        )
      }}
    />
  )
}
