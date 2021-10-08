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
import {addTask_TC, editTaskTitle_TC, removeTask_TC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {SuperHeader} from "./Components/SuperHeader/SuperHeader";
import {SuperLoader} from "./Components/SuperLoader/SuperLoader";
import {AppReducer_T} from "./state/app-reducer";
import {ErrorHandler} from "./Components/ErrorHandler/ErrorHandler";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)
    const appData = useSelector<AppRootStateType, AppReducer_T>(state => state.appData)

    useEffect(() => {
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

    return (
        <div>
            <SuperHeader/>
            <div className={'loaderWrapper'}>
                {appData.loaderStatus === 'loading' && <SuperLoader/>}
                {appData.errorMode !== null && <ErrorHandler/>}
            </div>
            <div className="App">
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
        </div>
    );
}

export default App;
