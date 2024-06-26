import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../types/types";
import {todoListApi, TodoListApiType} from "../../api/todolist-api";

// export const todoListsId1 = v1()
// export const todoListsId2 = v1()
// export const todoListsId3 = v1()
//
// const initialState: TodoListsType[] = [
//     {id: todoListsId1, title: 'Разобранные заказы', filter: 'all'},
//     {id: todoListsId2, title: 'Фильмы', filter: 'all'},
//     {id: todoListsId3, title: 'Игры', filter: 'all'},
// ]

const initialState: TodoListsType[] = []

export const todoListsReducer = (state = initialState, action: TodoListsReducerType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodoList: TodoListsType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            };
            return [newTodoList, ...state]
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
        case "SET-TODOLIST":{
            return action.todoLists.map((todoList) =>(
                {...todoList, filter: "all"})
            )

        }
        default:
            return state
        //  throw new Error('I do not understand this type')
    }
}

export type TodoListsReducerType = RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType
|SetTodoListACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id,
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolistId: v1(),
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

export type SetTodoListACType = ReturnType<typeof setTodoListAC>
export const setTodoListAC = (todoLists: TodoListApiType[]) => {
    return {type: "SET-TODOLIST", todoLists} as const
}

export const thunkGetTodoList = (dispatch: any, getState: any) => {
    todoListApi.getTodoList()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
        })
}
