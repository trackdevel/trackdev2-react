"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {CourseListItem} from "../data/courses/schema";

const columns: ColumnDef<CourseListItem>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignatura" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.subject.name}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "startYear",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Any d'inici" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("startYear")}
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
