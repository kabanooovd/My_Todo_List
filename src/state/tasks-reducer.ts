import {TaskType} from "../Components/TodoList/Todolist";
import {addTodoListACType, removeTDLACType} from "./todoList-reducer";
import {v1} from "uuid";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type GeneralActionType = addTodoListACType
                            | addTaskACType
                            | removeTaskACType
                            | removeTDLACType
                            | editTaskTitleACType
                            | changeTaskStatusACType

const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: GeneralActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case 'ADD-TASK': {
            const newTask = {id: action.newTaskID, title: action.taskTitle, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
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
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskID ? {...el, title: action.taskTitle} : el)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskID ? {...el, isDone: action.taskStatus} : el)}
        }
        default: return state
    }
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskID: string, taskStatus: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todoListID, taskID, taskStatus} as const
}

type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>
export const editTaskTitleAC = (todoListID: string, taskID: string, taskTitle: string) => {
    return {type: 'EDIT-TASK', todoListID, taskID, taskTitle} as const
}

type addTaskACType = {type: 'ADD-TASK', taskTitle: string, todoListID: string, newTaskID: string}
export const addTaskAC = (taskTitle: string, todoListID: string): addTaskACType => {
    return {type: 'ADD-TASK', taskTitle, todoListID, newTaskID: v1()}
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todoListID, taskID} as const
}




