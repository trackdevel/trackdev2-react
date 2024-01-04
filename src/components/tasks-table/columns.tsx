"use client"

import {ColumnDef} from "@tanstack/react-table"

import {statuses} from "../data/taskTable/data"
import {Task} from "../data/taskTable/schema"
import {DataTableColumnHeader} from "./data-table-column-header"
import {DataTableRowActions} from "./data-table-row-actions"
import {Link} from "react-router-dom";
import React from "react";
import {Avatar, AvatarFallback} from "../../registry/ui/avatar";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Títol" />
    ),
    cell: ({ row }) => {
      const to = `/project/${row?.original?.projectId}/${row?.original?.id}`
      const name = row?.original?.name ? row?.original?.name : ''

      return (
        <div className="flex space-x-2">
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
        (status) => status.label === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {/*status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )*/}
          <span>{status.value}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "sprint",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sprint" />
    ),
    cell: ({ row }) => {
      if (!row.original.activeSprints || row.original.activeSprints.length === 0) {
        return null
      }

      let string = ''
      row.original.activeSprints.forEach((sprint: { name: string }) => {
        string += sprint.name
        if (row.original.activeSprints.indexOf(sprint) !== row.original.activeSprints.length - 1) string += ', '
      })

      return (
          <div className="flex w-[100px] items-center">
            <span>{string}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      let string = ''
      row.original.activeSprints.forEach((sprint: { name: string }) => {
        string += sprint.name
        if (row.original.activeSprints.indexOf(sprint) !== row.original.activeSprints.length - 1) string += ', '
      })

      let includes = false
      value.forEach((v: string) => {
          if (string.includes(v)) includes = true
      })

      return includes
    },
  },
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
        <DataTableColumnHeader column={column} title="Punts d'estimació" />
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
