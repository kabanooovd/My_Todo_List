import {addTodoListACType, removeTDLACType, setTodosAC_T} from "./todoList-reducer";
import {v1} from "uuid";
import {SingleTask_T} from "../DAL/tasksApi";


export type TasksStateType = {
    [key: string]: Array<SingleTask_T>
}

export type GeneralActionType = addTodoListACType
                            | addTaskACType
                            | removeTaskACType
                            | removeTDLACType
                            | editTaskTitleACType
                            | changeTaskStatusACType
                            | setTodosAC_T
                            | setTasksAC_T

const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: GeneralActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case 'ADD-TASK': {
            const newTask = {
                id: action.newTaskID,
                title: action.taskTitle,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
            }

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
            return {...state, [action.todoListID]: state[action.todoListID].map(el => el.id === action.taskID ? {...el, status: action.taskStatus} : el)}
        }
        case 'SET-TODOS': {
            let copyState = {...state}      // Создаем копию массива, с которой будем работать
            action.TDL.forEach(el => {      // Обращаемся к каждому элементу масства (тудуЛисту)
                copyState[el.id] = []       // Присваиваем путой массив каждому свойству
            })
            return copyState                // Вернем копию в обработанном виде
        }
        case 'SET-TASKS': {
            let copyState = {...state}                      // Создаем копию исходного состояния для дальнейшей обработке
            copyState[action.todoListID] = action.tasks     // Каждому из свойств пришедших TDL, переприсваиваем соответствующие таски
            return copyState                                // Вернем обработанную копию
        }
        default: return state
    }
}

type setTasksAC_T = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: SingleTask_T[], todoListID: string) => {
    return {type: 'SET-TASKS', tasks, todoListID} as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskID: string, taskStatus: number) => {
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




