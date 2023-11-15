import React from "react";
import {useParams} from "react-router-dom";
import TaskMainLayout from "../../components/Task/TaskMainLayout";



const Task = () => {

    const { taskId } = useParams();

    return (
        <div>
            <TaskMainLayout taskId={taskId}/>
        </div>
    )
}

export default Task;
