import React, {useCallback, useState} from "react";
import s from './EditableSpan.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {LoaderStatus_T} from "../../state/app-reducer";

type EditableSpanType = {
    incomingTitle: string
    updateText: (title: string, todolistId: string) => void
    todolistId: string

}

export const EditableSpan = React.memo((props: EditableSpanType) => {

    const {incomingTitle, updateText, todolistId} = props

    const loadingStatus = useSelector<AppRootStateType, LoaderStatus_T>(state => state.appData.loaderStatus)

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(incomingTitle)

    const onDoubleClickHandler = () => {
        if (loadingStatus !== 'loading') {
            setEdit(true)
            setTitle('')
        }
    }

    const onBlurHandler = useCallback(() => {
        setEdit(false)
        updateText(title, todolistId)
    }, [updateText, title, todolistId])

    const onchangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit ?
            <input onBlur={onBlurHandler}
                   type="text"
                   value={title}
                   autoFocus
                   onChange={onchangeTitleHandler}
                   className={s.inputStyle}
            /> :
            <span onDoubleClick={onDoubleClickHandler}
                  className={s.spanStyle}
            >
                {incomingTitle}
            </span>
    )
})




