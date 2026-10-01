import type * as React from 'react'
import { ArrowClockwiseIcon, CloudSlashIcon } from '@phosphor-icons/react'

import { Button } from '#/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { Spinner } from '#/components/ui/spinner'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

/**
 * A tela de "não carregou", com o botão de tentar de novo.
 *
 * Mora no `-components/` do painel porque o Dashboard e a lista de membros a
 * desenham igual. O 401 não chega aqui: o `useSessionExpiry` do layout manda
 * para a entrada antes. O que sobra é API fora do ar ou rede do interior
 * caindo, e para os dois o certo é tentar de novo, sem recarregar a página.
 */
export function LoadError({
  onRetry,
  retrying,
  className,
}: {
  onRetry: () => void
  retrying: boolean
  className?: string
}): React.JSX.Element {
  return (
    <Empty
      role="alert"
      className={cn('border border-dashed border-border py-12', className)}
    >
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-10 rounded-full bg-destructive/10 text-destructive"
        >
          <CloudSlashIcon className="size-5" />
        </EmptyMedia>
        <EmptyTitle className="text-body font-medium">
          {m.admin_loadError_title()}
        </EmptyTitle>
        <EmptyDescription className="text-small">
          {m.admin_loadError_description()}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="lg"
          className="h-10 rounded-full px-4"
          onClick={onRetry}
          disabled={retrying}
        >
          {retrying && <Spinner aria-hidden="true" />}
          {!retrying && <ArrowClockwiseIcon />}
          {m.admin_loadError_retry()}
        </Button>
      </EmptyContent>
    </Empty>
  )
}
