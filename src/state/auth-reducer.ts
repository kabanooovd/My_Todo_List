import {Dispatch} from "redux";
import {authAPI, LoginData_T} from "../DAL/authAPI";
import {setAppLoaderStatus} from "./app-reducer";
import {handleNetworkError, handleUserErrors} from "../utils/utils";

export type AuthState_T = {
    isLogged: boolean
}

const initState: AuthState_T = {
    isLogged: false
}

export const authReducer = (state: AuthState_T = initState, action: AuthAction_T): AuthState_T => {
    switch (action.type) {
        case 'AUTH/SET-LOGGED-MODE': {
            return {...state, isLogged: action.isLogged}
        }
        default:
            return state
    }
}

export const setLoggedMode = (isLogged: boolean) => {
    return {type: 'AUTH/SET-LOGGED-MODE', isLogged} as const
}

export const login_TC = (data: LoginData_T) => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setLoggedMode(true))
                dispatch(setAppLoaderStatus('succeeded'))
            } else {
                handleUserErrors(res.data, dispatch)
            }
        })
        .catch(err => {
            handleNetworkError(err.message, dispatch)
        })
}

export const logout_TC = () => (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setLoggedMode(false))
                dispatch(setAppLoaderStatus('succeeded'))
            } else {
                handleUserErrors(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkError(error, dispatch)
        })
}


export type AuthAction_T = ReturnType<typeof setLoggedMode>



