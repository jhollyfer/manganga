import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Tooltip } from "@/components/ui/tooltip";
import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export interface DashboardStats {
  totalMembers: number;
  todayRegistrations: number;
  weekRegistrations: number;
  monthlyGrowth: number;
  dailyGrowth: number;
  weeklyGrowth: number;
}

export interface RegistrationsByDay {
  date: string;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  members: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  registrationsByDay: RegistrationsByDay[];
  monthlyTrend: MonthlyTrend[];
}

export const Route = createFileRoute("/_private/dashboard/")({
  component: RouteComponent,
});

// Componente Skeleton para usar no lugar do loading
function SkeletonDashboard() {
  return (
    <div className="flex-1 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 overflow-y-auto h-auto">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="space-y-2">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-64" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[250px] sm:h-[300px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RouteComponent() {
  const response = useQuery({
    queryKey: ["DASHBOARD"],
    queryFn: async function () {
      const route = "/administrator/dashboard";
      const { data } = await API.get<DashboardResponse>(route);
      return data;
    },
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const GrowthIndicator = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";

    return (
      <div className="text-xs text-muted-foreground flex items-center">
        <Icon className={`h-3 w-3 mr-1 ${colorClass}`} />
        <span className={`${colorClass} font-medium`}>
          {Math.abs(value).toFixed(1)}%
        </span>{" "}
        <span className="ml-1">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 overflow-y-auto h-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Última atualização:{" "}
          {new Date().toLocaleString("pt-BR", {
            dateStyle: "full",
          })}
        </div>
      </div>

      {response.status === "pending" && <SkeletonDashboard />}

      {response.status === "success" && (
        <React.Fragment>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Membros
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {formatNumber(response?.data?.stats?.totalMembers ?? 0)}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <GrowthIndicator
                  value={response?.data?.stats.monthlyGrowth ?? 0}
                  label="do mês passado"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cadastrados Hoje
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {formatNumber(
                      response?.data?.stats.todayRegistrations ?? 0
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                  <UserPlusIcon className="h-6 w-6 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <GrowthIndicator
                  value={response?.data?.stats.dailyGrowth ?? 0}
                  label="do dia anterior"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cadastrados na Semana
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {formatNumber(response?.data?.stats.weekRegistrations ?? 0)}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
                  <CalendarIcon className="h-6 w-6 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <GrowthIndicator
                  value={response?.data?.stats.weeklyGrowth ?? 0}
                  label="da semana passada"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Taxa de Crescimento
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {response?.data?.stats.monthlyGrowth.toFixed(1) ?? 0}%
                  </CardDescription>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100">
                  <TrendingUpIcon className="h-6 w-6 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Crescimento mensal médio
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cadastros por Dia</CardTitle>
                <CardDescription>
                  Número de novos membros nos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={response?.data?.registrationsByDay}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#0284c7"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Membros</CardTitle>
                <CardDescription>
                  Evolução do número total de membros nos últimos meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={response?.data?.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="members"
                        stroke="#0284c7"
                        fill="#0284c7"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
