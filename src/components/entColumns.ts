import { ColumnDef } from "@tanstack/react-table"

export type Entitlement = {
  id: number
  name: string
  type: string
  level: number
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]