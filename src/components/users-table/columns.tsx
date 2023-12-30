"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "../../registry/ui/badge"
import { Checkbox } from "../../registry/ui/checkbox"

import { UserListItem } from "../data/users/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

const columns: ColumnDef<UserListItem>[] = [
    /*{
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },*/
    /*{
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },*/
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("username")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      let roles:any = row.getValue("roles")
      let rolesString = ""
      for (let i = 0; i < roles.length; i++) {
          rolesString += roles[i]
          if (i < roles.length - 1) rolesString += ", "
      }
      return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
            {rolesString}
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Enabled" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
            {
              (row.getValue("enabled") == true) ? <Badge color="green">Enabled</Badge> : <Badge color="red">Disabled</Badge>
            }
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: "changePassword",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Change Password" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
            {
              (row.getValue("changePassword") == true) ? <Badge color="green">Enabled</Badge> : <Badge color="red">Disabled</Badge>
            }
          </span>
          </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

export { columns }
