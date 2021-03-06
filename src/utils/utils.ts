import {CommonResponse_T} from "../DAL/tdlApi";
import {Dispatch} from "redux";
import {setAppErrorMode, setAppLoaderStatus} from "../state/app-reducer";


export const handleUserErrors = <T>(data: CommonResponse_T<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorMode(data.messages[0]))
        dispatch(setAppLoaderStatus('failed'))
    } else {
        dispatch(setAppErrorMode('Some error has occurred...'))
        dispatch(setAppLoaderStatus('failed'))
    }
}


export const handleNetworkError = (message: string, dispatch: Dispatch) => {
    if (message !== '') {
        dispatch(setAppErrorMode(message))
    } else {
        dispatch(setAppErrorMode('Check your net-work please...'))
    }
    dispatch(setAppLoaderStatus('failed'))
}



