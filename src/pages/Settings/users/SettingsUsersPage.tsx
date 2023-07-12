import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import {userSchema} from "../../../components/data/users/schema";
import data from "../../../components/data/users/users.json";
import {columns} from "../../../components/users-table/columns";
import React from "react";
import {UsersTable} from "../../../components/users-table/data-table";
import {Button} from "../../../registry/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";

function getUsers() {
    return z.array(userSchema).parse(data)
}
export default function SettingsUsersPage() {

    const tasks = getUsers()

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Users</h3>
                    <p className="text-sm text-muted-foreground">
                        Update users list settings
                    </p>
                </div>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <UsersTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
