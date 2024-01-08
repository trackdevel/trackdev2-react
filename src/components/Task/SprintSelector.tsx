"use client"

import * as React from "react"
import {PopoverProps} from "@radix-ui/react-popover"
import {Check, ChevronsUpDown} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "../../registry/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "../../registry/ui/popover"

import {cn} from "../../lib/utils";
import {Sprints} from "../data/task/Sprints";

interface PresetSelectorProps extends PopoverProps {
    pullRequests: Sprints[]
}

export function SprintSelector({ pullRequests, ...props }: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedPullRequest, setSelectedPullRequest] = React.useState<Sprints>()

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Load a preset..."
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[150px] lg:max-w-[200px]"
                >
                    {selectedPullRequest ? selectedPullRequest.name : "Sprint..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar sprint..." />
                    <CommandEmpty>No presets found.</CommandEmpty>
                    <CommandGroup heading="Sprints">
                        {pullRequests.map((request) => (
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
