import React from 'react';

type ButtonPropsType = {
    content: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string
}
export const Button: React.FC<ButtonPropsType> = (
    {
        content,
        onClickHandler,
        isDisabled,
        classes,
    }) => {
    return (
        <button className={classes}
                disabled={isDisabled}
                onClick={onClickHandler}
        >
            {content}
        </button>
    );
};