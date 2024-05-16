import axios from 'axios'
import {ResponseTodoListType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '90c48e67-4eb3-497a-ba75-ea475ef2bccf'
    }
})
export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTodoListType>(`${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTodoListType<{ item: TaskType }>, { title: string }>
        (`${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseTodoListType<{ item: TaskType }>, UpdateTaskModelType>
        (`${todolistId}/tasks/${taskId}`, model);
    }
}
type TaskType = {
    description: string
    title: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskModelType = {
    title: string
    description: string
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
