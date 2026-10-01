/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export function InputSearch() {
  const navigate = useNavigate();
  const searchParams = useSearch({
    strict: false,
  });

  return (
    <div className="flex-1 inline-flex items-center relative h-8 w-full gap-4">
      <SearchIcon
        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
        strokeWidth={1.5}
      />
      <Input
        defaultValue={searchParams?.search || ""}
        placeholder="Pesquise aqui"
        className="pl-9 h-full shadow-none rounded-sm"
        onKeyDown={(event) => {
          if (
            event.key === "Backspace" &&
            event?.currentTarget?.value?.length === 1
          ) {
            navigate({
              // @ts-ignore
              search: (prev) => {
                delete prev.search;
                return prev;
              },
              replace: true,
            });
          }

          if (event.key === "Enter") {
            navigate({
              // @ts-ignore
              search: (prev) => ({
                ...prev,
                search: event.currentTarget.value,
              }),
              replace: true,
            });
          }
        }}
      />
    </div>
  );
}
