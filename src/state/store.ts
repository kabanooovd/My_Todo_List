import {combineReducers, createStore } from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todoList-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store