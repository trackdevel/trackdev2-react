import { Separator } from "../../../registry/ui/separator"
import {z} from "zod";
import data from "../../../components/data/courses/course.json";
import {columns} from "../../../components/courses-table/columns";
import React from "react";
import {courseSchema} from "../../../components/data/courses/schema";
import {CrousesTable} from "../../../components/courses-table/data-table";
import { Button } from "../../../registry/ui/button"
import {PlusCircledIcon} from "@radix-ui/react-icons";

function getCourses() {
    return z.array(courseSchema).parse(data)
}
export default function SettingsCoursesPage() {

    const tasks = getCourses()

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Courses</h3>
                    <p className="text-sm text-muted-foreground">
                        Update courses list settings
                    </p>
                </div>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Course
                </Button>
            </div>
            <Separator />
            <div className="hidden h-full flex-1 flex-col md:flex">
                <CrousesTable data={tasks} columns={columns}/>
            </div>
        </div>
    )
}
