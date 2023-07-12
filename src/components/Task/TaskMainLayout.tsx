import { Metadata } from "next"
import {History} from "lucide-react"

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
import {pullRequests} from "../data/task/Sprints";
import {TaskDatePicker} from "./TaskDatePicker";
import {TaskEstimation} from "./TaskEstimation";
import TaskReporter from "./TaskReporter";
import TaskAssignee from "./TaskAssignee";


export default function TaskMainLayout() {
    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <h2 className="text-3xl font-bold tracking-tight w-full ">Full task name</h2>
                    <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                        <SprintSelector pullRequests={pullRequests} />
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
                                    <TabsList className="grid grid-cols-4">
                                        <TabsTrigger value="information">
                                            <span className="sr-only">Information</span>
                                            <Icons.Info className="h-5 w-5" />
                                        </TabsTrigger>
                                        <TabsTrigger value="history">
                                            <span className="sr-only">History</span>
                                            <Icons.History className="h-5 w-5" />
                                        </TabsTrigger>
                                        <TabsTrigger value="comments">
                                            <span className="sr-only">Comments</span>
                                            <Icons.messagesSquare className="h-5 w-5" />
                                        </TabsTrigger>
                                        <TabsTrigger value="debate">
                                            <span className="sr-only">Debate</span>
                                            <Icons.Megaphone className="h-5 w-5" />
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Data de creació
                                </span>
                                <TaskDatePicker />
                                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Estimation Points
                                </span>
                                <TaskEstimation />
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
                                    <div className="flex h-full flex-col space-y-4">
                                        <Textarea
                                            placeholder="History"
                                            className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="comments" className="mt-0 border-0 p-0">
                                    <div className="flex h-full flex-col space-y-4">
                                        <Textarea
                                            placeholder="Comments"
                                            className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                        />
                                    </div>
                                </TabsContent>
                                <TabsContent value="debate" className="mt-0 border-0 p-0">
                                    <div className="flex h-full flex-col space-y-4">
                                        <Textarea
                                            placeholder="Debate"
                                            className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                        />
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </>
    )
}
