import * as React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, createLazyFileRoute, getRouteApi } from '@tanstack/react-router'
import { DownloadSimpleIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { LoadError } from '../../-components/load-error'
import {
  CreateMemberSheet,
  EditMemberSheet,
  ShowMemberSheet,
} from './-components/member-sheets'
import { MembersPagination } from './-components/members-pagination'
import { MembersTable, MembersTableSkeleton } from './-components/members-table'
import { DEFAULT_PER_PAGE, membersListParams } from './-search'
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
import { exportMembersMutation } from '#/integrations/tanstack-query/mutations'
import { membersQuery } from '#/integrations/tanstack-query/queries'
import { exportFileName } from '#/lib/formatter'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'

const route = getRouteApi('/_private/painel/membros/')

export const Route = createLazyFileRoute('/_private/painel/membros/')({
  component: RouteComponent,
})

/** Qual folha está aberta, e de quem. */
type OpenSheet = {
  kind: 'create' | 'show' | 'edit' | null
  /** Fica preenchido depois de fechar, para a folha sair animada com o dado. */
  memberId: string | null
}

/** Entrega o `Blob` como download, sem abrir aba nova. */
function download(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  // O navegador lê a URL no clique; liberar já evita guardar a planilha
  // inteira na memória da aba até ela fechar.
  URL.revokeObjectURL(url)
}

/**
 * A lista de membros: busca (no cabeçalho), tabela, paginação, exportação e
 * as três folhas (novo, ver, editar).
 *
 * As folhas são controladas daqui e não abertas de dentro do menu de ações de
 * cada linha, como no painel antigo: lá cada linha montava duas folhas e duas
 * consultas ao membro, cinquenta linhas faziam cem requisições ao abrir a
 * página. Aqui há uma folha de cada, e a consulta só sai quando ela abre.
 */
function RouteComponent(): React.JSX.Element {
  const search = route.useSearch()
  const params = membersListParams(search)
  const members = useQuery(membersQuery(params))

  const [sheet, setSheet] = React.useState<OpenSheet>({
    kind: null,
    memberId: null,
  })

  function openSheet(kind: OpenSheet['kind'], memberId: string | null): void {
    setSheet({ kind, memberId })
  }

  function closeSheet(open: boolean): void {
    if (!open) setSheet((current) => ({ ...current, kind: null }))
  }

  const exportToExcel = useMutation({
    ...exportMembersMutation(),
    onSuccess(blob) {
      download(blob, exportFileName(new Date()))
    },
    onError() {
      toast.error(m.admin_members_exportError(), { id: 'members-export' })
    },
  })

  const rows = members.data?.data ?? []
  const meta = members.data?.meta

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">{m.admin_members_eyebrow()}</p>
          <h1 className="mt-1 text-h3">
            {m.admin_members_titleStart()} <em>{m.admin_members_titleEm()}</em>.
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <Button
            variant="outline"
            size="lg"
            className="h-10 rounded-full px-4 text-small"
            disabled={exportToExcel.isPending}
            onClick={() => exportToExcel.mutate()}
          >
            {exportToExcel.isPending && <Spinner aria-hidden="true" />}
            {!exportToExcel.isPending && <DownloadSimpleIcon />}
            {m.admin_members_export()}
          </Button>
          <CreateMemberSheet
            open={sheet.kind === 'create'}
            onOpenChange={(open) => {
              if (open) openSheet('create', null)
              closeSheet(open)
            }}
          />
        </div>
      </div>

      {members.isError && (
        <LoadError
          onRetry={() => void members.refetch()}
          retrying={members.isFetching}
        />
      )}

      {!members.isError && (
        <div
          className={cn(
            'overflow-hidden rounded-xl border border-border bg-card transition-opacity',
            members.isPlaceholderData && 'opacity-60',
          )}
          aria-busy={members.isFetching}
        >
          {members.isPending && (
            <MembersTableSkeleton rows={Math.min(params.perPage, 10)} />
          )}
          {members.isSuccess && rows.length > 0 && (
            <MembersTable
              members={rows}
              onShow={(id) => openSheet('show', id)}
              onEdit={(id) => openSheet('edit', id)}
            />
          )}
          {members.isSuccess && rows.length === 0 && (
            <MembersEmpty search={params.search} page={params.page} />
          )}
        </div>
      )}

      {meta && (
        <MembersPagination
          page={meta.currentPage ?? params.page}
          perPage={search.perPage ?? DEFAULT_PER_PAGE}
          lastPage={meta.lastPage}
          total={meta.total}
        />
      )}

      <ShowMemberSheet
        open={sheet.kind === 'show'}
        onOpenChange={closeSheet}
        memberId={sheet.memberId}
        onEdit={() => openSheet('edit', sheet.memberId)}
      />
      <EditMemberSheet
        open={sheet.kind === 'edit'}
        onOpenChange={closeSheet}
        memberId={sheet.memberId}
      />
    </div>
  )
}

/**
 * A lista vazia, que diz **por que** está vazia.
 *
 * Três casos com saídas diferentes: a busca não achou ninguém (limpar a
 * busca), a página passou do fim, que acontece com link antigo depois de a
 * lista encolher (voltar à primeira), e o painel ainda sem cadastro nenhum.
 */
function MembersEmpty({
  search,
  page,
}: {
  search: string | undefined
  page: number
}): React.JSX.Element {
  let title = m.admin_members_emptyTitle()
  let description = m.admin_members_emptyDescription()
  if (page > 1) {
    title = m.admin_members_emptyPageTitle()
    description = m.admin_members_emptyPageDescription()
  }
  if (search) {
    title = m.admin_members_emptySearchTitle({ search })
    description = m.admin_members_emptySearchDescription()
  }

  return (
    <Empty className="py-16">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-10 rounded-full bg-primary/10 text-primary"
        >
          <UsersThreeIcon className="size-5" />
        </EmptyMedia>
        <EmptyTitle className="text-body font-medium">{title}</EmptyTitle>
        <EmptyDescription className="text-small">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {(Boolean(search) || page > 1) && (
        <EmptyContent>
          <Button
            variant="outline"
            size="lg"
            className="h-10 rounded-full px-4 text-small"
            nativeButton={false}
            render={<Link to="/painel/membros" search={{}} replace />}
          >
            {m.admin_members_emptyReset()}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
