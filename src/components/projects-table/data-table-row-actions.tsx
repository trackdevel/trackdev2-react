"use client"

import { Row } from "@tanstack/react-table"
import {Check, ChevronsUpDown, EyeIcon, GraduationCapIcon, MoreHorizontal, Pen, Trash} from "lucide-react"

import { Button } from "../../registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../registry/ui/dropdown-menu"
import Api from "../../utils/Api";
import {toast} from "../../registry/ui/use-toast";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../registry/ui/alert-dialog";
import {Input} from "../../registry/ui/input";
import {Icons} from "../../registry/ui/icons";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {cn} from "../../lib/utils";
import {Courses} from "../../pages/Settings/crouses/SettingsCoursesPage";
import {z} from "zod";
import {courseSchema} from "../data/courses/schema";
import {Link} from "react-router-dom";
import {useEffect} from "react";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [nota, setNota] = React.useState<string>('')
  const [acronym, setAcronym] = React.useState<string>('')

  const [open, setOpen] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState<Courses>()
  const [subjectId,setSubjectId] = React.useState<string>('')

  const [courses, setCourses] = React.useState<Array<any>>([])

  const [selectedCourse, setSelectedCourse] = React.useState<Courses>()


  useEffect(() => {
    Api.get('/courses').then((res) => {
      setCourses(z.array(courseSchema).parse(res))
    }).catch((err) => {})
  }, [])

  function deleteRow() {

    // @ts-ignore
    Api.delete('/projects/' + row.original.id ).then((res) => {
      setShowDeleteDialog(false)
      toast({
        description: "This preset has been deleted.",
      })
      window.location.reload()
    }).catch((err) => {
    })
  }

  async function getProject() {
    // @ts-ignore
    Api.get('/projects/' + row.original.id).then((res) => {
        setSelectedProject(res)
      setSelectedCourse(res.course)
      setName(res.name)
    }).catch((err) => {
    })
  }


  async function onEdit(event: React.SyntheticEvent) {
    event.preventDefault()

    var requestBody = {
      name: name,
      courseId: selectedCourse?.id,
      qualification: nota
    }

    // @ts-ignore
    Api.patch(`/projects/${row.original.id}`,requestBody).then((res) => {
      setIsLoading(false)
      setShowEditDialog(false)
      window.location.reload()
    }).catch((err) => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
              onSelect={
                () => {
                  setShowEditDialog(true);
                  getProject()
                }
              }>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            <Link to={
              // @ts-ignore
                "/project/" + row.original.id
            } >
              Veure
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <GraduationCapIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            <Link to={
              // @ts-ignore
              "/settings/projects/" + row.original.id + "/notes"
            } >
              Notes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estàs segur?</AlertDialogTitle>
            <AlertDialogDescription>
              Aquesta acció no es pot desfer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
                variant="destructive"
                onClick={() => {
                  deleteRow()
                }}
            >
              Esborrar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent>
          <form onSubmit={onEdit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Editar Projecte</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Popover open={open} onOpenChange={setOpen} >
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-label="Load a preset..."
                        aria-expanded={open}
                        className="flex-1 justify-between w-full"
                    >
                      {selectedCourse ? selectedCourse.subject.name + ' ' + selectedCourse.startYear.toString().slice(-2) + '/' + (selectedCourse.startYear+1).toString().slice(-2) : 'Sel·lecciona curs'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar curs..." />
                      <CommandEmpty>No s'ha trobat cap curs.</CommandEmpty>
                      <CommandGroup heading="Cursos">
                        {courses.map((request) => (
                            <CommandItem key={request.id}
                                         onSelect={() => {
                                           setSelectedCourse(request)
                                           setOpen(false)
                                           setSubjectId(request.id)
                                         }}
                            >
                              {request.subject.name} {request.startYear.toString().slice(-2)}/{(request.startYear+1).toString().slice(-2)}
                              <Check
                                  className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedCourse?.id === request.id
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
                <Input
                    id="name"
                    value={name ? name : "Name"}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="Name"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    id="nota"
                    placeholder="Nota"
                    value={nota ? nota : ""}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="Nota"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setNota(e.target.value)}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button disabled={isLoading}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Guardar
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
