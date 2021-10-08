import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import s from './AddItemForm.module.css'
import {PlusSquareOutlined} from "@ant-design/icons";

export type AddItemFormType = {
    addText: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormType) {

    const {addText} = props

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback(() => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addText(newTitle);
            setTitle("");
        } else {
            setError("Insert TEXT");
            setTitle("");
        }
    }, [addText, title])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return(
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? `${s.error}` : `${s.notError}`}
            />
            <button onClick={addTask} className={s.addBtnStyles}>
                <PlusSquareOutlined />
            </button>
            {error && <div className={`${s.errorMessage}`}>{error}</div>}
        </div>
    )
})




