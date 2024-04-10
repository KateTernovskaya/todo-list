import {TaskType} from "../../components/todoList";
import {TasksStateType} from "../../AppWithReducers";
import {
    AddTodoListACType,
    RemoveTodoListACType,
    todoListsId1,
    todoListsId2,
    todoListsId3
} from "../todolist/todolists-reducer";
import {v1} from 'uuid';

const initialState: TasksStateType = {
    [todoListsId1]: [
        {id: v1(), title: "17.12 Предзаказ от издательства Эксмо: Кельтские мифы", isDone: true},
        {id: v1(), title: "10.01 Арина Цимеринг: Как поймать монстра", isDone: true},
        {id: v1(), title: "29.01 Предзаказ от издательства АСТ: Правление Волков", isDone: true},
        {id: v1(), title: "02.02 Оушен Паркер: Погребенные", isDone: false},
        {id: v1(), title: "12.02 Предзаказ от издательства АСТ: Семь безликих святых", isDone: true},
        {
            id: v1(),
            title: "26.02 Анастасия волжская, Валерия Яблонцева: Великое открытие Линнет найт",
            isDone: false
        },
        {id: v1(), title: "13.03 ника Веймар: Дракон по вызову", isDone: false},
        {id: v1(), title: "15.03 Предзаказ от издательства Эксмо: Индийские мифы", isDone: false},
        {id: v1(), title: "24.03 Предзаказ от издательства Эксмо: Гордость и предубеждение", isDone: false},
    ],
    [todoListsId2]: [
        {id: v1(), title: "Рыцари зодиака", isDone: true},
        {id: v1(), title: "Круче некуда", isDone: true},
        {id: v1(), title: "Форсаж", isDone: true},
        {id: v1(), title: "Дева и дракон", isDone: true},
        {id: v1(), title: "Пчеловод", isDone: true},
        {id: v1(), title: "Александр", isDone: false},
        {id: v1(), title: "Троя", isDone: false},
        {id: v1(), title: "Игра в имитацию", isDone: false},
        {id: v1(), title: "Игра на понижение", isDone: false},
        {id: v1(), title: "Нимона", isDone: false},
        {id: v1(), title: "Жанна дюбари", isDone: false},
        {id: v1(), title: "Любовь и смерть (сериал)", isDone: false},
        {id: v1(), title: "Корабль призраков", isDone: false},
        {id: v1(), title: "Два три демон приди", isDone: true},
        {id: v1(), title: "Телохранитель на фрилансе", isDone: true},
        {id: v1(), title: "Шантарам", isDone: false},
        {id: v1(), title: "Поколение v", isDone: true},
        {id: v1(), title: "Падение Дома ашеров", isDone: false},
        {id: v1(), title: "Побег", isDone: false},
        {id: v1(), title: "Рыцари готема", isDone: false},
        {id: v1(), title: "Пригородные крики", isDone: false},
        {id: v1(), title: "Камелот", isDone: false},
        {id: v1(), title: "Без обид", isDone: false},
        {id: v1(), title: "Убийца (Майкл фассбендер", isDone: false},
    ],
    [todoListsId3]: [
        {id: v1(), title: "Мстители", isDone: false},
        {id: v1(), title: "Человек паук", isDone: true},
        {id: v1(), title: "Человек паук 2", isDone: false},
        {id: v1(), title: "Стражи", isDone: false},
        {id: v1(), title: "Dark pictures anthology", isDone: true},
        {id: v1(), title: "Heavy rain", isDone: false},
        {id: v1(), title: "A way out", isDone: false},
        {id: v1(), title: "Гад оф вар", isDone: false},
    ],
}
export const tasksReducer = (state = initialState, action: TasksReducerType): TasksStateType => {
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
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
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
