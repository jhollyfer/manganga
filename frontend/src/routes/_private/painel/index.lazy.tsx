import type * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ArrowDownRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import { LoadError } from '../-components/load-error'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '#/components/ui/chart'
import type { ChartConfig } from '#/components/ui/chart'
import { Skeleton } from '#/components/ui/skeleton'
import { dashboardQuery } from '#/integrations/tanstack-query/queries'
import { formatNumber, formatPercent, shortDate } from '#/lib/formatter'
import type { Dashboard } from '#/lib/model'
import { cn } from '#/lib/utils'
import { m } from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

export const Route = createLazyFileRoute('/_private/painel/')({
  component: RouteComponent,
})

/**
 * As cores dos gráficos, dos tokens do tema.
 *
 * `var(--primary)` e não um hexadecimal: o verde-mata do claro vira o
 * verde-folha do escuro sozinho, e o gráfico acompanha o botão ao lado. O
 * `ChartContainer` publica cada entrada como `--color-<chave>`, que é o que as
 * barras e a área leem.
 */
const REGISTRATIONS_CHART = {
  count: {
    label: () => m.admin_dashboard_chartRegistrations(),
    color: 'var(--primary)',
  },
} as const

const GROWTH_CHART = {
  members: {
    label: () => m.admin_dashboard_chartMembers(),
    color: 'var(--primary-glow)',
  },
} as const

/** O `ChartConfig` com o rótulo lido agora, no idioma de quem olha. */
function chartConfig(
  source: Record<string, { label: () => string; color: string }>,
): ChartConfig {
  return Object.fromEntries(
    Object.entries(source).map(([key, entry]) => [
      key,
      { label: entry.label(), color: entry.color },
    ]),
  )
}

/**
 * O Dashboard: quatro números e dois gráficos.
 *
 * Os mesmos do painel antigo (total, hoje, semana e crescimento; cadastros por
 * dia e evolução mensal), agora com as cores do Mangangá e com estado de erro:
 * antes, uma API fora do ar deixava o esqueleto girando para sempre.
 */
function RouteComponent(): React.JSX.Element {
  const dashboard = useQuery(dashboardQuery())

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary">{m.admin_dashboard_eyebrow()}</p>
          <h1 className="mt-1 text-h3">
            {m.admin_dashboard_titleStart()}{' '}
            <em>{m.admin_dashboard_titleEm()}</em>.
          </h1>
        </div>
        {dashboard.isSuccess && (
          <p className="text-micro text-muted-foreground">
            {m.admin_dashboard_updatedAt({
              date: new Date(dashboard.dataUpdatedAt).toLocaleString(
                getLocale(),
                { dateStyle: 'long', timeStyle: 'short' },
              ),
            })}
          </p>
        )}
      </div>

      {dashboard.isPending && <DashboardSkeleton />}

      {dashboard.isError && (
        <LoadError
          onRetry={() => void dashboard.refetch()}
          retrying={dashboard.isFetching}
        />
      )}

      {dashboard.isSuccess && <DashboardContent data={dashboard.data} />}
    </div>
  )
}

type Stat = {
  label: string
  value: string
  /** O comparativo sob o número; `null` quando o próprio número já é a taxa. */
  growth: { value: number; label: string } | null
  note?: string
}

function DashboardContent({ data }: { data: Dashboard }): React.JSX.Element {
  const locale = getLocale()
  const { stats } = data

  const STATS: ReadonlyArray<Stat> = [
    {
      label: m.admin_dashboard_totalMembers(),
      value: formatNumber(stats.totalMembers, locale),
      growth: {
        value: stats.monthlyGrowth,
        label: m.admin_dashboard_vsLastMonth(),
      },
    },
    {
      label: m.admin_dashboard_today(),
      value: formatNumber(stats.todayRegistrations, locale),
      growth: {
        value: stats.dailyGrowth,
        label: m.admin_dashboard_vsYesterday(),
      },
    },
    {
      label: m.admin_dashboard_week(),
      value: formatNumber(stats.weekRegistrations, locale),
      growth: {
        value: stats.weeklyGrowth,
        label: m.admin_dashboard_vsLastWeek(),
      },
    },
    {
      label: m.admin_dashboard_growthRate(),
      value: formatPercent(stats.monthlyGrowth, locale),
      growth: null,
      note: m.admin_dashboard_growthRateNote(),
    },
  ]

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <li key={stat.label}>
            <StatCard stat={stat} />
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle
              render={<h2 />}
              className="font-sans text-body font-medium"
            >
              {m.admin_dashboard_chartRegistrationsTitle()}
            </CardTitle>
            <CardDescription className="text-small">
              {m.admin_dashboard_chartRegistrationsDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig(REGISTRATIONS_CHART)}
              className="aspect-auto h-64 w-full sm:h-72"
            >
              <BarChart data={data.registrationsByDay}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={shortDate}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  width="auto"
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_, payload) =>
                        shortDate(String(payload[0]?.payload?.date ?? ''))
                      }
                    />
                  }
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              render={<h2 />}
              className="font-sans text-body font-medium"
            >
              {m.admin_dashboard_chartGrowthTitle()}
            </CardTitle>
            <CardDescription className="text-small">
              {m.admin_dashboard_chartGrowthDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig(GROWTH_CHART)}
              className="aspect-auto h-64 w-full sm:h-72"
            >
              <AreaChart data={data.monthlyTrend}>
                <defs>
                  <linearGradient id="fill-members" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-members)"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-members)"
                      stopOpacity={0.04}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  width="auto"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="monotone"
                  dataKey="members"
                  stroke="var(--color-members)"
                  strokeWidth={2}
                  fill="url(#fill-members)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function StatCard({ stat }: { stat: Stat }): React.JSX.Element {
  return (
    <Card className="h-full rounded-sm border-t border-t-ink">
      <CardHeader>
        <CardDescription className="text-micro font-bold tracking-[0.1em] uppercase">
          {stat.label}
        </CardDescription>
        <CardTitle className="font-display text-h2 leading-none tabular-nums">
          {stat.value}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-auto">
        {stat.growth && (
          <Growth value={stat.growth.value} label={stat.growth.label} />
        )}
        {stat.note && (
          <p className="text-micro text-muted-foreground">{stat.note}</p>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * A variação contra o período anterior.
 *
 * Seta e cor juntas, e não só cor: verde e vermelho são o par que o
 * daltônico mais confunde, e a seta diz a direção sem depender dele.
 */
function Growth({
  value,
  label,
}: {
  value: number
  label: string
}): React.JSX.Element {
  const rising = value >= 0

  return (
    <p className="flex items-center gap-1 text-micro text-muted-foreground">
      <span
        className={cn(
          'inline-flex items-center gap-0.5 font-semibold',
          rising && 'text-success',
          !rising && 'text-destructive',
        )}
      >
        {rising && <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />}
        {!rising && (
          <ArrowDownRightIcon aria-hidden="true" className="size-3.5" />
        )}
        <span className="sr-only">
          {rising && m.admin_dashboard_up()}
          {!rising && m.admin_dashboard_down()}
        </span>
        {formatPercent(Math.abs(value), getLocale())}
      </span>
      {label}
    </p>
  )
}

function DashboardSkeleton(): React.JSX.Element {
  return (
    <div aria-busy="true" className="flex flex-col gap-6">
      <span className="sr-only" role="status">
        {m.admin_loading()}
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <Card key={index}>
            <CardHeader className="gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full sm:h-72" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
