"use client"

import {ColumnDef} from "@tanstack/react-table"

import {taskstatuses} from "../data/taskTable/data"
import {Task} from "../data/taskTable/schema"
import {DataTableColumnHeader} from "./data-table-column-header"
import {DataTableRowActions} from "./data-table-row-actions"
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {Avatar, AvatarFallback} from "../../registry/ui/avatar";
import {TaskContext} from "../Task/TaskMainLayout";

const columnsSubtask: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Títol" />
    ),
    cell: ({ row }) => {
      let projectID = (row?.original?.projectId) ? row?.original?.projectId : row?.original?.project?.id

      const to = `/project/${projectID}/${row?.original?.id}`
      const name = row?.original?.name ? row?.original?.name : ''


      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {name}
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
      const status = taskstatuses.find(
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
    accessorKey: "reporter",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creador" />
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
                    <AvatarFallback style={{backgroundColor: reporter.color}}>{reporter.capitalLetters}</AvatarFallback>
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
        <DataTableColumnHeader column={column} title="Asignat" />
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
                <AvatarFallback style={{backgroundColor: assignee.color}}>{assignee.capitalLetters}</AvatarFallback>
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
    accessorKey: "type",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tipus" />
    ),
    cell: ({ row }) => {
      var text = 'Subtasca'
      if(!row.original.parentTask) text = 'Història d\'usuari'

      return (
          <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {text}
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

export { columnsSubtask }
