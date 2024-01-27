"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Pen, Trash } from "lucide-react"

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


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [acronym, setAcronym] = React.useState<string>('')

  const [tasks, setTasks] = React.useState<Array<any>>([])
  const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)

  function deleteRow() {

    // @ts-ignore
    Api.delete('/subjects/' + row.original.id ).then((res) => {
      setShowDeleteDialog(false)
      window.location.reload()
    }).catch((err) => {
    })
  }

  async function getSubject() {
    // @ts-ignore
    Api.get('/subjects/' + row.original.id).then((res) => {
      setName(res.name)
      setAcronym(res.acronym)
    }).catch((err) => {
    })
  }

  async function onCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (name === '' || acronym === '') {
      setIsLoading(false)
      return;
    }

    var requestBody = {
      name: name,
      acronym: acronym
    }

    // @ts-ignore
    Api.patch('/subjects/' + row.original.id, requestBody).then((res) => {
      setIsLoading(false)
      setShowEditDialog(false)
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
              <AlertDialogTitle>Editar Assignatura</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                    id="name"
                    placeholder="Projecte de Desenvolupament de Software"
                    value={name}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    id="acronym"
                    placeholder="PDS"
                    value={acronym}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="acronym"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={(e) => setAcronym(e.target.value)}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button disabled={isLoading}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Crear Assignatura
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
