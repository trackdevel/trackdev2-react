"use client"

import React, {useEffect} from "react";
import {z} from "zod"

import {columns} from "../../components/tasks-table/columns"
import {DataTable} from "../../components/tasks-table/data-table"
import {taskSchema} from "../../components/data/taskTable/schema";
import data from "../../components/data/taskTable/tasks.json";
import Api from "../../utils/Api";
import {useNavigate, useParams} from "react-router-dom";


const Project = () => {
    //const tasks_demo = getTasks()
    const [state, setState] = React.useState<boolean>(false)

    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState<Array<any>>([])

    const { projectId } = useParams();
    const [ name, setName ] = React.useState<string>('')

    function toogleState() { setState(!state) }


    useEffect(() => {
        Api.get(`/projects/${projectId}/tasks`).then((res) => {
            for (let i = 0; i < res.tasks.length; i++) {
                res.tasks[i].projectId = res.projectId
            }
            setTasks(z.array(taskSchema).parse(res.tasks))
        }).catch((err) => {
            navigate('/auth/login');
        })
    }, [])

    useEffect(() => {
        Api.get('/projects/' + projectId).then((res) => {
            setName(res.name)
        }).catch((err) => {})
    }, [])


    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {name}
                        </h2>
                        {/*<p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>*/}
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )

}

export default Project;
