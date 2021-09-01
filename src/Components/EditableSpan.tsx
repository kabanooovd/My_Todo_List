import React, {useState} from "react";

type EditableSpanType = {
    title: string
    updateText: (title: string, todolistId: string) => void
    todolistId: string

}

export function EditableSpan(props: EditableSpanType) {

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle('')
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.updateText(title, props.todolistId)
    }

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
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
}




