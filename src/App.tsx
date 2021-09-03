import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/TodoList/Todolist';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {addTodoListAC, changeTodoListAC, editTodoListAC, removeTDLAC} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists)

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTDLAC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const updateTask = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(editTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    const updateTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(editTodoListAC(todolistId, title))
    }, [dispatch])

    return (

        <div className="App">

            <AddItemForm addText={addTodolist} />

            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    if (tl.filter === "completed") tasksForTodolist = allTodolistTasks.filter(t => t.isDone);

                    return <Todolist
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
