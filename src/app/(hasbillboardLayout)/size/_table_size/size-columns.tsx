"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: number;
  size: string;
  height: string;
  weight: string;
  measurements: string;
};

export const sizeColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "STT",
  },
  {
    accessorKey: "size",
    header: "SIZE",
  },
  {
    accessorKey: "height",
    header: "CHIỀU CAO",
  },
  {
    accessorKey: "weight",
    header: "CÂN NẶNG",
  },
  {
    accessorKey: "measurements",
    header: "SỐ ĐO",
  },
];
