import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import data from "../../../components/data/projects/groups.json";
import {columns} from "../../../components/projects-table/columns";
import React from "react";
import {GroupsTable} from "../../../components/projects-table/data-table";
import {Button} from "../../../registry/ui/button";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
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
import Api from "../../../utils/Api";
import {projectSchema} from "../../../components/data/projects/schema";
import {Popover, PopoverContent, PopoverTrigger} from "../../../registry/ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../../registry/ui/command";
import {cn} from "../../../lib/utils";
import {Courses, Subjects} from "../crouses/SettingsCoursesPage";
import {subjectSchema} from "../../../components/data/subjects/schema";
import {courseSchema} from "../../../components/data/courses/schema";

function getGroups() {
    return z.array(projectSchema).parse(data)
}
export default function SettingsProjectsPage() {
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username,setUsername] = React.useState<string>('')
    const [email,setEmail] = React.useState<string>('')
    const [name,setName] = React.useState<string>('')
    const current_year = new Date().getFullYear()


    const [projects, setProjects] = React.useState<Array<any>>([])
    const [projectsloaded, setProjectsloaded] = React.useState<boolean>(false)

    const [subjectId,setSubjectId] = React.useState<string>('')
    const [year,setYear] = React.useState<number>()
    const [courses, setCourses] = React.useState<Array<any>>([])
    const [iscoursesloaded, setIscoursesloaded] = React.useState<boolean>(false)
    const [open, setOpen] = React.useState(false)
    const [selectedCourse, setSelectedCourse] = React.useState<Courses>()

    const tasks = getGroups()


    if(courses.length === 0 && !iscoursesloaded) {
        getCourses()
    }

    async function getCourses() {
        setIscoursesloaded(true)
        Api.get('/courses').then((res) => {
            setCourses(z.array(courseSchema).parse(res))
        }).catch((err) => {})
        return;
    }


    if(projects.length === 0 && !projectsloaded) {
        getProjects()
    }
    async function getProjects() {
        setProjectsloaded(true)
        Api.get('/projects').then((res) => {
            setProjects(z.array(projectSchema).parse(res))
        }).catch((err) => {})
        return;
    }


    function toogleState() {
        setState(!state)
    }
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(!selectedCourse || name === '' || name === undefined || name === null || selectedCourse === undefined || selectedCourse === null) {
            setIsLoading(false)
            return;
        }

        var requestBody = {
            name: name,
            members: []
        }


        Api.post(`/courses/${selectedCourse!.id}/projects`,requestBody).then((res) => {
            getProjects()
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
                    <h3 className="text-lg font-medium">Groups</h3>
                    <p className="text-sm text-muted-foreground">
                        Update groups list settings
                    </p>
                </div>
                <Dialog open={state}>
                    <DialogTrigger onClick={toogleState}>
                        <Button>
                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                            Afegir Projecte
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogPrimitive.Close  onClick={toogleState} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="h-4 w-4" />
                            <span className="sr-only">Tancar</span>
                        </DialogPrimitive.Close>
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle>Afegir Projecte</DialogTitle>
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
                                                {selectedCourse ? selectedCourse.subject.name + ' ' + selectedCourse.startYear.toString().slice(-2) + '/' + (selectedCourse.startYear+1).toString().slice(-2) : 'Select subject'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search subject..." />
                                                <CommandEmpty>No presets found.</CommandEmpty>
                                                <CommandGroup heading="Subjects">
                                                    {courses.map((request) => (
                                                        <CommandItem key={request.id}
                                                                     onSelect={() => {
                                                                         setSelectedCourse(request)
                                                                         setOpen(false)
                                                                         setSubjectId(request.id)
                                                                     }}
                                                        >
                                                            {request.subject.name} {request.startYear.toString().slice(-2)}/{(request.startYear+1).toString().slice(-2)}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    selectedCourse?.id === request.id
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
                                        id="name"
                                        placeholder={name ? name : "Name"}
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="Name"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Create Project
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <GroupsTable data={projects} columns={columns}/>
            </div>
        </div>
    )
}
