"use client"

import React, {useEffect} from "react";
import {z} from "zod"

import ReactDOM from "react-dom/client";
import {columns} from "../../components/tasks-table/columns"
import {DataTable} from "../../components/tasks-table/data-table"
import {taskSchema} from "../../components/data/taskTable/schema";
import Api from "../../utils/Api";
import {useNavigate, useParams} from "react-router-dom";
import {createContext, useContext } from "react";
import NewTasksTable from "../../components/new-tasks-table/new-tasks-table";

export const ProjectContext = createContext({});

const Project = () => {
    //const tasks_demo = getTasks()
    const [state, setState] = React.useState<boolean>(false)

    const navigate = useNavigate();
    const [tasks, setTasks] = React.useState<Array<any>>([])

    const { projectId } = useParams();
    const [ projectid, setProjectId ] = React.useState<string | undefined>(projectId)
    const [ name, setName ] = React.useState<string>('')

    const [reload, setReload] = React.useState<boolean>(false)


    function projectChange(projectId: any) {
        setProjectId(projectId)
    }

    useEffect(() => {
        Api.get(`/projects/${projectid}/tasks`).then((res) => {
            for (let i = 0; i < res.tasks.length; i++) {
                res.tasks[i].projectId = res.projectId
            }
            setTasks(z.array(taskSchema).parse(res.tasks))
        }).catch((err) => {
            navigate('/auth/login');
        })
    }, [projectid])

    useEffect(() => {
        Api.get('/projects/' + projectid).then((res) => {
            setName(res.name)
        }).catch((err) => {})
    }, [projectid])


    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            {name}
                        </h2>
                    </div>
                </div>
                <ProjectContext.Provider value={projectChange}>
                    <DataTable data={tasks} columns={columns} />
                </ProjectContext.Provider>
            </div>
        </>
    )

}

export default Project;
