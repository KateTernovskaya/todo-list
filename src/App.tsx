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

    const tasksForTodoList: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks


    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
