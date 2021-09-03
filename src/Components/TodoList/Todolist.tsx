import React, {useCallback} from 'react';
import Styles from './Todolist.module.css'
import {FilterValuesType} from '../../App';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SingleTask} from "../SingleTask/SingleTask";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodolist: (title: string, todolistId: string) => void
    updateTask: (title: string, taskId: string, todolistId: string) => void

}

export const Todolist = React.memo(function ({
    todoListID, title, tasks, removeTask, changeFilter, addTask,
    changeTaskStatus, removeTodolist, filter, updateTask, updateTodolist,
}: PropsType) {

    const toRemoveTodolist = useCallback(() => removeTodolist(todoListID), [removeTodolist, todoListID])

    const onAllClickHandler = useCallback( () => changeFilter("all", todoListID), [changeFilter, todoListID])
    const onActiveClickHandler = useCallback( () => changeFilter("active", todoListID), [changeFilter, todoListID])
    const onCompletedClickHandler = useCallback( () => changeFilter("completed", todoListID), [changeFilter, todoListID])

    const addTaskTextHandler = useCallback((text: string) => {
        addTask(text, todoListID)
    }, [addTask, todoListID])

    return <div className={Styles.MainTDLContainer}>
        <h3>
            <EditableSpan incomingTitle={title}
                          updateText={updateTodolist}
                          todolistId={todoListID}
            />

            <button onClick={toRemoveTodolist}>x</button>
        </h3>

        <AddItemForm addText={addTaskTextHandler} />

        <div>
            {
                tasks.map(t => <SingleTask key={t.id}
                                       taskID={t.id}
                                       todoListID={todoListID}
                                       removeTask={removeTask}
                                       updateTask={updateTask}
                                       title={t.title}
                                       isDone={t.isDone}
                                       changeTaskStatus={changeTaskStatus}
                    />
                )
            }
        </div>
        <div className={Styles.activityTasksContainer}>
            <button className={filter === 'all' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? `${Styles.active_filter}` : `${Styles.none_active_filter}`}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})


