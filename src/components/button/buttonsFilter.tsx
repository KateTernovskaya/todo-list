import React from 'react';
import Button from "@mui/material/Button";
import styled from 'styled-components';
import {FilterValuesType} from "../../AppWithRedux";

type ButtonFilterPropsType = {
    filter: FilterValuesType
    allClick: () => void
    activeClick: () => void
    completedClick: () => void
}

export const ButtonsFilter: React.FC<ButtonFilterPropsType> = (
    {
        filter,
        allClick,
        activeClick,
        completedClick,
    }
) => {
    return (
        <StyledButtonsFilter>
            <Button variant={filter === 'all' ? "contained" : "outlined"}
                    onClick={allClick}
                    size='small'
            >
                All
            </Button>

            <Button variant={filter === 'active' ? "contained" : "outlined"}
                    onClick={activeClick}
                    size='small'
            >
                Active
            </Button>

            <Button variant={filter === 'completed' ? "contained" : "outlined"}
                    onClick={completedClick}
                    size='small'
            >
                Completed
            </Button>
        </StyledButtonsFilter>
    );
};

const StyledButtonsFilter = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 20px;
`

