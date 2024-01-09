"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import {ProjectListItem} from "../data/projects/schema";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";

const columns: ColumnDef<ProjectListItem>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Alumne" />
    ),
    cell: ({ row }) => {
      return (
          <div className="flex space-x-2 ">
            <Avatar
                className="inline-block border-2 border-background "
            >
              <AvatarFallback style={{backgroundColor: row.original.color}}>{row.original.acronym}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium leading-none">
                  {row.original.name}
              </p>
              <p className="text-sm text-muted-foreground">
                  {row.original.mail}
              </p>
            </div>
          </div>
      )
    },
  },
  {
    accessorKey: "qualification",
    header: ({column}) => (
        <DataTableColumnHeader column={column} title="Nota"/>
    ),
    cell: ({row}) => {
      return (
          <div className="flex w-[100px] items-center">
              {row.original.qualification}
          </div>
      )
    },
    filterFn: (row, id, value) => {
      // @ts-ignore
      return value.includes(row.getValue(id).subject.name)
    },
  }
]


export { columns }
