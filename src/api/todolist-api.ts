import axios from "axios";
import {FilterValuesType} from "../state/types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '90c48e67-4eb3-497a-ba75-ea475ef2bccf'
    }
})

export const todoListApi = {
    getTodoList() {
        return instance.get<TodoListApiType[]>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseTodoListType<{item: TodoListApiType}>>('todo-lists', {title})
    },
    updateTodoList(todoListId: string, title:string) {
        return instance.put<ResponseTodoListType>(`todo-lists/${todoListId}`, {title})

    },
    removeTodoList(todoListId: string) {
        return instance.delete<ResponseTodoListType>(`todo-lists/${todoListId}`)
    },
}

export type ResponseTodoListType<T = {}> = {
    resultCode: number,
    fieldsErrors: string[]
    messages: string[],
    data: T
}

export type TodoListApiType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type TodoListDomainType = TodoListApiType & {
    filter: FilterValuesType
}
