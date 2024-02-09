import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskID: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {
    //TODOLIST
    const RemoveTodoListHandler = () => props.removeTodoList(props.todoListID)

    //TASK
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }


    //Filter
    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");


    //IsHide
    const [isHide, setIsHide] = useState(false)
    const activeTasksCount = props.tasks.filter(task => !task.isDone).length;
    const countActiveTasksForHideMode = isHide ? activeTasksCount : null
    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    //MAP
    const taskItems = props.tasks.length !== 0
        ? <ul>{props.tasks.map(t => {
            const RemoveTaskHandler = () => props.removeTask(props.todoListID, t.id)
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
            }
            const taskClass = t.isDone ? 'task-done' : 'task'

            return <li key={t.id} className={taskClass}>
                <input type="checkbox"
                       onChange={onChangeTaskStatusHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={RemoveTaskHandler}>x</button>
            </li>
        })}</ul>
        : <span>No tasks for this filter type</span>


    return (
        <div className='todo-list'>
            <div className={'todo-list-title-block'}>
                <h3>{props.title}</h3>
                <Button content={isHide ? 'Show' : 'Hide'} onClickHandler={toggleHideTodoList}/>
                <Button content={'x'} onClickHandler={RemoveTodoListHandler}/>
            </div>
            {isHide && <div>{`There are ${countActiveTasksForHideMode} active tasks in the Todo-List`}</div>}
            {!isHide && <>

                <AddItemForm callBack={addTaskHandler}/>
                {taskItems}
                <div>
                    <Button classes={props.filter === 'all' ? "btn-filter-active" : ""}
                            content='All'
                            onClickHandler={onAllClickHandler}/>
                    <Button classes={props.filter === 'active' ? "btn-filter-active" : ""}
                            content='Active'
                            onClickHandler={onActiveClickHandler}/>
                    <Button classes={props.filter === 'completed' ? "btn-filter-active" : ""}
                            content='Completed'
                            onClickHandler={onCompletedClickHandler}/>
                </div>
            </>
            }
        </div>
    )
}
