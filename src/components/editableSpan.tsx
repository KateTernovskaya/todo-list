import React, {ChangeEvent, KeyboardEvent, memo} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    oldTitle: string
    isTitle?: boolean
    edit: boolean
    newTitle: string
    editHandler: () => void
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((
    {
        oldTitle,
        isTitle,
        edit,
        newTitle,
        editHandler,
        onChangeHandler
    }) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            editHandler()
        }
    }


    return (
        edit
            ?
            <TextField id="outlined-basic"
                       variant="standard"
                       size='small'
                       value={newTitle}
                       onBlur={editHandler}
                       autoFocus
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            :
            <>
                {isTitle ? <h3>{oldTitle}</h3> : <span> {oldTitle} </span>}
            </>
    );
});

