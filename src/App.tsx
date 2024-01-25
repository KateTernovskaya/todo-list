import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false,},
        {id: v1(), title: 'React', isDone: false,},
        {id: v1(), title: 'React', isDone: false,},
    ])

    //CRUD
    const removeTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    //filter
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }

    const tasksForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter)

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const nextState: Array<TaskType> = tasks.map(task => task.id === taskId ? {...task, isDone} : task)
        setTasks(nextState)
    }


    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
                      getFilteredTasks={getFilteredTasks}
            />
        </div>
    );
}

export default App;
