import type { MemberRole } from './entity'
import type { Merge } from './interfaces'

/**
 * Os contratos da API AdonisJS do Mangangá, na forma em que ela responde.
 *
 * Portados do `lib/model.ts` do site anterior, com duas correções que o tipo
 * antigo escondia: `User.password` saiu (a API não devolve senha, e o campo no
 * tipo convidava alguém a exibi-lo), e `role` é o vocabulário fechado de
 * `entity.ts` em vez de `string`, para que um papel novo na API sem rótulo em
 * `labels.ts` apareça como erro de compilação e não como célula vazia.
 *
 * O `http<T>()` **afirma** estes tipos, não os verifica: a API é nossa, e é
 * aqui que o contrato fica escrito.
 */

type Base = {
  id: string
  createdAt: string
  updatedAt: string
}

/** A paginação do Lucid: `currentPage` vem `null` quando a lista está vazia. */
export type Meta = {
  total: number
  page: number
  perPage: number
  currentPage: number | null
  lastPage: number
  firstPage: number
}

export type Paginated<TEntity> = {
  data: Array<TEntity>
  meta: Meta
}

/** A filiação de quem brinca, porque boa parte dos membros é menor de idade. */
export type Responsible = Merge<
  Base,
  {
    mother: string
    father: string | null
    userId: string
  }
>

export type User = Merge<
  Base,
  {
    name: string
    email: string | null
    role: MemberRole
    responsible: Responsible | null
  }
>

/**
 * Um membro do boi. Nome, papel e filiação moram no `user`; documento,
 * nascimento e observações, no membro: é a divisão das tabelas da API, e o
 * formulário do painel junta as duas metades num corpo só.
 */
export type Member = Merge<
  Base,
  {
    document: string
    /** `aaaa-mm-dd`, às vezes com a hora (`aaaa-mm-ddT00:00:00.000Z`). */
    birthDate: string
    extras: string | null
    registeredById: string
    userId: string
    user: User | null
  }
>

/**
 * O corpo de `POST /administrator/members` e `PATCH /administrator/members/:id`.
 *
 * Documento só com dígitos e data em `aaaa-mm-dd`: a conversão sai do que a
 * pessoa digitou (`dd/mm/aaaa`, CPF com máscara) em `toMemberPayload`.
 */
export type MemberPayload = {
  name: string
  document: string
  birthDate: string
  role: MemberRole
  extras: string | null
  responsible: {
    mother: string
    father: string | null
  }
}

export type DashboardStats = {
  totalMembers: number
  todayRegistrations: number
  weekRegistrations: number
  /** Percentual em relação ao mês anterior; negativo quando caiu. */
  monthlyGrowth: number
  dailyGrowth: number
  weeklyGrowth: number
}

export type RegistrationsByDay = {
  date: string
  count: number
}

export type MonthlyTrend = {
  month: string
  members: number
}

/** `GET /administrator/dashboard`. */
export type Dashboard = {
  stats: DashboardStats
  registrationsByDay: Array<RegistrationsByDay>
  monthlyTrend: Array<MonthlyTrend>
}
