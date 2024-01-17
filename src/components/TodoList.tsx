import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export const TodoList: React.FC<TodoListPropsType> = (
    {
        title, tasks,
        removeTask, addTask, changeTodoListFilter,
    }) => {
    const [taskTitle, setTaskTitle] = useState('')
    const addNewTaskTitleHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const AddTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskTitleHandler()

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const ChangeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }

    const taskItems: JSX.Element = tasks.length !== 0
        ? <ul> {tasks.map(task => {
            const removeTaskHandler = () => removeTask(task.id)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <Button content='✖️'
                            onClickHandler={removeTaskHandler}/>
                </li>
            )
        })} </ul>
        : <span>No tasks for this filter type</span>

    return (
        <div className='todo-list'>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={setTaskTitleHandler}
                    onKeyDown={AddTaskOnKeyDownHandler}
                />
                <Button content='+'
                        isDisabled={!taskTitle}
                        onClickHandler={addNewTaskTitleHandler}/>

            </div>
            {taskItems}
            <div>
                <Button content='All'
                        onClickHandler={ChangeFilterHandlerCreator('all')}/>
                <Button content='Active'
                        onClickHandler={ChangeFilterHandlerCreator('active')}/>
                <Button content='Completed'
                        onClickHandler={ChangeFilterHandlerCreator('completed')}/>
            </div>
        </div>
    );
};

