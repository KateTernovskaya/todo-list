import React from 'react';
import styled from 'styled-components';
import {FilterValuesType} from "../../../state/types/types";
import { MyFilterButton} from "./myFilterButton";


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
            <MyFilterButton variant={filter === 'all' ? "contained" : "outlined"}
                    onClick={allClick}
                    size='small'
                      text={'All'}
            />

            <MyFilterButton variant={filter === 'active' ? "contained" : "outlined"}
                    onClick={activeClick}
                    size='small'
                      text={'Active'}
            />


            <MyFilterButton variant={filter === 'completed' ? "contained" : "outlined"}
                    onClick={completedClick}
                    size='small'
                      text={'Completed'}
            />


        </StyledButtonsFilter>
    );
};

const StyledButtonsFilter = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 20px;
`

