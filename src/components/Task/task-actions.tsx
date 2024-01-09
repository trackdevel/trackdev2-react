"use client"

import * as React from "react"
import {MoreHorizontal, Trash} from "lucide-react"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../registry/ui/alert-dialog"
import {Button} from "../../registry/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../registry/ui/dropdown-menu"
import {toast} from "../../registry/ui/use-toast"
import Api from "../../utils/Api";
import {useNavigate} from "react-router-dom";

export function TaskActions({taskId, projectId}: any) {
    const [open, setIsOpen] = React.useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
    const navigate = useNavigate();

    function deleteTask() {
        Api.delete('/tasks/' + taskId ).then((res) => {
            setShowDeleteDialog(false)
            navigate('/project/' + projectId)
        }).catch((err) => {
            setShowDeleteDialog(false)
        })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary">
                        <span className="sr-only">Actions</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteDialog(true)}
                        className="text-red-600"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Esborrar tasca
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
                                deleteTask()
                            }}
                        >
                            Esborrar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
