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
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../../registry/ui/dialog";
import {Button} from "../../registry/ui/button";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Input} from "../../registry/ui/input";
import {Icons} from "../../registry/ui/icons";

// Simulate a database read for tasks.
function getTasks() {
    return z.array(taskSchema).parse(data)
}

const Project = () => {
    //const tasks_demo = getTasks()
    const [state, setState] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string>('')
    const [acronym, setAcronym] = React.useState<string>('')

    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState<Array<any>>([])
    const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)

    const { projectId } = useParams();

    function toogleState() { setState(!state) }

    if(tasks.length === 0 && !istasksloaded) {
        getTasks()
    }

    async function getTasks() {
        setIsTasksLoaded(true)
        Api.get(`/projects/${projectId}/tasks`).then((res) => {
            setTasks(z.array(taskSchema).parse(res))
        }).catch((err) => {
            console.log(err)
            navigate('/');
        })
        return;
    }


    async function onCreate(event: React.SyntheticEvent) {
        console.log("onCreate")
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
