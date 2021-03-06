import {addTodoListACType, removeTDLACType, setTodosAC_T} from "./todoList-reducer";
import {SingleTask_T, TaskPayload_T, TasksApi} from "../DAL/tasksApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {LoaderStatus_T, setAppErrorMode, setAppLoaderStatus} from "./app-reducer";
import {handleNetworkError, handleUserErrors} from "../utils/utils";

export type TaskDomain_T = SingleTask_T & {
    entityStatus: LoaderStatus_T
}


export type TasksStateType = {
    [key: string]: Array<TaskDomain_T>
}

export type GeneralActionType    =    addTodoListACType
                                    | addTaskACType
                                    | removeTaskACType
                                    | removeTDLACType
                                    | editTaskTitleACType
                                    | changeTaskStatusACType
                                    | setTodosAC_T
                                    | setTasksAC_T
                                    | SwitchTaskEntityStatusAC_T

const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: GeneralActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.TDL.id]: []}
        }
        case 'ADD-TASK': {
            const newTask = {
                id: action.task.id,
                title: action.task.title,
                description: action.task.description,
                status: action.task.status,
                priority: action.task.priority,
                startDate: action.task.startDate,
                deadline: action.task.deadline,
                todoListId: action.task.todoListId,
                order: action.task.order,
                addedDate: action.task.addedDate,
                entityStatus: 'idle',
            }
            return {
                ...state,
                [action.task.todoListId]: [newTask, ...state[action.task.todoListId]]
                    .map(el => ({...el, entityStatus: 'idle'}))
            }
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.todolistId]
            return newState
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.taskID)}
        }
        case 'EDIT-TASK': {
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId]
                    .map(el => el.id === action.task.id
                        ? {...el, title: action.task.title}
                        : el)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId]
                    .map(el => el.id === action.task.id
                        ? {...el, status: action.task.status}
                        : el)
            }
        }
        case 'SET-TODOS': {
            let copyState = {...state}      // ?????????????? ?????????? ??????????????, ?? ?????????????? ?????????? ????????????????
            action.TDL.forEach(el => {      // ???????????????????? ?? ?????????????? ???????????????? ?????????????? (??????????????????)
                copyState[el.id] = []       // ?????????????????????? ?????????? ???????????? ?????????????? ????????????????
            })
            return copyState                // ???????????? ?????????? ?? ???????????????????????? ????????
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todoListID] = action.tasks
                .map(el => ({...el, entityStatus: 'idle'}))
            return copyState
        }
        case 'TASKS/SWITCH-ENTITY-STATUS': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(el => el.id === action.taskID ? {...el, entityStatus: action.entityStatus} : el)
            }
        }

        default: return state
    }
}

type SwitchTaskEntityStatusAC_T = ReturnType<typeof switchTaskEntityStatusAC>
export const switchTaskEntityStatusAC = (entityStatus: LoaderStatus_T, todoListID: string, taskID: string) => {
    return {type: 'TASKS/SWITCH-ENTITY-STATUS', entityStatus, todoListID, taskID} as const
}

type setTasksAC_T = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: SingleTask_T[], todoListID: string) => {
    return {type: 'SET-TASKS', tasks, todoListID} as const
}

type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>
export const editTaskTitleAC = (task: SingleTask_T) => {
    return {type: 'EDIT-TASK', task} as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: SingleTask_T) => {
    return {type: 'ADD-TASK', task} as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todoListID, taskID} as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (task: SingleTask_T) => {
    return {type: 'CHANGE-TASK-STATUS', task} as const
}



export const changeTaskStatus_TC = (todolistId: string, taskId: string, status: number) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const foundTask = getState().tasks[todolistId].find(el => el.id === taskId)

        if (!foundTask) {
            console.warn('TASK DOES NOT EXIST IN CURRENT TODO-LIST')
            return
        }

        let TaskPayload: TaskPayload_T = {...foundTask, status}
        dispatch(setAppLoaderStatus('loading'))
        TasksApi.updateTask(todolistId, taskId, TaskPayload)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(res.data.data.item))
                    dispatch(setAppLoaderStatus('succeeded'))
                } else {
                    handleUserErrors(res.data, dispatch)
                }
            })
            .catch(err => {
                handleNetworkError(err.message, dispatch)
            })
}
export const editTaskTitle_TC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const currentState = getState()
        const allTasks = currentState.tasks
        const currentTasks = allTasks[todolistId]
        const chosenTask = currentTasks.find(el => el.id === taskId)
        // console.log(chosenTask)

        if (chosenTask) {
            let TaskPayload: TaskPayload_T = {...chosenTask, title: title}
            dispatch(setAppLoaderStatus('loading'))
            TasksApi.updateTask(todolistId, taskId, TaskPayload)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(editTaskTitleAC(res.data.data.item))
                        dispatch(setAppLoaderStatus('succeeded'))
                    } else {
                        handleUserErrors(res.data, dispatch)
                    }

                })
                .catch(err => {
                    handleNetworkError(err.message, dispatch)
                })
        }
    }
export const addTask_TC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    TasksApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppLoaderStatus('succeeded'))
            } else {
                handleUserErrors(res.data, dispatch)
            }
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}
export const removeTask_TC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    dispatch(switchTaskEntityStatusAC('loading', todolistId, taskId))
    TasksApi.removeTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setAppLoaderStatus('succeeded'))
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}
export const setTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    TasksApi.getTasks(todoListID)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todoListID))
            dispatch(setAppLoaderStatus('succeeded'))
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}




