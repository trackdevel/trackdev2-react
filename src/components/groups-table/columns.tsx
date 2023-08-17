"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UserListItem } from "../data/users/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {courses} from "../data/groups/data";
import {GroupListItem} from "../data/groups/schema";
import {CardsChat} from "../CoursesConfig/UserSelect/chat";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../registry/ui/tooltip";
import {Button} from "../ui/button";
import {CheckIcon, PlusIcon} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../../registry/ui/dialog";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../../registry/ui/command";
import {UsersSelect} from "./user-select";

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

      return (
        <div className="flex space-x-2">
          <div className="flex -space-x-2 overflow-hidden">
            {users.map((user) => (
                <Avatar
                    key={user.email}
                    className="inline-block border-2 border-background"
                >
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
            ))}
            <UsersSelect row={row} users={users}/>
          </div>
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
