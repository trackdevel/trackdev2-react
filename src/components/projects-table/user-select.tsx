import * as React from "react"
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import {Button} from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../registry/ui/dialog";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../registry/ui/tooltip";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "../../registry/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import Api from "../../utils/Api";
import {z} from "zod";
import {userSchema} from "../data/users/schema";



export function UsersSelect(props: any) {

    var users = props.users



    const projectId = props.row.original.id

    type User = (typeof users)[number]

    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>(users)
    const [activeUsers, setActiveUsers] = React.useState<User[]>([])
    const [isusersloaded, setIsUsersLoaded] = React.useState<boolean>(false)

    if(activeUsers.length === 0 && !isusersloaded) {
        getUsers()
    }
    // else {
    //     console.log(activeUsers)
    //     console.log(selectedUsers)
    // }
    async function getUsers() {
        setIsUsersLoaded(true)
        Api.get('/users').then((res) => {
            setActiveUsers(z.array(userSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    async function setUsers() {
        console.log(projectId)

        let RequestBody = {
            name: null,
            members: selectedUsers.map((user) => user.email),
            courseId: null
        }

        Api.patch('/projects/' + projectId, RequestBody).then((res) => {
            console.log(res)
            setOpen(false)
            window.location.reload()
        }).catch((err) => {})
    }



    return (
        <>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="outline"
                            className="ml-auto rounded-full"
                            onClick={() => setOpen(true)}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Afegir Usuaris</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={10}>Afegir Usuaris</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-0 p-0 outline-none">
                    <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>Afegir Usuaris</DialogTitle>
                        <DialogDescription>
                            Sel·lecciona els usuaris que vols afegir al projecte
                        </DialogDescription>
                    </DialogHeader>
                    <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                        <CommandInput placeholder="Buscar usuaris..." />
                        <CommandList>
                            <CommandEmpty>Cap usuari trobat.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {activeUsers.map((user: { id: any; email: any; avatar: any; username: any; }) => (
                                    <CommandItem
                                        key={user.id}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            //if (selectedUsers.includes(user)) {
                                            if( selectedUsers.find( ({ id }) => id === user.id ) !== undefined) {
                                                return setSelectedUsers(
                                                    selectedUsers.filter(
                                                        (selectedUser) => selectedUser.id !== user.id
                                                    )
                                                )
                                            }
                                            else setSelectedUsers([...selectedUsers, user])
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Image" />
                                            <AvatarFallback>{user.username[0].toUpperCase() + user.username[1].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium leading-none">
                                                {user.username}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        {( selectedUsers.find( ({ id }) => id === user.id ) !== undefined) ? (
                                            <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                                        ) : null}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                        {selectedUsers.length > 0 ? (
                            <div className="flex -space-x-2 overflow-hidden">
                                {selectedUsers.map((user) => (
                                    <Avatar
                                        key={user.email}
                                        className="inline-block border-2 border-background"
                                    >
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.username[0].toUpperCase() + user.username[1].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Select users to add to this thread.
                            </p>
                        )}
                        <Button
                            disabled={selectedUsers.length < 1}
                            onClick={() => {
                                setUsers()
                            }}
                        >
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
