"use client"

import * as React from "react"
import {useEffect} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {DataTableToolbar} from "./data-table-toolbar";
import {DataTablePagination} from "./data-table-pagination";
import {TasksListView} from "./list-view";
import {TasksAgileView} from "./agile-view";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../registry/ui/tabs";
import {Icons} from "../ui/icons";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {Button} from "../../registry/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";
import {z} from "zod";
import {projectSchema} from "../data/projects/schema";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../../registry/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Input} from "../../registry/ui/input";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
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
  const { projectId } = useParams();
  const {taskId} = useParams();

  const [project, setProject] = React.useState<any>(null);
  const [openproject, setOpenproject] = React.useState(false)
  const [projects, setProjects] = React.useState<Array<any>>([])
  const navigate = useNavigate();

  const [state, setState] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')


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

  function openNewProject(id: string) {
    navigate('/project/' + id);
  }

  function toogleState() {
    setState(!state)
  }


  async function onCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (name === '' ) {
      setIsLoading(false)
      return;
    }

    var requestBody = {
      name: name,
    }

    Api.post('/tasks/' + taskId + '/subtasks', requestBody).then((res) => {
      setIsLoading(false)
      window.location.reload()
    }).catch((err) => {
      setIsLoading(false)
    })

  }


  return (
    <div className="space-y-4">

      <Tabs defaultValue="information" className="space-y-4" >
        <div className="flex justify-between items-center items-center ">
          { !taskId && (
            <DataTableToolbar table={table} />
          )}

          <div className="flex justify-between items-center items-center gap-4">
            { !taskId && (
              <Button>
                <PlusCircledIcon className="mr-2 h-4 w-4"/>
                <Link to={"/project/" + projectId + "/new"}>
                  Nova Historia d'Usuari
                </Link>
              </Button>
            )}
            { taskId && (
              <Dialog open={state}>
                <DialogTrigger onClick={toogleState}>
                  <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4"/>
                    Nova Tasca
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
                      <DialogTitle>Nova Tasca</DialogTitle>
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
                      </div>
                    </div>
                    <DialogFooter>
                      <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Crear Subtasca
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            { !taskId && (
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
                                         navigate('/project/' + request.id)
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
            )}
            { !taskId && (
              <TabsList className="grid grid-cols-2 w-max">
                <TabsTrigger className="flex-1 space-x-4" value="information" onClick={() => setTab('Information')}>
                  <Icons.List className="h-5 w-5" />
                  <span>Llistat</span>
                </TabsTrigger>
                <TabsTrigger className="flex-1 space-x-4" value="history" onClick={() => setTab('History')}>
                  <Icons.Table className="h-5 w-5" />
                  <span>Agile</span>
                </TabsTrigger>
              </TabsList>
            )}
          </div>
        </div>
        <TabsContent value="information" className="mt-0 border-0 p-0">
          <TasksListView table={table} />
        </TabsContent>
        { !taskId && (
          <TabsContent value="history" className="mt-0 border-0 p-0">
            <TasksAgileView table={table} />
          </TabsContent>
        )}
        {/*<TabsContent value="history" className="mt-0 border-0 p-0">
          <TasksAgileViewDND table={table} />
        </TabsContent>*/}
      </Tabs>
      <DataTablePagination table={table} />
    </div>
  )
}
