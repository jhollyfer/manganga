import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table as Root,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Member } from "@/lib/model";
import { EllipsisIcon } from "lucide-react";
import React from "react";
import { ShowMemberSheet } from "./show-member-sheet";
import { UpdateMemberSheet } from "./update-member-sheet";
interface Props {
  data: Member[];
  headers: string[];
}

export function Table({ data, headers }: Props): React.ReactElement {
  const RoleMapper = {
    FOUNDER: "Fundador",
    COLLABORATOR: "Colaborador",
    PARTICIPANT: "Brincante",
    SPONSOR: "Patrocinador",
    ADMINISTRATOR: "Administrador",
  };

  return (
    <Root>
      <TableHeader className="sticky top-0 bg-background">
        <TableRow className="">
          {headers?.map((header) => (
            <TableHead key={header}>
              <span>{header}</span>
            </TableHead>
          ))}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.user?.name}</TableCell>
            <TableCell>{row.document ?? "Não informado"}</TableCell>
            <TableCell>
              <Badge variant="outline">
                {RoleMapper[row.user?.role as keyof typeof RoleMapper] ??
                  "Não informado"}
              </Badge>
            </TableCell>
            <TableCell className="w-[80px]">
              <DropdownMenu dir="ltr" modal={false}>
                <DropdownMenuTrigger className="p-1 rounded-full border">
                  <EllipsisIcon className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-10">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <ShowMemberSheet memberId={row.id} />
                  <UpdateMemberSheet memberId={row.id} />

                  {/* <DropdownMenuItem
                    className="inline-flex space-x-1 w-full"
                    // onClick={() => {
                    //   atualizarUsuarioButtonRef?.current?.click();
                    // }}
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Editar</span>
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  );
}
