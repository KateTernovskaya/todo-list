import {tasksReducer} from "./tasks/tasks-reducer";
import {addTodoListAC, todolistsReducer} from "./todolist/todolists-reducer";
import {TasksStateType, TodoListsType} from "../AppWithRedux";

test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodoListsType[] = []

    const action = addTodoListAC('new todolist')

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})