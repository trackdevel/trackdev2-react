"use client"

import * as React from "react"
import {PopoverProps} from "@radix-ui/react-popover"
import {Check, ChevronsUpDown} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "../../registry/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "../../registry/ui/popover"

import {cn} from "../../lib/utils";

export interface Subjects {
    id: string
    name: string
}

interface PresetSelectorProps extends PopoverProps {
    subjects: Subjects[]
}

export function SubjectSelector({ subjects, ...props }: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedPullRequest, setSelectedPullRequest] = React.useState<Subjects>()

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
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
                    <CommandInput placeholder="Search subject..." />
                    <CommandEmpty>No presets found.</CommandEmpty>
                    <CommandGroup heading="Subjects">
                        {subjects.map((request) => (
                            <CommandItem key={request.id}
                                         onSelect={() => {
                                             setSelectedPullRequest(request)
                                             setOpen(false)
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
    )
}
