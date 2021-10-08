

export type LoaderStatus_T = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorMode_T = null | string

export type AppReducer_T = {
    loaderStatus: LoaderStatus_T
    errorMode: ErrorMode_T
}

const initState: AppReducer_T = {
    loaderStatus: "idle",
    errorMode: null,
}
export const appReducer = (state: AppReducer_T = initState, action: CommonAppReducer_T): AppReducer_T => {
    switch (action.type) {
        case 'APP/SET-LOADER-STATUS': {
            return {...state, loaderStatus: action.loaderStatus}
        }
        case 'APP/SET-ERROR-MODE': {
            return {...state, errorMode: action.errorMode}
        }
        default: return state
    }
}

export type SetAppErrorMode_T = ReturnType<typeof setAppErrorMode>
export const setAppErrorMode = (errorMode: ErrorMode_T) => {
    return {type: 'APP/SET-ERROR-MODE', errorMode} as const
}

export type SetAppLoaderStatus_T = ReturnType<typeof setAppLoaderStatus>
export const setAppLoaderStatus = (loaderStatus: LoaderStatus_T) => {
    return {type: 'APP/SET-LOADER-STATUS', loaderStatus} as const
}


export type CommonAppReducer_T = SetAppLoaderStatus_T | SetAppErrorMode_T






