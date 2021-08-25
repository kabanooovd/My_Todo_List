import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

export type StateType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initState: StateType[] = []

export type MainActionType = removeTDLACType | addTodoListACType | editTodoListACType | changeTodoListACType

export const todoListReducer = (state: StateType[] = initState, action: MainActionType): StateType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state.filter(el => el.id !== action.todolistId)]
        }
        case 'ADD-TODOLIST': {
            const newTodoList: StateType = {id: action.todolistID, title: action.todolistTitle, filter: 'all'}
            return [newTodoList, ...state]
        }
        case 'EDIT-TODOLIST': {
            return [...state.map(el => el.id === action.todoListID? {...el, title: action.newTitle} : el)]
        }
        case 'CHANGE-TDL-FILTRATION': {
            return [...state.map(el => el.id === action.todoListID? {...el, filter: action.filtration} : el)]
        }
        default: return state
    }
}

export type removeTDLACType = ReturnType<typeof removeTDLAC>
export const removeTDLAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', todolistTitle: title, todolistID: v1()} as const
}
type editTodoListACType = ReturnType<typeof editTodoListAC>
export const editTodoListAC = (todoListID: string, newTitle: string) => {
    return {type: 'EDIT-TODOLIST', newTitle, todoListID} as const
}

type changeTodoListACType = ReturnType<typeof changeTodoListAC>
export const changeTodoListAC = (todoListID: string, filtration: FilterValuesType) => {
    return {type: 'CHANGE-TDL-FILTRATION', todoListID, filtration} as const
}



