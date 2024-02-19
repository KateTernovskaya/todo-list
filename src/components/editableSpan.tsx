import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {

    oldTitle: string
    callBack: (newTitle: string) => void
    iconColor?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        oldTitle,
        callBack,
        iconColor
    }) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            callBack(newTitle)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            editHandler()
        }
    }


    return (
        edit
            ?
            <>
                <TextField id="outlined-basic"
                           // error={!!error}
                           // label={error ? error : "Enter text"}
                           variant="standard"
                           size='small'
                           value={newTitle}
                           onBlur={editHandler}
                           autoFocus
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                />
                <IconButton aria-label="done change"
                            onClick={editHandler}
                            size="small"
                            color={iconColor}>
                    <DoneIcon fontSize="inherit"/>
                </IconButton>

            </>
            :
            <>
                <span> {oldTitle} </span>
                <IconButton aria-label="edit task"
                            onClick={editHandler}
                            size="small"
                            color={iconColor}>
                    <ModeEditIcon fontSize="inherit"/>
                </IconButton>
            </>
    );
};

