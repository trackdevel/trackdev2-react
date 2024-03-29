"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UserListItem } from "../data/users/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {courses} from "../data/projects/data";
import {ProjectListItem} from "../data/projects/schema";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {UsersSelect} from "./user-select";

const columns: ColumnDef<ProjectListItem>[] = [
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
      <DataTableColumnHeader column={column} title="Nom" />
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
        <DataTableColumnHeader column={column} title="Curs" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex w-[100px] items-center">
            <span>{
              // @ts-ignore
              row.getValue("course").subject.name
            }</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      // @ts-ignore
      return value.includes(row.getValue(id).subject.name)
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Usuaris" />
    ),
    cell: ({ row }) => {
      const users = row?.original?.members


      return (
        <div className="flex space-x-2">
          <div className="flex -space-x-2 overflow-hidden">
            {users.map((user: UserListItem) => (
                <Avatar
                    key={user.username}
                    className="inline-block border-2 border-background"
                >
                  <AvatarFallback style={{backgroundColor: user.color}}>{user.capitalLetters}</AvatarFallback>
                </Avatar>
            ))}
            <UsersSelect row={row} users={users}/>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nota" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex w-[100px] items-center">
            <span>{
                // @ts-ignore
                row.getValue("qualification")
            }</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      // @ts-ignore
      return true
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]


export { columns }
