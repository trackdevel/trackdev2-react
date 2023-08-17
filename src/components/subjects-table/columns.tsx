"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {SubjectListItem} from "../data/subjects/schema";

const columns: ColumnDef<SubjectListItem>[] = [
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
    accessorKey: "acronym",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Acronym" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("acronym")}
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
