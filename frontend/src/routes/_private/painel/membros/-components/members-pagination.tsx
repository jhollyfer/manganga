import type * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from '../-search'
import type { PerPage } from '../-search'
import { Button } from '#/components/ui/button'
import { NativeSelect, NativeSelectOption } from '#/components/ui/native-select'
import { formatNumber } from '#/lib/formatter'
import { m } from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

function toPerPage(value: string): PerPage {
  return (
    PER_PAGE_OPTIONS.find((option) => String(option) === value) ??
    DEFAULT_PER_PAGE
  )
}

/**
 * A paginação da lista: itens por página e os quatro saltos.
 *
 * Escreve na URL, como a busca, e com `replace`: andar de página em página não
 * deve encher o histórico, senão o voltar do navegador refaz o caminho página
 * por página em vez de sair da lista.
 *
 * Página 1 e 50 por página saem da URL (`undefined`), que é a forma em que o
 * `validateSearch` as guarda.
 */
export function MembersPagination({
  page,
  perPage,
  lastPage,
  total,
}: {
  page: number
  perPage: PerPage
  lastPage: number
  total: number
}): React.JSX.Element {
  const navigate = useNavigate({ from: '/painel/membros/' })
  const last = Math.max(lastPage, 1)

  function goTo(target: number): void {
    let next: number | undefined = target
    if (target <= 1) next = undefined

    void navigate({
      search: (previous) => ({ ...previous, page: next }),
      replace: true,
    })
  }

  function changePerPage(event: React.ChangeEvent<HTMLSelectElement>): void {
    let next: PerPage | undefined = toPerPage(event.currentTarget.value)
    if (next === DEFAULT_PER_PAGE) next = undefined

    void navigate({
      search: (previous) => ({ ...previous, page: undefined, perPage: next }),
      replace: true,
    })
  }

  const steps: ReadonlyArray<{
    label: string
    icon: Icon
    target: number
    disabled: boolean
  }> = [
    {
      label: m.admin_pagination_first(),
      icon: CaretDoubleLeftIcon,
      target: 1,
      disabled: page <= 1,
    },
    {
      label: m.admin_pagination_previous(),
      icon: CaretLeftIcon,
      target: page - 1,
      disabled: page <= 1,
    },
    {
      label: m.admin_pagination_next(),
      icon: CaretRightIcon,
      target: page + 1,
      disabled: page >= last,
    },
    {
      label: m.admin_pagination_last(),
      icon: CaretDoubleRightIcon,
      target: last,
      disabled: page >= last,
    },
  ]

  return (
    <nav
      aria-label={m.admin_pagination_label()}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-2 text-small text-muted-foreground">
        <label htmlFor="members-per-page">{m.admin_pagination_perPage()}</label>
        <NativeSelect
          id="members-per-page"
          value={String(perPage)}
          onChange={changePerPage}
          className="[&>select]:h-9 [&>select]:pr-7 [&>select]:text-small"
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <NativeSelectOption key={option} value={String(option)}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <span className="ml-1">
          {m.admin_pagination_total({
            total: formatNumber(total, getLocale()),
          })}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className="text-small text-muted-foreground" aria-live="polite">
          {m.admin_pagination_status({ page, last })}
        </p>
        <div className="flex items-center gap-1">
          {steps.map((step) => (
            <Button
              key={step.label}
              variant="outline"
              size="icon"
              className="size-10 md:size-8"
              aria-label={step.label}
              disabled={step.disabled}
              onClick={() => goTo(step.target)}
            >
              <step.icon />
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
