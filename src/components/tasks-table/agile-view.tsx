"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {Table as TableLayout} from "@tanstack/table-core/build/lib/types";


interface DataTableProps<TData> {
  table: TableLayout<TData>
}

export function TasksAgileView<TData, TValue>({ table }: DataTableProps<TData>) {

  /*
  table.getRowModel().rows.map((row) => (
      row.getVisibleCells().map((cell) => (
            console.log(cell.column.id)
      ))
  ))
  */

  return (
    <div className="rounded-md border">
      <h1>AGILE VIEW</h1>
        {/*table.getRowModel().rows.map((row) => (
            <div key={row.id} data-state={row.getIsSelected() && "selected"} >
              {row.getVisibleCells().map((cell) => {
                let value : any = cell.getValue()
                return (
                    <div key={cell.id}>
                      <h1>{cell.column.id} : {value}</h1>
                    </div>
                )
              })}
            </div>
        ))*/}
    </div>
  )
}
