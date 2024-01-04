"use client"

import * as React from "react"
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {Button} from "../../registry/ui/button"
import {Calendar} from "../../registry/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "../../registry/ui/popover"
import {cn} from "../../lib/utils";

export function TaskDatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
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
    )
}
