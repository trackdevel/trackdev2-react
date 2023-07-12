"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "../../registry/ui/badge"
import { Checkbox } from "../../registry/ui/checkbox"

import { groups, roles, created } from "../data/users/data"
import { UserListItem } from "../data/users/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

const columns: ColumnDef<UserListItem>[] = [
  {
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
  },
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
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
    accessorKey: "group",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => {
      const group = groups.find(
          (group) => group.value === row.getValue("group")
      )

      if (!group) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            <span>{group.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find(
          (role) => role.value === row.getValue("role")
      )

      if (!role) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            <span>{role.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const created_ = created.find(
          (created_) => created_.value === row.getValue("created")
      )

      if (!created_) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            <span>{created_.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

export { columns }
