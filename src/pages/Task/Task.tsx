import React from "react";
import {useParams} from "react-router-dom";
import TaskMainLayout from "../../components/Task/TaskMainLayout";



const Task = () => {

    const { taskId } = useParams();

    console.log(taskId)

    return (
        <div>
            <TaskMainLayout />
        </div>
    )

}

export default Task;
