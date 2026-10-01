import { Button } from "@/components/ui/button";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Meta } from "@/lib/model";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  meta: Meta;
}

export function Pagination({ meta }: Props) {
  const navigation = useNavigate({
    from: "/",
  });

  const page = Number(meta.currentPage ?? 1);
  const perPage = Number(meta.perPage ?? 50);
  const lastPage = Number(meta.lastPage ?? 1);

  return (
    <section className="flex flex-col lg:flex-row w-full justify-between flex-shrink-0 gap-2">
      <div className="inline-flex gap-2 items-center ">
        <span className="inline-flex flex-1">Itens por página</span>
        <Select
          defaultValue={String(perPage ?? 50)}
          onValueChange={(value) => {
            navigation({ search: () => ({ perPage: value }) });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex space-x-8 items-center">
        <label className="inline-flex flex-1 gap-1">
          Página <strong>{page}</strong>{" "}
          {lastPage > 1 && (
            <>
              /<strong>{lastPage}</strong>
            </>
          )}
        </label>
        <PaginationContent className="justify-between w-[180px] ">
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === 1}
              onClick={() => {
                navigation({ search: () => ({ page: 1 }) });
              }}
            >
              <ChevronsLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === 1}
              onClick={() => {
                navigation({ search: () => ({ page: page - 1 }) });
              }}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === lastPage}
              onClick={() => {
                navigation({ search: () => ({ page: page + 1 }) });
              }}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="border"
              disabled={page === lastPage}
              onClick={() => {
                navigation({ search: () => ({ page: lastPage }) });
              }}
            >
              <ChevronsRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </div>
    </section>
  );
}
