import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer,
} from "./todolists-reducer";

test('correct todolist should be removed', ()=>{
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    const startState : Array<TodoListsType> = [
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ]
    //const  endState = todolistsReducer(startState, {type: "REMOVE-TODOLIST", id: todoListsId1})
    const  endState = todolistsReducer(startState, removeTodoListAC(todoListsId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListsId2)
})

test('correct todolist should be added', ()=>{
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState : Array<TodoListsType> = [
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ]
    const  endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', ()=>{
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState : Array<TodoListsType> = [
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ]
    const  endState = todolistsReducer(startState, changeTodoListTitleAC(todoListsId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed ', ()=>{
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState : Array<TodoListsType> = [
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ]
    const  endState = todolistsReducer(startState, changeTodoListFilterAC(todoListsId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})