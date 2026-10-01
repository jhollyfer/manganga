import type * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { MemberForm, MemberFormSubmit } from './member-form'
import {
  EMPTY_MEMBER,
  toMemberFormValues,
  toMemberPayload,
} from '../-member-payload'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'
import { Skeleton } from '#/components/ui/skeleton'
import {
  createMemberMutation,
  updateMemberMutation,
} from '#/integrations/tanstack-query/mutations'
import { memberQuery, queryKeys } from '#/integrations/tanstack-query/queries'
import { formatDocument, isoToBrDate } from '#/lib/formatter'
import { MEMBER_ROLE_LABELS } from '#/lib/labels'
import type { Member } from '#/lib/model'
import type { MemberUpsertPayload } from '#/lib/validator'
import { m } from '#/paraglide/messages'

/**
 * A folha lateral do painel: inteira no celular, 36rem no notebook.
 *
 * Cabeçalho e rodapé fixos e o meio rolando: o botão de salvar e o título
 * ficam à vista enquanto a pessoa desce pela filiação.
 */
const SHEET =
  'w-full gap-0 data-[side=right]:w-full data-[side=right]:sm:max-w-xl'
const SHEET_BODY = 'flex-1 overflow-y-auto px-6 pb-6'
const SHEET_TITLE = 'font-display text-h4 font-normal'

/**
 * Depois de salvar, a lista e o detalhe saem do cache juntos.
 *
 * Pelo prefixo `['administrator', 'members']` e não pela chave da página
 * aberta, como fazia o painel antigo: um membro novo pode cair em outra
 * página, ou sair da busca atual, e invalidar só a página visível deixava as
 * outras mostrando a lista de antes até o `staleTime` vencer.
 */
async function invalidateMembers(
  queryClient: ReturnType<typeof useQueryClient>,
): Promise<void> {
  await queryClient.invalidateQueries({ queryKey: queryKeys.members })
  await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard })
}

