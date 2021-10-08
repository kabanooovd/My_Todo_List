import React, {useCallback, useEffect} from 'react';
import Styles from './Todolist.module.css'
import {FilterValuesType} from '../../App';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SingleTask} from "../SingleTask/SingleTask";
import {useDispatch} from "react-redux";
import {setTasksTC, TaskDomain_T} from "../../state/tasks-reducer";
import {DeleteOutlined} from "@ant-design/icons";
import {LoaderStatus_T} from "../../state/app-reducer";

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskDomain_T>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodolist: (title: string, todolistId: string) => void
    updateTask: (title: string, taskId: string, todolistId: string) => void
    entityStatus: LoaderStatus_T
}

export const Todolist = React.memo(function ({
todoListID, title, tasks, removeTask, changeFilter, addTask, removeTodolist, filter, updateTask, updateTodolist, entityStatus,
}: PropsType) {

    const dispatch = useDispatch()

    const toRemoveTodolist = useCallback(() => removeTodolist(todoListID), [removeTodolist, todoListID])

    const onAllClickHandler = useCallback(() => changeFilter("all", todoListID), [changeFilter, todoListID])
    const onActiveClickHandler = useCallback(() => changeFilter("active", todoListID), [changeFilter, todoListID])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", todoListID), [changeFilter, todoListID])

    useEffect( () => {
        dispatch(setTasksTC(todoListID))
    }, [dispatch] )

    const addTaskTextHandler = useCallback((text: string) => {
        addTask(text, todoListID)
    }, [addTask, todoListID])

    return <div className={Styles.MainTDLContainer}>
        <h2 className={Styles.todolistHeaderStyle}>
            <EditableSpan incomingTitle={title}
                          updateText={updateTodolist}
                          todolistId={todoListID}
            />

            <button onClick={toRemoveTodolist}
                    disabled={entityStatus === 'loading'}
                    className={Styles.rmIconStyle}
            >
                <DeleteOutlined />
            </button>
        </h2>

        <AddItemForm addText={addTaskTextHandler}/>

        <div className={Styles.TDL_content}>
            <div>
                {
                    tasks.map(t => <SingleTask key={t.id}
                                               taskID={t.id}
                                               todoListID={todoListID}
                                               removeTask={removeTask}
                                               updateTask={updateTask}
                                               title={t.title}
                                               status={t.status}
                                               entityStatus={t.entityStatus}
                        />
                    )
                }
            </div>

            <div className={Styles.activityTasksContainer}>
                <div className={filter === 'all' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                     onClick={onAllClickHandler}>All
                </div>
                <div className={filter === 'active' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                     onClick={onActiveClickHandler}>Active
                </div>
                <div className={filter === 'completed' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                     onClick={onCompletedClickHandler}>Completed
                </div>
            </div>
        </div>
    </div>
})


