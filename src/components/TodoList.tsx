import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    getFilteredTasks: (allTasks: Array<TaskType>, filterValue: FilterValuesType) => Array<TaskType>
}
export const TodoList: React.FC<TodoListPropsType> = (
    {
        title, tasks,
        removeTask, addTask, changeTodoListFilter,
        changeTaskStatus, filter, getFilteredTasks
    }) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const [isHide, setIsHide] = useState(false)

    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }
    const countActiveTasksForHideMode = isHide ? getFilteredTasks(tasks, 'active').length : null
    const addNewTaskTitleHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }
    const AddTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskTitleHandler()
    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const ChangeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }

    const taskItems: JSX.Element = tasks.length !== 0
        ? <ul> {tasks.map(task => {
            const removeTaskHandler = () => removeTask(task.id)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
            const taskClass = task.isDone ? 'task-done' : 'task'

            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}/>
                    <span className={taskClass}>{task.title}</span>
                    <Button content='✖️'
                            onClickHandler={removeTaskHandler}/>
                </li>
            )
        })} </ul>
        : <span>No tasks for this filter type</span>

    return (
        <div className='todo-list'>
            <div className={'todo-list-title-block'}>
                <h3>{title}</h3>
                <Button content={isHide ? 'Show' : 'Hide'} onClickHandler={toggleHideTodoList}/>
            </div>

            {isHide && <div>{`There are ${countActiveTasksForHideMode} active tasks in the Todo-List`}</div>}
            {!isHide && <>
                <div>
                    <input
                        value={taskTitle}
                        onChange={setTaskTitleHandler}
                        onKeyDown={AddTaskOnKeyDownHandler}
                        className={error ? 'task-input-error' : 'task-input'}
                    />
                    <Button content='+'
                            isDisabled={!taskTitle}
                            onClickHandler={addNewTaskTitleHandler}/>
                    {error && <div style={{color: 'red'}}>Enter a task name</div>}

                </div>
                {taskItems}
                <div>
                    <Button classes={filter === 'all' ? 'btn-filter-active ' : ''}
                            content='All'
                            onClickHandler={ChangeFilterHandlerCreator('all')}/>
                    <Button classes={filter === 'active' ? 'btn-filter-active ' : ''}
                            content='Active'
                            onClickHandler={ChangeFilterHandlerCreator('active')}/>
                    <Button classes={filter === 'completed' ? 'btn-filter-active ' : ''}
                            content='Completed'
                            onClickHandler={ChangeFilterHandlerCreator('completed')}/>
                </div>
            </>
            }
        </div>
    );
};

