import React, {useCallback, useState} from "react";

type EditableSpanType = {
    incomingTitle: string
    updateText: (title: string, todolistId: string) => void
    todolistId: string

}

export const EditableSpan = React.memo( (props: EditableSpanType) => {

    const {incomingTitle, updateText, todolistId} = props

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(incomingTitle)

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle('')
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

            /> :
            <span onDoubleClick={onDoubleClickHandler}>{incomingTitle}</span>
    )
})




