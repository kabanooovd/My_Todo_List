import {Todolist_T, TodoListApi} from "../DAL/tdlApi";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = Todolist_T & { filter: FilterValuesType }

const initState: TodoListDomainType[] = []

export type MainActionType      =         removeTDLACType
                                        | addTodoListACType
                                        | editTodoListACType
                                        | changeTodoListACType
                                        | setTodosAC_T

export const todoListReducer = (state: TodoListDomainType[] = initState, action: MainActionType): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state.filter(el => el.id !== action.todolistId)]
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListDomainType = {
                id: action.TDL.id,
                title: action.TDL.title,
                addedDate: action.TDL.addedDate,
                order: action.TDL.order,
                filter: 'all'
            }
            return [newTodoList, ...state]
        }
        case 'EDIT-TODOLIST': {
            return [...state.map(el => el.id === action.todoListID? {...el, title: action.newTitle} : el)]
        }
        case 'CHANGE-TDL-FILTRATION': {
            return [...state.map(el => el.id === action.todoListID? {...el, filter: action.filtration} : el)]
        }
        case 'SET-TODOS': {
            return action.TDL.map(el => ({...el, filter: 'all'}))       // Поместим в initialState то что придет с сервера, добавив ему filter
        }
        default: return state
    }
}

export type setTodosAC_T = ReturnType<typeof setTodosAC>
export const setTodosAC = (TDL: Todolist_T[]) => {
    return {type: 'SET-TODOS', TDL} as const
}

export type removeTDLACType = ReturnType<typeof removeTDLAC>
export const removeTDLAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (TDL: Todolist_T) => {
    return {type: 'ADD-TODOLIST', TDL} as const
}

type editTodoListACType = ReturnType<typeof editTodoListAC>
export const editTodoListAC = (todoListID: string, newTitle: string) => {
    return {type: 'EDIT-TODOLIST', newTitle, todoListID} as const
}

type changeTodoListACType = ReturnType<typeof changeTodoListAC>
export const changeTodoListAC = (todoListID: string, filtration: FilterValuesType) => {
    return {type: 'CHANGE-TDL-FILTRATION', todoListID, filtration} as const
}



export const updateTodolistTitle_TC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TodoListApi.updateTodoList(todolistId, title)
        .then(() => {
            dispatch(editTodoListAC(todolistId, title))
        })
}
export const createNewTDL_TC = (title: string) => (dispatch: Dispatch) => {
    TodoListApi.createTodoList(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const RM_TDL_TC = (todoListID: string) => (dispatch: Dispatch) => {
    TodoListApi.deleteTodolist(todoListID)
        .then(() => {
            dispatch(removeTDLAC(todoListID))
        })
}
export const setTodoListsThunk = (dispatch: Dispatch) => {
    TodoListApi.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}





