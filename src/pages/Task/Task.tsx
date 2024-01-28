import React from "react";
import {useParams} from "react-router-dom";
import TaskMainLayout from "../../components/Task/TaskMainLayout";


const Task = () => {

    const { taskId } = useParams();
    const { projectId } = useParams();
    const {  tabName  }  = useParams();

    return (
        <div>
            <TaskMainLayout taskId={taskId} projectId={projectId} tabName={(tabName && (tabName == 'information' || tabName == 'history' || tabName == 'comments' || tabName == 'subtasks')) ? tabName : 'information'}/>
        </div>
    )
}

export default Task;
