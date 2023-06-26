import React from "react";
import {useParams} from "react-router-dom";

const Task = () => {

    const { taskId } = useParams();

    console.log(taskId)

    return (
        <div>
            <h1>Task {taskId}</h1>
        </div>
    )

}

export default Task;
