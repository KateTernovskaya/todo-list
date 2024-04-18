import React, {memo} from 'react';
import Button from "@mui/material/Button";


type myButtonPropsType = {
    variant: "text" | "outlined" | "contained" | undefined
    onClick: () => void
    size: "small" | "medium" | "large" | undefined
    text: string
}
export const MyFilterButton: React.FC<myButtonPropsType> = memo((
    {
        variant,
        onClick,
        size,
        text,
    }
) => {
    return (
        <Button variant={variant} onClick={onClick} size={size}>
            {text}
        </Button>
    );
});


