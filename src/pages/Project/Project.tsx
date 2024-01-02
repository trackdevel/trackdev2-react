"use client"

import React, {useEffect} from "react";
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

    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState<Array<any>>([])

    const { projectId } = useParams();

    function toogleState() { setState(!state) }


    useEffect(() => {
        Api.get(`/projects/${projectId}/tasks`).then((res) => {
            setTasks(z.array(taskSchema).parse(res.tasks))
        }).catch((err) => {
            navigate('/auth/login');
        })
    }, [])


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
