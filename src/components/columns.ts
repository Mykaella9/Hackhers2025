import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string
  name: string
  email: string
}

export const columns: ColumnDef<{id: string; name: string}>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
]