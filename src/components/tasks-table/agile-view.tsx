"use client"

import * as React from "react"

import {Table as TableLayout} from "@tanstack/table-core/build/lib/types";

interface DataTableProps<TData> {
  table: TableLayout<TData>
}


export function TasksAgileView<TData, TValue>({ table }: DataTableProps<TData>) {


    return (
        <h1>Agile View</h1>
    );
}
