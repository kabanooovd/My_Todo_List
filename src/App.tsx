import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
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

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodoListAC(todolistId, value))
    }
    function removeTodolist(todolistId: string) {
        dispatch(removeTDLAC(todolistId))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    const updateTask = (title: string, id: string, todolistId: string) => {
        dispatch(editTaskTitleAC(todolistId, id, title))
    }
    const updateTodolist = (title: string, id: string, todolistId: string) => {
        dispatch(editTodoListAC(todolistId, title))
    }

    return (

        <div className="App">

            <AddItemForm addTask={addTodolist} />

            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    if (tl.filter === "completed") tasksForTodolist = allTodolistTasks.filter(t => t.isDone);

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
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
