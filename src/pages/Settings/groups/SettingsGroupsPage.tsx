import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import {groupSchema} from "../../../components/data/groups/schema";
import data from "../../../components/data/groups/groups.json";
import {columns} from "../../../components/groups-table/columns";
import React from "react";
import {GroupsTable} from "../../../components/groups-table/data-table";
import {Button} from "../../../registry/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";

function getGroups() {
    return z.array(groupSchema).parse(data)
}
export default function SettingsGroupsPage() {

    const tasks = getGroups()

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Groups</h3>
                    <p className="text-sm text-muted-foreground">
                        Update groups list settings
                    </p>
                </div>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Group
                </Button>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <GroupsTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
