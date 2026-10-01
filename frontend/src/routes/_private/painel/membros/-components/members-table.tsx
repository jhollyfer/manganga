import type * as React from 'react'
import { DotsThreeIcon, EyeIcon, PencilSimpleIcon } from '@phosphor-icons/react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Skeleton } from '#/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { formatDocument } from '#/lib/formatter'
import { MEMBER_ROLE_LABELS } from '#/lib/labels'
import type { Member } from '#/lib/model'
import { m } from '#/paraglide/messages'

/**
 * O cabeçalho da tabela.
 *
 * O documento some como coluna no celular e desce para baixo do nome: em
 * 390px, quatro colunas espremeriam o nome em três linhas, e é pelo nome que
 * a diretoria procura.
 */
function MembersTableHeader(): React.JSX.Element {
  return (
    <TableHeader className="sticky top-0 z-10 bg-muted/60 backdrop-blur">
      <TableRow className="hover:bg-transparent">
        <TableHead className="h-10 pl-4 text-micro">
          {m.admin_members_colName()}
        </TableHead>
        <TableHead className="hidden h-10 text-micro sm:table-cell">
          {m.admin_members_colDocument()}
        </TableHead>
        <TableHead className="h-10 text-micro">
          {m.admin_members_colRole()}
        </TableHead>
        <TableHead className="h-10 w-14 pr-4">
          <span className="sr-only">{m.admin_members_colActions()}</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export function MembersTable({
  members,
  onShow,
  onEdit,
}: {
  members: ReadonlyArray<Member>
  onShow: (id: string) => void
  onEdit: (id: string) => void
}): React.JSX.Element {
  return (
    <Table>
      <caption className="sr-only">{m.admin_members_caption()}</caption>
      <MembersTableHeader />
      <TableBody>
        {members.map((member) => {
          const name = member.user?.name ?? m.admin_member_notInformed()
          const document = formatDocument(member.document)

          return (
            <TableRow key={member.id}>
              <TableCell className="py-2.5 pl-4 whitespace-normal">
                <span className="block text-small font-medium">{name}</span>
                <span className="block text-micro text-muted-foreground tabular-nums sm:hidden">
                  {document}
                </span>
              </TableCell>
              <TableCell className="hidden text-small tabular-nums sm:table-cell">
                {document}
              </TableCell>
              <TableCell>
                {member.user && (
                  <Badge variant="secondary">
                    {MEMBER_ROLE_LABELS[member.user.role]()}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="pr-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-10 md:size-8"
                        aria-label={m.admin_members_actionsFor({ name })}
                      />
                    }
                  >
                    <DotsThreeIcon weight="bold" className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        {m.admin_members_colActions()}
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="min-h-9"
                        onClick={() => onShow(member.id)}
                      >
                        <EyeIcon />
                        {m.admin_members_show()}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="min-h-9"
                        onClick={() => onEdit(member.id)}
                      >
                        <PencilSimpleIcon />
                        {m.admin_members_edit()}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

/** As linhas falsas enquanto a primeira página chega, na largura da tabela real. */
export function MembersTableSkeleton({
  rows,
}: {
  rows: number
}): React.JSX.Element {
  return (
    <Table aria-busy="true">
      <caption className="sr-only">{m.admin_loading()}</caption>
      <MembersTableHeader />
      <TableBody>
        {Array.from({ length: rows }, (_, index) => (
          <TableRow key={index}>
            <TableCell className="py-3 pl-4">
              <Skeleton className="h-4 w-44 max-w-full" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20 rounded-full" />
            </TableCell>
            <TableCell className="pr-4">
              <Skeleton className="ml-auto size-8 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
