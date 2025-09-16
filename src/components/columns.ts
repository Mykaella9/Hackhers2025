import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string
  name: string
  email: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]