import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/api";
import { MetaDefault } from "@/lib/constant";
import type { Member, Paginated } from "@/lib/model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { CircleIcon, DownloadIcon } from "lucide-react";
import { CreateMemberSheet } from "./-components/create-member-sheet";
import { Table } from "./-components/table";
import { TableSkeleton } from "./-components/table-skeleton";

interface SearchProps {
  page?: string;
  perPage?: string;
  search?: string;
}

export const Route = createFileRoute("/_private/members/")({
  component: RouteComponent,
  validateSearch: (params: SearchProps) => {
    return {
      page: Number(params.page ?? 1),
      perPage: Number(params?.perPage ?? 50),
      search: params?.search,
    };
  },

  head: () => ({
    meta: [
      {
        title: "Mangangá - Gerenciar Membros",
      },
      {
        name: "description",
        content:
          "Área administrativa para gerenciamento de membros do Boi Bumbá Mangangá",
      },
    ],
  }),
});

function RouteComponent() {
  const { search, page, perPage } = useSearch({
    from: "/_private/members/",
  });

  const response = useQuery({
    queryKey: [
      "MEMBERS-LIST-PAGINATED",
      {
        page,
        perPage,
        ...(search && { search }),
      },
    ],
    queryFn: async function () {
      const route = "/administrator/members/paginated";
      const { data } = await API.get<Paginated<Member>>(route, {
        params: {
          page,
          perPage,
          ...(search && { search }),
        },
      });
      return data;
    },
  });

  const exportToExcel = useMutation({
    mutationFn: async function () {
      const route = "/administrator/members/export-to-excel";

      const response = await API.get(route, {
        responseType: "blob",
      });

      return response.data;
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const date = new Date()
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          second: "2-digit",
          minute: "2-digit",
          hour: "2-digit",
        })
        ?.replace(/\D/g, "");

      link.download = "MEMBROS_".concat(date, ".xlsx");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Erro ao exportar Excel:", error);
    },
  });

  const headers = ["Nome", "CPF/RG", "Categoria"];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 p-2 gap-2 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
        <h1 className="text-2xl font-medium ">Membros</h1>
        <div className="grid grid-cols-2 items-center gap-2 w-full md:w-auto">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => exportToExcel.mutateAsync()}
            disabled={exportToExcel.status === "pending"}
          >
            {exportToExcel.status === "pending" && (
              <CircleIcon className="animate-spin size-4" />
            )}
            {!(exportToExcel.status === "pending") && (
              <DownloadIcon className="size-4" />
            )}
            <span>Exportar</span>
          </Button>
          <CreateMemberSheet />
        </div>
      </div>

      {response.status === "pending" && (
        <TableSkeleton headers={headers} rowCount={50} />
      )}

      {response.status === "success" && !(response?.data?.data?.length > 0) && (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto relative border rounded-xl shadow-xs">
          <span className="opacity-50 font-semibold text-xl">
            Nenhum membro encontrado
          </span>
        </div>
      )}

      {response.status === "success" && response?.data?.data?.length > 0 && (
        <div className="flex-1 flex flex-col min-h-0 overflow-auto relative border rounded-xl shadow-xs">
          <Table data={response?.data?.data ?? []} headers={headers} />
        </div>
      )}

      <div className="flex-shrink-0 p-2">
        <Pagination meta={response?.data?.meta ?? MetaDefault} />
      </div>
    </div>
  );
}
