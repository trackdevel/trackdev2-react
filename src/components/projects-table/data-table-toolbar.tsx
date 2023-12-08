"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "../../registry/ui/button"
import { Input } from "../../registry/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import {courses} from "../data/projects/data";
import React from "react";
import Api from "../../utils/Api";
import {z} from "zod";
import {courseSchema} from "../data/courses/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [courses, setCourses] = React.useState<Array<any>>([])
    const [iscoursesloaded, setIscoursesloaded] = React.useState<boolean>(false)

    if(courses.length === 0 && !iscoursesloaded) {
        getCourses()
    }

    async function getCourses() {
        setIscoursesloaded(true)
        Api.get('/courses').then((res) => {
            setCourses(z.array(courseSchema).parse(res))
        }).catch((err) => {})
        return;
    }


    return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder="Buscar Projecte"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
      />
        {/*table.getColumn("course") && (
          <DataTableFacetedFilter
            column={table.getColumn("course")}
            title="Course"
            options={courses}
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
        )*/}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
