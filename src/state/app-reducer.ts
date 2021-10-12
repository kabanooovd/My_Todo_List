import { Dispatch } from "redux";
import {authAPI} from "../DAL/authAPI";
import {setLoggedMode} from "./auth-reducer";
import {handleNetworkError, handleUserErrors} from "../utils/utils";


export type LoaderStatus_T = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorMode_T = null | string

export type AppReducer_T = {
    loaderStatus: LoaderStatus_T
    errorMode: ErrorMode_T
    isInitialized: boolean
}

const initState: AppReducer_T = {
    loaderStatus: "idle",
    errorMode: null,
    isInitialized: false,
}
export const appReducer = (state: AppReducer_T = initState, action: CommonAppReducer_T): AppReducer_T => {
    switch (action.type) {
        case 'APP/SET-LOADER-STATUS': {
            return {...state, loaderStatus: action.loaderStatus}
        }
        case 'APP/SET-ERROR-MODE': {
            return {...state, errorMode: action.errorMode}
        }
        case 'APP/INIT-APP': {
            return {...state, isInitialized: action.isInitialized}
        }
        default: return state
    }
}

export const setAppErrorMode = (errorMode: ErrorMode_T) => {
    return {type: 'APP/SET-ERROR-MODE', errorMode} as const
}

export const setAppLoaderStatus = (loaderStatus: LoaderStatus_T) => {
    return {type: 'APP/SET-LOADER-STATUS', loaderStatus} as const
}

export const initApp_AC = (isInitialized: boolean) => {
    return {type: 'APP/INIT-APP', isInitialized} as const
}


export const checkWhoAmI = (dispatch: Dispatch) => {
    dispatch(setAppLoaderStatus('loading'))
    authAPI.whoAmI().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(initApp_AC(true))
            dispatch(setLoggedMode(true))
            dispatch(setAppLoaderStatus('succeeded'))
        } else {
            dispatch(initApp_AC(true))
            handleUserErrors(res.data, dispatch)
        }
    })
        .catch(err => {
            dispatch(initApp_AC(true))
            handleNetworkError(err.message, dispatch)
    })
}



export type CommonAppReducer_T = ReturnType<
        typeof setAppErrorMode
    |   typeof setAppLoaderStatus
    |   typeof initApp_AC
>