type ControlledSheet = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** O cadastro de membro, aberto pelo botão "Novo membro" da página. */
export function CreateMemberSheet({
  open,
  onOpenChange,
}: ControlledSheet): React.JSX.Element {
  const queryClient = useQueryClient()

  const create = useMutation({
    ...createMemberMutation(),
    async onSuccess() {
      onOpenChange(false)
      toast.success(m.admin_member_created(), { id: 'member-save' })
      await invalidateMembers(queryClient)
    },
  })

  async function submit(values: MemberUpsertPayload): Promise<void> {
    await create.mutateAsync(toMemberPayload(values))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        render={
          <Button size="lg" className="h-10 rounded-full px-4 text-small" />
        }
      >
        <PlusIcon weight="bold" />
        {m.admin_members_new()}
      </SheetTrigger>
      <SheetContent className={SHEET}>
        <SheetHeader className="pr-16">
          <SheetTitle className={SHEET_TITLE}>
            {m.admin_member_createTitle()}
          </SheetTitle>
          <SheetDescription className="text-small">
            {m.admin_member_createDescription()}
          </SheetDescription>
        </SheetHeader>
        <div className={SHEET_BODY}>
          {/* Montado só com a folha aberta: fechar e abrir de novo começa limpo. */}
          {open && (
            <MemberForm
              id="member-create"
              defaultValues={EMPTY_MEMBER}
              onSubmit={submit}
            />
          )}
        </div>
        <SheetFooter className="border-t border-border">
          <MemberFormSubmit form="member-create" pending={create.isPending}>
            {m.admin_member_createSubmit()}
          </MemberFormSubmit>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

type MemberSheetProps = ControlledSheet & {
  /** O membro aberto. Fica preenchido depois de fechar, para a saída animar. */
  memberId: string | null
}

/** A ficha de um membro, só leitura, com o atalho para a edição. */
export function ShowMemberSheet({
  open,
  onOpenChange,
  memberId,
  onEdit,
}: MemberSheetProps & { onEdit: () => void }): React.JSX.Element {
  const member = useQuery({
    ...memberQuery(memberId ?? ''),
    enabled: open && memberId !== null,
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={SHEET}>
        <SheetHeader className="pr-16">
          <SheetTitle className={SHEET_TITLE}>
            {m.admin_member_showTitle()}
          </SheetTitle>
          <SheetDescription className="text-small">
            {m.admin_member_showDescription()}
          </SheetDescription>
        </SheetHeader>
        <div className={SHEET_BODY}>
          {member.isPending && <DetailsSkeleton />}
          {member.isError && (
            <p role="alert" className="text-small text-destructive">
              {m.admin_member_loadError()}
            </p>
          )}
          {member.isSuccess && <MemberDetails member={member.data} />}
        </div>
        <SheetFooter className="border-t border-border">
          <Button
            variant="outline"
            size="lg"
            className="h-10 w-full rounded-full text-small"
            disabled={!member.isSuccess}
            onClick={onEdit}
          >
            <PencilSimpleIcon />
            {m.admin_members_edit()}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/** A edição de um membro: o mesmo formulário do cadastro, já preenchido. */
export function EditMemberSheet({
  open,
  onOpenChange,
  memberId,
}: MemberSheetProps): React.JSX.Element {
  const queryClient = useQueryClient()
  const member = useQuery({
    ...memberQuery(memberId ?? ''),
    enabled: open && memberId !== null,
  })

  const update = useMutation({
    ...updateMemberMutation(memberId ?? ''),
    async onSuccess() {
      onOpenChange(false)
      toast.success(m.admin_member_updated(), { id: 'member-save' })
      await invalidateMembers(queryClient)
    },
  })

  async function submit(values: MemberUpsertPayload): Promise<void> {
    await update.mutateAsync(toMemberPayload(values))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={SHEET}>
        <SheetHeader className="pr-16">
          <SheetTitle className={SHEET_TITLE}>
            {m.admin_member_editTitle()}
          </SheetTitle>
          <SheetDescription className="text-small">
            {m.admin_member_editDescription()}
          </SheetDescription>
        </SheetHeader>
        <div className={SHEET_BODY}>
          {member.isPending && <DetailsSkeleton />}
          {member.isError && (
            <p role="alert" className="text-small text-destructive">
              {m.admin_member_loadError()}
            </p>
          )}
          {/*
            `key` com a hora da resposta: o `useForm` só lê `defaultValues` na
            montagem, e reabrir a edição de outro membro (ou do mesmo, depois
            de salvar) precisa remontar o formulário com o dado novo.
          */}
          {member.isSuccess && open && (
            <MemberForm
              key={`${member.data.id}-${member.dataUpdatedAt}`}
              id="member-edit"
              defaultValues={toMemberFormValues(member.data)}
              onSubmit={submit}
            />
          )}
        </div>
        <SheetFooter className="border-t border-border">
          <MemberFormSubmit
            form="member-edit"
            pending={update.isPending}
            disabled={!member.isSuccess}
          >
            {m.admin_member_editSubmit()}
          </MemberFormSubmit>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/** A ficha em lista de definição: rótulo e valor, que é como o leitor de tela lê par. */
function MemberDetails({ member }: { member: Member }): React.JSX.Element {
  const notInformed = m.admin_member_notInformed()

  let role: React.ReactNode = notInformed
  if (member.user)
    role = (
      <Badge variant="secondary">
        {MEMBER_ROLE_LABELS[member.user.role]()}
      </Badge>
    )

  const rows: ReadonlyArray<{ label: string; value: React.ReactNode }> = [
    { label: m.admin_member_name(), value: member.user?.name ?? notInformed },
    {
      label: m.admin_member_document(),
      value: formatDocument(member.document),
    },
    { label: m.admin_member_birthDate(), value: isoToBrDate(member.birthDate) },
    { label: m.admin_member_role(), value: role },
    { label: m.admin_member_extras(), value: member.extras ?? notInformed },
    {
      label: m.admin_member_mother(),
      value: member.user?.responsible?.mother ?? notInformed,
    },
    {
      label: m.admin_member_father(),
      value: member.user?.responsible?.father ?? notInformed,
    },
  ]

  return (
    <dl className="divide-y divide-border">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
        >
          <dt className="text-micro text-muted-foreground">{row.label}</dt>
          <dd className="text-small break-words whitespace-pre-line">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function DetailsSkeleton(): React.JSX.Element {
  return (
    <div aria-busy="true" className="flex flex-col gap-4 py-3">
      <span role="status" className="sr-only">
        {m.admin_loading()}
      </span>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-full max-w-xs" />
        </div>
      ))}
    </div>
  )
}
