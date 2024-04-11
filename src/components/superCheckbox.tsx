import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type SuperCheckboxPropsType = {
    checked: boolean
    onChange: (e: boolean) => void
}

export const SuperCheckbox = (
    {
        checked,
        onChange,
    }: SuperCheckboxPropsType
) => {
    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }


    return (
        <Checkbox
            checked={checked}
            onChange={onChangeHandler}
        />
    );
};

