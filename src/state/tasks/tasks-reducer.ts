import {TaskType} from "../../components/todoList";
import {TasksStateType} from "../../App";
import {AddTodoListACType, RemoveTodoListACType} from "../todolist/todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.taskID)
            };

        }
        case "ADD-TASK": {
            const taskID = '6'
            let newTask: TaskType = {
                id: taskID,
                title: action.payload.title,
                isDone: false
            };
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t
                )
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(t =>
                    t.id === action.payload.taskId
                        ? {...t, isDone: action.payload.isDone}
                        : t
                )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

type TasksReducerType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | AddTodoListACType
    | RemoveTodoListACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListID,
            taskID,
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListID,
            title,
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListID: string, taskId: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoListID,
            taskId,
            title,
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todoListID,
            taskId,
            isDone,
        }
    } as const
}
