import React from "react";
import {useParams} from "react-router-dom";
import TaskMainLayout from "../../components/Task/TaskMainLayout";


const Task = () => {

    const { taskId } = useParams();
    const { projectId } = useParams();

    return (
        <div>
            <TaskMainLayout taskId={taskId} projectId={projectId}/>
        </div>
    )
}

export default Task;
