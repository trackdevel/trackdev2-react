import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import {groupSchema} from "../../../components/data/groups/schema";
import data from "../../../components/data/groups/groups.json";
import {columns} from "../../../components/groups-table/columns";
import React from "react";
import {GroupsTable} from "../../../components/groups-table/data-table";
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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Input} from "../../../registry/ui/input";
import {Icons} from "../../../registry/ui/icons";
import Api from "../../../utils/Api";
import {CardsChat} from "../../../components/CoursesConfig/UserSelect/chat";

function getGroups() {
    return z.array(groupSchema).parse(data)
}
export default function SettingsGroupsPage() {
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username,setUsername] = React.useState<string>('')
    const [email,setEmail] = React.useState<string>('')

    const tasks = getGroups()


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


        Api.post('/users/v2/register',requestBody).then((res) => {
            setIsLoading(false)
            toogleState()
        }).catch((err) => {
            setIsLoading(false)
            console.log(err);
        })
    }


    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Groups</h3>
                    <p className="text-sm text-muted-foreground">
                        Update groups list settings
                    </p>
                </div>
                <Dialog open={state}>
                    <DialogTrigger onClick={toogleState}>
                        <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Add Group
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
                                        placeholder="u1234567"
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
                <GroupsTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
