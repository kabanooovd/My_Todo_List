import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Components/TodoList/Todolist';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    changeTodoListAC,
    createNewTDL_TC,
    RM_TDL_TC,
    setTodoListsThunk,
    TodoListDomainType,
    updateTodolistTitle_TC
} from "./state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)

    useEffect( () => {
        dispatch(setTodoListsThunk)
    }, [dispatch] )

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: number, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, status))
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
        dispatch(editTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    const updateTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(updateTodolistTitle_TC(todolistId, title))
    }, [dispatch])

    return (

        <div className="App">

            <AddItemForm addText={addTodolist} />

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
