import type * as React from 'react'
import { Link, useMatchRoute } from '@tanstack/react-router'

import { PANEL_MENU } from './menu'
import { ThemeToggle } from '#/components/common/theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { m } from '#/paraglide/messages'

/** O topo do painel: o botão do menu e a trilha até a página aberta. */
export function AdminHeader(): React.JSX.Element {
  const matchRoute = useMatchRoute()

  const current = PANEL_MENU.find((item) =>
    matchRoute({ to: item.to, fuzzy: item.fuzzy }),
  )

  return (
    <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center gap-x-3 gap-y-2 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-xl md:px-6">
      {/*
        44px no celular: é o único caminho para o menu ali, e o `icon-sm` de
        24px do registry erra debaixo do polegar.
      */}
      <SidebarTrigger
        className="-ml-1 size-11 md:size-8"
        aria-label={m.admin_toggleSidebar()}
      />
      <span aria-hidden="true" className="h-5 w-px bg-border" />
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="text-small">
          <BreadcrumbItem className="hidden sm:inline-flex">
            <BreadcrumbLink render={<Link to="/painel" />}>
              {m.admin_breadcrumbRoot()}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:inline-flex" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {current?.label() ?? m.admin_breadcrumbRoot()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ThemeToggle className="size-11 md:size-8" />
    </header>
  )
}
