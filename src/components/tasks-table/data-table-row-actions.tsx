"use client"

import {Row} from "@tanstack/react-table"
import {MoreHorizontal, Pen, Trash} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../registry/ui/dropdown-menu"
import {taskSchema} from "../data/taskTable/schema"
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../registry/ui/alert-dialog";
import Api from "../../utils/Api";
import {ProjectContext} from "../../pages/Project/Project";
import {TaskContext} from "../Task/TaskMainLayout";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const task = taskSchema.parse(row.original)

  const taskChange = useContext(TaskContext);

  // @ts-ignore
  let projectID = (row?.original?.projectId) ? row?.original?.projectId : row?.original?.project?.id
  // @ts-ignore
  const to = `/project/${projectID}/${row?.original?.id}/information`

  function deleteRow() {
    // @ts-ignore
    Api.delete('/tasks/' + row.original?.id ).then((res) => {
      setShowDeleteDialog(false)
      window.location.reload()
    }).catch((err) => {
      window.location.reload()
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
          <DropdownMenuItem>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            <Link to={to} onClick={() => {
                if (typeof taskChange !== 'function') return
                // @ts-ignore
                taskChange(task.id)
            } }>
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Eliminar
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estàs segur d&apos;eliminar aquesta tasca?</AlertDialogTitle>
            <AlertDialogDescription>
              Aquesta acció no es pot desfer i la tasca es perdrà per sempre.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel·lar</AlertDialogCancel>
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
    </>
  )
}
