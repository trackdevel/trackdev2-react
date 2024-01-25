import {Calendar as CalendarIcon, Check, ChevronsUpDown} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {Separator} from "../../registry/ui/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "../../registry/ui/tabs"
import {Textarea} from "../../registry/ui/textarea"

import {Icons} from "../ui/icons"
import {TaskActions} from "./task-actions"
import "./styles.css"
import {Sprints} from "../data/task/Sprints";
import React, {useEffect} from "react";
import Api from "../../utils/Api";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {cn} from "../../lib/utils";
import {format} from "date-fns";
import {Calendar} from "../../registry/ui/calendar";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../../registry/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "../../registry/ui/avatar";
import {Input} from "../../registry/ui/input";
import {CardsChat} from "./chat";
import {taskSchema} from "../data/task/schema";
import {TaskHistory} from "./history";
import {z} from "zod";
import {courseSchema} from "../data/courses/schema";
import {Dialog} from "../../registry/ui/dialog";
import {DataTable} from "../tasks-table/data-table";
import {columns} from "../tasks-table/columns"
import {toast} from "react-toastify";

export interface User {
    id: string
    username: string
    email: string
    capitalLetters: string
    color: string
}

export default function TaskMainLayout(...props: any) {
    const [tab, setTab] = React.useState<string>('Informació')

    const [title, setTitle] = React.useState<string>('Full task name')
    const [information, setInformation] = React.useState<string>('')
    const [estimationpoints, setEstimationpoints] = React.useState<number>()
    const [date, setDate] = React.useState<Date>()

    const [sprint, setSprint] = React.useState<Sprints>()
    const [sprintopen, setSprintopen] = React.useState(false)

    const [statuses, setStatuses] = React.useState<Object>([])
    const [status, setStatus] = React.useState<string>('')
    const [statusopen, setStatusopen] = React.useState(false)

    const [type, setType] = React.useState<string>('')
    const [typeopen, setTypeopen] = React.useState(false)
    const [isuserstory, setIsUserStory] = React.useState<boolean>(true)
    const [subtasks, setSubtasks] = React.useState<Array<any>>([])

    // task use state object
    const [task, setTask] = React.useState<any>({})

    const [sprints, setSprints] = React.useState<Array<any>>([])

    const [taskId, setTaskId] = React.useState<any>(props[0].taskId)
    const [projectId, setProjectId] = React.useState<any>(props[0].projectId)

    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<User>()

    const [openAssignee, setOpenAssignee] = React.useState(false)
    const [showNewTeamDialogAssignee, setShowNewTeamDialogAssignee] = React.useState(false)
    const [selectedTeamAssignee, setSelectedTeamAssignee] = React.useState<User>()

    const [members, setMembers] = React.useState<Array<any>>([])

    const [pointsReviews, setPointsReviews] = React.useState<Array<any>>([])
    const [currentReview, setCurrentReview] = React.useState<any>([])

    const [isAdmin, setIsAdmin] = React.useState<boolean>(true)
    const [currenUserMail , setCurrentUserMail] = React.useState<string>('')
    const [isAssignee, setIsAssignee] = React.useState<boolean>(false)


    useEffect(() => {
        Api.get('/projects/' + projectId).then((res) => {
            setMembers(z.array(courseSchema).parse(res.members))
            setSprints(z.array(courseSchema).parse(res.sprints))
        }).catch((err) => {})
    }, [])


    useEffect(() => {
        if(taskId != 'new') {
            Api.get('/tasks/' + taskId).then((res) => {
                console.log(res.task)
                console.log(res.task.createdAt)
                setTask(taskSchema.parse(res.task))
                setTitle(taskSchema.parse(res.task.name))
                setDate(new Date(taskSchema.parse(res.task.createdAt)))
                setEstimationpoints(taskSchema.parse(res.task.estimationPoints))
                setSelectedTeamAssignee(res.task.reporter)
                setSelectedTeam(res.task.assignee)
                setSprint(taskSchema.parse(res.task.activeSprints[0]))
                setStatus(taskSchema.parse(res.task.statusText))
                setInformation(taskSchema.parse(res.task.description))
                setSubtasks(taskSchema.parse(res.task.childTasks))
                if(taskSchema.parse(res.task.parentTask) != null) {
                    setIsUserStory(false)
                }
                setPointsReviews(taskSchema.parse(res.pointsReview))
                let current_review = taskSchema.parse(res).pointsReview.filter((item : any) => item.user.username === 'Admin user')
                if(current_review.length > 0) {
                    setCurrentReview(current_review[0])
                }
            }).catch((err) => {
            })
        }
    }, []);

    useEffect(() => {
        if(isuserstory) var url = '/tasks/usstatus'
        else var url = '/tasks/taskstatus'
        Api.get(url).then((res) => {
            setStatuses(res)
        }).catch((err) => {})
    }, [isuserstory]);


    useEffect(() => {
        Api.get('/users/checker/admin').then((res) => {
            setIsAdmin(true)
        }).catch((err) => {
            setIsAdmin(false)
        })
    }, []);

    useEffect(() => {
        Api.get('/auth/self').then((res) => {
            setCurrentUserMail(res.email)
            if(res.email == selectedTeam?.email) {
                setIsAssignee(true)
            }
        }).catch((err) => {
        })
    })


    async function onCreate(event: React.SyntheticEvent) {
        event.preventDefault()

        console.log(selectedTeam,selectedTeamAssignee)

        let requestBody = {
            name: title,
            estimationPoints: estimationpoints,
            activeSprints: [sprint?.id], // no ho guarda
            // @ts-ignore
            status: statuses[status],
            // createdAt: date,
            assignee: selectedTeam?.email, // guarda el SeletedTeam sempre
            reporter: selectedTeamAssignee?.email, // guarda el SeletedTeam sempre
            description: information,
            pointsReview: {
                points: currentReview.points,
                comment: currentReview.comment
            }
        }

        console.log('/tasks/' + taskId,requestBody)

        if(taskId != 'new') {
            Api.patch('/tasks/' + taskId, requestBody).then((res) => {
                toast.success('Tasca actualitzada correctament', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }).catch((err) => {
                toast.error('No s\'ha pogut actualitzar la tasca', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        }
        else {
            Api.post('/projects/' + projectId + '/tasks', requestBody).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
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
                                        <CommandInput placeholder="Buscar sprint..." />
                                        <CommandEmpty>No presets found.</CommandEmpty>
                                        <CommandGroup heading="Sprints">
                                            {sprints.map((request : any) => (
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
                            <Popover open={statusopen} onOpenChange={setStatusopen} {...props}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-label="Load a preset..."
                                        aria-expanded={sprintopen}
                                        className="flex-1 justify-between md:max-w-[150px] lg:max-w-[200px]"
                                    >
                                        {status ? status : "Estats..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Buscar estats..." />
                                        <CommandEmpty>No presets found.</CommandEmpty>
                                        <CommandGroup heading="Status">
                                            {Object.entries(statuses).map(([key, value]) => (
                                                <CommandItem key={value}
                                                             onSelect={() => {
                                                                 setStatus(value)
                                                                 setStatusopen(false)
                                                             }}
                                                >
                                                    {value}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            status === value
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
                            { taskId === 'new' ? (
                                <Button >Crear</Button>
                            ) : (
                                <Button>Guardar</Button>
                            )}
                            {/* <TaskActions taskId={taskId} projectId={projectId}/> */}
                        </div>
                    </div>
                    <Separator />
                    <Tabs defaultValue="information" className="flex-1">
                        <div className="h-full py-6">
                            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_350px]">
                                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                    <div className="grid gap-2">
                                        <TabsList className={"grid  " + (isuserstory ? 'grid-cols-4' : 'grid-cols-3')}>
                                            <TabsTrigger value="information" onClick={() => setTab('Informació')}>
                                                <span className="sr-only">Informació</span>
                                                <Icons.Info className="h-5 w-5"/>
                                            </TabsTrigger>
                                            <TabsTrigger value="history" onClick={() => setTab('Historial')}>
                                                <span className="sr-only">Historial</span>
                                                <Icons.History className="h-5 w-5"/>
                                            </TabsTrigger>
                                            <TabsTrigger value="comments" onClick={() => setTab('Comentaris')}>
                                                <span className="sr-only">Comentaris</span>
                                                <Icons.messagesSquare className="h-5 w-5"/>
                                            </TabsTrigger>
                                            {isuserstory ? (
                                                <TabsTrigger value="subtasks" onClick={() => setTab('Tasques')}>
                                                    <span className="sr-only">Sub Tasques</span>
                                                    <Icons.Megaphone className="h-5 w-5"/>
                                                </TabsTrigger>
                                            ) : null}
                                        </TabsList>
                                    </div>
                                    <span
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Data de creació
                                    </span>
                                    <Popover open={false} onOpenChange={() => {}}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={"w-full justify-start text-left font-normal text-muted-foreground"}
                                                style={{pointerEvents: 'none'}}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {date ? format(date, "PPP") : <span>Selecciona una data</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                                disabled={false}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <span
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Creador
                                    </span>
                                    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    aria-label="Select a team"
                                                    className="w-full justify-between"
                                                >
                                                    <Avatar className="mr-2 h-5 w-5">
                                                        <AvatarFallback style={
                                                            {

                                                                fontSize: '10px', backgroundColor: selectedTeam?.color
                                                            }
                                                        }>{selectedTeam?.capitalLetters}</AvatarFallback>
                                                    </Avatar>
                                                    {selectedTeam?.username}
                                                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandList>
                                                        <CommandInput placeholder="Buscar usuari..."/>
                                                        <CommandEmpty>No team found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {members.map((team) => (
                                                                <CommandItem
                                                                    key={team.username}
                                                                    onSelect={() => {
                                                                        setSelectedTeam(team)
                                                                        setOpen(false)
                                                                    }}
                                                                    className="text-sm"
                                                                >
                                                                    <Avatar className="mr-2 h-5 w-5">
                                                                        <AvatarImage className="grayscale" />
                                                                        <AvatarFallback style={{fontSize: '10px', backgroundColor: team?.color}}>{team?.capitalLetters}</AvatarFallback>
                                                                    </Avatar>
                                                                    {team.username}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            selectedTeam?.username === team.username
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </Dialog>
                                    <span
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Asignat
                                    </span>
                                    <Dialog open={showNewTeamDialogAssignee}
                                            onOpenChange={setShowNewTeamDialogAssignee}>
                                        <Popover open={openAssignee} onOpenChange={setOpenAssignee}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openAssignee}
                                                    aria-label="Select a team"
                                                    className="w-full justify-between"
                                                >
                                                    <Avatar className="mr-2 h-5 w-5">
                                                        <AvatarFallback style={{fontSize: '10px', backgroundColor: selectedTeamAssignee?.color}}>{selectedTeamAssignee?.capitalLetters}</AvatarFallback>
                                                    </Avatar>
                                                    {selectedTeamAssignee?.username}
                                                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandList>
                                                        <CommandInput placeholder="Buscar usuari..."/>
                                                        <CommandEmpty>No team found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {members.map((team) => (
                                                                <CommandItem
                                                                    key={team.username}
                                                                    onSelect={() => {
                                                                        setSelectedTeamAssignee(team)
                                                                        setOpenAssignee(false)
                                                                        setIsAssignee(team.email == currenUserMail)
                                                                    }}
                                                                    className="text-sm"
                                                                >
                                                                    <Avatar className="mr-2 h-5 w-5">
                                                                        <AvatarImage className="grayscale" />
                                                                        <AvatarFallback style={{fontSize: '10px', backgroundColor: team?.color}}>{team?.capitalLetters}</AvatarFallback>
                                                                    </Avatar>
                                                                    {team.username}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            selectedTeamAssignee?.username === team.username
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </Dialog>
                                    {isuserstory ? (
                                        <>
                                            <span
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Estimació de punts
                                            </span>
                                            <Input
                                                id="estimationpoints"
                                                placeholder="Estimació de punts"
                                                value={estimationpoints}
                                                type="number"
                                                autoCapitalize="none"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={!isAssignee}
                                                onChange={(e) => setEstimationpoints(parseInt(e.target.value))}
                                            />
                                            {(!isAssignee) ? (
                                                <>
                                                    <span
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Revisió de punts
                                                    </span>
                                                    <Input
                                                        id="pointsreview"
                                                        placeholder="Punts"
                                                        value={currentReview.points}
                                                        type="number"
                                                        autoCapitalize="none"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        onChange={(e) => {
                                                            setCurrentReview({
                                                                ...currentReview,
                                                                points: parseInt(e.target.value)
                                                            })
                                                        }}
                                                    />
                                                    <Input
                                                        id="pointsreviewcomment"
                                                        placeholder="Commentari"
                                                        value={currentReview.comment}
                                                        type="text"
                                                        autoCapitalize="none"
                                                        autoComplete="name"
                                                        autoCorrect="off"
                                                        onChange={(e) => {
                                                            setCurrentReview({
                                                                ...currentReview,
                                                                comment: e.target.value
                                                            })
                                                        }}
                                                    />
                                                </>
                                            ) : null}
                                            {isAdmin && pointsReviews.length > 0 ? (
                                                <>
                                                    <span
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Llistat de revisions de punts
                                                    </span>
                                                    {console.log(pointsReviews)}
                                                    {pointsReviews.map((item: any, index: any) => (

                                                        <>
                                                            <div className="flex items-center">
                                                                <Avatar className="h-9 w-9">
                                                                    <AvatarFallback  style={{backgroundColor: item.user.color}}>{item.user.capitalLetters}</AvatarFallback>
                                                                </Avatar>
                                                                <div className="ml-4 space-y-1">
                                                                    <p className="text-sm font-medium leading-none">{item.user.username}</p>
                                                                    <p className="text-sm text-muted-foreground">{item.comment}</p>
                                                                </div>
                                                                <div className="ml-auto font-medium">{item.points}</div>
                                                            </div>
                                                            {index !== pointsReviews.length - 1 && (
                                                                <Separator/>
                                                            )}
                                                        </>
                                                    ))}
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </div>
                                <div className="md:order-1">
                                <TabsContent value="information" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <Textarea
                                                placeholder="Informació"
                                                value={(information) ? information : ''}
                                                onChange={(e) => setInformation(e.target.value)}
                                                className="min-h-[200px] flex-1 p-4 md:min-h-[400px] lg:min-h-[400px]"
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="history" className="mt-0 border-0 p-0">
                                        <TaskHistory taskId={taskId}/>
                                    </TabsContent>
                                    <TabsContent value="comments" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <CardsChat taskId={taskId}/>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="subtasks" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <DataTable data={subtasks} columns={columns}/>
                                        </div>
                                    </TabsContent>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </form>
            </div>
        </>
    )
}
