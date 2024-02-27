import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodoListsType[], action: TodolistsReducerType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const todoListID = v1()
            let newTodoList: TodoListsType = {id: todoListID, title: action.payload.title, filter: 'all'};
            return [...state, newTodoList]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(todolist => todolist.id === action.payload.id
                ? {...todolist, title: action.payload.title}
                : todolist)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(todolist => todolist.id === action.payload.id
                ? {...todolist, filter: action.payload.filter}
                : todolist
            )
        }
        default:
            return state
    }
}

type TodolistsReducerType = RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id,
        }
    } as const
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title,
        }
    } as const
}

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id,
            filter,
        }
    } as const
}