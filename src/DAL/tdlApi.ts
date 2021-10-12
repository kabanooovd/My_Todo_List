import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5c9db236-bce8-43d4-9dbe-11cf80cb43d0'
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







