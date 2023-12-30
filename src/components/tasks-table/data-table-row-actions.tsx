"use client"

import { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react"

import { Button } from "../../registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../registry/ui/dropdown-menu"

import { labels } from "../data/taskTable/data"
import { taskSchema } from "../data/taskTable/schema"
import {Link} from "react-router-dom";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../registry/ui/alert-dialog";
import Api from "../../utils/Api";
import {toast} from "../../registry/ui/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const task = taskSchema.parse(row.original)

  // @ts-ignore
  const to = `/project/tasca/${row?.original?.id}`

  function deleteRow() {
    // @ts-ignore
    Api.delete('/tasks/' + row.original?.id ).then((res) => {
      console.log(res)
      setShowDeleteDialog(false)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
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
            <Link to={to} >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be
              accessible by you or others you&apos;ve shared it with.
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
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
