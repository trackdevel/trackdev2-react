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


import {Card, CardHeader} from "../../registry/ui/card";
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



export function UsersSelect(props: any) {

    var users = props.users
    const users_new = props.users
    // array merge users and users_new as a new array
    users = [...users, ...users_new]
    users = [...users, ...users_new]
    users = [...users, ...users_new]
    users = [...users, ...users_new]
    users = [...users, ...users_new]
    users = [...users, ...users_new]


    const groupId = props.row.original.id

    type User = (typeof users)[number]

    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

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
                            <span className="sr-only">New message</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={10}>New message</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-0 p-0 outline-none">
                    <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>New message</DialogTitle>
                        <DialogDescription>
                            Invite a user to this thread. This will create a new group
                            message.
                        </DialogDescription>
                    </DialogHeader>
                    <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {users.map((user: { email: any; avatar: any; username: any; }) => (
                                    <CommandItem
                                        key={user.email}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            if (selectedUsers.includes(user)) {
                                                return setSelectedUsers(
                                                    selectedUsers.filter(
                                                        (selectedUser) => selectedUser !== user
                                                    )
                                                )
                                            }

                                            return setSelectedUsers(
                                                [...users].filter((u) =>
                                                    [...selectedUsers, user].includes(u)
                                                )
                                            )
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
                                        {selectedUsers.includes(user) ? (
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
                            disabled={selectedUsers.length < 2}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
