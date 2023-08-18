"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "../../registry/ui/button"
import { Input } from "../../registry/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import {enabled, groups, roles} from "../data/users/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder="Filter users..."
          value={(table.getColumn("nicename")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
              table.getColumn("nicename")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
      />
        {table.getColumn("roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("roles")}
            title="Roles"
            options={roles}
          />
        )}
          {table.getColumn("role") && (
              <DataTableFacetedFilter
                  column={table.getColumn("role")}
                  title="Role"
                  options={roles}
              />
          )}
          {table.getColumn("enabled") && (
              <DataTableFacetedFilter
                  column={table.getColumn("enabled")}
                  title="Enabled"
                  options={enabled}
              />
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
