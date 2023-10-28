import { Metadata } from "next"
import {Calendar as CalendarIcon, Check, ChevronsUpDown, History} from "lucide-react"

import { Button } from "../../registry/ui/button"
import { Separator } from "../../registry/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../registry/ui/tabs"
import { Textarea } from "../../registry/ui/textarea"

import { Icons } from "../ui/icons"
import { MaxLengthSelector } from "../ui/maxlength-selector"
import { TaskActions } from "./task-actions"
import { SprintSelector } from "./SprintSelector"
import "./styles.css"
import {pullRequests, Sprints} from "../data/task/Sprints";
import {TaskDatePicker} from "./TaskDatePicker";
import {TaskEstimation} from "./TaskEstimation";
import TaskReporter from "./TaskReporter";
import TaskAssignee from "./TaskAssignee";
import React from "react";
import Api from "../../utils/Api";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {cn} from "../../lib/utils";
import {format} from "date-fns";
import {Calendar} from "../../registry/ui/calendar";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {Input} from "../../registry/ui/input";
import {CardsChat} from "./chat";
import {Card, CardContent, CardHeader} from "../../registry/ui/card";
import {useParams} from "react-router-dom";
import {z} from "zod";
import {taskSchema} from "../data/task/schema";


export default function TaskMainLayout(...props: any) {
    const [tab, setTab] = React.useState<string>('Information')

    const [title, setTitle] = React.useState<string>('Full task name')
    const [estimationpoints, setEstimationpoints] = React.useState<number>()
    const [date, setDate] = React.useState<Date>()

    const [sprint, setSprint] = React.useState<Sprints>()
    const [sprintopen, setSprintopen] = React.useState(false)

    // task use state object
    const [task, setTask] = React.useState<any>({})
    const [taskloaded, setTaskloaded] = React.useState<boolean>(false)

    const [taskId, setTaskId] = React.useState<any>(props[0].taskId)

    if(Object.keys(task).length === 0 && !taskloaded) {
        getTask(taskId)
    }
    async function getTask(taskId: string|undefined) {
        setTaskloaded(true)
        Api.get('/tasks/' + taskId).then((res) => {
            console.log('res',res)
            setTask(taskSchema.parse(res))
            setTitle(taskSchema.parse(res).name)
            setDate(new Date(taskSchema.parse(res).createdAt))
            setEstimationpoints(taskSchema.parse(res).estimationPoints)
        }).catch((err) => {})
        return;
    }

    async function onCreate(event: React.SyntheticEvent) {
        event.preventDefault()
        console.log(date)
        console.log(sprint)
        console.log(title)
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <form onSubmit={onCreate}>
                    <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-30">
                        { /* <h2 className="text-3xl font-bold tracking-tight w-full ">Full task name</h2> */ }
                        <div className="w-full space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight w-full">{tab}</h2>
                            <Input
                                id="name"
                                placeholder="Task name"
                                value={title}
                                type="text"
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                            <Popover open={sprintopen} onOpenChange={setSprintopen} {...props}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-label="Load a preset..."
                                        aria-expanded={sprintopen}
                                        className="flex-1 justify-between md:max-w-[150px] lg:max-w-[200px]"
                                    >
                                        {sprint ? sprint.name : "Sprint..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search presets..." />
                                        <CommandEmpty>No presets found.</CommandEmpty>
                                        <CommandGroup heading="Sprints">
                                            {pullRequests.map((request) => (
                                                <CommandItem key={request.id}
                                                             onSelect={() => {
                                                                 setSprint(request)
                                                                 setSprintopen(false)
                                                             }}
                                                >
                                                    {request.name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            sprint?.id === request.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <Button>Guardar</Button>
                            <TaskActions />
                        </div>
                    </div>
                    <Separator />
                    <Tabs defaultValue="information" className="flex-1">
                        <div className="h-full py-6">
                            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_350px]">
                                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                    <div className="grid gap-2">
                                        <TabsList className="grid grid-cols-3">
                                            <TabsTrigger value="information" onClick={() => setTab('Information')}>
                                                <span className="sr-only">Information</span>
                                                <Icons.Info className="h-5 w-5" />
                                            </TabsTrigger>
                                            <TabsTrigger value="history" onClick={() => setTab('History')}>
                                                <span className="sr-only">History</span>
                                                <Icons.History className="h-5 w-5" />
                                            </TabsTrigger>
                                            <TabsTrigger value="comments" onClick={() => setTab('Comments')}>
                                                <span className="sr-only">Comments</span>
                                                <Icons.messagesSquare className="h-5 w-5" />
                                            </TabsTrigger>
                                            {/*<TabsTrigger value="debate" onClick={() => setTab('Debate')}>
                                                <span className="sr-only">Debate</span>
                                                <Icons.Megaphone className="h-5 w-5" />
                                            </TabsTrigger>*/}
                                        </TabsList>
                                    </div>
                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Data de creació
                                    </span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Selecciona una data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Estimation Points
                                    </span>
                                    <Input
                                        id="estimationpoints"
                                        placeholder="Estimation Points"
                                        value={estimationpoints}
                                        type="number"
                                        autoCapitalize="none"
                                        autoComplete="name"
                                        autoCorrect="off"
                                        onChange={(e) => setEstimationpoints(parseInt(e.target.value))}
                                    />
                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Reporter
                                    </span>
                                    <TaskReporter />
                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Assignee
                                    </span>
                                    <TaskAssignee />
                                </div>
                                <div className="md:order-1">
                                    <TabsContent value="information" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <Textarea
                                                placeholder="Information"
                                                className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="history" className="mt-0 border-0 p-0">
                                        <Card>
                                            <CardHeader className="flex flex-row items-center">
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex h-full flex-col space-y-4">
                                                    <div className="space-y-8">
                                                        <div className="flex items-center">
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                                                <AvatarFallback>GR</AvatarFallback>
                                                            </Avatar>
                                                            <div className="ml-4 space-y-1">
                                                                <p className="text-sm font-medium leading-none">Estimation Points</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    changed
                                                                </p>
                                                            </div>
                                                            <div className="ml-auto font-medium">5 to 10</div>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex items-center">
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                                                <AvatarFallback>MG</AvatarFallback>
                                                            </Avatar>
                                                            <div className="ml-4 space-y-1">
                                                                <p className="text-sm font-medium leading-none">Data de creació</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    added
                                                                </p>
                                                            </div>
                                                            <div className="ml-auto font-medium">October 9th, 2023</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="comments" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <CardsChat />
                                        </div>
                                    </TabsContent>
                                    {/*<TabsContent value="debate" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <Textarea
                                                placeholder="Debate"
                                                className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                            />
                                        </div>
                                    </TabsContent>*/}
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </form>
            </div>
        </>
    )
}
