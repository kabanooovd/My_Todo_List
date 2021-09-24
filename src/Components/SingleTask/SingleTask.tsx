import React, {ChangeEvent} from "react";
import Styles from './SingleTask.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";

export const SingleTask = React.memo((props: {
    taskID: string
    todoListID: string
    removeTask: (taskId: string, todolistId: string) => void
    updateTask: (title: string, taskId: string, todolistId: string) => void
    title: string
    status: number
    changeTaskStatus: (id: string, status: number, todolistId: string) => void
}) => {

    const {
                    taskID,
                    todoListID,
                    removeTask,
                    changeTaskStatus,
                    updateTask,
                    title,
                    status,
    } = props

    const onClickHandler = () => removeTask(taskID, todoListID)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let statusVal = 0

        if (newIsDoneValue) {
            statusVal = 2
        }

        changeTaskStatus(taskID, statusVal, todoListID);
    }
    const updateTaskText = (title: string, todolistId: string) => {
        updateTask(title, taskID, todolistId)
    }

    return(
        <div>
            <input type="checkbox" onChange={onChangeHandler}
                   checked={status !== 0}
                   className={Styles.tasksBlock}
            />

            <EditableSpan incomingTitle={title}
                          updateText={updateTaskText}
                          todolistId={todoListID}
            />

            <button onClick={onClickHandler}>x</button>
        </div>
    )
})



