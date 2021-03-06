import {Todolist_T, TodoListApi} from "../DAL/tdlApi";
import {Dispatch} from "redux";
import {LoaderStatus_T, setAppLoaderStatus} from "./app-reducer";
import {handleNetworkError, handleUserErrors} from "../utils/utils";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = Todolist_T & {
    filter: FilterValuesType
    entityStatus: LoaderStatus_T
}

const initState: TodoListDomainType[] = []

export type MainActionType      =         removeTDLACType
                                        | addTodoListACType
                                        | editTodoListACType
                                        | changeTodoListACType
                                        | setTodosAC_T
                                        | SwitchTdlEntityStatusAC_T

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
                filter: 'all',
                entityStatus: 'idle',
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
            return action.TDL.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))       // Поместим в initialState то что придет с сервера, добавив ему filter
        }
        case 'TDL/SET-ENTITY-STATUS': {
            return state.map(el => el.id === action.todoListID ? {...el, entityStatus: action.entityStatus} : el)
        }
        default: return state
    }
}

export type SwitchTdlEntityStatusAC_T = ReturnType<typeof switchTdlEntityStatusAC>
export const switchTdlEntityStatusAC = (entityStatus: LoaderStatus_T, todoListID: string) => {
    return {type: 'TDL/SET-ENTITY-STATUS', entityStatus, todoListID} as const
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
    dispatch(setAppLoaderStatus('loading'))
    TodoListApi.updateTodoList(todolistId, title)
        .then(() => {
            dispatch(editTodoListAC(todolistId, title))
            dispatch(setAppLoaderStatus('succeeded'))
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}
export const createNewTDL_TC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    TodoListApi.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppLoaderStatus('succeeded'))
            } else {
                handleUserErrors(res.data, dispatch)
            }

        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}
export const RM_TDL_TC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    dispatch(switchTdlEntityStatusAC('loading', todoListID))
    TodoListApi.deleteTodolist(todoListID)
        .then(() => {
            dispatch(removeTDLAC(todoListID))
            dispatch(setAppLoaderStatus('succeeded'))
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}
export const setTodoListsThunk = (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    TodoListApi.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppLoaderStatus('succeeded'))
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}





