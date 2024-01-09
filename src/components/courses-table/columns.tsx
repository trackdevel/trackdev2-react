"use client"

import {ColumnDef} from "@tanstack/react-table"

import {DataTableColumnHeader} from "./data-table-column-header"
import {DataTableRowActions} from "./data-table-row-actions"
import {CourseListItem} from "../data/courses/schema";
import {ExternalLink} from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

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
    accessorKey: "githubOrganization",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organització de GitHub" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium flex items-center space-x-1">
            <ExternalLink className="h-3 w-3" />
            <Link to={"/github/" + row.getValue("githubOrganization")} target="_blank" className="max-w-[500px] truncate font-medium">
                {row.getValue("githubOrganization")}
            </Link>
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
