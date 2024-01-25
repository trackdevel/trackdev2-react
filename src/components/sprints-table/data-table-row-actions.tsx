"use client"

import { Row } from "@tanstack/react-table"
import {Calendar as CalendarIcon, MoreHorizontal, Pen, Trash} from "lucide-react"

import { Button } from "../../registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../registry/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../registry/ui/alert-dialog";
import {toast} from "react-toastify";
import * as React from "react";
import Api from "../../utils/Api";
import * as DialogPrimitive from "@radix-ui/react-dialog/dist";
import {Cross2Icon} from "@radix-ui/react-icons";
import {DialogContent, DialogFooter, DialogHeader, DialogTitle} from "../../registry/ui/dialog";
import {Input} from "../../registry/ui/input";
import {Icons} from "../../registry/ui/icons";
import {z} from "zod";
import {subjectSchema} from "../data/subjects/schema";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {format} from "date-fns";
import {Calendar} from "../../registry/ui/calendar";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [startDate, setStartDate] = React.useState<Date>()
  const [startDateOpen , setStartDateOpen] = React.useState<boolean>(false)
  const [endDate, setEndDate] = React.useState<Date>()
  const [endDateOpen , setEndDateOpen] = React.useState<boolean>(false)

  function deleteRow() {
    // @ts-ignore
    Api.delete('/sprints/' + row.original.id).then((res) => {
      window.location.reload()
    }).catch((err) => {
      window.location.reload()
    })
  }

  async function getSubject() {
    // @ts-ignore
    Api.get('/sprints/'+ row.original.id).then((res) => {
      setName(res.name)
      setStartDate(new Date(res.startDate))
      setEndDate(new Date(res.endDate))
    }).catch((err) => {
    })
  }

  async function onCreate(event: React.SyntheticEvent) {
    event.preventDefault()

    let requestData = {
        name: name,
        startDate: startDate,
        endDate: endDate
    }

    // @ts-ignore
    Api.patch('/sprints/' + row.original.id, requestData).then((res) => {
      window.location.reload()
      toast.success('Tasca actualitzada correctament', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }).catch((err) => {
      console.log(err)
      toast.error('No s\'ha pogut actualitzar la tasca', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })

    setIsLoading(false)
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
                  getSubject()
                }
              }>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Esborrar
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
          <form onSubmit={onCreate}>
            <AlertDialogHeader>
              <AlertDialogTitle>Editar Sprint</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                    id="name"
                    value={name}
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
