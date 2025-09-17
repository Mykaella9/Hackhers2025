import { ColumnDef } from "@tanstack/react-table"

export type Entitlement = {
  id: number
  name: string
  description: string
}

export const entColumns: ColumnDef<Entitlement>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]