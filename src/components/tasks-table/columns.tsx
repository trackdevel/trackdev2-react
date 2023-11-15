"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "../../registry/ui/badge"
import { Checkbox } from "../../registry/ui/checkbox"

import { labels, priorities, statuses } from "../data/taskTable/data"
import { Task } from "../data/taskTable/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Link } from "react-router-dom";
import React from "react";
import {Avatar, AvatarFallback} from "../../registry/ui/avatar";

const columns: ColumnDef<Task>[] = [
  //{
  //  id: "select",
  //  header: ({ table }) => (
  //    <Checkbox
  //      checked={table.getIsAllPageRowsSelected()}
  //      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //      aria-label="Select all"
  //      className="translate-y-[2px]"
  //    />
  //  ),
  //  cell: ({ row }) => (
  //    <Checkbox
  //      checked={row.getIsSelected()}
  //      onCheckedChange={(value) => row.toggleSelected(!!value)}
  //      aria-label="Select row"
  //      className="translate-y-[2px]"
  //    />
  //  ),
  //  enableSorting: false,
  //  enableHiding: false,
  //},
  //{
  //  accessorKey: "id",
  //  header: ({ column }) => (
  //    <DataTableColumnHeader column={column} title="Tasca" />
  //  ),
  //  cell: ({ row }) => {
  //    const to = `/project/project_slug/${row.getValue("id")}`
//
  //    return (
  //      <div className="w-[80px]">
  //        <Link to={to} >
  //          {row.getValue("id")}
  //        </Link>
  //      </div>
  //    )
  //  },
  //  enableSorting: false,
  //  enableHiding: false,
  //},
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Títol" />
    ),
    cell: ({ row }) => {
      const to = `/project/project_slug/${row?.original?.id}`
      const name = row?.original?.name ? row?.original?.name : ''

      return (
        <div className="flex space-x-2">
          {/*label && <Badge variant="outline">{label.label}</Badge>*/}
          <span className="max-w-[500px] truncate font-medium">
            <Link to={to} >
              {name}
            </Link>
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estat" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{row.getValue('status')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Prioritat" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )
//
  //     if (!priority) {
  //       return null
  //     }
//
  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    accessorKey: "reporter",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reporter" />
    ),
    cell: ({ row }) => {
      const reporter = row?.original?.reporter ? row?.original?.reporter : ''

      if (!reporter) {
        return null
      }

      return (
          <div className="flex space-x-2">
            <div className="flex -space-x-2 overflow-hidden">
                <Avatar
                    key={reporter.username}
                    className="inline-block border-2 border-background"
                >
                    <AvatarFallback>{reporter.username[0].toUpperCase() + reporter.username[1].toUpperCase()}</AvatarFallback>
                  </Avatar>
            </div>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      const assignee = row?.original?.assignee ? row?.original?.assignee : ''

      if (!assignee) {
        return null
      }

      return (
          <div className="flex space-x-2">
            <div className="flex -space-x-2 overflow-hidden">
              <Avatar
                  key={assignee.username}
                  className="inline-block border-2 border-background"
              >
                <AvatarFallback>{assignee.username[0].toUpperCase() + assignee.username[1].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "estimationpoints",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estimation Points" />
    ),
    cell: ({ row }) => {
      const assignee = row?.original?.assignee ? row?.original?.assignee : ''

      if (!assignee) {
        return null
      }

      return (
          <div className="flex space-x-2">
            <div className="flex -space-x-2 overflow-hidden">
              {row?.original?.estimationPoints ? row?.original?.estimationPoints : ''}
            </div>
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
