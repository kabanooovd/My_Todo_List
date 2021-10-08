import axios from "axios";
import {CommonResponse_T} from "./tdlApi";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7121752a-cd45-46e5-a73c-32630b1d9cc6'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    ...settings
})

export const TasksApi = {
    getTasks(todolistId: string) {
        return instance.get<CommonTasksType<SingleTask_T[]>>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponse_T<{item: SingleTask_T}>>(`${todolistId}/tasks`, {title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponse_T<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, TaskPayload: TaskPayload_T) {
        return instance.put<CommonResponse_T<{item: SingleTask_T}>>(`${todolistId}/tasks/${taskId}`, TaskPayload)
    },
}

export type TaskPayload_T = {
    title: string;
    description: string;
    status: StatusVariation;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}


export enum StatusVariation {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


export type SingleTask_T = {
    description: string
    title: string
    status: StatusVariation
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type CommonTasksType<T> = {
    items: T
    totalCount: number
    error: string
}









