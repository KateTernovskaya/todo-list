import React from 'react';
import './App.css';
import {TaskType} from "./components/todoList";
import {AddItemForm} from "./components/addItemForm";
import {ButtonAppBar} from "./components/appBar";
import {Container} from "./components/styled/container";
import {
    addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolist/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithRedux} from "./components/todoListWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(
        state => state.todolists
    )

    // const tasks = useSelector<AppRootStateType, TasksStateType>(
    //     state => state.tasks
    // )

    const dispatch = useDispatch()


    //TODOLIST
    // function removeTodoList(todoListID: string) {
    //     dispatch(removeTodoListAC(todoListID))
    // }

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }

    // function updateTodoListTitle(todoListID: string, newTitle: string) {
    //     dispatch(changeTodoListTitleAC(todoListID, newTitle))
    // }

    //FILTER
    // function changeFilter(todoListID: string, value: FilterValuesType) {
    //     dispatch(changeTodoListFilterAC(todoListID, value))
    // }


    //TASK
    // function removeTask(todoListID: string, taskID: string) {
    //     dispatch(removeTaskAC(todoListID, taskID))
    // }

    // function addTask(todoListID: string, title: string) {
    //     dispatch(addTaskAC(todoListID, title))
    // }
    //
    // function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
    //     dispatch(changeTaskStatusAC(todoListID, taskId, isDone))
    // }
    //
    // function updateTaskTitle(todoListID: string, taskId: string, newTitle: string) {
    //     dispatch    (changeTaskTitleAC(todoListID, taskId, newTitle))
    // }

    //MAP
    const mapTodoLists = todoLists.map(item => {
        // let tasksForTodolist = tasks[item.id];
        // if (item.filter === "active") {
        //     tasksForTodolist = tasks[item.id].filter(t => !t.isDone);
        // }
        // if (item.filter === "completed") {
        //     tasksForTodolist = tasks[item.id].filter(t => t.isDone);
        // }

        return (
            <TodoListWithRedux key={item.id}
                      todoListID={item.id}
                      title={item.title}
                      filter={item.filter}
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

export default AppWithRedux;
