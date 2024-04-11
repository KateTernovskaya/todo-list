import React from 'react';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from "@mui/icons-material/Done";

type ButtonControlPropsType = {
    isTitle?: boolean
    isHide?: boolean
    edit: boolean
    callbackDelete: () => void
    callbackToggleEdit: () => void
    callbackToggleHide?: () => void
}

export const ButtonsControl: React.FC<ButtonControlPropsType> = (
    {
        isTitle,
        isHide,
        edit,
        callbackDelete,
        callbackToggleEdit,
        callbackToggleHide,
    }
) => {


    return (
        isTitle
            ?
            <div className='btn-block'>
                <IconButton aria-label="hide tasks list"
                            onClick={callbackToggleHide}
                            color={isTitle ? 'primary' : 'default'}
                >
                    {isHide ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                </IconButton>

                <IconButton aria-label="delete"
                            onClick={callbackDelete}
                            color={isTitle ? 'primary' : 'default'}
                >
                    <DeleteIcon/>
                </IconButton>

                <IconButton aria-label="edit task"
                            onClick={callbackToggleEdit}
                            size="small"
                            color={isTitle ? 'primary' : 'default'}
                >
                    {edit ? <DoneIcon fontSize="inherit"/> : <ModeEditIcon fontSize="inherit"/>}
                </IconButton>
            </div>
            :
            <div className='btn-block'>
                <IconButton aria-label="delete"
                            onClick={callbackDelete}
                            color={isTitle ? 'primary' : 'default'}
                >
                    <DeleteIcon/>
                </IconButton>

                <IconButton aria-label="edit task"
                            onClick={callbackToggleEdit}
                            size="small"
                            color={isTitle ? 'primary' : 'default'}
                >
                    {edit ? <DoneIcon fontSize="inherit"/> : <ModeEditIcon fontSize="inherit"/>}
                </IconButton>
            </div>

    );
};

