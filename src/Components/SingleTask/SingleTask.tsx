import React, {ChangeEvent} from "react";
import Styles from './SingleTask.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {changeTaskStatus_TC} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {StatusVariation} from "../../DAL/tasksApi";
import {DeleteOutlined} from "@ant-design/icons";
import {LoaderStatus_T} from "../../state/app-reducer";

export const SingleTask = React.memo((props: {
    taskID: string
    todoListID: string
    removeTask: (taskId: string, todolistId: string) => void
    updateTask: (title: string, taskId: string, todolistId: string) => void
    title: string
    status: number
    entityStatus: LoaderStatus_T
}) => {

                                        const {
                                            taskID,
                                            todoListID,
                                            removeTask,
                                            updateTask,
                                            title,
                                            status,
                                            entityStatus,
                                        } = props

    const onClickHandler = () => removeTask(taskID, todoListID)
    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let statusVal = StatusVariation.New
        if (newIsDoneValue) statusVal = StatusVariation.Completed
        dispatch(changeTaskStatus_TC(todoListID, taskID, statusVal))
    }
    const updateTaskText = (title: string, todolistId: string) => updateTask(title, taskID, todolistId)

    return (
        <div  className={Styles.eachSingleTaskStyle}>
            <div>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={status === StatusVariation.Completed}
                       disabled={entityStatus === 'loading'}
                />

                <EditableSpan incomingTitle={title}
                              updateText={updateTaskText}
                              todolistId={todoListID}
                />
            </div>
            <button onClick={onClickHandler}
                    className={Styles.rmIconStyle}
                    disabled={entityStatus === 'loading'}>
                    <DeleteOutlined />
            </button>
        </div>
    )
})



