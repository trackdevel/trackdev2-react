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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../registry/ui/table"
import {DataTableToolbar} from "./data-table-toolbar";
import {DataTablePagination} from "./data-table-pagination";
import {TasksListView} from "./list-view";
import {TasksAgileView} from "./agile-view";
import {Tabs,TabsContent,TabsList, TabsTrigger} from "../../registry/ui/tabs";
import {Icons} from "../ui/icons";
import {Textarea} from "../../registry/ui/textarea";
import {TasksAgileViewDND} from "./agile-view-dnd";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [tab, setTab] = React.useState<string>('Information')
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })


  return (
    <div className="space-y-4">

      <Tabs defaultValue="information" className="space-y-4" >
        <div className="flex justify-between items-center items-center ">
          <DataTableToolbar table={table} />
          <TabsList className="grid grid-cols-2 w-max">
            <TabsTrigger className="flex-1 space-x-4" value="information" onClick={() => setTab('Information')}>
              <Icons.List className="h-5 w-5" />
              <span>List</span>
            </TabsTrigger>
            <TabsTrigger className="flex-1 space-x-4" value="history" onClick={() => setTab('History')}>
              <Icons.Table className="h-5 w-5" />
              <span>Agile</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="information" className="mt-0 border-0 p-0">
          <TasksListView table={table} />
        </TabsContent>
        <TabsContent value="history" className="mt-0 border-0 p-0">
          <TasksAgileView table={table} />
        </TabsContent>
        {/*<TabsContent value="history" className="mt-0 border-0 p-0">
          <TasksAgileViewDND table={table} />
        </TabsContent>*/}
      </Tabs>
      <DataTablePagination table={table} />
    </div>
  )
}
