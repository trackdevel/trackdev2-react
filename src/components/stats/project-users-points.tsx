"use client"

import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../registry/ui/avatar"
import { Button } from "../../registry/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../registry/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../registry/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../registry/ui/popover"

export function ProjectUsersPoints() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Sprint 1</CardTitle>
                <CardDescription>
                    Shows the points of every user in the project
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/01.png" alt="Image"/>
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-sm text-muted-foreground">m@example.com</p>
                        </div>
                    </div>
                    <span>100</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/02.png" alt="Image"/>
                            <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                            <p className="text-sm text-muted-foreground">p@example.com</p>
                        </div>
                    </div>
                    <span>130</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/03.png" alt="Image"/>
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                Isabella Nguyen
                            </p>
                            <p className="text-sm text-muted-foreground">i@example.com</p>
                        </div>
                    </div>
                    <span>90</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/03.png" alt="Image"/>
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                Isabella Nguyen
                            </p>
                            <p className="text-sm text-muted-foreground">i@example.com</p>
                        </div>
                    </div>
                    <span>180</span>
                </div>
            </CardContent>
        </Card>
    )
}
