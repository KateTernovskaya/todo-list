import React, {Reducer, useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, TodoList} from "./components/todoList";
import {AddItemForm} from "./components/addItemForm";
import {ButtonAppBar} from "./components/appBar";
import {Container} from "./components/styled/container";
import {
    addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer,
    TodolistsReducerType
} from "./state/todolist/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksReducerType
} from "./state/tasks/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {
    const todoListsId1 = v1()
    const todoListsId2 = v1()
    const todoListsId3 = v1()

    const [todoLists, dispatchTodoLists] =
        useReducer<Reducer<TodoListsType[], TodolistsReducerType>>(todolistsReducer, [
            {id: todoListsId1, title: 'Разобранные заказы', filter: 'all'},
            {id: todoListsId2, title: 'Фильмы', filter: 'all'},
            {id: todoListsId3, title: 'Игры', filter: 'all'},
        ])

    const [tasks, dispatchTasks] =
        useReducer<Reducer<TasksStateType, TasksReducerType>>(tasksReducer, {
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
        })

    //TODOLIST
    function removeTodoList(todoListID: string) {
        let action =removeTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function updateTodoListTitle(todoListID: string, newTitle: string) {
        dispatchTodoLists(changeTodoListTitleAC(todoListID, newTitle))
    }

    //FILTER
    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatchTodoLists(changeTodoListFilterAC(todoListID, value))
    }


    //TASK
    function removeTask(todoListID: string, taskID: string) {
        dispatchTasks(removeTaskAC(todoListID, taskID))
    }

    function addTask(todoListID: string, title: string) {
        dispatchTasks(addTaskAC(todoListID, title))
    }

    function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    }

    function updateTaskTitle(todoListID: string, taskId: string, newTitle: string) {
        dispatchTasks(changeTaskTitleAC(todoListID, taskId, newTitle))
    }

    //MAP
    const mapTodoLists = todoLists.map(item => {
        let tasksForTodolist = tasks[item.id];
        if (item.filter === "active") {
            tasksForTodolist = tasks[item.id].filter(t => !t.isDone);
        }
        if (item.filter === "completed") {
            tasksForTodolist = tasks[item.id].filter(t => t.isDone);
        }

        return (
            <TodoList key={item.id}
                      todoListID={item.id}
                      title={item.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={item.filter}
                      removeTodoList={removeTodoList}
                      updateTaskTitle={updateTaskTitle}
                      updateTodoListTitle={updateTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <div className='addTodolist'>
                    <h2>Add new Todo List: </h2>
                    <AddItemForm callBack={addTodoList}/>
                </div>

                <div className='todolistGallery'>
                    {mapTodoLists}
                </div>
            </Container>
        </div>
    );
}

export default AppWithReducers;
