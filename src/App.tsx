import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TodoList} from "./components/todoList";
import {AddItemForm} from "./components/addItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todoListsId1 = v1()
    const todoListsId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todoListsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsId2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false},
            {id: v1(), title: "Rest API-2", isDone: false},
            {id: v1(), title: "GraphQL-2", isDone: false},
        ],
    })

    //TODOLIST
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(i => i.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const todoListID = v1()
        let newTodoList: TodoListsType = {id: todoListID, title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [todoListID]: []})
    }

    function updateTodoListTitle(todoListID: string, newTitle: string) {
        setTodoLists([...todoLists.map(i => i.id === todoListID ? {...i, title: newTitle} : i) ])
    }

    //TASK
    function removeTask(todoListID: string, taskID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(i => i.id !== taskID)})
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(item => item.id === taskId ? {...item, isDone} : item)})
    }

    function updateTaskTitle(todoListID: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(i => i.id === taskId ? {...i, title: newTitle} : i)})
    }


    //FILTER
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(i => i.id === todoListID ? {...i, filter: value} : i))
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
            <AddItemForm callBack={addTodoList}/>
            {mapTodoLists}
        </div>
    );
}

export default App;
