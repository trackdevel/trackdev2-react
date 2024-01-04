import {Separator} from "../../../registry/ui/separator"
import {z} from "zod";
import {userSchema} from "../../../components/data/users/schema";
import {columns} from "../../../components/users-table/columns";
import React from "react";
import {UsersTable} from "../../../components/users-table/data-table";
import {Button} from "../../../registry/ui/button";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../registry/ui/dialog";
import {Input} from "../../../registry/ui/input";
import {Icons} from "../../../registry/ui/icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Api from "../../../utils/Api";


export default function SettingsUsersPage() {
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username,setUsername] = React.useState<string>('')
    const [email,setEmail] = React.useState<string>('')

    const [tasks, setTasks] = React.useState<Array<any>>([])
    const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)


    if(tasks.length === 0 && !istasksloaded) {
        getUsers()
    }
    async function getUsers() {
        setIsTasksLoaded(true)
        Api.get('/users').then((res) => {
            setTasks(z.array(userSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    function toogleState() {
        setState(!state)
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(username === '' || email === '') {
            setIsLoading(false)
            return;
        }

        var requestBody = {
            username: username,
            email: email
        }


        Api.post('/users/register',requestBody).then((res) => {
            setIsLoading(false)
            toogleState()
        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Users</h3>
                    <p className="text-sm text-muted-foreground">
                        Update users list settings
                    </p>
                </div>
                <Dialog open={state}>
                    <DialogTrigger onClick={toogleState}>
                        <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogPrimitive.Close  onClick={toogleState} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle>Add User</DialogTitle>
                                <DialogDescription>
                                    Add the new user data
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Input
                                        id="username"
                                        placeholder="Nom i Cognoms"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="username"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Import User
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <UsersTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
