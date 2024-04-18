import React, {memo, ReactNode} from 'react';
import IconButton from "@mui/material/IconButton";

type MyIconButtonPropsType = {
    ariaLabel: string
    onClick: (() => void) | undefined
    color: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined
    size?: "small" | "medium" | "large" | undefined
    children: ReactNode
}

export const MyIconButton: React.FC<MyIconButtonPropsType> = memo((
    {
        ariaLabel,
        onClick,
        color,
        size,
        children,
    }
) => {
    return (
        <IconButton aria-label={ariaLabel}
                    onClick={onClick}
                    color={color}
                    size={size}
        >
            {children}
        </IconButton>
    );
});

