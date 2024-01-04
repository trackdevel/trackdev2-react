import {Separator} from "../../../registry/ui/separator"
import {z} from "zod";
import {columns} from "../../../components/courses-table/columns";
import React from "react";
import {courseSchema} from "../../../components/data/courses/schema";
import {CrousesTable} from "../../../components/courses-table/data-table";
import {Button} from "../../../registry/ui/button"
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import Api from "../../../utils/Api";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../registry/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Input} from "../../../registry/ui/input";
import {Icons} from "../../../registry/ui/icons";
import {subjectSchema} from "../../../components/data/subjects/schema";
import {Popover, PopoverContent, PopoverTrigger} from "../../../registry/ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../../registry/ui/command";
import {cn} from "../../../lib/utils";


export interface Subjects {
    id: string
    name: string
}

export interface Courses {
    id: string
    startYear: number
    subject: {
        id: string
        name: string
    }
}

export default function SettingsCoursesPage() {
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [subjectId,setSubjectId] = React.useState<string>('')
    const [year,setYear] = React.useState<number>()
    const [subjects, setSubjects] = React.useState<Array<any>>([])
    const [issubjectsloaded, setIsSubjectsLoaded] = React.useState<boolean>(false)

    const [tasks, setCourses] = React.useState<Array<any>>([])
    const [iscourseloaded, setIsCourseLoaded] = React.useState<boolean>(false)


    const [open, setOpen] = React.useState(false)
    const [selectedPullRequest, setSelectedPullRequest] = React.useState<Subjects>()

    const current_year = new Date().getFullYear()

    if(subjects.length === 0 && !issubjectsloaded) {
        getSubjects()
    }
    async function getSubjects() {
        setIsSubjectsLoaded(true)
        Api.get('/subjects').then((res) => {
            setSubjects(z.array(subjectSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    if(tasks.length === 0 && !iscourseloaded) {
        getCourses()
    }

    async function getCourses() {
        setIsCourseLoaded(true)
        Api.get('/courses').then((res) => {
            setCourses(z.array(courseSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    function toogleState() {
        setState(!state)
    }
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(!subjectId|| !year) {
            setIsLoading(false)
            return;
        }

        var requestBody = {
            startYear: year
        }

        Api.post('/subjects/' + subjectId + '/courses',requestBody).then((res) => {
            setIsLoading(false)
            toogleState()
            getCourses()
        }).catch((err) => {
            setIsLoading(false)
        })
    }


    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Courses</h3>
                    <p className="text-sm text-muted-foreground">
                        Actualitza els cursos de les assignatures
                    </p>
                </div>
                <Dialog open={state}>
                    <DialogTrigger onClick={toogleState}>
                        <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Nou curs
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogPrimitive.Close  onClick={toogleState} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle>Afegir nou curs</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Popover open={open} onOpenChange={setOpen} >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-label="Load a preset..."
                                                aria-expanded={open}
                                                className="flex-1 justify-between w-full"
                                            >
                                                {selectedPullRequest ? selectedPullRequest.name : "Subject"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Buscar assignatura..." />
                                                <CommandEmpty>No s'ha trobat cap assignatura</CommandEmpty>
                                                <CommandGroup heading="Assignatures">
                                                    {subjects.map((request) => (
                                                        <CommandItem key={request.id}
                                                                     onSelect={() => {
                                                                         setSelectedPullRequest(request)
                                                                         setOpen(false)
                                                                         setSubjectId(request.id)
                                                                     }}
                                                        >
                                                            {request.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    selectedPullRequest?.id === request.id
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
                                    <Input
                                        id="year"
                                        placeholder={current_year.toString()}
                                        type="number"
                                        autoCapitalize="none"
                                        autoComplete="year"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setYear(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Crear nou curs
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <CrousesTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
