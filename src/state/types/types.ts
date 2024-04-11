
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}