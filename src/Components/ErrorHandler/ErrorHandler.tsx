import React from 'react';
import { Alert } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import { setAppErrorMode } from '../../state/app-reducer';


export const ErrorHandler = () => {

    const dispatch = useDispatch()
    const errorMode = useSelector<AppRootStateType, null | string>(state => state.appData.errorMode)

    const onClose = (e: React.MouseEvent<HTMLButtonElement | undefined>) => {
        console.log(e, 'I was closed.');
    };

    let x = setTimeout( () => {
        dispatch(setAppErrorMode(null))
        clearTimeout(x)
    }, 6000 )


    return (
        <>
            <Alert
                message="Error Text"
                description={`${errorMode}`}
                type="error"
                closable
                onClose={onClose}
                banner
            />
        </>
    )
}


