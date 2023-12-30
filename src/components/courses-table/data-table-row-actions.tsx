"use client"

import { Row } from "@tanstack/react-table"
import {Check, ChevronsUpDown, MoreHorizontal, Pen, Trash} from "lucide-react"

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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../registry/ui/alert-dialog";
import * as React from "react";
import {z} from "zod";
import {subjectSchema} from "../data/subjects/schema";
import {Input} from "../../registry/ui/input";
import {Icons} from "../../registry/ui/icons";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {cn} from "../../lib/utils";
import {Subjects} from "../../pages/Settings/crouses/SettingsCoursesPage";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)

  const [subjects, setSubjects] = React.useState<Array<any>>([])
  const [issubjectsloaded, setIsSubjectsLoaded] = React.useState<boolean>(false)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState(false)
  const [selectedSubject, setSelectedSubject] = React.useState<Subjects>()

  const [year,setYear] = React.useState<number>()
  const [organization,setOrganization] = React.useState<string>()


  function deleteRow() {

    // @ts-ignore
    Api.delete('/courses/' + row.original.id ).then((res) => {
      setShowDeleteDialog(false)
      toast({
        description: "This preset has been deleted.",
      })
      window.location.reload()
    }).catch((err) => {
    })
  }

  if(subjects.length === 0 && !issubjectsloaded) {
    getSubjects()
  }
  async function getSubjects() {
    setIsSubjectsLoaded(true)
    Api.get('/subjects').then((res) => {
      setSubjects(z.array(subjectSchema).parse(res))
    }).catch((err) => {})
    return;
  }


  async function getCourse() {
    // @ts-ignore
    Api.get('/courses/' + row.original.id).then((res) => {
        setYear(res.startYear)
        setSelectedSubject(res.subject)
        setOrganization(res.githubOrganization)
    }).catch((err) => {
    })
  }

  async function onCreate(event: React.SyntheticEvent) {
    event.preventDefault()

    var requestBody = {
      startYear: year,
      subjectId: selectedSubject?.id,
      githubOrganization: organization
    }

    // @ts-ignore
    Api.patch(`/courses/${row.original.id}`,requestBody).then((res) => {
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
                  setShowEditDialog(true); // @ts-ignore
                  getCourse()
                }
              }>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
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
            <AlertDialogCancel>Canceler</AlertDialogCancel>
            <Button
                variant="destructive"
                onClick={() => {
                  deleteRow()
                }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent>
          <form onSubmit={onCreate}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-label="Load a preset..."
                        aria-expanded={open}
                        className="flex-1 justify-between w-full"
                    >
                      {selectedSubject ? selectedSubject.name : "Subject"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar assignatura..."/>
                      <CommandEmpty>No s'ha trobat cap assignatura</CommandEmpty>
                      <CommandGroup heading="Assignatures">
                        {subjects.map((request) => (
                            <CommandItem key={request.id}
                                         onSelect={() => {
                                           setSelectedSubject(request)
                                           setOpen(false)
                                         }}
                            >
                              {request.name}
                              <Check
                                  className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedSubject?.id === request.id
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
                    id="year"
                    value={year}
                    type="number"
                    autoCapitalize="none"
                    autoComplete="year"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                />
                <Input
                    id="organization"
                    value={organization}
                    placeholder={"Organització de GitHub"}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="organization"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
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
