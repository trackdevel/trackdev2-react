"use client"

import React from "react";
import { z } from "zod"

import { columns } from "../../components/tasks-table/columns"
import { DataTable } from "../../components/tasks-table/data-table"
import {taskSchema} from "../../components/data/taskTable/schema";
import {readFile} from "fs";
import data from "../../components/data/taskTable/tasks.json";
import Api from "../../utils/Api";
import {userSchema} from "../../components/data/users/schema";
import {useParams} from "react-router-dom";

// Simulate a database read for tasks.
function getTasks() {
    return z.array(taskSchema).parse(data)
}

const Project = () => {
    //const tasks_demo = getTasks()

    const [tasks, setTasks] = React.useState<Array<any>>([])
    const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)

    const { projectId } = useParams();

    if(tasks.length === 0 && !istasksloaded) {
        getTasks()
    }
    else {
        console.log('tasks',tasks)
    }

    async function getTasks() {
        setIsTasksLoaded(true)
        Api.get(`/projects/${projectId}/tasks`).then((res) => {
            console.log('res',res)
            console.log('parsed res',z.array(taskSchema).parse(res))
            setTasks(z.array(taskSchema).parse(res))
        }).catch((err) => {})
        return;
    }

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )

}

export default Project;
