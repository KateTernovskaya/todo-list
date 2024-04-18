import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTitle = () => {
        const newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
     if (error) setError(null);
        if (e.key === 'Enter') {
            addTitle();
        }
    }

    const btnStyles = {
        margin: '0 5px',
        maxHeight: '38px',
        maxWidth: '38px',
        minHeight: '38px',
        minWidth: '38px',
        fontSize: '24px'
    }

    return (
        <div style={{padding: '20px 0'}}>
            <TextField id="outlined-basic"
                       error={!!error}
                       label={error ? error : "Enter text"}
                       variant="outlined"
                       size='small'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <Button variant="contained"
                    style={btnStyles}
                    onClick={addTitle}
            >+</Button>
        </div>
    );
})

