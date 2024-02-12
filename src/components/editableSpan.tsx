import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./button";

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        oldTitle,
        callBack
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
                <input value={newTitle}
                       onBlur={editHandler}
                       autoFocus
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <Button content={"1"} onClickHandler={editHandler}/>
            </>
            :
            <>
                <span> {oldTitle} </span>
                <Button content={"1"} onClickHandler={editHandler}/>
            </>
    );
};

