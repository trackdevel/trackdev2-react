"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UserListItem } from "../data/users/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {courses} from "../data/groups/data";
import {GroupListItem} from "../data/groups/schema";

const columns: ColumnDef<GroupListItem>[] = [
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
  },
  {
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
    accessorKey: "course",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coruse" />
    ),
    cell: ({ row }) => {
      const course = courses.find(
          (course) => course.value === row.getValue("course")
      )

      if (!course) {
        return null
      }

      return (
          <div className="flex w-[100px] items-center">
            <span>{course.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Users" />
    ),
    cell: ({ row }) => {
      const users = row.getValue("users") as UserListItem[]

      if (!users) {
          return null
      }

      const usersString = users.map((user) => user.name).join(", ")
      console.log('USERS',usersString)
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {usersString}
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
