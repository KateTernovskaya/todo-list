import React from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from "@mui/icons-material/Done";
import {MyIconButton} from "./myIconButton";

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
                <MyIconButton ariaLabel="hide tasks list"
                            onClick={callbackToggleHide}
                            color={isTitle ? 'primary' : 'default'}
                >
                    {isHide ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                </MyIconButton>

                <MyIconButton ariaLabel="delete"
                            onClick={callbackDelete}
                            color={isTitle ? 'primary' : 'default'}
                >
                    <DeleteIcon/>
                </MyIconButton>

                <MyIconButton ariaLabel="edit task"
                            onClick={callbackToggleEdit}
                            size="small"
                            color={isTitle ? 'primary' : 'default'}
                >
                    {edit ? <DoneIcon fontSize="inherit"/> : <ModeEditIcon fontSize="inherit"/>}
                </MyIconButton>
            </div>
            :
            <div className='btn-block'>
                <MyIconButton ariaLabel="delete"
                            onClick={callbackDelete}
                            color={isTitle ? 'primary' : 'default'}
                >
                    <DeleteIcon/>
                </MyIconButton>

                <MyIconButton ariaLabel="edit task"
                            onClick={callbackToggleEdit}
                            size="small"
                            color={isTitle ? 'primary' : 'default'}
                >
                    {edit ? <DoneIcon fontSize="inherit"/> : <ModeEditIcon fontSize="inherit"/>}
                </MyIconButton>
            </div>

    );
};

