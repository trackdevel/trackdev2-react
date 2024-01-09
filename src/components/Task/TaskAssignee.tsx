"use client"

import * as React from "react"
import {useEffect} from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage,} from "../../registry/ui/avatar"
import {Button} from "../../registry/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "../../registry/ui/command"
import {Dialog,} from "../../registry/ui/dialog"
import {Popover, PopoverContent, PopoverTrigger,} from "../../registry/ui/popover"
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";
import {z} from "zod";
import {courseSchema} from "../data/courses/schema";

const groups = [
    {
        label: "Usuaris",
        teams: [
            {
                label: "Marc Got",
                value: "marc-got",
            },
            {
                label: "Gerard Rovellat",
                value: "gerard-rovellat",
            },
            {
                label: "Nacho",
                value: "personal",
            },
        ],
    },
]

type Team = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TaskAssignee(...props: any) {
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

    const [selectedTeam, setSelectedTeam] = React.useState<string>("")

    const [members, setMembers] = React.useState<Array<any>>([])
    const [projectId, setProjectId] = React.useState<any>(props[0].projectId)
    const [taskId, setTaskId] = React.useState<any>(props[0].taskId)


    useEffect(() => {
        Api.get('/projects/' + projectId).then((res) => {
            setMembers(z.array(courseSchema).parse(res.members))
        }).catch((err) => {})
    }, [])

    useEffect(() => {
        Api.get('/tasks/' + taskId).then((res) => {
            setSelectedTeam(res.reporter.username)
        }).catch((err) => {})
    }, []);

    return (
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
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedTeam}.png`}
                                alt={selectedTeam}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedTeam}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Buscar usuari..." />
                            <CommandEmpty>No team found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup key={group.label} heading={group.label}>
                                    {members.map((team) => (
                                        <CommandItem
                                            key={team.username}
                                            onSelect={() => {
                                                setSelectedTeam(team.username)
                                                setOpen(false)
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${team.username}.png`}
                                                    alt={team.username}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>SC</AvatarFallback>
                                            </Avatar>
                                            {team.username}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedTeam === team.username
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </Dialog>
    )
}
