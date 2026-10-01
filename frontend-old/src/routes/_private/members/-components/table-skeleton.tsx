import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Props {
  headers: string[];
  rowCount?: number;
}

export function TableSkeleton({
  headers,
  rowCount = 5,
}: Props): React.ReactElement {
  return (
    <Table>
      <TableHeader className="sticky top-0">
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="py-4">
              <span>{header}</span>
            </TableHead>
          ))}
          <TableHead className="py-4 text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, index) => (
          <TableRow key={index}>
            {headers.map((_, headerIndex) => (
              <TableCell key={`${index}-${headerIndex}`}>
                <Skeleton className="h-4 w-full max-w-[150px]" />
              </TableCell>
            ))}
            <TableCell className="w-[80px]">
              <Skeleton className="rounded-full size-6 p-1" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
