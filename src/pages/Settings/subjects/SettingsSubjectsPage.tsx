import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import {subjectSchema} from "../../../components/data/subjects/schema";
import data from "../../../components/data/subjects/subject.json";
import {columns} from "../../../components/subjects-table/columns";
import React from "react";
import {SubjectsTable} from "../../../components/subjects-table/data-table";
import {Button} from "../../../registry/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";

function getSubjects() {
    return z.array(subjectSchema).parse(data)
}
export default function SettingsSubjectsPage() {

    const tasks = getSubjects()

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Subjects</h3>
                    <p className="text-sm text-muted-foreground">
                        Update subjects list settings
                    </p>
                </div>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Subject
                </Button>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <SubjectsTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
