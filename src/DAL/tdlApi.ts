import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7121752a-cd45-46e5-a73c-32630b1d9cc6'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const TodoListApi = {
    getTodos() {
        return instance.get<Todolist_T[]>(`/todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<CommonResponse_T<{item: Todolist_T}>>(`/todo-lists/`, {title})
    },
    deleteTodolist(todoListID: string) {
        return instance.delete<CommonResponse_T<{}>>(`/todo-lists/${todoListID}`)
    },
    updateTodoList(todoListID: string, title: string) {
        return instance.put<CommonResponse_T<{}>>(`/todo-lists/${todoListID}`, {title})
    }
}

export type Todolist_T = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CommonResponse_T<T> = {
    messages: string[]
    resultCode: number
    data: T
}







