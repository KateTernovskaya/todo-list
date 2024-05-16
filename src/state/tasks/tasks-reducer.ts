import {
    AddTodoListACType,
    RemoveTodoListACType, SetTodoListACType,
} from "../todolist/todo-lists-reducer";
import {v1} from 'uuid';
import {TasksStateType, TaskType, TodoListsType} from "../types/types";


// const initialState: TasksStateType = {
//     [todoListsId1]: [
//         {id: v1(), title: "17.12 Предзаказ от издательства Эксмо: Кельтские мифы", isDone: true},
//         {id: v1(), title: "10.01 Арина Цимеринг: Как поймать монстра", isDone: true},
//         {id: v1(), title: "29.01 Предзаказ от издательства АСТ: Правление Волков", isDone: true},
//         {id: v1(), title: "02.02 Оушен Паркер: Погребенные", isDone: false},
//         {id: v1(), title: "12.02 Предзаказ от издательства АСТ: Семь безликих святых", isDone: true},
//         {
//             id: v1(),
//             title: "26.02 Анастасия волжская, Валерия Яблонцева: Великое открытие Линнет найт",
//             isDone: false
//         },
//         {id: v1(), title: "13.03 ника Веймар: Дракон по вызову", isDone: false},
//         {id: v1(), title: "15.03 Предзаказ от издательства Эксмо: Индийские мифы", isDone: true},
//         {id: v1(), title: "24.03 Предзаказ от издательства Эксмо: Гордость и предубеждение", isDone: true},
//         {id: v1(), title: "12.04 Лена Обухова (лимитки): Академия за занавесью 1,2,4", isDone: false},
//         {id: v1(), title: "15.04 Предзаказ от издательства Эксмо: Неночь 1,2,3", isDone: false},
//     ],
//     [todoListsId2]: [
//         {id: v1(), title: "Круче некуда", isDone: true},
//         {id: v1(), title: "Дева и дракон", isDone: true},
//         {id: v1(), title: "Пчеловод", isDone: true},
//         {id: v1(), title: "Александр", isDone: false},
//         {id: v1(), title: "Троя", isDone: false},
//         {id: v1(), title: "Убийца (Майкл фассбендер", isDone: false},
//     ],
//     [todoListsId3]: [
//         {id: v1(), title: "Мстители", isDone: false},
//         {id: v1(), title: "Dark pictures anthology", isDone: true},
//     ],
// }

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.taskID)
            };
        }
        case "ADD-TASK": {
            const taskID = v1()
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
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        case "SET-TODOLIST":{
            const copy = {...state}
            action.todoLists.forEach((tl)=> {
                state[tl.id] = []
            })
            return copy
        }
        default:
            return state
    }
}

export type TasksReducerType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | AddTodoListACType
    | RemoveTodoListACType
    | SetTodoListACType


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
