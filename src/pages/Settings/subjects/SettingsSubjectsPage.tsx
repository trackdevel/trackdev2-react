import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import {subjectSchema} from "../../../components/data/subjects/schema";
import data from "../../../components/data/subjects/subject.json";
import {columns} from "../../../components/subjects-table/columns";
import React, {useEffect} from "react";
import {SubjectsTable} from "../../../components/subjects-table/data-table";
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

export default function SettingsSubjectsPage() {
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string>('')
    const [acronym, setAcronym] = React.useState<string>('')
    const [tasks, setTasks] = React.useState<Array<any>>([])
    const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)

    if(tasks.length === 0 && !istasksloaded) {
        getSubjects()
    }
    async function getSubjects() {
        setIsTasksLoaded(true)
        Api.get('/subjects').then((res) => {
            setTasks(z.array(subjectSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    function toogleState() {
        setState(!state)
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

        Api.post('/subjects', requestBody).then((res) => {
            setIsLoading(false)
            getSubjects()
            toogleState()
        }).catch((err) => {
            setIsLoading(false)
        })

    }

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Subjects</h3>
                    <p className="text-sm text-muted-foreground">
                        Update subjects list settings
                    </p>
                </div>
                <Dialog open={state}>
                    <DialogTrigger onClick={toogleState}>
                        <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4"/>
                            Add Subject
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogPrimitive.Close onClick={toogleState}
                                               className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="h-4 w-4"/>
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                        <form onSubmit={onCreate}>
                            <DialogHeader>
                                <DialogTitle>Add Subject</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        placeholder="Projecte de Desenvolupament de Software"
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
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="acronym"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setAcronym(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Import Subject
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator/>
            <div className="hidden h-full flex-1 flex-col md:flex">
                <SubjectsTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
