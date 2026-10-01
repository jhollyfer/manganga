import type * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowSquareOutIcon,
  CaretUpDownIcon,
  SignOutIcon,
} from '@phosphor-icons/react'
import type { IconWeight } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { PANEL_MENU } from './menu'
import { BrandStar } from '#/components/common/brand-mark'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '#/components/ui/sidebar'
import { Skeleton } from '#/components/ui/skeleton'
import { signOutMutation } from '#/integrations/tanstack-query/mutations'
import { profileQuery } from '#/integrations/tanstack-query/queries'
import { initials } from '#/lib/formatter'
import { MEMBER_ROLE_LABELS } from '#/lib/labels'
import { SITE_TITLE } from '#/lib/site'
import { m } from '#/paraglide/messages'

/**
 * As cores do menu lateral, aplicadas por fora.
 *
 * O `sidebar.tsx` do registry pinta com `bg-sidebar`, `ring-sidebar-border` e
 * `bg-sidebar-accent`, e o `styles.css` do site não declara os tokens
 * `--sidebar-*`: sem eles o Tailwind não gera a classe, e o menu ficava
 * transparente (no celular, a gaveta deixava ver a tabela por baixo) e com o
 * anel na cor do texto. Corrigir no `ui/` seria desfeito pelo próximo
 * `shadcn add`; aqui o painel aponta o menu para os tokens que existem.
 *
 * O fundo vai num invólucro (`SIDEBAR_SURFACE`) e não na classe do `Sidebar`
 * porque no celular o registry desenha uma gaveta em portal, e a classe do
 * `Sidebar` não chega até ela; o invólucro chega, porque é filho.
 */
const SIDEBAR_RING = '[&_[data-slot=sidebar-inner]]:ring-border'
const SIDEBAR_SURFACE =
  'flex size-full flex-col rounded-[inherit] bg-card text-card-foreground'

/** O item do menu: verde-mata quando ativo, como a pílula da vitrine. */
const MENU_BUTTON =
  'h-10 text-small hover:bg-accent hover:text-accent-foreground data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-primary-foreground group-data-[collapsible=icon]:size-10!'

/**
 * O menu lateral do painel: a marca, os destinos e quem está logado.
 *
 * `collapsible="icon"` e `variant="floating"`, como no painel antigo: no
 * notebook da diretoria a tabela de membros precisa da largura, e o menu
 * recolhido ainda deixa os ícones com dica ao passar o mouse. No celular o
 * registry troca o menu por uma gaveta, e tocar num destino a fecha.
 */
export function AppSidebar(): React.JSX.Element {
  const matchRoute = useMatchRoute()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" variant="floating" className={SIDEBAR_RING}>
      <div className={SIDEBAR_SURFACE}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="hover:bg-accent group-data-[collapsible=icon]:size-10!"
                render={
                  <Link to="/painel" onClick={() => setOpenMobile(false)} />
                }
              >
                <BrandStar className="size-7!" />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-2xl font-extrabold uppercase">
                    {SITE_TITLE}
                  </span>
                  <span className="text-2xs tracking-[0.16em] text-muted-foreground uppercase">
                    {m.admin_brand_area()}
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground">
              {m.admin_nav_group()}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {PANEL_MENU.map((item) => {
                const active = Boolean(
                  matchRoute({ to: item.to, fuzzy: item.fuzzy }),
                )
                let weight: IconWeight = 'regular'
                if (active) weight = 'fill'

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.label()}
                      className={MENU_BUTTON}
                      render={
                        <Link
                          to={item.to}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                    >
                      <item.icon weight={weight} />
                      <span>{item.label()}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}

/**
 * Quem está logado, e a saída.
 *
 * O perfil vem do cache que o guarda do layout encheu no `beforeLoad`, então
 * não há requisição nova aqui; o esqueleto só aparece no instante entre a
 * saída e a troca de página, quando o cache já foi limpo.
 *
 * A saída navega **antes** de limpar o cache: limpando primeiro, as telas
 * ainda montadas refariam as próprias consultas, levariam 401 e disparariam o
 * aviso de sessão expirada por cima do "até logo".
 */
function UserMenu(): React.JSX.Element {
  const { data: user } = useQuery(profileQuery())
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const signOut = useMutation({
    ...signOutMutation(),
    async onSuccess() {
      await navigate({ to: '/entrar', replace: true })
      queryClient.clear()
      toast.success(m.admin_signOut_success(), { id: 'sign-out' })
    },
    onError() {
      toast.error(m.admin_signOut_error(), { id: 'sign-out' })
    },
  })

  if (!user) {
    return (
      <div className="flex items-center gap-2 p-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 flex-1 group-data-[collapsible=icon]:hidden" />
      </div>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="hover:bg-accent data-popup-open:bg-accent group-data-[collapsible=icon]:size-10!"
                aria-label={m.admin_userMenu()}
              />
            }
          >
            <Avatar>
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="grid flex-1 text-left leading-tight">
              <span className="truncate text-small font-medium">
                {user.name}
              </span>
              <span className="truncate text-2xs text-muted-foreground">
                {user.email ?? MEMBER_ROLE_LABELS[user.role]()}
              </span>
            </span>
            <CaretUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="truncate text-small font-medium text-foreground">
                  {user.name}
                </span>
                <span>{MEMBER_ROLE_LABELS[user.role]()}</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="min-h-9" render={<Link to="/" />}>
              <ArrowSquareOutIcon />
              {m.admin_backToSite()}
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="min-h-9"
              disabled={signOut.isPending}
              onClick={() => signOut.mutate()}
            >
              <SignOutIcon />
              {m.admin_signOut()}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
