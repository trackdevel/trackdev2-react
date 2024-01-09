"use client"

import {Table} from "@tanstack/react-table"
import {X} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {Input} from "../../registry/ui/input"

import {DataTableFacetedFilter} from "./data-table-faceted-filter"
import React, {useEffect} from "react";
import Api from "../../utils/Api";
import {useParams} from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

interface Pair {
    label: string
    value: string
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [statuses, setStatuses] = React.useState<Array<Pair>>([])

  const [sprints, setSprints] = React.useState<Array<Pair>>([])
  const { projectId } = useParams();

  useEffect(() => {
    Api.get('/tasks/status').then((res) => {
      // @ts-ignore
      let array: React.SetStateAction<Pair[]> = []
      Object.entries(res).forEach(([key, value]) => {
        // @ts-ignore
        array.push({label: value, value: key})
      });
      setStatuses(array)
    }).catch((err) => {})
  }, []);

  useEffect(() => {
    Api.get('/projects/' + projectId + '/sprints').then((res) => {
      setSprints(res)
    }).catch((err) => {})
  }, []);


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estats"
            options={statuses}
          />
        )}
        {table.getColumn("sprint") && (
          <DataTableFacetedFilter
              column={table.getColumn("sprint")}
              title="Sprints"
              options={sprints}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Borra filtres
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
