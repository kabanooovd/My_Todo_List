import React, {useCallback, useEffect} from "react";
import st from './TodolistsCollection.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTask_TC, editTaskTitle_TC, removeTask_TC, TasksStateType} from "../../state/tasks-reducer";
import {
    changeTodoListAC,
    createNewTDL_TC,
    RM_TDL_TC,
    setTodoListsThunk,
    TodoListDomainType, updateTodolistTitle_TC
} from "../../state/todoList-reducer";
import {FilterValuesType} from "../../App";
import {Todolist} from "../TodoList/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import { Redirect } from "react-router-dom";


export const TodoListsCollection = React.memo(() => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)

    useEffect(() => {
        if (!isLogged) {
            return
        }
        dispatch(setTodoListsThunk)
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTask_TC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTask_TC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RM_TDL_TC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createNewTDL_TC(title))
    }, [dispatch])

    const updateTask = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(editTaskTitle_TC(todolistId, taskId, title))
    }, [dispatch])

    const updateTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(updateTodolistTitle_TC(todolistId, title))
    }, [dispatch])

    if (!isLogged) {
        return <Redirect to={'/login'} />
    }

    return (
        <div>
            <div>
                <AddItemForm addText={addTodolist}/>
            </div>
            <div className='tdlWrapper'>
                {
                    todoLists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") tasksForTodolist = allTodolistTasks.filter(t => !t.status);
                        if (tl.filter === "completed") tasksForTodolist = allTodolistTasks.filter(t => t.status);

                        return <Todolist
                            key={tl.id}
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                            entityStatus={tl.entityStatus}
                        />
                    })
                }
            </div>
        </div>
    )
})


