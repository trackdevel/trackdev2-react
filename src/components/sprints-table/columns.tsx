"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import * as React from "react";
import {SprintListItem} from "../data/sprints/schema";

const columns: ColumnDef<SprintListItem>[] = [
  {
    accessorKey: "value",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("value")}
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data d'inici" />
    ),
    cell: ({ row }) => {
      console.log('startDate', row.original.startDate)
      return (
          <div className="flex space-x-2">
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {row.original.startDate ? format(new Date(row.original.startDate), 'dd/MM/yyyy') : 'No hi ha data'}
          </div>
      )
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de finalització" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {row.original.endDate ? format(new Date(row.original.endDate), 'dd/MM/yyyy') : 'No hi ha data'}
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
