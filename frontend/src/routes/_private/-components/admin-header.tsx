import * as React from 'react'
import {
  Link,
  useMatchRoute,
  useNavigate,
  useMatch,
} from '@tanstack/react-router'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { m } from '#/paraglide/messages'

/**
 * O topo do painel: o botão do menu, a trilha e, na lista de membros, a busca.
 *
 * A busca mora aqui e não na página porque é o lugar onde o painel antigo a
 * punha, e a diretoria já procura por ela no alto. Ela só aparece onde há o
 * que buscar: no Dashboard seria um campo que não faz nada.
 */
export function AdminHeader(): React.JSX.Element {
  const matchRoute = useMatchRoute()

  const current = PANEL_MENU.find((item) =>
    matchRoute({ to: item.to, fuzzy: item.fuzzy }),
  )
  // `useMatch` sem lançar, e não `useSearch` lá dentro: ao sair da lista, o
  // cabeçalho ainda renderiza uma vez com a rota de membros já desmontada, e
  // o `useSearch({ from })` estrito derrubava a página com "Invariant failed".
  const members = useMatch({
    from: '/_private/painel/membros/',
    shouldThrow: false,
  })

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
      {members && <MembersSearchInput search={members.search.search} />}
    </header>
  )
}

/**
 * A busca da lista de membros, que escreve `?search=` na URL.
 *
 * Não controlada: o texto vive no campo e só vai para a URL no Enter. Busca a
 * cada tecla mandaria uma requisição por letra para a API, e reescrever a URL
 * enquanto a pessoa digita faz o voltar do navegador desfazer letra por letra.
 * Apagar tudo limpa na hora, porque esperar o Enter para "ver todos de novo"
 * não é o que ninguém espera de um campo vazio.
 *
 * Trocar a busca volta para a página 1: a página 7 de "Silva" quase nunca
 * existe, e a tela vazia pareceria "ninguém encontrado".
 */
function MembersSearchInput({
  search,
}: {
  search: string | undefined
}): React.JSX.Element {
  const navigate = useNavigate({ from: '/painel/membros/' })
  const input = React.useRef<HTMLInputElement>(null)

  // O campo não é controlado, então quando a busca muda por fora (o "limpar
  // busca" da lista vazia, o voltar do navegador) ele precisa ser avisado.
  // Só escreve quando diverge: depois do Enter o texto já é o da URL, e
  // reescrever moveria o cursor de quem continua digitando.
  React.useEffect(() => {
    const element = input.current
    if (!element) return

    const current = search ?? ''
    if (element.value.trim() !== current) element.value = current
  }, [search])

  function apply(value: string): void {
    const text = value.trim()
    void navigate({
      search: (previous) => ({
        ...previous,
        page: undefined,
        search: text || undefined,
      }),
      replace: true,
    })
  }

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = data.get('search')
    if (typeof value === 'string') apply(value)
  }

  function change(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.currentTarget.value === '' && search) apply('')
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className="order-last w-full md:order-none md:w-72 lg:w-80"
    >
      <label htmlFor="members-search" className="sr-only">
        {m.admin_members_searchLabel()}
      </label>
      <InputGroup className="h-11 md:h-8">
        <InputGroupAddon>
          <MagnifyingGlassIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          ref={input}
          id="members-search"
          name="search"
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          defaultValue={search ?? ''}
          placeholder={m.admin_members_searchPlaceholder()}
          onChange={change}
          className="text-body md:text-xs/relaxed"
        />
      </InputGroup>
    </form>
  )
}
