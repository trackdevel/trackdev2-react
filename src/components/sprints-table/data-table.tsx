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
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {Button} from "../../registry/ui/button";
import {Calendar as CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {cn} from "../../lib/utils";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import Api from "../../utils/Api";
import {z} from "zod";
import {projectSchema} from "../data/projects/schema";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../../registry/ui/dialog";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Input} from "../../registry/ui/input";
import {Icons} from "../ui/icons";
import {format} from "date-fns";
import {Calendar} from "../../registry/ui/calendar";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function SprintsTable<TData, TValue>({columns,data,}: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
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
  const { projectId } = useParams();


  const [project, setProject] = React.useState<any>(null);
  const [openproject, setOpenproject] = React.useState(false)
  const [projects, setProjects] = React.useState<Array<any>>([])
  const navigate = useNavigate();

  const [state, setState] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [name, setName] = React.useState<string>('')
  const [startDate, setStartDate] = React.useState<Date>()
  const [startDateOpen , setStartDateOpen] = React.useState<boolean>(false)
  const [endDate, setEndDate] = React.useState<Date>()
  const [endDateOpen , setEndDateOpen] = React.useState<boolean>(false)

  useEffect(() => {
    Api.get('/projects').then((res) => {
      setProjects(z.array(projectSchema).parse(res))
    }).catch((err) => {})
  }, []);

  useEffect(() => {
    Api.get('/projects/' + projectId).then((res) => {
      setProject(res)
    }).catch((err) => {})
  }, []);

  function toogleState() {
    setState(!state)
  }

  async function onCreate(event: React.SyntheticEvent) {
    event.preventDefault()

    let requestBody = {
      name: name,
      startDate: startDate,
      endDate: endDate
    }

    Api.post('/projects/' + projectId + '/sprints', requestBody).then((res) => {
      setState(false)
      window.location.reload()
    }).catch((err) => {
    })

  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center items-center ">
        <div className="flex justify-between items-center items-center gap-4">
          <Popover open={openproject} onOpenChange={setOpenproject}>
            <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  role="combobox"
                  aria-label="Load a preset..."
                  aria-expanded={openproject}
                  className="flex-1 justify-between w-auto md:max-w-[250px] lg:max-w-[250px]"
              >
                {project ? project.name : "Sel·lecciona un projecte"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Buscar projecte..." />
                <CommandEmpty>No presets found.</CommandEmpty>
                <CommandGroup heading="Sprints">
                  {projects.map((request) => (
                      <CommandItem key={request.id}
                                   onSelect={() => {
                                     navigate('/sprints/' + request.id)
                                     window.location.reload()
                                   }}
                      >
                        {request.name}
                        <Check
                            className={cn(
                                "ml-auto h-4 w-4",
                                project?.id === request.id
                                    ? "opacity-100"
                                    : "opacity-0"
                            )}
                        />
                      </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Dialog open={state}>
          <DialogTrigger onClick={toogleState}>
            <Button>
              <PlusCircledIcon className="mr-2 h-4 w-4"/>
              Nou Sprint
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogPrimitive.Close onClick={toogleState}
                                   className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Cross2Icon className="h-4 w-4"/>
              <span className="sr-only">Tancar</span>
            </DialogPrimitive.Close>
            <form onSubmit={onCreate}>
              <DialogHeader>
                <DialogTitle>Nou Sprint</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                      id="name"
                      placeholder="Nom"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      disabled={isLoading}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <Popover open={startDateOpen} onOpenChange={() => { setStartDateOpen(!startDateOpen) }}>
                    <PopoverTrigger asChild>
                      <Button
                          variant={"outline"}
                          className={"w-full justify-start text-left font-normal"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {startDate ? format(startDate, "PPP") : <span>Data d'inici</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover open={endDateOpen} onOpenChange={() => { setEndDateOpen(!endDateOpen) }}>
                    <PopoverTrigger asChild>
                      <Button
                          variant={"outline"}
                          className={"w-full justify-start text-left font-normal"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {endDate ? format(endDate, "PPP") : <span>Data de finalització</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                  )}
                  Crear Sprint
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                        </TableHead>
                    )
                  })}
                </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                          </TableCell>
                      ))}
                    </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Cap resultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
