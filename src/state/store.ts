import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todoList-reducer";
import {appReducer} from "./app-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    appData: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store