import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import {Button} from "./Button";

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

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isHide, setIsHide] = useState(false)
    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    const addNewTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todoListID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addNewTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");
    const onClickHandlerRemoveTodoList = () => props.removeTodoList(props.todoListID)

    //MAP
    const taskItems = props.tasks.length !== 0
        ? <ul>{props.tasks.map(t => {
            const onClickHandlerRemoveTask = () => props.removeTask(props.todoListID, t.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
            }
            const taskClass = t.isDone ? 'task-done' : 'task'

            return <li key={t.id} className={taskClass}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickHandlerRemoveTask}>x</button>
            </li>
        })
        }
        </ul>
        : <span>No tasks for this filter type</span>

    //IsHide
    const activeTasksCount = props.tasks.filter(task => !task.isDone).length;
    const countActiveTasksForHideMode = isHide ? activeTasksCount : null

    return (
        <div className='todo-list'>
            <div className={'todo-list-title-block'}>
                <h3>{props.title}</h3>
                <Button content={isHide ? 'Show' : 'Hide'} onClickHandler={toggleHideTodoList}/>
                <Button content={'x'} onClickHandler={onClickHandlerRemoveTodoList}/>
            </div>

            {isHide && <div>{`There are ${countActiveTasksForHideMode} active tasks in the Todo-List`}</div>}
            {!isHide && <>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'task-input-error' : 'task-input'}
                    />
                    <Button content='+'
                            isDisabled={!title}
                            onClickHandler={addNewTask}/>
                    {error && <div style={{color: 'red'}}>Enter a task name</div>}
                </div>

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
