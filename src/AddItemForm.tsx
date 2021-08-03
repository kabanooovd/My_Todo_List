import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import styles from './AddItemForm.module.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField id="outlined-basic" label={error ?"Title is required": ""} variant="outlined"
                   size="small"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   error={!!error}
        />

        {/*<button onClick={addItem}>+</button>*/}
        <Button className={styles.currentButton} onClick={addItem} variant="contained" color="primary" style={{maxWidth: '45px', maxHeight: '45px', minWidth: '30px', minHeight: '30px'}}>+</Button>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}


//style={{maxWidth: '45px', maxHeight: '45px', minWidth: '30px', minHeight: '30px'}