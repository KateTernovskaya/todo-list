import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../AppWithReducers";
import {addTodoListAC, removeTodoListAC} from "../todolist/todolists-reducer";

let startState: TasksStateType

beforeEach(()=> {
     startState = {
        'todoListsId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        'todoListsId2': [
            {id: '1', title: "HTML&CSS-2", isDone: true},
            {id: '2', title: "JS-2", isDone: true},
            {id: '3', title: "ReactJS-2", isDone: false},
            {id: '4', title: "Rest API-2", isDone: false},
            {id: '5', title: "GraphQL-2", isDone: false},
        ],
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC('todoListsId1', '2'))

    expect(endState['todoListsId1'].length).toBe(4)
    expect(endState['todoListsId2'].length).toBe(5)
    expect(endState['todoListsId1'].every(t => t.id !== '2')).toBeTruthy()

})

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC('todoListsId1', 'grid'))

    expect(endState['todoListsId1'].length).toBe(6)
    expect(endState['todoListsId2'].length).toBe(5)
    expect(endState['todoListsId1'][0].id).toBe('6')
    expect(endState['todoListsId1'][0].title).toBe('grid')
    expect(endState['todoListsId1'][0].isDone).toBeFalsy()
})

test('correct task should change its name', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC('todoListsId1', '1', 'grid'))

    expect(endState['todoListsId1'][0].title).toBe('grid')
    expect(endState['todoListsId1'][1].title).toBe('JS')
})

test('correct status of task should be changed ', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC('todoListsId1', '3', true))

    expect(endState['todoListsId1'][2].isDone).toBeTruthy()
    expect(endState['todoListsId1'][1].isDone).toBeTruthy()
    expect(endState['todoListsId2'][2].isDone).toBeFalsy()
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodoListAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListsId1' && k != 'todoListsId2')
    if (!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolist should be deleted', () => {
    const endState = tasksReducer(startState, removeTodoListAC('todoListsId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListsId2']).not.toBeDefined()
})