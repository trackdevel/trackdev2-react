"use client"

import React, {useEffect} from "react";
import {columns} from "../../components/sprints-table/columns";
import {useNavigate, useParams} from "react-router-dom";
import Api from "../../utils/Api";
import {z} from "zod";
import {taskSchema} from "../../components/data/taskTable/schema";
import {SprintsTable} from "../../components/sprints-table/data-table";


const Sprints = () => {

    const [state, setState] = React.useState<boolean>(false)

    const navigate = useNavigate();
    const [sprints, setSprints] = React.useState<Array<any>>([])

    const { projectId } = useParams();
    const [ name, setName ] = React.useState<string>('')



    useEffect(() => {
        Api.get(`/projects/${projectId}/sprints`).then((res) => {
            setSprints(z.array(taskSchema).parse(res))
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
                <SprintsTable data={sprints} columns={columns} />
            </div>
        </>
    )

}

export default Sprints;
