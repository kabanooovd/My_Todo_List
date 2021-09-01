import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

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
    updateTask: (title: string, taskId: string, todolistId: string) => void
    updateTodolist: (title: string, todolistId: string) => void
}

// export function Todolist(props: PropsType) {
export function Todolist({
    todoListID, title, tasks, removeTask, changeFilter, addTask,
    changeTaskStatus, removeTodolist, filter, updateTask, updateTodolist,
}: PropsType) {

    const toRemoveTodolist = () => removeTodolist(todoListID)

    const onAllClickHandler = () => changeFilter("all", todoListID);
    const onActiveClickHandler = () => changeFilter("active", todoListID);
    const onCompletedClickHandler = () => changeFilter("completed", todoListID);

    const someFuncToAddText = (text: string) => {
        addTask(text, todoListID)
    }

    return <div>
        <h3>
            <EditableSpan title={title}
                          updateText={updateTodolist}
                          todolistId={todoListID}
            />
            {/*{title}*/}
            <button onClick={toRemoveTodolist}>x</button>
        </h3>

        <AddItemForm addText={someFuncToAddText} />

        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, todoListID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeTaskStatus(t.id, newIsDoneValue, todoListID);
                    }
                    const updateTaskText = (title: string, todolistId: string) => {
                        updateTask(title, t.id, todolistId)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      updateText={updateTaskText}
                                      todolistId={todoListID}
                        />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


