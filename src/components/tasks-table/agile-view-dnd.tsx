"use client"

import * as React from "react"

import {Table as TableLayout} from "@tanstack/table-core/build/lib/types";

import ReactDOM from "react-dom";


interface DataTableProps<TData> {
  table: TableLayout<TData>
}

export function TasksAgileViewDND<TData, TValue>({ table }: DataTableProps<TData>) {

  /*
  table.getRowModel().rows.map((row) => (
      row.getVisibleCells().map((cell) => (
      ))
  ))
  */

  return (
    <div className="rounded-md border">
      <h1>AGILE VIEW</h1>
    </div>
  )
}
